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
				renderMovies(ids)
			})
	}
})

export function renderMovies(movieIds) {
	for (let id of movieIds) {
		fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`)
			.then((res) => res.json())
			.then((data) => {
				renderMovie(data, true)
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

	const html =
		`
                <li>
                    <p>${movie.Title}</p>` +
		special +
		`
                </li>`

	document.getElementById('movie-list').innerHTML += html
}
