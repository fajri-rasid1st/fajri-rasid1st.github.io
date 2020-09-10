// DOM Exercise
// html : index03

// paper-rock-scissors game

// determine the computer choice
const computerChoice = () => {
	let choice = Math.random();

	if (choice < 0.34) return "paper";
	if (choice >= 0.34 && choice <= 0.67) return "rock";
	return "scissors";
};

// determine the result
const battle = (computer, player) => {
	if (computer === player) return "Draw!";
	if (computer === "paper")
		return player === "rock" ? "you lose!" : "you win!";
	if (computer === "rock")
		return player === "scissors" ? "you lose!" : "you win!";
	if (computer === "scissors")
		return player === "paper" ? "you lose!" : "you win!";
};

// take the player choice
const playerChoice = document.querySelectorAll("ul li img");

playerChoice.forEach((element) => {
	element.addEventListener("click", () => {
		const computer = computerChoice();
		const player = element.className;
		const result = battle(computer, player);

		// take the class computer in HTML
		const computerImage = document.querySelector(".computer");
		// paused the computer animation move
		computerImage.style.animation = "none";

		// call the Random Computer Image method
		randomCompImage(computerImage);

		setTimeout(() => {
			// set the image of computer appropriate with computer choice
			computerImage.style.backgroundImage = `url(../css/style3/${computer}.png)`;
			// append the result to the class result in HTML
			document.querySelector(".result").innerHTML = result;
		}, 1500);
	});
});

// make a function to change the computer image every a milisecond
function randomCompImage(cImage) {
	// create a list for image names
	const images = ["paper.png", "rock.png", "scissors.png"];
	// index
	let i = 0;
	// start time
	const startTime = new Date().getTime();

	setInterval(() => {
		if (new Date().getTime() - startTime > 1500) {
			clearInterval;
			return;
		}

		cImage.style.backgroundImage = `url(../css/style3/${images[i]})`;
		i++;

		if (i === 3) {
			i = 0;
		}
	}, 100);
}
