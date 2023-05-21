const app = ((renderModule, gameAi) => {
  const HERO_CLASSES = {
    KNIGHT: "choice-knight",
    WIZARD: "choice-wizard",
  };

  const init = () => {
    document
      .querySelector(".choice-hero-button")
      .addEventListener("click", (event) => {
        const isKnightSelected = event.target.classList.contains(
          HERO_CLASSES.KNIGHT
        );
        const paladin = new Paladin(100, 100, 100);
        const wizard = new Wizard(100, 100, 100);
        const game = isKnightSelected
          ? new Game(paladin, wizard, {
              events: {
                onGameFinished: () => {
                  alert("Finished");
                },
                onTurnFinished: () => {},
              },
            })
          : new Game(wizard, paladin);

        initGameInterface(game);
        initGameEvents(game);
      });
  };

  const initGameInterface = (game) => {
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
    renderModule.updateUI(
      game.playerHero,
      game.computerHero,
      game.playerHero.name === "paladin" ? "knight" : "wizard"
    );
  };

  const initGameEvents = (game) => {
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
      const computerAction = gameAi.getMove(game.playerHero, action);
      game.turn(action, computerAction);
    });

    setupEventListener(".form-mag", "submit", (event) => {
      event.preventDefault();
      const action = getCheckedValue(".form-mag", "mag-action");
      const computerAction = gameAi.getMove(game.playerHero, action);
      game.turn(action, computerAction);
    });
  };

  return {
    init,
  };
})(renderModule, gameAi);

app.init();
