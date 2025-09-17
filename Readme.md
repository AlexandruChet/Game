# RPG Battle Game

**Description**
This is a simple JavaScript browser RPG game where the player controls the hero and fights with the enemy. The game implements the mechanics of attack, defense, health recovery and evasion maneuver.

---
# game.js

## Features

* **Hero**: 

* Has indicators of strength, speed, health and defense. 
* Uses mana for attacks and dodges. 
* Can recover (HP and MP). 
* Ability to evade enemy attacks.

* **Enemy**: 

* Has its own indicators of strength, speed, health and protection. 
* Can attack, recover, or skip a turn randomly. 
* Opportunity to miss.

* **Combat mechanics**: 

* The attack may miss. 
* Critical damage (1.5x) is possible randomly. 
* Protection reduces the damage received. 
* Recovery increases health (and mana for the hero).

* **Battle Log**: 

* All actions are displayed in real time in the log block.

---

## Installation and launch

1. Clone the repository or copy the project files.
2. Open `index.html` in any browser.
3. Enjoy the game!

---

## Management

* **Attack** - enemy attack.
* **Defense** — reduction of received damage by a fixed amount.
* **Recovery** — recovery of health and mana (for the hero).
* **Miss** — request to dodge the next attack of the enemy (spends mana).

---

## Code structure

* `Character' is the base class for all characters.
* ``Hero'' is a hero class with support for mana, evasion and recovery.
* `Enemy' is an enemy class with random actions.
* The main cycle of the game is controlled by the buttons on the page.
* The logic of updating the interface and checking the end of the game in `updateStatus()` and `checkGameOver()`.

---

## Usage example

```javascript
const hero = new Hero();
const enemy = new Enemy();

hero.attack(enemy); // The hero attacks the enemy
enemy.random(hero); // The enemy does a random action
```

---

## Planned improvements

* Different types of enemies with unique abilities.
* Inventory and items for the hero.
* Improved interface with animation.
* System of levels and experience.