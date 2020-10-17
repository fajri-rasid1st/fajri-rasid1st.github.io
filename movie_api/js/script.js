// function untuk mengambil data film pada API
function getDataFilms(name) {
	// request API dengan menggunakan method ajax
	$.ajax({
		// url dari API
		url: `https://www.omdbapi.com/?apikey=6dcfe9e9&s=${name}`,
		// saat sukses lakukan ini
		success: (result) => {
			// ambil hasilnya, list Search berupa list dengan kumpulan objek
			const movies = result.Search;
			// jika movies tidak ada atau kosong
			if (movies === undefined) {
				// tampilkan alert
				alert("Film Not Found!");
			}
			// jika movies ada
			else {
				// display dummy text dihilangkan
				$(".dummy-text").css("display", "none");
				// deklarasikan cards kosong
				let cards = "";
				// ubah beberapa style pada main section
				$(".search-result").css("display", "block");
				// untuk setiap movie pada movies
				movies.forEach((movie) => {
					// tambahkan HTML Fragments untuk cards
					cards += cardHTMLFragments(movie);
				});
				// isi dari movie-container diisi dengan variable cards
				$(".movie-container").html(cards);
				// saat tombol show details di klick
				$(".show-details").on("click", function () {
					// request API dengan menggunakan method ajax
					$.ajax({
						// url untuk mengambil detail film
						url: `https://www.omdbapi.com/?apikey=6dcfe9e9&i=${$(
							this
						).data("imdbid")}`,
						// saat sukses lakukan
						success: (details) => {
							// tampung isi details pada variable movieDtails
							const movieDetails = modalHTMLFragments(details);
							// modal diisi dengan fragment pada movieDetails
							$(".modal-body").html(movieDetails);
						},
						// saat error lakukan
						error: (err) => {
							console.log(err.responseText);
						},
					});
				});
			}
		},
		// saat error lakukan
		error: (err) => {
			console.log(err.responseText);
		},
	});
}
// saat tombol button submit di klick
$(".submit").on("click", (e) => {
	// hilangkan aksi defaultnya
	e.preventDefault();
	// ambil value dari search input
	const userSearch = $(".search-input").val();
	// kalau inputan user tidak kosong
	if (userSearch.trim().length != 0) {
		// call the getDataFilms function
		getDataFilms(userSearch);
	}
});
// function untuk mengembalikan HTML Fragments dari card
function cardHTMLFragments(movie) {
	return `
	<div class="col-md-4 mb-5 py-0 col-result">
		<div class="card">
			<img src="${movie.Poster}" class="card-img-top" height=475/>
			<div class="card-body">
				<h6 class="card-title">${movie.Title}</h6>
				<h6 class="card-subtitle mb-2" style="opacity: 0.7; font-weight: 200">
					${movie.Year}
				</h6>
				<a href="#" class="btn btn-outline-light show-details" data-toggle="modal"
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
		<div class="row">
			<div class="col-md-3 pr-0">
				<img src="${details.Poster}" alt="${details.Poster}" class="img-fluid" style="border-radius: 5px"/>
			</div>
			<div class="col-md">
				<ul class="list-group">
					<li class="list-group-item">
						<h3>${details.Title} (${details.Year})</h3>
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
