const gameModule = (() => {
	let player;
	let computer;
	let playerChoice;

	const start = (choice) => {
		playerChoice = choice;
		switch (choice) {
			case "knight":
				player = new Heroes.Paladin(100, 100, 100, true);
				computer = new Heroes.Magician(100, 100, 100, false);
				break;
			default:
				player = new Heroes.Magician(100, 100, 100, true);
				computer = new Heroes.Paladin(100, 100, 100, false);
		}
		gameAi.setOpponent(player, computer);
		renderModule.updateUI(player, computer, playerChoice);
	};

	const turn = (action) => {
		const playerDamage = player[action]();
		const computerMove = gameAi.getMove();
		const computerDamage = computer[computerMove]();

		if (action === "attack" && computerMove !== "defend") {
			computer.hurt(playerDamage);
		}

		if (computerMove === "attack" && action !== "defend") {
			player.hurt(computerDamage);
		}

		renderModule.updateUI(player, computer, playerChoice);

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
		return {
			playerStatus: {
				health: player.health,
				energy: player.energy,
				mana: player.mana,
			},
			computerStatus: {
				health: computer.health,
				energy: computer.energy,
				mana: computer.mana,
			},
		};
	};

	return {
		start,
		turn,
	};
})();
