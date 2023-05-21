const SELECTORS = {
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

const renderModule = (() => {
	const setBarWidth = (selector, value) => {
		document.querySelector(selector).style.width = `${value}%`;
	};

	const updateUI = (player, computer, playerChoice) => {
		const playerSelectors = SELECTORS[playerChoice.toUpperCase()];
		const computerSelectors =
			SELECTORS[playerChoice.toUpperCase() === "WIZARD" ? "KNIGHT" : "WIZARD"];

		setBarWidth(playerSelectors.HEALTH, player.health);
		setBarWidth(playerSelectors.ENERGY, player.energy);
		setBarWidth(playerSelectors.MANA, player.mana);

		setBarWidth(computerSelectors.HEALTH, computer.health);
		setBarWidth(computerSelectors.ENERGY, computer.energy);
		setBarWidth(computerSelectors.MANA, computer.mana);
	};

	return {
		updateUI,
	};
})();