class Game {
  constructor(playerHero, computerHero, options) {
    this.options = {
      events: {
        onGameFinished: () => {},
        onTurnFinished: () => {},
      },
      ...options,
    };
    this.isGameFinished = false;
    this.playerHero = playerHero;
    this.computerHero = computerHero;
  }

  makeTurnAndGetDamage(action, hero) {
    switch (action) {
      case "attack":
        return hero.attack();

      case "defend":
        hero.defend();
        return 0;

      case "wait":
        hero.wait();
        return 0;

      default:
        console.error(`Wrong action ${action}`);
        break;
    }
  }

  /**
   *
   * @param playerAction
   * @param computerAction
   * @returns boolean - true if game finished, false if game still goes
   */
  turn(playerAction, computerAction) {
    const playerDamage = this.makeTurnAndGetDamage(
      playerAction,
      this.playerHero
    );
    const computerDamage = this.makeTurnAndGetDamage(
      computerAction,
      this.computerHero
    );

    this.playerHero.hurt(computerDamage);
    this.computerHero.hurt(playerDamage);

    console.log(this);

    if (this.playerHero.health <= 0 || this.computerHero.health <= 0) {
      this.isGameFinished = true;
      this.options.events.onGameFinished();
      return true;
    }

    return false;
  }
}
