const TARGET_SCORE = 100;

var scores,
	roundScore,
	activePlayer,
	diceRoll,
	winner = 0;

let initGame = () => {

	document.querySelector(".btn-roll").style.display = "block";
	document.querySelector(".btn-hold").style.display = "block";

	document.querySelector("#current-0").textContent = 0;
	document.querySelector("#current-1").textContent = 0;

	document.querySelector("#score-0").textContent = 0;
	document.querySelector("#score-1").textContent = 0;

	document.querySelector(".player-0-panel").classList.add("active");
	document.querySelector(".player-1-panel").classList.remove("active");

	document
		.querySelector(".player-" + winner + "-panel")
		.classList.remove("winner");
	document.querySelector(
		".player-" + winner + "-panel" + " .player-name"
	).textContent = "PLAYER " + (winner + 1);

	scores = [0, 0];
	roundScore = 0;

	activePlayer = 0;
	diceRoll = 0;
	winner = 0;
};

let changeActivePlayer = () => {
	document

		.querySelector(".player-" + activePlayer + "-panel")
		.classList.remove("active");

	roundScore = 0;

	document.querySelector("#current-" + activePlayer).textContent = roundScore;

	activePlayer = activePlayer == 0 ? 1 : 0;

	document
		.querySelector(".player-" + activePlayer + "-panel")
		.classList.add("active");
};

let rollDice = (diceID) => {

	var diceRoll = Math.floor(Math.random() * 6) + 1;

	document.querySelector(".dice-"+diceID).src = "dice-" + diceRoll + ".png";

	diceRoll == 1 ? changeActivePlayer() : (roundScore += diceRoll);

}

/*********************************************/

initGame();

document.querySelector(".btn-new").addEventListener("click", initGame);

document.querySelector(".btn-roll").addEventListener("click", () => {
	
	rollDice(1);
	rollDice(2);

	console.log('roundScore :', roundScore);

	document.querySelector("#current-" + activePlayer).textContent = roundScore;

});

document.querySelector(".btn-hold").addEventListener("click", () => {

	scores[activePlayer] += roundScore;

	document.querySelector("#score-" + activePlayer).textContent =
			scores[activePlayer];

	if (scores[activePlayer] >= TARGET_SCORE) {
		document
			.querySelector(".player-" + activePlayer + "-panel")
			.classList.add("winner");
		document.querySelector(
			".player-" + activePlayer + "-panel" + " .player-name"
		).textContent = "WINNER!";

		winner = activePlayer;

		document.querySelector(".btn-roll").style.display = "none";
		document.querySelector(".btn-hold").style.display = "none";

	} else {

		changeActivePlayer();
	}
});
