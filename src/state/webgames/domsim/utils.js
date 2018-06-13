import { shuffle } from 'lodash';

export function sortByProp(cards, prop) {
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
