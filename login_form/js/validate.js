// Mekanisme Login
// dengarkan event pada button submit
$(document).ready(function () {
	$(".submit").on("click", (e) => {
		// hilangkan event default dari button
		e.preventDefault();
		// select element input username dan password
		let username = $(".username");
		let password = $(".password");

		$.ajax({
			url: "./js/account.json",
			success: (result) => {
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
					child[1].innerHTML =
						"Login Successfully <br /> please wait...";
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
});
