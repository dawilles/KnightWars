const app = (() => {
	// Function to create a new game based on the player's hero choice
	const createGame = (isKnight) => {
		const paladin = new Paladin(100, 100, 100);
		const wizard = new Wizard(100, 100, 100);
		const player = isKnight ? paladin : wizard;
		const computer = isKnight ? wizard : paladin;

		// Create game instance
		const game = new Game(player, computer, {
			events: {
				onGameFinished: (isPlayerWinner) => {
					alert(
						isPlayerWinner
							? "You won! Press F5 to restart"
							: "You lost! Press F5 to restart",
					);
				},
				onTurnFinished: () => {},
			},
		});

		// Initialize UI and AI
		const render = new Render();
		const gameAi = new GameOpponent();
		render.initGameInterface(game);
		initGameEvents(game, gameAi, render);
	};

	// Initialize game hero choice buttons
	const init = () => {
		document
			.querySelector(".choice-buttons")
			.addEventListener("click", (event) => {
				if (event.target.classList.contains("choice-knight")) {
					createGame(true);
				} else if (event.target.classList.contains("choice-wizard")) {
					createGame(false);
				}
			});
	};

	// Initialize game events and interactions
	const initGameEvents = (game, gameAi, render) => {
		const getCheckedValue = (formSelector, actionName) => {
			const form = document.querySelector(formSelector);
			return form.querySelector(`input[name="${actionName}"]:checked`).value;
		};

		// Helper function to setup event listener for a form
		const setupEventListener = (selector, actionName, eventType) => {
			document.querySelector(selector).addEventListener(eventType, (event) => {
				event.preventDefault();
				const action = getCheckedValue(selector, actionName);
				const computerAction = gameAi.getMove(game);
				game.turn(action, computerAction, render);
			});
		};

		setupEventListener(".form-knight", "knight-action", "submit");
		setupEventListener(".form-mag", "mag-action", "submit");
	};

	return {
		init,
	};
})();

app.init();
