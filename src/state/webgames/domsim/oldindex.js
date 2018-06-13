import {
  find,
  cloneDeep,
  times,
  shuffle,
  filter,
  includes,
  sortBy,
  reverse,
  sample,
  countBy,
  map,
} from 'lodash';

import cardDefs from './cards';
import renderSupply from './supply';



const basePlayer = {
  discard: [],
  hand: [],
  inPlay: [],
  victory: 0,
};

function initialize() {
  const baseCards = cloneDeep(cardDefs.base);
  const kingdomCards = cloneDeep(cardDefs.kingdom);
  const supply = baseCards.concat(kingdomCards);
  supply.forEach((c) => {
    c.values.treasure = c.values.treasure || 0;
    c.values.action = c.values.action || 0;
    c.values.buy = c.values.buy || 0;
    c.values.victory = c.values.victory || 0;
    c.values.card = c.values.card || 0;
  });
  const players = initPlayers(supply);
  return {
    baseCards,
    kingdomCards,
    supply,
    players,
    turns: 0
  };
}

function fromSupply(name, supply) {
  const c = find(supply, { name });
  c.qty -= 1;
  const retVal = cloneDeep(c);
  delete retVal.qty;
  return retVal;
}

function initPlayers(supply) {
  return shuffle(['treasure', 'action', 'card', 'victory'].map((name) => {
    // console.log('name', name);
    const p = cloneDeep(basePlayer);
    p.deck = times(3, () => fromSupply('estate')).concat(times(7, () => fromSupply('copper')));
    p.name = name;
    p.deck = shuffle(p.deck);
    return p;
  }));
}

function sortByProp(cards, prop) {
  return shuffle(cards).sort((a, b) => {
    if (a.values[prop] > b.values[prop]) {
      return -1;
    }
    if (a.values[prop] < b.values[prop]) {
      return 1;
    }
    return 0;
  });
}

function chooseCard(p, supply) {
  let choices = reverse(sortBy(filter(supply, (c) => {
    return c.qty > 0 && c.cost <= p.treasure;
  }), 'cost'));
  if (choices.length) {
    choices = filter(choices, { cost: choices[0].cost });
    // console.log('choices', choices);
    let choice;
    if (p.name === 'random') {
      choice = sample(choices);
    } else {
      choices = sortByProp(choices, p.name);
      console.log(p.name, 'player choices', choices);
      choice = choices[0];
    }

    if (choice) {
      p.treasure -= choice.cost;
      p.discard.push(fromSupply(choice.name));
    }

    return choice;
  }
}

function draw(count, p) {
  if (p.deck.length >= count) {
    // console.log('normal draw count', count, 'deck.length' ,p.deck.length);
    times(count, () => {
      p.hand.push(p.deck.shift());
    });
    // console.log('normal draw count done', count, 'deck.length' ,p.deck.length);
  } else {
    // console.log('reshuffle count', count, 'deck.length' ,p.deck.length, 'discard.length' ,p.discard.length);
    p.deck = p.deck.concat(shuffle(p.discard));
    p.discard = [];
    times(count, () => {
      if (p.deck.length) {
        p.hand.push(p.deck.shift());
      }
    });
    // console.log('reshuffle done', 'deck.length' ,p.deck.length, 'hand.length' ,p.hand.length, 'discard.length' ,p.discard.length);
  }
}

function startTurn(p) {
  draw(5, p);
  p.actions = 1;
  p.buy = 1;
  p.treasure = 0;
  p.unusedActions = 0;
}


