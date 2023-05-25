const app = (() => {
	const init = () => {
		const render = new Render();
		const gameAi = new GameAi();
		const createGame = (isKnight) => {
			const player = isKnight
				? new Paladin(100, 100, 100)
				: new Wizard(100, 100, 100);
			const computer = isKnight
				? new Wizard(100, 100, 100)
				: new Paladin(100, 100, 100);
			const game = new Game(player, computer, {
				events: {
					onGameFinished: () => {
						alert("Finished");
					},
					onTurnFinished: () => {},
				},
			});
			initGameInterface(game, render);
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
	
	const initGameInterface = (game, render) => {
		const hideElement = (selector) => {
			document.querySelector(selector).style.display = "none";
		};

		const showElement = (selector) => {
			document.querySelector(selector).style.display = "block";
		};

		if (game.playerHero.name === "paladin") {
			hideElement(".choice-hero");
			showElement(".form-knight");
		} else {
			hideElement(".choice-hero");
			showElement(".form-mag");
		}
		render.updateUI(
			game.playerHero,
			game.computerHero,
			game.playerHero.name === "paladin" ? "knight" : "wizard",
		);
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
