const DEFAULT_EVENTS = {
	onGameFinished: () => {},
	onTurnFinished: () => {},
};

class Game {
	constructor(playerHero, computerHero, options) {
		this.options = Object.assign({}, DEFAULT_EVENTS, options);
		this.isGameFinished = false;
		this.playerHero = playerHero;
		this.computerHero = computerHero;
	}

	// Handle actions and return the damage dealt by the hero
	makeTurnAndGetDamage(action, hero) {
		switch (action) {
			case "attack":
				return hero.attack();
			case "defend":
				hero.defend();
				return 0;
			case "wait":
				hero.wait();
				return 0;
			default:
				console.error(`Wrong action ${action}`);
				break;
		}
	}

	// Determine the winner based on the current health of heroes
	determineWinner() {
		return {
			isGameFinished:
				this.playerHero.health <= 0 || this.computerHero.health <= 0,
			isPlayerWinner: this.playerHero.health > this.computerHero.health,
		};
	}

	// Execute a turn in the game
	turn(playerAction, computerAction, render) {
		const playerDamage = this.makeTurnAndGetDamage(
			playerAction,
			this.playerHero,
		);
		const computerDamage = this.makeTurnAndGetDamage(
			computerAction,
			this.computerHero,
		);

		this.playerHero.hurt(computerDamage);
		this.computerHero.hurt(playerDamage);
		this.playerHero.defenseMode = false;
		this.computerHero.defenseMode = false;

		const { isGameFinished, isPlayerWinner } = this.determineWinner();

		// Check if the game has finished and call the corresponding event
		if (isGameFinished) {
			this.options.events.onGameFinished(isPlayerWinner);
			return true;
		}

		// Update the UI
		render.updateUI(
			this.playerHero,
			this.computerHero,
			this.playerHero instanceof Paladin ? "knight" : "wizard",
		);

		return false;
	}
}