function takeTurn(p) {
  startTurn(p);
  const boughtThisRound = [];
  let finalInPlay = [];
  const startingHand = sortBy(cloneDeep(p.hand), 'name');
  let highBuys = 0;
  let highTreasure = 0;

  while (p.actions) {
    let actions = filter(p.hand, (c) => {
      return includes(c.types, 'action');
    });
    if (actions.length) {
      actions = sortByProp(actions, 'action');
      // if (actions.length > 1) {
      //   console.log('actions to choose from', actions, p.name);
      // }

      const toPlay = actions[0];
      p.actions -= 1;
      p.oldHand = p.hand;
      p.hand = [];
      p.oldHand.forEach((c) => {
        if (c !== toPlay) {
          p.hand.push(c);
        }
      });
      p.inPlay.push(toPlay);

      if (toPlay.values.action) {
        p.actions += toPlay.values.action;
      }
      if (toPlay.values.treasure) {
        p.treasure += toPlay.values.treasure;
      }
      if (toPlay.values.buy) {
        p.buy += toPlay.values.buy;
      }
      if (toPlay.values.card) {
        draw(toPlay.values.card, p);
      }
    } else {
      p.unusedActions = p.actions;
      p.actions = 0;
    }
  }

  // console.log('p.hand', p.hand.length);

  while (p.hand.length) {
    const c = p.hand.shift();
    if (!includes(c.values, 'action') && c.values.treasure) {
      p.treasure += c.values.treasure;
    }
    p.inPlay.push(c);
  }

  // console.log('p.hand', p.hand.length, 'inPlay', p.inPlay.length);

  highBuys = p.buy;
  highTreasure = p.treasure;
  while (p.buy) {
    if (p.buy > 1 && p.treasure > 6) {
      console.log('extra buys', p.name, p.buy, p.treasure);
    }
    if (p.treasure > 2) {
      const choice = chooseCard(p);
      if (choice) {
        boughtThisRound.push(choice);
      }
      p.buy -= 1;
    } else {
      p.buy = 0;
    }
  }
  finalInPlay = finalInPlay.concat(p.inPlay);

  const output = `
    <div>
      turn <strong>${turns}</strong>
    </div>
    <div>
      <strong>${p.name}</strong> player
    </div>
    <div>
    starting hand : <strong>${startingHand.map(c => c.name).join(', ')}</strong>
    </div>
    <div>
    played : <strong>${finalInPlay.map(c => c.name).join(', ')}</strong>
    </div>
    <div>
    after actions : <strong>${highTreasure}</strong> treasure, <strong>${highBuys}</strong> buys
    </div>
    <div>
    purchased : <strong>${boughtThisRound.map(c => c.name).join(', ')}</strong>
    </div>
    <hr/>
  `;
  const div = document.createElement('div');
  div.innerHTML = output;
  outputDiv.appendChild(div);
  p.discard = p.discard.concat(p.inPlay);
  p.inPlay = [];

  console.log('done', p.name, p.treasure, p.buy, boughtThisRound);
}

function decksAvailable() {
  const p = find(supply, { name: 'province' });
  if (p.qty < 1) {
    return false;
  }
  const empties = filter(supply, (c) => {
    return c.qty < 1;
  });
  if (empties.length > 2) {
    return false;
  }
  return true;
}

function runSim() {
  initSupply();
  initPlayers();
  outputDiv.innerHTML = '';
  turns = 0;
  while (decksAvailable()) {
    turns++;
    takeTurn(players[turns % 4]);
  }

  players.forEach((p) => {
    p.discard = p.discard.concat(p.deck);
    p.deck = [];
    p.discard.forEach((c) => {
      if (c.values.victory) {
        p.victory += c.values.victory;
      }
    });
  });

  console.log(players, sortBy(supply, 'name'), filter(supply, { qty: 0 }));
  sortBy(players, 'victory').forEach(p => console.log(p.victory, p.name));
  const supplyDiv = document.createElement('div');
  supplyDiv.innerHTML = renderSupply({ supply });
  outputDiv.appendChild(supplyDiv);

  const scoreDiv = document.createElement('div');
  scoreDiv.className = 'mdl-card mdl-shadow--2dp';
  scoreDiv.style.width = '100%';
  scoreDiv.style.marginTop = '5px';
  scoreDiv.innerHTML = `
    <div>
      <h3>Results</h3>
      <ul>
      ${reverse(sortBy(players, 'victory')).map(p => `
        <li>
        VPs: <span style="font-size: 2em; font-weight: bold;">${p.victory}</span> player strategy: <span style="font-size: 1.5em; font-weight: bold;">${p.name}</span>
        <br/>
          <strong>${p.discard.length}</strong> card deck:<br/>
          ${map(countBy(p.discard, c => c.name), (val, key) => `<strong>${val}x</strong> ${key}`).join(', ')}
        <br/><br/>
        </li>
      `).join('')}
      </ul>
    </div>
  `;
  outputDiv.appendChild(scoreDiv);
  window.scrollTo(0, document.body.scrollHeight);
}

document.addEventListener('DOMContentLoaded', () => {
  outputDiv = document.getElementById('output');
  runSim();
  document.getElementById('runBtn').onclick = runSim;
});

window.runSim = runSim;
