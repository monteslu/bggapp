import {shuffle, filter, find, reduce} from 'lodash';

import {
  START_GAME,
  SELECT_BID,
  PLACE_BID,
  SELECT_PROPERTY,
  SELL_PROPERTY,
  NEXT_SELL
} from '../../actions/webgames/forsolitaire';

const allProperties = [
  {value: 1, name: 'cardboard box'},
  {value: 2, name: 'outhouse'},
  {value: 3, name: 'sewer'},
  {value: 4, name: 'dog house'},
  {value: 5, name: 'cave'},
  {value: 6, name: 'tepee'},
  {value: 7, name: 'tent'},
  {value: 8, name: 'igloo'},
  {value: 9, name: 'beach shack'},
  {value: 10, name: 'wood shack'},
  {value: 11, name: 'tree house'},
  {value: 12, name: 'stone house'},
  {value: 13, name: 'tiny island'},
  {value: 14, name: 'camper'},
  {value: 15, name: 'log cabbin'},
  {value: 16, name: 'lighthouse'},
  {value: 17, name: 'houseboat'},
  {value: 18, name: 'R.V.'},
  {value: 19, name: 'flat'},
  {value: 20, name: 'condo'},
  {value: 21, name: 'house'},
  {value: 22, name: 'big house'},
  {value: 23, name: 'haunted house'},
  {value: 24, name: 'beachfront'},
  {value: 25, name: 'mansion'},
  {value: 26, name: 'small castle'},
  {value: 27, name: 'large mansion'},
  {value: 28, name: 'large castle'},
  {value: 29, name: 'sky scraper'},
  {value: 30, name: 'space station'}
];

const allChecks = [
  {value: 0},{value: 0},
  {value: 2000},{value: 2000},
  {value: 3000},{value: 3000},
  {value: 4000},{value: 4000},
  {value: 5000},{value: 5000},
  {value: 6000},{value: 6000},
  {value: 7000},{value: 7000},
  {value: 8000},{value: 8000},
  {value: 9000},{value: 9000},
  {value: 10000},{value: 10000},
  {value: 11000},{value: 11000},
  {value: 12000},{value: 12000},
  {value: 13000},{value: 13000},
  {value: 14000},{value: 14000},
  {value: 15000},{value: 15000}
];


function drawCards(deck,num){
  const retVal = [];
  for (let int = 0; int < num; int++) {
    if(deck.length){
      retVal.push(deck.shift());
    }
  }
  return retVal;
}

function getBids(jessCoins, myCoins){
  let retVal;
  if(jessCoins < 1){
    retVal = [0,1];
  }else{
    retVal = [0,jessCoins, jessCoins + 1]
  }
  return filter(retVal, val => {
    return myCoins >= val;
  });
}

function customSorter(x,y){
  return ((x.value < y.value) ? -1 : ((x.value > y.value) ? 1 : 0));
}

function removeCards(deck, value){
  return filter(deck, card => {
    return card.value != value;
  });
}

function selectCard(deck, value){
  return find(deck, {value});
}


function initialize(){
  const initialgProps = shuffle(allProperties);
  const initialgChecks = shuffle(allChecks);
  const initialmarketProps = drawCards(initialgProps, 3);

  const initialjessCoins = 3;
  const initialmyCoins = 16;
  const initialavailableBids = getBids(initialjessCoins, initialmyCoins);

  return {
    gChecks: initialgChecks,
    gProps : initialgProps,
    marketProps: initialmarketProps.sort(customSorter),
    marketChecks: [],
    jessCoins: initialjessCoins,
    selectedBid: null,
    selectedProp: null,
    availableBids: initialavailableBids,
    jessChecks: [],
    jessProps: [],
    myCoins: initialmyCoins,
    myChecks: [],
    myProps: [],
    mySoldProps: [],
    jessSoldProps: [],
    jessCheckReward: null,
    myCheckReward: null,
    phase: 'buy',
    round: 1,
    myScore: 0,
    jessScore: 0
  };
}

