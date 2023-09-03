// Class responsible for the AI opponent's decision-making
class GameOpponent {
	constructor() {
		this.strategies = {
			Paladin: this.paladinStrategy,
			Wizard: this.wizardStrategy,
		};
	}
	// Determines the move for the computer opponent based on its hero type
	getMove(game) {
		const opponent = game.computerHero;
		const strategy = this.strategies[opponent.constructor.name];
		return strategy ? strategy(opponent) : this.defaultStrategy(opponent);
	}

	// Strategy when opponent is a Paladin
	paladinStrategy(opponent) {
		switch (true) {
			case opponent.health < 20:
				return "defend";
			case opponent.energy < 20:
				return "wait";
			case opponent.energy <= 10:
				return "wait";
			default:
				return "attack";
		}
	}

	// Strategy when opponent is a Wizard
	wizardStrategy(opponent) {
		switch (true) {
			case opponent.health < 30:
				return "defend";
			case opponent.mana < 20:
				return "wait";
			case opponent.mana <= 10:
				return "wait";
			default:
				return "attack";
		}
	}
	
	// Default strategy when no specific strategy is defined
	defaultStrategy(opponent) {
		switch (true) {
			case opponent.health < 20:
				return "defend";
			case opponent.mana < 20 || opponent.energy < 20:
				return "wait";
			default:
				return "attack";
		}
	}
}
