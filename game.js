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
    throw new Error("Method attack() must be overridden");
  }

  defense(damage) {
    const reduced = Math.max(0, damage - this.#def);
    this.#health -= reduced;
    return reduced;
  }

  recovery() {
    this.#health += 10;
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
      addLog("Not enough mana!");
      return false;
    }

    this.#mana -= 10;

    if (this.miss()) {
      addLog("Hero missed!");
      return false;
    }

    let damage = this.strength;
    if (Math.random() * 100 >= 90) damage *= 1.5;

    target.defense(damage);
    addLog(`Hero attacks and deals ${damage} damage! (Mana: ${this.#mana})`);
    return true;
  }

  defense(damage) {
    const reduced = super.defense(damage);
    addLog(`Hero takes ${reduced} damage after defense.`);
  }

  recovery() {
    this.health = Math.min(this.health * 1.2, 120);
    this.#mana = Math.min(this.#mana + 20, 100);
    addLog(`Hero recovered, HP: ${this.health}, MP: ${this.#mana}`);
  }

  useMiss() {
    if (this.#mana < 20) {
      addLog("Not enough mana to dodge!");
      return false;
    }
    this.#mana -= 10;
    this._dodging = true;
    addLog(`Hero prepares to dodge! (Mana: ${this.#mana})`);
    return true;
  }

  miss() {
    return Math.random() < 0.2;
  }
}

class Enemy extends Character {
  constructor(strength = 75, speed = 30, health = 600, def = 30) {
    super(strength, speed, health, def);
  }

  attack(target) {
    if (target._dodging) {
      addLog("Enemy attacks, but hero dodges!");
      target._dodging = false;
      return false;
    }

    if (this.miss()) {
      addLog("Enemy missed!");
      return false;
    }

    let damage = this.strength;
    if (Math.random() * 100 >= 90) damage *= 1.5;

    target.defense(damage);
    addLog(`Enemy attacks and deals ${damage} damage!`);
    return true;
  }

  defense(damage) {
    const reduced = super.defense(damage);
    addLog(`Enemy takes ${reduced} damage after defense.`);
  }

  recovery() {
    this.health = Math.min(this.health * 1.2, 100);
    addLog(`Enemy recovered, now has ${this.health} HP.`);
  }

  miss() {
    return Math.random() < 0.15;
  }

  random(target) {
    const action = Math.floor(Math.random() * 3) + 1;
    if (action === 1) this.attack(target);
    else if (action === 2) this.recovery();
    else addLog("Enemy does nothing.");
  }
}

const hero = new Hero();
const enemy = new Enemy();

const heroHP = document.getElementById("hero-hp");
const heroMP = document.getElementById("hero-mp");
const enemyHP = document.getElementById("enemy-hp");
const log = document.getElementById("log");

const attackBtn = document.getElementById("Attack");
const defenseBtn = document.getElementById("Defense");
const recoveryBtn = document.getElementById("Recovery");
const missBtn = document.getElementById("Miss");

function updateStatus() {
  heroHP.textContent = `HP: ${hero.health}`;
  heroMP.textContent = `MP: ${hero.mana}`;
  enemyHP.textContent = `HP: ${enemy.health}`;
}

function addLog(message) {
  const p = document.createElement("p");
  p.textContent = message;
  log.appendChild(p);
  log.scrollTop = log.scrollHeight;
}

function disableButtons() {
  attackBtn.disabled = true;
  defenseBtn.disabled = true;
  recoveryBtn.disabled = true;
  missBtn.disabled = true;
}

function checkGameOver() {
  if (hero.health <= 0) {
    addLog("Enemy wins!");
    disableButtons();
  }
  if (enemy.health <= 0) {
    addLog("Hero wins!");
    disableButtons();
  }
}

function enemyTurn() {
  enemy.random(hero);
  updateStatus();
  checkGameOver();
}

attackBtn.addEventListener("click", () => {
  hero.attack(enemy);
  updateStatus();
  enemyTurn();
});

defenseBtn.addEventListener("click", () => {
  hero.defense(10);
  updateStatus();
  enemyTurn();
});

recoveryBtn.addEventListener("click", () => {
  hero.recovery();
  updateStatus();
  enemyTurn();
});

missBtn.addEventListener("click", () => {
  hero.useMiss();
  updateStatus();
  enemyTurn();
});

updateStatus();
