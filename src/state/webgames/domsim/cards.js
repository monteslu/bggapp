const base = [
  { name: 'estate', cost: 2, types: ['victory'], values: { victory: 1 }, qty: 24 },
  { name: 'duchy', cost: 5, types: ['victory'], values: { victory: 3 }, qty: 12 },
  { name: 'province', cost: 8, types: ['victory'], values: { victory: 6 }, qty: 12 },
  { name: 'colony', cost: 11, types: ['victory'], values: { victory: 10 }, qty: 12 },
  { name: 'copper', cost: 0, types: ['treasure'], values: { treasure: 1 }, qty: 60 },
  { name: 'silver', cost: 3, types: ['treasure'], values: { treasure: 2 }, qty: 40 },
  { name: 'gold', cost: 6, types: ['treasure'], values: { treasure: 3 }, qty: 30 },
  { name: 'platinum', cost: 9, types: ['treasure'], values: { treasure: 5 }, qty: 12 },
];

const extra = [
  { name: 'colony', cost: 11, types: ['victory'], values: { victory: 10 } },
  { name: 'platinum', cost: 9, types: ['treasure'], values: { treasure: 5 } },
  { name: 'curse', cost: 0, types: ['curse'], values: { victory: -1 } },
];


const kingdom = [
  { name: 'great hall', set: 'intrigue', cost: 3, types: ['action', 'victory'], values: { card: 1, action: 1, victory: 1 } },
  { name: 'village', set: 'base', cost: 3, types: ['action'], values: { card: 1, action: 2 } },
  { name: 'woodcutter', set: 'base', cost: 3, types: ['action'], values: { buy: 1, treasure: 2 } },
  { name: 'smithy', set: 'base', cost: 4, types: ['action'], values: { card: 3 } },
  { name: 'worker\'s village', set: 'prosperity', cost: 4, types: ['action'], values: { card: 1, action: 2, buy: 1 } },
  { name: 'bazaar', set: 'seaside', cost: 5, types: ['action'], values: { card: 1, action: 2, treasure: 1 } },
  { name: 'festival', set: 'base', cost: 5, types: ['action'], values: { action: 2, buy: 1, treasure: 2 } },
  { name: 'laboratory', set: 'base', cost: 5, types: ['action'], values: { card: 2, action: 1 } },
  { name: 'market', set: 'base', cost: 5, types: ['action'], values: { card: 1, action: 1, buy: 1, treasure: 1 } },
  { name: 'harem', set: 'intrigue', cost: 6, types: ['treasure', 'victory'], values: { treasure: 2, victory: 2 } },
];

kingdom.forEach((c) => {
  c.qty = 10;
});

export default {
  kingdom,
  base,
  extra,
};
