// function untuk mengambil data film pada API
function getDataFilms(name, option) {
	// request API dengan menggunakan method fetch
	fetch(`https://www.omdbapi.com/?apikey=6dcfe9e9&s=${name}&type=${option}`)
		// ubah data dari bentuk promise menjadi data sesuai isi json (object)
		.then((response) => response.json())
		// data telah menjadi object
		.then((result) => {
			// ambil hasilnya, list Search berupa list dengan kumpulan objek.
			const movies = result.Search;
			// jika movies tidak ada atau kosong
			if (movies === undefined) {
				// kosongkan isi movie-container
				document.querySelector(".movie-container").innerHTML = "";
				// tampilkan alert
				setTimeout(() => {
					alert("Film/Series/Episode/ Not Found! :)");
				}, 100);
			}
			// jika movies ada
			else {
				// display dummy text dihilangkan
				$(".dummy-text").css("display", "none");
				// display text search-result menjadi block
				$(".search-result").css("display", "block");
				// deklarasikan cards kosong
				let cards = "";
				// untuk setiap movie pada movies
				movies.forEach((movie) => {
					// tambahkan HTML Fragments untuk setiap card
					cards += cardHTMLFragments(movie);
				});
				// isi class movie-container dengan cards
				document.querySelector(".movie-container").innerHTML = cards;
				// panggil function getDetailFilm
				getDetailFilm();
			}
		});
}

// function untuk melihat detail film tertentu (memerlukan request API)
function getDetailFilm() {
	// seleksi class show-details
	const showDetButton = document.querySelectorAll(".show-details");
	// untuk setiap tombol show details, ketika salah satunya di klick
	showDetButton.forEach((button) => {
		// saat salah satu tombol show details di klick
		button.addEventListener("click", function () {
			fetch(
				`https://www.omdbapi.com/?apikey=6dcfe9e9&i=${this.dataset.imdbid}&plot=full`
			)
				// ubah data dari bentuk promise menjadi data sesuai isi json (object)
				.then((response) => response.json())
				// data telah menjadi object
				.then((details) => {
					// tampung isi details pada variable movieDetails
					const movieDetails = modalHTMLFragments(details);
					// seleksi class modal-body
					const modalBody = document.querySelector(".modal-body");
					// modal diisi dengan fragment pada movieDetails
					modalBody.innerHTML = movieDetails;
				});
		});
	});
}

// function untuk mengambil rating imdb dari film
const getRatingFilms = (imdbID) => {
	let rating = "";
	$.ajax({
		url: `https://www.omdbapi.com/?apikey=6dcfe9e9&i=${imdbID}`,
		success: (details) => {
			rating = details.imdbRating;
		},
		async: false,
	});
	return rating;
};

// function untuk mengembalikan HTML Fragments dari card
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

// function yang mengembalikan HTML Fragments yang berisi detail film yang di klik
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

// seleksi beberapa button option
const options = document.querySelectorAll(".option");
// untuk setiap option pada options
options.forEach((opt) => {
	// saat salah satu tombol option di klick
	opt.addEventListener("click", function () {
		// ambil value dari search input
		const userSearch = document.querySelector(".search-input").value;
		// kalau inputan user tidak kosong
		if (userSearch.trim().length != 0) {
			// kalau option yang di klick textnya adalah Movie
			if (this.textContent.trim() === "Movie") {
				getDataFilms(userSearch, "Movie");
			}
			// kalau option yang di klick textnya adalah Series
			else if (this.textContent.trim() === "Series") {
				getDataFilms(userSearch, "Series");
			}
			// kalau option yang di klick textnya adalah Episode
			else if (this.textContent.trim() === "Episode") {
				getDataFilms(userSearch, "Episode");
			}
			// selain itu
			else {
				getDataFilms(userSearch, "");
			}
		}
	});
});
