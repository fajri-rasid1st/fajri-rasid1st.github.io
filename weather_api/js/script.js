// halaman utama dikosongkan dulu
$(".success").hide();
$(".error").hide();

// lokasi yang dicari user
let currentLocation;

// akses lokasi saat memencet tombol lokasi
$("#btn-location").on("click", function () {
	$("#search-input").val("");
	getUserLocation();
});

// fitur pencarian lokasi dengan live searching
$("#search-input").on("keyup", function () {
	$("#search-result").html("");

	let searchText = $("#search-input").val();
	let expression = new RegExp(`${searchText}`, "i");

	$.getJSON(
		"https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json",
		function (data) {
			$.each(data, function (_, value) {
				if (
					value.propinsi.search(expression) != -1 ||
					value.kota.search(expression) != -1 ||
					value.kecamatan.search(expression) != -1
				) {
					if (searchText.trim() != "") {
						$("#search-result").append(
							`<li
								class="list-group-item text-left"
								id="data-search"
								data-locationid=${value.id}
								data-lat=${value.lat}
								data-lon=${value.lon}
							>
								Prov. ${value.propinsi}, ${value.kota}, Kec. ${value.kecamatan}
							</li >`
						);
					}
				}
			});

			if ($("#search-result").html() == "" && searchText.trim() != "") {
				$("#search-result").append(
					`<li class="list-group-item text-left" id="data-search">
						Lokasi tidak ditemukan!
					</li>`
				);
			}

			document.querySelectorAll("#data-search").forEach((e) => {
				e.addEventListener("click", function () {
					if (this.dataset.locationid) {
						currentLocation = this;
						$("#search-input").val(
							currentLocation.innerHTML.trim()
						);
						$("#search-result").html("");
					}
				});
			});
		}
	);
});

// function saat tombol 'cari prakiraan cuaca' di klick
$("#btn-weather").on("click", function () {
	if ($("#search-input").val().trim() != "") {
		$(".error").fadeOut(500);
		try {
			getWilayah(
				currentLocation.dataset.lat,
				currentLocation.dataset.lon
			);
		} catch (error) {
			console.log(error.message);
		}
	}
});

// function untuk memperoleh lokasi user sekaligus cari prakiraan cuaca dari lokasi itu
function getUserLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function (position) {
				$(".error").fadeOut(500);
				getWilayah(position.coords.latitude, position.coords.longitude);
			},
			function () {
				locationNotFound();
			}
		);
	} else {
		locationNotFound();
	}
}

// function untuk memperoleh wilayah saat ini, wilayah terdekat, dan prakiraan cuaca
function getWilayah(lat, lon) {
	// munculkan informasi lokasi
	$(".success").fadeIn(500);
	// ambil data dari json
	$.getJSON(
		// url json
		"https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json",
		// jika sukses, jalankan function ini
		function (data) {
			// deklarasi awal list lokasi terdekat
			let items = [];
			// tambahkan properti 'distance' pada tiap-tiap data
			for (let i = 0; i < data.length; i++) {
				data[i].distance = distance(
					Number(lat),
					Number(lon),
					Number(data[i].lat),
					Number(data[i].lon)
				);
			}
			// urutkan data berdasarkan jaraknya dari wilayah yang akan dicari cuacanya
			data.sort((a, b) => a.distance - b.distance);
			// teks informasi lokasi
			$(".current-location").html(
				`<h5>
					Lokasi : Prov. ${data[0].propinsi}, ${data[0].kota}, Kec. ${data[0].kecamatan}
					(${data[0].distance.toFixed(2)} km)
				</h5>
				<h5>Prakiraan cuaca untuk beberapa hari ke depan : </h5>`
			);
			// element pertama dari items
			items.push(
				`<h4 class="mb-2">Lokasi terdekat dari ${data[0].kecamatan} : </h4>`
			);
			// ambil 5 wilayah terdekat dari lokasi user
			for (let i = 1; i < 6; i++) {
				items.push(locationHTMLFragment(data[i]));
			}
			// isi html untuk list wilayah terdekat
			$("#list-nearest-location").html(items.join(""));
			// ambil data prakiraan cuaca dari data pertama setelah diurutkan
			getCuaca(data[0].id);
		}
	);
}

// function untuk memperoleh data cuaca berdasarkan id wilayah
function getCuaca(idWilayah) {
	// munculkan informasi lokasi
	$(".success").fadeIn(500);
	// ambil data dari json
	$.getJSON(
		// url json
		`https://ibnux.github.io/BMKG-importer/cuaca/${idWilayah}.json`,
		// jika sukses, jalankan function ini
		function (data) {
			// deklarasi isi list dari kondisi cuaca
			let items = [];
			// isi items dengan semua kondisi cuaca
			for (let i = 0; i < data.length; i++) {
				items.push(weatherHTMLFragment(data[i]));
			}
			// masukkan ke dalam tag/element dengan id 'list weather'
			$("#list-weather").html(items.join(""));
		}
	);
}

// function untuk mengukur jarak dari satu lokasi tertentu ke lokasi lainnya
function distance(lat1, lon1, lat2, lon2) {
	const radlat1 = (Math.PI * lat1) / 180;
	const radlat2 = (Math.PI * lat2) / 180;
	const theta = lon1 - lon2;
	const radtheta = (Math.PI * theta) / 180;

	let dist =
		Math.sin(radlat1) * Math.sin(radlat2) +
		Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

	dist = Math.acos(dist);
	dist = (dist * 180) / Math.PI;
	dist = dist * 60 * 1.1515;

	let result = isNaN(Math.round(dist * 1.609344 * 1000) / 1000);

	return result ? 0 : Math.round(dist * 1.609344 * 1000) / 1000;
}

// function untuk menampilkan error jika lokasi tidak ditemukan
function locationNotFound() {
	$(".success").fadeOut(500);
	$(".error").fadeIn(500);
}

// HTML fragment untuk card dari cuaca yang dicari
function weatherHTMLFragment(data) {
	return `<div class="col-md-3 weather-col mb-4">
				<div class="card weather-card text-center">
					<div class="card-img">
						<img
							src="img/${data.kodeCuaca}.svg"
							class="card-img-top py-4 px-2"
						>
					</div>
					<div class="card-body">
						<h4 class="card-title mb-1">${data.tempC}<sup>&#176;</sup></h4>
						<h5 class="card-title mb-2">${data.cuaca}</h5>
						<p class="card-text">${data.jamCuaca}</p>
					</div>
				</div>
			</div>`;
}

// HTML fragment untuk list lokasi terdekat
function locationHTMLFragment(data) {
	return `<li
				class="list-group-item d-flex justify-content-between align-items-center info"
				data-locationId="${data.id}"	
			>
				Prov. ${data.propinsi}, ${data.kota}, Kec. ${data.kecamatan}
				<span class="badge badge-info p-2">
					&#177; ${data.distance.toFixed(2)} km
				</span>
			</li >`;
}
