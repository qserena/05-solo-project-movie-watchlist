const apiKey = `7575777d`
// const moviesList = document.getElementById('movies-list')

document.addEventListener('click', function (e) {
	if (e.target.dataset.removeImdbId) {
		handleRemoveClick(e.target.dataset.removeImdbId)
	}
})

function handleRemoveClick(imdbId) {
	document.getElementById('movies-list').innerHTML = ``
	const watchListIds = getWatchListIds()
	const newWatchListIds = watchListIds.filter((i) => i !== imdbId)
	localStorage.setItem('watch-list-ids', JSON.stringify(newWatchListIds))
	renderMovies()
}

function getWatchListIds() {
	return JSON.parse(localStorage.getItem('watch-list-ids'))
}

function renderMovies() {
	const movieIds = getWatchListIds()

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
						<div class="remove-btn">
							<img class="icon" src="./img/remove-icon.png" data-remove-imdb-id="${movie.imdbID}"/>
							<p data-remove-imdb-id="${movie.imdbID}">Remove</p>
						</div>
					</div>
					<p class="plot">${movie.Plot}</p>
				</div>
			</div>
			<hr/>
		</li>
        `
	document.getElementById('movies-list').innerHTML += html
}

renderMovies()
