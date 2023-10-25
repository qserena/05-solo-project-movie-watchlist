const apiKey = `7575777d`
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const form = document.getElementById('form')
const movieList = document.getElementById('movie-list')

let searchedMovieList = []

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
	e.preventDefault()

	if (searchInput.value) {
		fetch(
			`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput.value}`
		)
			.then((res) => res.json())
			.then((data) => {
				getAllMovieData(data.Search)
			})
	}
})

function getAllMovieData(movies) {
	searchedMovieList = []
	for (let movie of movies) {
		fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`)
			.then((res) => res.json())
			.then((data) => {
				renderMovie(data)
			})
	}
}

function renderMovie(movie) {
	const html = `
                <li>
                    <p>${movie.Title}</p>
                    <div class="add-btn align-right">
                        <img class="icon" src="./img/add-icon-large.png" data-imdb-id="${movie.imdbID}"/>
                        <p data-imdb-id="${movie.imdbID}">Watchlist</p>
                    </div>
                </li>`

	document.getElementById('movie-list').innerHTML += html
}
