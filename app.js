const app = (() => {
	const hideElement = (selector) => {
		document.querySelector(selector).style.display = "none";
	};

	const showElement = (selector) => {
		document.querySelector(selector).style.display = "block";
	};

	const getCheckedValue = (formSelector, actionName) => {
		return document.querySelector(
			`input[name="${actionName}"]:checked`,
			formSelector,
		).value;
	};

	const setupEventListener = (selector, eventType, callback) => {
		document.querySelector(selector).addEventListener(eventType, callback);
	};

	setupEventListener(".choice-knight", "click", () => {
		hideElement(".choice-hero");
		showElement(".form-knight");
		console.log("Player chose knight.");
		Game.start("knight");
	});

	setupEventListener(".choice-wizard", "click", () => {
		hideElement(".choice-hero");
		showElement(".form-mag");
		console.log("Player chose wizard.");
		Game.start("wizard");
	});

	setupEventListener(".form-knight", "submit", (event) => {
		event.preventDefault();
		const action = getCheckedValue(".form-knight", "knight-action");
		Game.turn(action);
	});

	setupEventListener(".form-mag", "submit", (event) => {
		event.preventDefault();
		const action = getCheckedValue(".form-mag", "mag-action");
		Game.turn(action);
	});
})();
