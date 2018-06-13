import {
  find,
  times,
  shuffle,
  filter,
  sortBy,
  reverse,
  countBy,
  cloneDeep,
  includes,
  map,
} from 'lodash';
import { makeActionCreator } from 'cooldux';


import Player from './Player';
import Supply from './Supply';
import {sortByProp} from './utils';

export const startGame = makeActionCreator();
let outputDiv;

function initialize() {
  const supply = new Supply();
  const players = initPlayers(supply);
  return {
    supply,
    players,
    turns: 0,
    log: []
  };
}


function initPlayers(supply) {
  return shuffle(['treasure', 'random', 'card', 'victory'].map((name) => {
    // console.log('name', name);
    const p = new Player({ name });
    p.deck = times(3, () => supply.take('estate')).concat(times(7, () => supply.take('copper')));
    p.deck = shuffle(p.deck);
    return p;
  }));
}

function decksAvailable(cards) {
  const provinces = find(cards, { name: 'province' });
  const colonies = find(cards, { name: 'colony' });
  if (provinces.qty < 1 || (colonies && colonies.qty < 1)) {
    return false;
  }
  const empties = filter(cards, (c) => {
    return c.qty < 1;
  });
  if (empties.length > 2) {
    return false;
  }
  return true;
}

function takeTurn(p, state) {
  const { supply } = state;
  p.startTurn();
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
        p.draw(toPlay.values.card);
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
  let boughtCrap = false;
  while (p.buy) {
    if (p.buy > 1 && p.treasure > 6) {
      console.log('extra buys', p.name, p.buy, p.treasure);
    }
    const buyingWith = p.treasure;
    if (!boughtCrap) {
      const choice = p.chooseCard(supply);
      if (choice) {
        boughtThisRound.push(choice);
        if(buyingWith < 3) {
          boughtCrap = true
        }
      }
      p.buy -= 1;
    } else {
      p.buy = 0;
    }
  }
  finalInPlay = finalInPlay.concat(p.inPlay);

  const turnLog = {
    turn: state.turns,
    name: p.name,
    startingHand,
    finalInPlay,
    highTreasure,
    highBuys,
    boughtThisRound
  };

  p.discard = p.discard.concat(p.inPlay);
  p.inPlay = [];

  console.log('done', p.name, p.treasure, p.buy);
  return turnLog;
}


function runSim(state) {
  const { players, supply } = state;

  while (decksAvailable(supply.cards)) {
    state.turns++;
    state.log.push(takeTurn(players[state.turns % 4], state));
  }

  state.players.forEach((p) => {
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
  return state;

}

// document.addEventListener('DOMContentLoaded', () => {
//   outputDiv = document.getElementById('output');
//   runSim();
//   document.getElementById('runBtn').onclick = runSim;
// });

window.runSim = runSim;


function reducer(state = initialize(), {type, payload}) {

  switch (type) {
    case startGame.type:
      return {...runSim(initialize())}
      // return initialize();
    default:
      return state;
    }
}

export default reducer;
