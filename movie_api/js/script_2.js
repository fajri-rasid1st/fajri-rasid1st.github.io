async function getDataFilms(name, option) {
	const response = await fetch(
		`https://www.omdbapi.com/?apikey=6dcfe9e9&s=${name}&type=${option}`
	);
	const result = await response.json();
	return result.Search;
}

// function getDataFilms(name, option) {
// 	return fetch(
// 		`https://www.omdbapi.com/?apikey=6dcfe9e9&s=${name}&type=${option}`
// 	)
// 		.then((response) => response.json())
// 		.then((result) => result.Search);
// }

function updateContent(movies) {
	const listMovie = movies;
	if (listMovie === undefined) {
		document.querySelector(".movie-container").innerHTML = "";
		setTimeout(() => {
			alert("Film/Series/Episode Not Found! :)");
		}, 100);
	} else {
		$(".dummy-text").css("display", "none");
		$(".search-result").css("display", "block");
		let cards = "";
		listMovie.forEach((movie) => {
			cards += cardHTMLFragments(movie);
		});
		document.querySelector(".movie-container").innerHTML = cards;
	}
}

async function getDetailFilm(imdbId) {
	const response = await fetch(
		`https://www.omdbapi.com/?apikey=6dcfe9e9&i=${imdbId}&plot=full`
	);
	const details = await response.json();
	return details;
}

// function getDetailFilm(imdbId) {
// 	return fetch(
// 		`https://www.omdbapi.com/?apikey=6dcfe9e9&i=${imdbId}&plot=full`
// 	)
// 		.then((response) => response.json())
// 		.then((details) => details);
// }

function updateDetailContent(details) {
	const movieDetails = modalHTMLFragments(details);
	const modalBody = document.querySelector(".modal-body");
	modalBody.innerHTML = movieDetails;
}

function getRatingFilms(imdbID) {
	let rating = "";
	$.ajax({
		url: `https://www.omdbapi.com/?apikey=6dcfe9e9&i=${imdbID}`,
		success: (details) => {
			rating = details.imdbRating;
		},
		async: false,
	});
	return rating;
}

function cardHTMLFragments(movie) {
	return `
	<div class="col col-result px-0 mb-2">
		<div class="card">
			<div class="rating-star">
				<i class="fas fa-star"></i>
				<h6 class="mb-0">Rating : ${getRatingFilms(movie.imdbID)}/10</h6>
			</div>
			<img src="${movie.Poster}" class="card-img-top" height=400/>
			<div class="card-body">
				<h6 class="card-title">${movie.Title}</h6>
				<h6 class="card-subtitle mb-2" style="opacity: 0.8; font-weight: 400">
					${movie.Year}
				</h6>
				<a href="#" class="btn btn-outline-dark show-details" data-toggle="modal"
					data-target="#show-movie-detail" data-imdbid=${movie.imdbID}>
					Show Details
				</a>
			</div>
		</div>
	</div>`;
}

function modalHTMLFragments(details) {
	return `
	<div class="container-fuild">
		<div class="row justify-content-center align-content-center">
			<div class="col-md-4 image-detail-container">
				<img src="${details.Poster}" alt="${details.Poster}" class="img-fluid"/>
			</div>
			<div class="col-md">
				<ul class="list-group">
					<li class="list-group-item">
						<h4 class="mb-0">${details.Title} (${details.Year})</h4>
					</li>
					<li class="list-group-item">
						<strong>Rated : </strong>${details.Rated}
					</li>
					<li class="list-group-item">
						<strong>Released : </strong>${details.Released}
					</li>
					<li class="list-group-item">
						<strong>Duration : </strong>${details.Runtime}
					</li>
					<li class="list-group-item">
						<strong>Genre : </strong>${details.Genre}
					</li>
					<li class="list-group-item">
						<strong>Writers : </strong>${details.Writer}
					</li>
					<li class="list-group-item">
						<strong>Actors : </strong>${details.Actors}
					</li>
					<li class="list-group-item">
						<strong>Plot : </strong><br />${details.Plot}
					</li>
				</ul>
			</div>
		</div>
	</div>`;
}

const options = document.querySelectorAll(".option");
options.forEach((opt) => {
	opt.addEventListener("click", async function () {
		const userSearch = document.querySelector(".search-input").value;
		if (userSearch.trim().length != 0) {
			$(".loading-screen").css("display", "flex");
			if (this.textContent.trim() === "Movie") {
				updateContent(await getDataFilms(userSearch, "Movie"));
			} else if (this.textContent.trim() === "Series") {
				updateContent(await getDataFilms(userSearch, "Series"));
			} else if (this.textContent.trim() === "Episode") {
				updateContent(await getDataFilms(userSearch, "Episode"));
			} else {
				updateContent(await getDataFilms(userSearch, ""));
			}
		}
		$(".loading-screen").css("display", "none");
	});
});

document.addEventListener("click", async function (event) {
	if (event.target.classList.contains("show-details")) {
		const imdbId = event.target.dataset.imdbid;
		updateDetailContent(await getDetailFilm(imdbId));
	}
});
