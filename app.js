const app = (() => {
	const hideElement = (selector) => {
		document.querySelector(selector).style.display = "none";
	};

	const showElement = (selector) => {
		document.querySelector(selector).style.display = "block";
	};

	const getCheckedValue = (formSelector, actionName) => {
		const form = document.querySelector(formSelector);
		return form.querySelector(`input[name="${actionName}"]:checked`).value;
	};

	const setupEventListener = (selector, eventType, callback) => {
		document.querySelector(selector).addEventListener(eventType, callback);
	};

	const game = gameModule;

	setupEventListener(".choice-knight", "click", () => {
		hideElement(".choice-hero");
		showElement(".form-knight");
		console.log("Player chose knight.");
		game.start("knight");
	});

	setupEventListener(".choice-wizard", "click", () => {
		hideElement(".choice-hero");
		showElement(".form-mag");
		console.log("Player chose wizard.");
		game.start("wizard");
	});

	setupEventListener(".form-knight", "submit", (event) => {
		event.preventDefault();
		const action = getCheckedValue(".form-knight", "knight-action");
		game.turn(action);
	});

	setupEventListener(".form-mag", "submit", (event) => {
		event.preventDefault();
		const action = getCheckedValue(".form-mag", "mag-action");
		game.turn(action);
	});
})();
