class Hero {
	constructor(health, energy, mana) {
		this.health = health;
		this.energy = energy;
		this.mana = mana;
		this.defenseMode = false;
		this.name = "hero";
	}

	wait() {
		this.energy = Math.min(this.energy + 10, 100);
		this.mana = Math.min(this.mana + 10, 100);
	}

	attack() {
		return 0;
	}

	defend() {
		this.defenseMode = true;
	}

	hurt(points) {
		if (!points) {
			return;
		}

		if (this.defenseMode) {
			points /= 2;
			this.defenseMode = false;
		}
		this.health -= points;
		if (this.health < 0) this.health = 0;
	}
}

class Paladin extends Hero {
	name = "paladin";

	attack() {
		if (this.energy === 0) {
			return 0;
		}
		this.energy = Math.max(this.energy - 10, 0);
		const damage = this.energy * Math.random() * 0.5;
		return damage;
	}

	defend() {
		this.energy = Math.min(this.energy + 5, 100);
		super.defend();
	}
}

class Wizard extends Hero {
	name = "wizard";

	attack() {
		if (this.mana === 0) {
			return 0;
		}
		this.mana = Math.max(this.mana - 10, 0);
		const damage = this.mana * Math.random() * 0.5;
		return damage;
	}

	defend() {
		this.mana = Math.min(this.mana + 5, 100);
		super.defend();
	}
}
