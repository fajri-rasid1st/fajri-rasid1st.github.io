// Mekanisme Login
// dengarkan event pada button submit
$(".submit").on("click", (e) => {
	// hilangkan event default dari button
	e.preventDefault();
	// select element input username dan password
	let username = $(".username");
	let password = $(".password");

	$.ajax({
		url: "./js/account.json",
		success: (result) => {
			// isi file json dalam bentuk array[object]
			const accounts = result.data;
			// select section login modal
			const loginModal = document.querySelector(".login-modal");
			// select anak dari section login modal (class="modal")
			const modalChild = loginModal.firstElementChild;
			// cek setiap element pada list accounts
			const validData = accounts.filter((user) => {
				return (
					username.val() === user.username &&
					password.val() === user.pass
				);
			});
			// jika condition bernilai true, maka
			if (validData.length === 1) {
				// anak-anak dari modalChild
				const child = modalChild.children;
				// menghapus nama class fa-times-circle pada anak ke 1 (element i)
				child[0].classList.remove("fa-times-circle");
				// tambahkan class fa-check-circle
				child[0].classList.add("fa-check-circle");
				// ubah text dari anak ke 2 (element h3)
				child[1].innerHTML = "Login Successfully <br /> please wait...";
				// hilangkan tombol button (anak ke 3, element button)
				modalChild.removeChild(child[2]);
				// ubah display loginModal menjadi flex
				loginModal.style.display = "flex";
				// beri animasi pada modalChild
				modalChild.style.animation =
					"modal-animation 0.5s ease forwards";
				// efek display none pada loginModal sebelum meninggalkan halaman login page
				setTimeout(() => (loginModal.style.display = "none"), 3000);
				// efek opacity 0 pada body sebelum meninggalkan halaman login page
				document.body.style.animation =
					"body-animation 1s 4s ease forwards";
				// tunggu 5 detik...
				setTimeout(() => {
					// arahkan ke link berikut
					window.open(
						"https://fajri-rasid1st.github.io/portfolio_web/html/index.html",
						"_self"
					);
				}, 5000);
			}
			// jika condition false, maka
			else {
				// reset inputan
				username.val("");
				password.val("");
				// ubah display loginModal menjadi flex
				loginModal.style.display = "flex";
				// beri animasi pada modalChild
				modalChild.style.animation =
					"modal-animation 0.5s ease forwards";
				// Modal
				$(".modal-button").on("click", () => {
					// ubah display loginModal menjadi none
					loginModal.style.display = "none";
				});
			}
		},
	});
});

/*
 *
 *
 */

// Style show and hide password
// select class "fas toggle"
const eye = document.querySelector(".fas.toggle");
// select class "password"
const password = document.getElementById("password");
// saat element dengan class eye di klik
$(".fas.toggle").on("click", () => {
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
// saat semua bagian dari parent di klik
$("form").on("focusin", (event) => {
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
