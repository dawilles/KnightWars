const IA = (() => {
	let opponent;

	const setOpponent = (opponentHero) => {
		opponent = opponentHero;
	};

	const getMove = () => {
		if (opponent.health < 20) {
			return "defend";
		} else if (opponent.mana < 20 || opponent.energy < 20) {
			return "wait";
		} else {
			return "attack";
		}
	};

	return {
		setOpponent,
		getMove,
	};
})();
