// ambil kelas provinsi (input[=text])
const prov = document.querySelector(".provinsi");

// ambil kelas btn (button)
const btn = document.querySelector(".btn");

// ambil kelas result
const result = document.querySelector(".result");

btn.addEventListener("click", () => {
	// ambil setiap element p pada kelas result lalu hapus element itu
	for (let i = 0; i < 4; i++) {
		// ambil element p
		const p = document.querySelector(".result p");

		// remove/hapus element p itu
		result.removeChild(p);
	}

	// request JSON from the server by using an AJAX request
	const xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function () {
		if (this.readyState == 4 && this.status == 200) {
			// data JSON akan dijadikan object
			const myObj = JSON.parse(this.responseText);

			// deklarasi lokasi yang ditemukan
			let detected_location;

			// tentukan index perulangan
			let index = 0;
			// lakukan perulangan untuk mengecek seluruh element pada list data
			myObj["data"].forEach((element) => {
				// jika element provinsi sesuai dengan yg di input user, maka:
				if (element["provinsi"] === prov.value) {
					// inisialisasi lokasi yg ditemukan
					detected_location = myObj["data"][index];
				}
				index++;
			});

			// jika lokasi tidak ditemukan
			if (detected_location === undefined) {
				// buat list string untuk mengisi result
				const str = [
					"❌Provinsi tidak ditemukan.",
					"Perhatikan penulisan provinsi",
					"&",
					'Baca "Tip" di bawah!',
				];

				// buat perulangan
				for (let i = 0; i < str.length; i++) {
					// buat element p
					const element = document.createElement("p");

					// masukkan text ke dalam element p sesuai variabel str di atas
					element.appendChild(document.createTextNode(`${str[i]}`));

					// masukkan element p ke result
					result.appendChild(element);
				}
			}
			// jika lokasi ditemukan, maka:
			else {
				// buat list keys untuk mengambil value dari detected_location
				const keys = [
					"provinsi",
					"kasusPosi",
					"kasusSemb",
					"kasusMeni",
				];

				// buat list string untuk mengisi result
				const str = [
					"🌎Provinsi",
					"😷Kasus Positif",
					"😇Kasus Sembuh",
					"💀Kasus Meninggal",
				];

				// buat perulangan
				for (let i = 0; i < keys.length; i++) {
					// buat element p
					const element = document.createElement("p");

					// masukkan text ke dalam element p sesuai variabel str dan keys yang diambil
					element.appendChild(
						document.createTextNode(
							`${str[i]}: ${detected_location[keys[i]]}`
						)
					);

					// masukkan element p ke result
					result.appendChild(element);
				}
			}
		}
	};

	xmlhttp.open(
		"GET",
		"https://indonesia-covid-19.mathdro.id/api/provinsi",
		true
	);

	xmlhttp.send();
});
