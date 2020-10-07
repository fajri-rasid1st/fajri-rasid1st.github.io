// Style show and hide password
// select class "fas toggle"
const eye = document.querySelector(".fas.toggle");
// select class "password"
const password = document.getElementById("password");
// saat element dengan class eye di klik
eye.addEventListener("click", () => {
	// jika classList eye yang ada pada index ke 2 = "fa-eye-slash"
	if (Array.from(eye.classList)[2] === "fa-eye-slash") {
		// ganti type input menjadi text agar password kelihatan
		password.type = "text";
		// hapus class/icon fa-eye-slash
		eye.classList.remove("fa-eye-slash");
		// tambahkan class/icon fa-eye
		eye.classList.add("fa-eye");
	}
	// jika classList eye yang ada pada index ke 2 != "fa-eye-slash"
	else {
		// ganti type input menjadi password agar password tidak kelihatan
		password.type = "password";
		// hapus class/icon fa-eye
		eye.classList.remove("fa-eye");
		// tambahkan class/icon fa-eye-slash
		eye.classList.add("fa-eye-slash");
	}
});

/*
 *
 *
 */

// Style garis pada input
// select element form
const parent = document.getElementsByTagName("form")[0];
// saat semua bagian dari parent di klik
parent.addEventListener("focusin", (event) => {
	// select semua element dengan class "line"
	const mainLine = document.querySelectorAll(".line");
	// jika element yang di click memiliki class "username" pada index ke-1 dari classlistnya, maka:
	if (event.target.classList[1] === "username") {
		// select class "line first"
		const line = document.querySelector(".line.first");
		// beri animasi
		line.style.animation = "input-animation 0.6s ease forwards";
	}
	// jika element yang di click memiliki class "password" pada index ke-1 dari classlistnya, maka:
	else if (event.target.classList[1] === "password") {
		// select class "line second"
		const line = document.querySelector(".line.second");
		//beri animasi
		line.style.animation = "input-animation 0.6s ease forwards";
	}
	// tunggu 0.5s, kemudian value animation dari semua line diubah menjadi none, agar
	// animasi bisa berjalan lagi ketika user kembali mengklik input username/password
	setTimeout(() => {
		mainLine.forEach((element) => {
			element.style.animation = "none";
		});
	}, 600);
});

/*
 *
 *
 */

// Mekanisme Login
// these are some valid account (in object)
const accounts = [
	{
		username: "admin",
		password: "admin",
	},
	{
		username: "fajrirasid1st",
		password: "qwerty",
	},
	{
		username: "qwerty123",
		password: "qwerty123",
	},
];
// select element button submit
const button = document.querySelector(".submit");
// select section login notification
const notif = document.querySelector(".login-notification");
// select anak dari section login notification (class="notif")
const notifChild = notif.firstElementChild;
// dengarkan event pada button submit
button.addEventListener("click", (e) => {
	// hilangkan event default dari button
	e.preventDefault();
	// deklarasi variabel condition
	let condition;
	// select element input dengan class input-user
	const data = document.getElementsByClassName("input-user");
	// cek setiap element pada list accounts
	accounts.forEach((user) => {
		// jika data valid, maka
		if (
			data[0].value === user.username &&
			data[1].value === user.password
		) {
			// beri nilai true pada condition
			condition = true;
		}
	});
	// jika condition bernilai true, maka
	if (condition) {
		// anak-anak dari notifChild
		const child = notifChild.children;
		// menghapus nama class fa-times-circle pada anak ke 1 (element i)
		child[0].classList.remove("fa-times-circle");
		// tambahkan class fa-check-circle
		child[0].classList.add("fa-check-circle");
		// ubah text dari anak ke 2 (element h3)
		child[1].innerHTML = "Login Successfully <br /> please wait...";
		// hilangkan tombol button (anak ke 3, element button)
		notifChild.removeChild(child[2]);
		// ubah display notif menjadi flex
		notif.style.display = "flex";
		// beri animasi pada notifChild
		notifChild.style.animation = "notif-animation 0.4s ease forwards";
		// efek display none pada notif sebelum meninggalkan halaman login page
		setTimeout(() => (notif.style.display = "none"), 3000);
		// efek opacity 0 pada body sebelum meninggalkan halaman login page
		document.body.style.animation = "body-animation 1s 4s ease forwards";
		// tunggu 5 detik...
		setTimeout(() => {
			// arahkan ke link berikut
			window.open("https://fajri-rasid1st.github.io/", "_self");
		}, 5000);
	}
	// jika condition false, maka
	else {
		// ubah display notif menjadi flex
		notif.style.display = "flex";
		// beri animasi pada notifChild
		notifChild.style.animation = "notif-animation 0.4s ease forwards";
	}
});
// Notifikasi
const notifButton = document.querySelector(".notif-button");
// dengarkan event pada button notifikasi
notifButton.addEventListener("click", () => {
	// ubah display notif menjadi none
	notif.style.display = "none";
});
