const Heroes = (() => {
	class Hero {
		constructor(health, energy, mana) {
			this.health = health;
			this.energy = energy;
			this.mana = mana;
		}

		wait = () => {
			this.energy = Math.min(this.energy + 10, 100);
			this.mana = Math.min(this.mana + 10, 100);
		};

		attack = () => {
			return 0;
		};

		defend = () => {
			return 0;
		};

		hurt = (points) => {
			this.health -= points;
			if (this.health < 0) this.health = 0;
		};
	}

	class Paladin extends Hero {
		attack = () => {
			this.energy = Math.max(this.energy - 10, 0);
			return this.energy * Math.random();
		};

		defend = () => {
			this.energy = Math.max(this.energy - 5, 0);
			return this.energy * Math.random();
		};
	}

	class Magician extends Hero {
		attack = () => {
			this.mana = Math.max(this.mana - 10, 0);
			return this.mana * Math.random();
		};

		defend = () => {
			this.energy = Math.max(this.energy - 5, 0);
			return this.energy * Math.random();
		};
	}

	return {
		Paladin: Paladin,
		Magician: Magician,
	};
})();
