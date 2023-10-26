const apiKey = `7575777d`
const searchInput = document.getElementById('search-input')
const form = document.getElementById('form')

function getWatchListIds() {
	return JSON.parse(localStorage.getItem('watch-list-ids'))
}

document.addEventListener('click', function (e) {
	if (e.target.dataset.imdbId) {
		handleAddClick(e.target.dataset.imdbId)
	}
})

function handleAddClick(imdbId) {
	let watchListIds = getWatchListIds() || []
	watchListIds.push(imdbId)
	localStorage.setItem('watch-list-ids', JSON.stringify(watchListIds))
}

form.addEventListener('submit', function (e) {
	console.log('mannen')
	e.preventDefault()

	document.getElementById('movie-list').innerHTML = ``

	if (searchInput.value) {
		fetch(
			`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput.value}`
		)
			.then((res) => res.json())
			.then((data) => {
				const ids = data.Search.map((movie) => movie.imdbID)
				console.log(ids)
				renderMovies(ids)
			})
	}
})

export function renderMovies(movieIds) {
	for (let id of movieIds) {
		fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
			.then((res) => res.json())
			.then((data) => {
				renderMovie(data)
			})
	}
}

function renderMovie(movie) {
	const html = `
		<li>
			<div class="movie-item">
				<img class="movie-poster" src="${movie.Poster}" alt="Poster of movie ${movie.Title}">
				<div class="movie-info">
					<div class="movie-first-row">
						<h2>${movie.Title}</h2>
						<div class="rating">
							<img class="star-icon" src="./img/star.png" alt="A star icon">
							<p>${movie.imdbRating}</p>
						</div>
					</div>
					<div class="movie-second-row">
						<p>${movie.Runtime}</p>
						<p>${movie.Genre}</p>
						<div class="add-btn">
							<img class="icon" src="./img/add-icon.png" data-imdb-id="${movie.imdbID}"/>
							<p data-imdb-id="${movie.imdbID}">Watchlist</p>
						</div>
					</div>
					<p class="plot">${movie.Plot}</p>
				</div>
			</div>
			<hr/>
		</li>
		`
	document.getElementById('movie-list').innerHTML += html
}