function handlePlaceBid(state, action){
  let {myProps, jessProps, jessCoins, myCoins, marketProps, gProps, gChecks, phase, marketChecks, selectedBid, availableBids, round} = state;
  console.log('handlePlaceBid', myProps);
  myCoins = myCoins - action.amount;
  selectedBid = null;
  if(action.amount > jessCoins){
    myProps.push(marketProps[2]);
    jessProps.push(marketProps[1]);
    jessCoins++;
  }
  else if(action.amount === jessCoins){
    myProps.push(marketProps[1]);
    jessProps.push(marketProps[2]);
  }
  else{
    myProps.push(marketProps[0]);
    jessProps.push(marketProps[2]);
    jessCoins--;
    if(jessCoins < 0){
      jessCoins = 0;
    }
  }


  if(gProps.length){
    marketProps = drawCards(gProps, 3).sort(customSorter);
    availableBids = getBids(jessCoins, myCoins);
    round = (10 - (gProps.length / 3));
  }
  else{
    phase = 'sell';
    marketChecks = drawCards(gChecks, 3).sort(customSorter);
    myProps = myProps.sort(customSorter);
    round = 1;
  }



  return Object.assign({}, state, {
    myProps, jessProps, jessCoins, myCoins, marketProps, gProps, phase, marketChecks, gChecks, selectedBid: null, availableBids, round
  });
}

function handleSellProperty(state, action){
  let {myProps, myChecks, jessProps, jessChecks, gChecks, phase, marketChecks, selectedProp, jessCheckReward, myCheckReward, round, myScore, jessScore, winner} = state;
  jessProps = shuffle(jessProps);
  let jessChoices = drawCards(jessProps, 2).sort(customSorter);
  const mySoldProp = selectCard(myProps, action.propNum);
  let jessSoldProp;
  myProps = removeCards(myProps, action.propNum);
  selectedProp = null;


  if(action.propNum > jessChoices[0].value && (!jessChoices[1] || (action.propNum > jessChoices[1].value))){
    //1. Your card is the highest:
    //  The third check is always discarded.
    //  Discard your property and take the highest value check, awesome.
    myChecks.push(marketChecks[2]);
    //  Jessica discards her lowest value property and takes the second highest check.
    jessSoldProp = jessChoices[0];
    jessChecks.push(marketChecks[1]);
    //  Return Jessica's other property to her deck and shuffle for her.
    if(jessChoices[1]){
      jessProps.push(jessChoices[1]);
    }

  }
  else if(action.propNum < jessChoices[0].value && (!jessChoices[1] || (action.propNum < jessChoices[1].value))){
    //2. Your card is the lowest:
    //  Take the lowest value check, lame, but don't discard your property.
    myChecks.push(marketChecks[0]);
    //  Jessica discards her highest value card for the highest value check.
    jessSoldProp = jessChoices[1] || jessChoices[0];
    jessChecks.push(marketChecks[2]);
    //  Put your property from this round into Jessica's deck and discard her other property.
    // (Basically discard both of Jessica's properties, give her your crappy property)
    jessProps.push(mySoldProp);
  }
  else{
    //3. Your card is in between:
    //  Discard your card for the middle value check.
    myChecks.push(marketChecks[1]);
    //  Discard Jessica's highest value card for the best check.
    jessSoldProp = jessChoices[1] || jessChoices[0];
    jessChecks.push(marketChecks[2]);
    //  Return Jessica's unused card to her deck.
    jessProps.push(jessChoices[1] || jessChoices[0]);
  }
  jessCheckReward = jessChecks[jessChecks.length - 1];
  myCheckReward = myChecks[myChecks.length - 1];



  if(gChecks.length){
    marketChecks = drawCards(gChecks, 3).sort(customSorter);
    phase = 'sellResult';
  }
  else{
    myScore = reduce(myChecks, (total, {value}) => total + value, 0);
    jessScore = reduce(jessChecks, (total, {value}) => total + value, 0);
    winner = myScore > jessScore;
    phase = 'gameover';
  }

  round = (10 - (gChecks.length / 3));

  return Object.assign({}, state, {
    myProps, jessProps, gChecks, phase, marketChecks, selectedProp, round, jessCheckReward, myCheckReward, jessSoldProp, mySoldProp, myScore, jessScore, winner
  });
}

function forsolitaireReducer(state = initialize(), action) {

  switch (action.type) {
  case START_GAME:
    return initialize();
  case SELECT_BID:
    console.log('forsolitaireReducer', action);
    return Object.assign({}, state, {
      selectedBid: action.amount
    });
  case SELECT_PROPERTY:
    return Object.assign({}, state, {
      selectedProp: action.propNum
    });
  case PLACE_BID:
    return handlePlaceBid(state, action);
  case SELL_PROPERTY:
    return handleSellProperty(state, action);
  case NEXT_SELL:
    return Object.assign({}, state, {
      phase: 'sell'
    });
  default:
    return state;
  }
}

export default forsolitaireReducer;
