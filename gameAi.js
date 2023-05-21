const gameAi = (() => {
	let opponent;
	let self;
	const setOpponent = (opponentHero, selfHero) => {
		opponent = opponentHero;
		self = selfHero;
	};

	const getMove = () => {
		if (opponent.health < 20) {
			return "defend";
		} else if (opponent.mana < 20 || opponent.energy < 20) {
			return "wait";
		} else if (
			(self.energy <= 10 && self instanceof Heroes.Paladin) ||
			(self.mana <= 10 && self instanceof Heroes.Magician)
		) {
			if (self.energy < 20 && self instanceof Heroes.Paladin) {
				return "wait";
			} else if (self.mana < 20 && self instanceof Heroes.Magician) {
				return "wait";
			}
		} else {
			return "attack";
		}
	};

	return {
		setOpponent,
		getMove,
	};
})();
