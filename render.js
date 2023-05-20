const selectors = {
	knight: {
		health: ".knight-health",
		energy: ".knight-energy",
		mana: ".knight-mana",
	},
	wizard: {
		health: ".mag-health",
		energy: ".mag-energy",
		mana: ".mag-mana",
	},
};

const Render = (() => {
	const setBarWidth = (selector, value) => {
		document.querySelector(selector).style.width = `${value}%`;
	};

	const updateUI = (player, computer, playerChoice) => {
		console.log("Player choice in updateUI:", playerChoice);

		const playerSelectors = selectors[playerChoice];
		const computerSelectors =
			selectors[playerChoice === "knight" ? "wizard" : "knight"];

		setBarWidth(playerSelectors.health, player.health);
		setBarWidth(playerSelectors.energy, player.energy);
		setBarWidth(playerSelectors.mana, player.mana);

		setBarWidth(computerSelectors.health, computer.health);
		setBarWidth(computerSelectors.energy, computer.energy);
		setBarWidth(computerSelectors.mana, computer.mana);
	};

	return {
		updateUI,
	};
})();
