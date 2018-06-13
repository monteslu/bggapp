import cardDefs from './cards';
import { cloneDeep, find } from 'lodash';

export default class Supply {
  constructor () {
    const baseCards = cloneDeep(cardDefs.base);
    const kingdomCards = cloneDeep(cardDefs.kingdom);
    this.cards = baseCards.concat(kingdomCards);
    this.cards.forEach((c) => {
      c.values.treasure = c.values.treasure || 0;
      c.values.action = c.values.action || 0;
      c.values.buy = c.values.buy || 0;
      c.values.victory = c.values.victory || 0;
      c.values.card = c.values.card || 0;
    });
  }

  take(name) {
    const c = find(this.cards, { name });
    c.qty -= 1;
    const retVal = cloneDeep(c);
    delete retVal.qty;
    return retVal;
  }

}
