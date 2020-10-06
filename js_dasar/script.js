const result = document.getElementsByTagName("textarea")[0];

function nomorSatu() {
	// nomor 1
	result.innerHTML = "";

	let count = 0;
	let sum = 0;

	const num = prompt("masukkan deret angka (dipisahkan oleh spasi) : ")
		.split(" ")
		.map((element) => parseInt(element));

	for (let i = 0; i < num.length; i++) {
		sum += num[i];
		count++;
	}

	// cetak array
	result.innerHTML += `${num.join(" + ")}\n`;
	// cetak sum
	result.innerHTML += `Total: ${sum}\n`;
	// cetak average
	result.innerHTML += `Rata-rata: ${sum / count}`;
}

function nomorDua() {
	// nomor 2
	result.innerHTML = "";

	const n = parseInt(prompt("masukkan nilai N: "));

	for (let i = 1; i <= n; i++) {
		if (i % 2 === 0) {
			result.innerHTML += `${i} adalah angka genap\n`;
		} else {
			result.innerHTML += `${i} adalah angka ganjil\n`;
		}
	}
}

function nomorTiga() {
	// nomor 3
	result.innerHTML = "";

	let sum = 0;

	const n = parseInt(prompt("masukkan nilai N: "));

	for (let i = 1; i <= n; i++) {
		sum += i;
		result.innerHTML += i !== n ? `${i} + ` : `${i}`;
	}

	// cetak sum
	result.innerHTML += `\nTotal: ${sum}`;
}

function nomorEmpat() {
	// nomor 4
	result.innerHTML = "";

	let sum = 1;
	let term = 1;

	const n = parseInt(prompt("masukkan nilai N: "));
	const x = parseInt(prompt("masukkan nilai X: "));

	result.innerHTML += "1 ";

	for (let i = 1; i <= n; i++) {
		term = -term * x;
		sum += term;

		result.innerHTML += i % 2 === 1 ? `- ${x}^${i} ` : `+ ${x}^${i} `;
	}

	// cetak sum
	result.innerHTML += `\nHasil = ${sum}`;
}

function nomorLima() {
	// nomor 5
	result.innerHTML = "";

	const num = parseInt(prompt("masukkan nilai NUM: "));

	for (let i = 1; i <= 10; i++) {
		result.innerHTML += `${i} * ${num} = ${i * num}\n`;
	}
}

function nomorEnam() {
	// nomor 6
	result.innerHTML = "";

	let a = 0;
	let b = 1;

	const n = parseInt(prompt("masukkan nilai N: "));

	result.innerHTML += `${a} ${b}, `;

	for (let i = 2; i < n; i++) {
		const next = a + b;

		result.innerHTML += i !== n - 1 ? `${next}, ` : `${next}.`;

		a = b;
		b = next;
	}
}

function nomorTujuh() {
	// nomor 7
	result.innerHTML = "";

	const num = parseInt(prompt("masukkan nilai NUM: "));

	const r = Math.sqrt(num);

	for (let i = 2; i <= num; i++) {
		if (i > r) {
			result.innerHTML += `${num} adalah bilangan prima`;
			break;
		}

		if (num % i === 0) {
			result.innerHTML += `${num} bukan bilangan prima`;
			break;
		}
	}
}

function nomorDelapan() {
	// nomor 8
	result.innerHTML = "";

	let fact = 1;

	const n = parseInt(prompt("masukkan nilai N: "));

	for (let ctrl = 1; ctrl <= n; ctrl++) {
		fact *= ctrl;

		result.innerHTML += ctrl === n ? `${ctrl}` : `${ctrl} * `;
	}

	result.innerHTML += `\nHasil = ${fact}`;
}
