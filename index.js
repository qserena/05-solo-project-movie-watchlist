//import { renderMovies2 } from './common.js'

const apiKey = `7575777d`
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const form = document.getElementById('form')
const movieList = document.getElementById('movie-list')

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

	if (searchInput.value) {
		fetch(
			`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput.value}`
		)
			.then((res) => res.json())
			.then((data) => {
				const ids = data.Search.map((movie) => movie.imdbID)
				console.log(ids)
				renderMovies(ids, true)
			})
	}
})

export function renderMovies(movieIds, isSearch) {
	for (let id of movieIds) {
		fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
			.then((res) => res.json())
			.then((data) => {
				renderMovie(data, isSearch)
			})
	}
}

function renderMovie(movie, isSearch) {
	const special = isSearch
		? `
        <div class="add-btn align-right">
            <img class="icon" src="./img/add-icon-large.png" data-imdb-id="${movie.imdbID}"/>
            <p data-imdb-id="${movie.imdbID}">Watchlist</p>
        </div>`
		: `<div class="remove-btn align-right">
        <img class="icon" src="./img/remove-icon-large.png" data-imdb-id="${movie.imdbID}"/>
        <p data-imdb-id="${movie.imdbID}">Remove</p>
    </div>
        `
	console.log(movie)
	const html = `
		<li>
			<div class="movie-item">
				<img class="movie-poster" src="${movie.Poster}" alt="Poster of movie ${movie.Title}">
				<div class="movie-info">
					<div class="movie-first-row">
						<h2>${movie.Title}</h2>
						<img class="star-icon" src="./img/star.png" alt="A star icon">
						<p>${movie.imdbRating}</p>
					</div>
					<div class="movie-second-row">
						<p>${movie.Runtime}</p>
						<p>${movie.Genre}</p>
						<div class="add-btn align-right">
							<img class="icon" src="./img/add-icon-large.png" data-imdb-id="${movie.imdbID}"/>
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
