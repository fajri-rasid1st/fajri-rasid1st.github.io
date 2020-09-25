// ambil kelas provinsi (input[=text])
const prov = document.querySelector(".provinsi");

// ambil kelas btn (button)
const btn = document.querySelector(".btn");

// ambil kelas result
const result = document.querySelector(".result");

btn.addEventListener("click", () => {
	// ambil setiap element p pada kelas result lalu hapus
	for (let i = 0; i < 4; i++) {
		const p = document.querySelector(".result p");
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

			let index = 0;
			// lakukan perulangan untuk mengecek seluruh element pada list data
			myObj["data"].forEach((element) => {
				// jika element provinsi sesuai dengan yg di input user
				if (element["provinsi"] === prov.value) {
					// inisialisasi lokasi yg ditemukan
					detected_location = myObj["data"][index];
				}
				index++;
			});

			if (detected_location === undefined) {
				const str = [
					"❌Provinsi tidak ditemukan",
					"perhatikan penulisan provinsi",
					"dan",
					'baca "Tip" di bawah!',
				];

				for (let i = 0; i < str.length; i++) {
					const element = document.createElement("p");
					element.appendChild(document.createTextNode(`${str[i]}`));
					result.appendChild(element);
				}
			} else {
				const keys = [
					"provinsi",
					"kasusPosi",
					"kasusSemb",
					"kasusMeni",
				];
				const str = [
					"🌎Provinsi",
					"😷Kasus Positif",
					"😇Kasus Sembuh",
					"💀Kasus Meninggal",
				];
				for (let i = 0; i < keys.length; i++) {
					const element = document.createElement("p");
					element.appendChild(
						document.createTextNode(
							`${str[i]}: ${detected_location[keys[i]]}`
						)
					);
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
