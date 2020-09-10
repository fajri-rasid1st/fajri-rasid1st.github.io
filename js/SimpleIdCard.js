// DOM Traversal, prevent Default, event bubbling
// html : index04

/*	
	DOM Traversal Method:
	- parentNode -> node
	- parentElement -> element
	- nextSibling -> node
	- nextElementSibling -> element
	- previousSibling -> node
	- previousElementSibling -> element

	DOM Prevent Default:
	- event.prefentDefault()

	DOM Event Bubbling:
	- event.stopPropagation()
*/

// id cards

// make selection to class card
let cards = document.getElementsByClassName("card");

// 1. add animation to the all profile card :
playAnimation(cards);

// make selection to add button
const addButton = document.querySelector(".add");

// select the register div
const register = document.getElementById("register");

// select the clear div
const clear = document.getElementById("clear");

// select the container div
const container = document.getElementById("container");

// 2. when we click add profile:
addButton.addEventListener("click", () => {
	// edit the register style
	register.style.display = "block";

	// edit the container style
	container.classList.add("container-blur");
});

// select name and phone number input
const names = document.getElementById("name");
const phone = document.getElementById("phone-number");

// if user select the submit button, then:
register.getElementsByTagName("button")[0].addEventListener("click", () => {
	// create parent node
	const div = document.createElement("div");
	div.classList.add("card", "cf");

	// create url of image
	const urlImage = `../css/style4/00${cards.length + 1}.png`;

	// create image element
	const image = document.createElement("img");
	image.setAttribute("src", urlImage);
	image.setAttribute("alt", `avatar-00${cards.length + 1}`);
	image.setAttribute("class", "image");

	// append image to parent
	div.appendChild(image);

	// append spans to parent
	const atr = ["name", "phone"];
	const text = [names.value, phone.value];

	for (let i = 0; i < 2; i++) {
		const span = document.createElement("span");

		span.classList.add(atr[i]);
		span.appendChild(document.createTextNode(text[i]));
		div.appendChild(span);
	}

	// create anchor element
	const a = document.createElement("a");
	a.appendChild(document.createTextNode("x"));
	a.setAttribute("href", "");
	a.setAttribute("tabindex", "-1");
	a.classList.add("close");

	// append anchor to parent
	div.appendChild(a);

	// append parent node to parent
	container.insertBefore(div, cards.length === 0 ? addButton : cards[0]);

	// refresh page
	exitButton(register, names, phone);
	playAnimation(cards);
});

// else if user select the exit button, then:
register.getElementsByTagName("button")[1].addEventListener("click", () => {
	exitButton(register, names, phone);
});

// 3. when we click close(x) button:
let element;

container.addEventListener("click", (e) => {
	if (e.target.className === "close") {
		// DOM Prefent Default Application
		e.preventDefault();

		// DOM Event Bubbling Application
		e.stopPropagation();

		// edit the clear style
		clear.style.display = "block";

		// edit the container style
		container.classList.add("container-blur");

		// inisialisasi value dari element, yaitu 'e' with class 'close'
		element = e.target;

		// if user select the remove button, then:
		clear
			.getElementsByTagName("button")[0]
			.addEventListener("click", () => {
				// DOM Traversal Application
				container.removeChild(element.parentElement);

				// refresh page
				exitButton(clear, names, phone);
				playAnimation(cards);
			});

		// else if user select the exit button, then:
		clear
			.getElementsByTagName("button")[1]
			.addEventListener("click", () => {
				exitButton(clear, names, phone);
			});
	}

	if (e.target.className === "image") {
		alert(
			`Nama   : ${e.target.nextElementSibling.textContent}\nNo. HP : ${e.target.nextElementSibling.nextElementSibling.textContent}`
		);
	}
});

function playAnimation(p) {
	let d = 0.1;

	for (let i = 0; i < p.length; i++) {
		p[i].style.animation = `card-animation 1s ease ${d}s 1 normal forwards`;
		d += 0.2;
	}
}

function exitButton(currentClass, names, phone) {
	// edit the currentClass style
	currentClass.style.display = "none";

	// edit the container style
	container.classList.remove("container-blur");

	// fill an empty name and phone number
	names.value = "";
	phone.value = "";
}
