class Render {
	constructor() {
		this.selectors = {
			KNIGHT: {
				HEALTH: ".knight-health",
				ENERGY: ".knight-energy",
				MANA: ".knight-mana",
			},
			WIZARD: {
				HEALTH: ".mag-health",
				ENERGY: ".mag-energy",
				MANA: ".mag-mana",
			},
		};
	}
	initGameInterface(game) {
		const hideElement = (selector) => {
			document.querySelector(selector).style.display = "none";
		};

		const showElement = (selector) => {
			document.querySelector(selector).style.display = "block";
		};

		if (game.playerHero.name === "paladin") {
			hideElement(".choice-hero");
			showElement(".form-knight");
		} else {
			hideElement(".choice-hero");
			showElement(".form-mag");
		}
		this.updateUI(
			game.playerHero,
			game.computerHero,
			game.playerHero.name === "paladin" ? "knight" : "wizard",
		);
	}

	setBarWidth(selector, value) {
		document.querySelector(selector).style.width = `${value}%`;
	}
	updateUI(player, computer, playerChoice) {
		const playerSelectors = this.selectors[playerChoice.toUpperCase()];
		const computerSelectors =
			this.selectors[
				playerChoice.toUpperCase() === "WIZARD" ? "KNIGHT" : "WIZARD"
			];

		this.setBarWidth(playerSelectors.HEALTH, player.health);
		this.setBarWidth(playerSelectors.ENERGY, player.energy);
		this.setBarWidth(playerSelectors.MANA, player.mana);

		this.setBarWidth(computerSelectors.HEALTH, computer.health);
		this.setBarWidth(computerSelectors.ENERGY, computer.energy);
		this.setBarWidth(computerSelectors.MANA, computer.mana);
	}
}
