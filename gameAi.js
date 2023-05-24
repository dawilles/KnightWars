class GameAi {
	getMove(opponent) {
		if (opponent.health < 20) {
			return "defend";
		} else if (opponent.mana < 20 || opponent.energy < 20) {
			return "wait";
		} else if (
			(opponent.energy <= 10 && opponent instanceof Paladin) ||
			(opponent.mana <= 10 && opponent instanceof Wizard)
		) {
			if (opponent.energy < 20 && opponent instanceof Paladin) {
				return "wait";
			} else if (opponent.mana < 20 && opponent instanceof Wizard) {
				return "wait";
			}
		} else {
			return "attack";
		}
	}
}