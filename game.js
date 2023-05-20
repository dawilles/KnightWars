const Game = (() => {
	let player;
	let computer;
	let playerChoice;

	const start = (choice) => {
		playerChoice = choice;
		player =
			choice === "knight"
				? new Heroes.Paladin(100, 100, 100)
				: new Heroes.Magician(100, 100, 100);
		computer =
			choice === "knight"
				? new Heroes.Magician(100, 100, 100)
				: new Heroes.Paladin(100, 100, 100);
		IA.setOpponent(player);
	};

	const turn = (action) => {
		let playerDamage = player[action]();
		let computerMove = IA.getMove();
		let computerDamage = computer[computerMove]();

		if (action === "attack" && computerMove !== "defend") {
			computer.hurt(playerDamage);
		}

		if (computerMove === "attack" && action !== "defend") {
			player.hurt(computerDamage);
		}

		Render.updateUI(player, computer, playerChoice);
		
		console.log(
			`Player (Health: ${player.health}, Energy: ${player.energy}, Mana: ${player.mana})`,
		);
		console.log(
			`Computer (Health: ${computer.health}, Energy: ${computer.energy}, Mana: ${computer.mana})`,
		);

		if (player.health <= 0) {
			alert("Player lost the game!");
		} else if (computer.health <= 0) {
			alert("Computer lost the game!");
		}
	};

	return {
		start,
		turn,
	};
})();
