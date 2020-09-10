// DOM Final Examination
// html : index05

// image gallery

// select the thumnails
const container = document.getElementsByClassName("container")[0];

// select the main
const main = document.querySelector(".main");

// select the temporary
const temp = document.querySelector(".temp");

// select all thumbnails
const images = document.querySelectorAll(".thumb");

let index = 1;

// set interval to images animation
let mainInterval = setInterval(() => {
	// temp image chages appropriate with main image
	temp.setAttribute("src", main.getAttribute("src"));
	// main image chages appropriate with next image in list of image
	main.setAttribute("src", images[index].getAttribute("src"));
	// add class slide-in animation to main
	main.classList.add("slide-in");
	// add class slide-out animation to temp
	temp.classList.add("slide-out");
	// wait until 1s, and then remove class slide-in and out animation
	setTimeout(() => {
		main.classList.remove("slide-in");
		temp.classList.remove("slide-out");
	}, 1000);

	index++;

	if (index === 6) {
		index = 0;
	}
}, 4000);

container.addEventListener("click", (event) => {
	// stop interval when container has clicked
	clearInterval(mainInterval);

	if (event.target.classList[0] === "thumb") {
		// when thumb clicked, temp image chages appropriate with main image
		temp.setAttribute("src", main.getAttribute("src"));
		// when thumb clicked, main image chages appropriate with thumb image
		main.setAttribute("src", event.target.getAttribute("src"));
		// add class slide-in animation to main
		main.classList.add("slide-in");
		// add class slide-out animation to temp
		temp.classList.add("slide-out");

		// wait until 1s, and then remove class slide-in and out animation
		setTimeout(() => {
			main.classList.remove("slide-in");
			temp.classList.remove("slide-out");
		}, 1000);
		// before activating the thumb, turn off the other thumbs
		document.querySelectorAll(".thumb").forEach((e) => {
			e.classList.remove("active");
		});
		// activating the thumb
		event.target.classList.add("active");
	}
});
