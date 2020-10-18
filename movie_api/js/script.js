// function untuk mengambil data film pada API
function getDataFilms(name, option) {
	// request API dengan menggunakan method ajax
	$.ajax({
		// url dari API untuk search
		url: `https://www.omdbapi.com/?apikey=6dcfe9e9&s=${name}&type=${option}`,
		// saat sukses, lakukan ini
		success: (result) => {
			// ambil hasilnya. list Search berupa list dengan kumpulan objek.
			const movies = result.Search;
			// jika movies tidak ada atau kosong
			if (movies === undefined) {
				// kosongkan isi movie-container
				$(".movie-container").html("");
				// tampilkan alert
				alert("Film Not Found! :)");
			}
			// jika movies ada
			else {
				// display dummy text dihilangkan
				$(".dummy-text").css("display", "none");
				// ubah display text search-result menjadi block pada main section
				$(".search-result").css("display", "block");
				// // ubah justify content movie container
				// $(".movie-container").css("justify-content", "flex-start");
				// deklarasikan cards kosong
				let cards = "";
				// untuk setiap movie pada movies
				movies.forEach((movie) => {
					// tambahkan HTML Fragments untuk setiap card
					cards += cardHTMLFragments(movie);
				});
				// isi dari movie-container diisi dengan variable cards
				$(".movie-container").html(cards);
				// panggil function getDetailFilm
				getDetailFilm();
			}
		},
		// saat error, lakukan
		error: () => {
			alert("Film Not Found!");
		},
	});
}

// function untuk melihat detail film tertentu (memerlukan request API)
function getDetailFilm() {
	// saat tombol show details di klick
	$(".show-details").on("click", function () {
		// request API dengan menggunakan method ajax
		$.ajax({
			// url untuk mengambil detail film
			url: `https://www.omdbapi.com/?apikey=6dcfe9e9&i=${$(this).data(
				"imdbid"
			)}&plot=full`,
			// saat sukses, lakukan
			success: (details) => {
				// tampung isi details pada variable movieDetails
				const movieDetails = modalHTMLFragments(details);
				// modal diisi dengan fragment pada movieDetails
				$(".modal-body").html(movieDetails);
			},
			// saat error, lakukan
			error: () => {
				alert("Film Not Found!");
			},
		});
	});
}

// function untuk mengembalikan HTML Fragments dari card
function cardHTMLFragments(movie) {
	return `
	<div class="col col-result px-0">
		<div class="card">
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
			<div class="col-md-4 text-center">
				<img src="${details.Poster}" alt="${details.Poster}" class="img-fluid" style="border-radius: 5px"/>
			</div>
			<div class="col-md">
				<ul class="list-group">
					<li class="list-group-item">
						<h3 class="mb-0">${details.Title} (${details.Year})</h3>
					</li>
					<li class="list-group-item">
						<strong>Rated : </strong>${details.Rated}
					</li>
					<li class="list-group-item">
						<strong>Released : </strong>${details.Released}
					</li>
					<li class="list-group-item">
						<strong>Genre : </strong>${details.Genre}
					</li>
					<li class="list-group-item">
						<strong>Duration : </strong>${details.Runtime}
					</li>
					<li class="list-group-item">
						<strong>Actors : </strong>${details.Actors}
					</li>
					<li class="list-group-item">
						<strong>Plot : </strong> <br />${details.Plot}
					</li>
				</ul>
			</div>
		</div>
	</div>`;
}

// saat tombol button submit di klick
$(".submit").on("click", () => {
	// ambil value dari search input
	const userSearch = $(".search-input").val();
	// kalau inputan user tidak kosong
	if (userSearch.trim().length != 0) {
		// call the getDataFilms function
		getDataFilms(userSearch, "");
	}
});

// saat salah satu tombol option di klick
$(".option").on("click", (event) => {
	// ambil value dari search input
	const userSearch = $(".search-input").val();
	// kalau inputan user tidak kosong
	if (userSearch.trim().length != 0) {
		// kalau option yang di klick valuenya adalah Movie
		if (event.target.textContent.trim() === "Movie") {
			getDataFilms(userSearch, "Movie");
		}
		// kalau option yang di klick valuenya adalah Series
		else if (event.target.textContent.trim() === "Series") {
			getDataFilms(userSearch, "Series");
		}
		// kalau option yang di klick valuenya adalah Episode
		else if (event.target.textContent.trim() === "Episode") {
			getDataFilms(userSearch, "Episode");
		}
	}
});
