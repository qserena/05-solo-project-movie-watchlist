const apiKey = `7575777d`
const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-btn')
const form = document.getElementById('form')
const movieList = document.getElementById('movie-list')

let movies = []

form.addEventListener('submit', function (e) {
	e.preventDefault()

	if (searchInput.value) {
		fetch(
			`https://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput.value}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data)
				movies = data.Search
				renderMovies()
			})
	}
})

function renderMovies() {
	if (movies.length > 0) {
		let html = ``
		for (let movie of movies) {
			html += `
                <li>
                    ${movie.Title} 
                    <div class="add-btn align-right" data-item-id=${movie.id}>
                        <p data-item-id=${movie.id}>Watchlist</p>
                    </div>
                </li>
            `
		}
		movieList.innerHTML = html
	}
}
