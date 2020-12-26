// default location information
$(".success").hide();
$(".error").hide();

// default location
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
						$("#search-result").html(
							`<li
								class="list-group-item text-left"
								id="data-search"
								data-locationid="${value.id}"
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
				$("#search-result").html(
					`<li class="list-group-item text-left" id="data-search">
						Lokasi tidak ditemukan!
					</li>`
				);
			}

			$("#data-search").on("click", function () {
				if ($(this).data("locationid")) {
					currentLocation = $(this);
					$("#search-input").val(currentLocation.html().trim());
					$("#search-result").html("");
				}
			});
		}
	);
});

$("#btn-weather").on("click", function () {
	$(".error").fadeOut(500);
	getWilayah(currentLocation.data("lat"), currentLocation.data("lon"));
});

// function untuk mendapatkan wilayah saat ini dan juga beberapa wilayah terdekat
function getWilayah(lat, lon) {
	// munculkan informasi lokasi
	$(".success").fadeIn(500);
	// ambil data dari json
	$.getJSON(
		// url json
		"https://ibnux.github.io/BMKG-importer/cuaca/wilayah.json",
		// jika sukses, jalankan function ini
		function (data) {
			// declarate nearest location
			let items = [];
			// adding distance property for each element in data
			for (let i = 0; i < data.length; i++) {
				data[i].distance = distance(lat, lon, data[i].lat, data[i].lon);
			}
			// sorting data by distance
			data.sort((a, b) => a.distance - b.distance);

			// title of current location
			$(".current-location").html(
				`<h5>
					Lokasi : Prov. ${data[0].propinsi}, ${data[0].kota}, Kec. ${data[0].kecamatan}
					(${data[0].distance.toFixed(2)} km)
				</h5>
				<h5>Prakiraan cuaca untuk beberapa hari ke depan : </h5>`
			);
			// first item of items
			items.push(
				`<h4 class="mb-2">Lokasi terdekat dari ${data[0].kecamatan} : </h4>`
			);
			// get five nearest distance from user
			for (let i = 1; i < 6; i++) {
				items.push(locationHTMLFragment(data[i]));
			}
			// set inner html for list of nearest location
			$("#list-nearest-location").html(items.join(""));
			// get weather from first location
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
			// declarate empty list as weather
			let items = [];
			// get all weather condition
			for (let i = 0; i < data.length; i++) {
				items.push(weatherHTMLFragment(data[i]));
			}
			// set inner html for list weather
			$("#list-weather").html(items.join(""));
		}
	);
}

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

	return Math.round(dist * 1.609344 * 1000) / 1000;
}

// function untuk memperoleh lokasi user
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

function weatherHTMLFragment(data) {
	return `<div class="col-md-3 weather-col mb-4">
				<div class="card weather-card text-center">
					<div class="card-img">
						<img
							src="../img/${data.kodeCuaca}.svg"
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

function locationNotFound() {
	$(".success").fadeOut(500);
	$(".error").fadeIn(500);
}
