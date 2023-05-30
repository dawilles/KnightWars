class GameAi {
	getMove(game) {
		const opponent = game.computerHero;
		if (opponent.health < 20) {
			return "defend";
		}
		if (opponent.mana < 20 || opponent.energy < 20) {
			return "wait";
		}
		if (
			(opponent.energy <= 10 && opponent instanceof Paladin) ||
			(opponent.mana <= 10 && opponent instanceof Wizard)
		) {
			if (opponent.energy < 20 && opponent instanceof Paladin) {
				return "wait";
			}
			if (opponent.mana < 20 && opponent instanceof Wizard) {
				return "wait";
			}
		}
		return "attack";
	}
}
