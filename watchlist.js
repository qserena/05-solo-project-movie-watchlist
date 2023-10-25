import { renderMovies } from './index.js'

const moviesList = document.getElementById('movies-list')

document.addEventListener('click', function (e) {
	if (e.target.dataset.imdbId) {
		handleRemoveClick(e.target.dataset.imdbId)
	}
})

function handleRemoveClick(imdbId) {
	let watchListIds = getWatchListIds()
	watchListIds = watchListIds.filter((i) => i !== imdbId)
	localStorage.setItem('watch-list-ids', JSON.stringify(watchListIds))
	renderMovies()
}

function getWatchListIds() {
	return JSON.parse(localStorage.getItem('watch-list-ids'))
}

function renderMovies() {
	const movieIds = getWatchListIds()

	let html = ''
	for (let id of movieIds) {
		html += `
            <li>
            <p>${id}</p>
            <div class="remove-btn align-right">
                <img class="icon" src="./img/remove-icon-large.png" data-imdb-id="${id}"/>
                <p data-imdb-id="${id}">Remove</p>
            </div>
            </li>
        `
	}

	moviesList.innerHTML = html
}

renderMovies()
