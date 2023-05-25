const app = (() => {
	const init = () => {
		const render = new Render();
		const gameAi = new GameAi();
		const createGame = (isKnight) => {
			const paladin = new Paladin(100, 100, 100);
			const wizard = new Wizard(100, 100, 100);
			const player = isKnight ? paladin : wizard;
			const computer = isKnight ? wizard : paladin;

			const game = new Game(player, computer, {
				events: {
					onGameFinished: () => {
						alert("Finished");
					},
					onTurnFinished: () => {},
				},
			});
			render.initGameInterface(game);
			initGameEvents(game, gameAi, render);
		};

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

	const initGameEvents = (game, gameAi, render) => {
		const getCheckedValue = (formSelector, actionName) => {
			const form = document.querySelector(formSelector);
			return form.querySelector(`input[name="${actionName}"]:checked`).value;
		};

		const setupEventListener = (selector, eventType, callback) => {
			document.querySelector(selector).addEventListener(eventType, callback);
		};

		setupEventListener(".form-knight", "submit", (event) => {
			event.preventDefault();
			const action = getCheckedValue(".form-knight", "knight-action");
			const computerAction = gameAi.getMove(game);
			game.turn(action, computerAction, render);
		});

		setupEventListener(".form-mag", "submit", (event) => {
			event.preventDefault();
			const action = getCheckedValue(".form-mag", "mag-action");
			const computerAction = gameAi.getMove(game);
			game.turn(action, computerAction, render);
		});
	};

	return {
		init,
	};
})();

app.init();
