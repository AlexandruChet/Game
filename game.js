const readline = require("node:readline");

class Character {
  #strength;
  #speed;
  #health;
  #def;

  constructor(strength, speed, health, def) {
    this.#strength = strength;
    this.#speed = speed;
    this.#health = health;
    this.#def = def;
  }

  get strength() {
    return this.#strength;
  }
  get speed() {
    return this.#speed;
  }
  get health() {
    return this.#health;
  }
  get def() {
    return this.#def;
  }

  set health(value) {
    this.#health = Math.max(0, value);
  }

  attack(target) {
    throw new Error("Method attack() must be overridden in subclasses");
  }

  defense(damage) {
    const reducedDamage = Math.max(0, damage - this.#def);
    this.#health -= reducedDamage;
    return reducedDamage;
  }

  recovery() {
    this.#health += 10;
    console.log(`Character recovered, now has ${this.#health} HP.`);
  }

  miss() {
    return Math.random() < 0.1;
  }
}

class Hero extends Character {
  #mana;
  _dodging = false;

  constructor(strength = 100, speed = 50, health = 120, def = 50, mana = 100) {
    super(strength, speed, health, def);
    this.#mana = mana;
  }

  get mana() {
    return this.#mana;
  }
  set mana(value) {
    this.#mana = Math.max(0, value);
  }

  attack(target) {
    if (this.#mana < 25) {
      console.log("Not enough mana!");
      return false;
    }

    this.#mana -= 25;
    if (this.miss()) {
      console.log("Hero missed!");
      return false;
    }
    this.#mana += 35;
    let damage = this.strength;
    if (Math.random() * 100 >= 90) damage *= 1.5;

    target.defense(damage);
    console.log(
      `Hero attacks and deals ${damage} damage! (Mana: ${this.#mana})`
    );
    return true;
  }

  defense(damage) {
    const reduced = super.defense(damage);
    console.log(`Hero takes ${reduced} damage after defense.`);
  }

  recovery() {
    this.health = Math.min(this.health * 1.2, 120);
    this.#mana = Math.min(this.#mana + 20, 100);
    console.log(
      `Hero recovered, now has ${this.health} HP and ${this.#mana} MP.`
    );
  }

  useMiss() {
    if (this.#mana < 20) {
      console.log("Not enough mana to dodge!");
      return false;
    }
    this.#mana -= 20;
    this._dodging = true;
    console.log(`Hero prepares to dodge! (Mana: ${this.#mana})`);
    return true;
  }

  miss() {
    return Math.random() < 0.2;
  }
}

class Enemy extends Character {
  constructor(strength = 75, speed = 30, health = 200, def = 30) {
    super(strength, speed, health, def);
  }

  attack(target) {
    if (target._dodging) {
      console.log("Enemy attacks, but hero dodges!");
      target._dodging = false;
      return false;
    }

    if (this.miss()) {
      console.log("Enemy missed!");
      return false;
    }

    let damage = this.strength;
    if (Math.random() * 100 >= 90) damage *= 1.5;

    target.defense(damage);
    console.log(`Enemy attacks and deals ${damage} damage!`);
    return true;
  }

  defense(damage) {
    const reduced = super.defense(damage);
    console.log(`Enemy takes ${reduced} damage after defense.`);
  }

  recovery() {
    this.health = Math.min(this.health * 1.2, 100);
    console.log(`Enemy recovered, now has ${this.health} HP.`);
  }

  miss() {
    return Math.random() < 0.15;
  }

  random(target) {
    const action = Math.floor(Math.random() * 3) + 1;

    if (action === 1) this.attack(target);
    else if (action === 2) this.recovery();
    else console.log("Enemy does nothing.");
  }
}

const hero = new Hero();
const enemy = new Enemy();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function gameLoop() {
  if (hero.health <= 0) {
    console.log("Enemy wins!");
    process.exit();
  }
  if (enemy.health <= 0) {
    console.log("Hero wins!");
    process.exit();
  }

  console.log(`\nHero: HP ${hero.health}, MP ${hero.mana}`);
  console.log(`Enemy: HP ${enemy.health}`);

  rl.question(
    "Choose action (A - Attack, B - Defend, C - Recover, D - Dodge): ",
    (command) => {
      if (command === "A") hero.attack(enemy);
      else if (command === "B") hero.defense(10);
      else if (command === "C") hero.recovery();
      else if (command === "D") hero.useMiss();

      enemy.random(hero);

      gameLoop();
    }
  );
}

gameLoop();
