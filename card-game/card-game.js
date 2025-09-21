const Deck = {
  hearts: {
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    jack: 11,
    queen: 12,
    king: 13,
    ace: 14,
  },
  diamonds: {
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    jack: 11,
    queen: 12,
    king: 13,
    ace: 14,
  },
  clubs: {
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    jack: 11,
    queen: 12,
    king: 13,
    ace: 14,
  },
  spades: {
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    ten: 10,
    jack: 11,
    queen: 12,
    king: 13,
    ace: 14,
  },
};

const getRandomCards = (e) => {
  const allCards = [];

  for (const suit in Deck) {
    for (const rank in Deck[suit]) {
      allCards.push({ suit, rank, value: Deck[suit][rank] });
    }
  }

  const selected = [];

  for (let i = 0; i < e; i++) {
    const randomIndex = Math.floor(Math.random() * allCards.length);
    const card = allCards.splice(randomIndex, 1)[0];
    selected.push(card);
  }

  return selected;
};

class Hero {
  random() {
    console.log("Hero cards:", getRandomCards(7));
  }
}

class Enemy {
  random() {
    console.log("Enemy cards:", getRandomCards(7));
  }
}

const hero = new Hero();
const enemy = new Enemy();

hero.random();
enemy.random();