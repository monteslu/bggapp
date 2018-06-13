import {
  filter,
  reverse,
  sample,
  shuffle,
  sortBy,
  times,
} from 'lodash';

import { sortByProp } from './utils';

export default class Player {

  constructor(options = {}) {
    this.name = options.name;
    this.discard = [];
    this.hand = [];
    this.inPlay = [];
    this.victory = 0;
  }

  startTurn() {
    this.draw(5);
    this.actions = 1;
    this.buy = 1;
    this.treasure = 0;
    this.unusedActions = 0;
  }

  draw(count) {
    if (this.deck.length >= count) {
      // console.log('normal draw count', count, 'deck.length' ,this.deck.length);
      times(count, () => {
        this.hand.push(this.deck.shift());
      });
      // console.log('normal draw count done', count, 'deck.length' ,this.deck.length);
    } else {
      // console.log('reshuffle count', count, 'deck.length' ,this.deck.length, 'discard.length' ,this.discard.length);
      this.deck = this.deck.concat(shuffle(this.discard));
      this.discard = [];
      times(count, () => {
        if (this.deck.length) {
          this.hand.push(this.deck.shift());
        }
      });
      // console.log('reshuffle done', 'deck.length' ,this.deck.length, 'hand.length' ,this.hand.length, 'discard.length' ,this.discard.length);
    }
  }

  chooseCard(supply) {
    let choices = reverse(sortBy(filter(supply.cards, (c) => {
      return c.qty > 0 && c.cost <= this.treasure;
    }), 'cost'));
    if (choices.length) {
      choices = filter(choices, { cost: choices[0].cost });
      // console.log('choices', choices);
      let choice;
      if (this.name === 'random') {
        choice = sample(choices);
      } else {
        choices = sortByProp(choices, this.name);
        console.log(this.name, 'player choices', choices);
        choice = choices[0];
      }

      if (choice) {
        this.treasure -= choice.cost;
        this.discard.push(supply.take(choice.name));
      }

      return choice;
    }
  }


}
