import { shuffle, filter, find, reduce } from 'lodash';
import { makeActionCreator } from 'cooldux';

import { allProperties, allChecks } from './cards';

// console.log('allprops', allProperties, allChecks);

export const startGame = makeActionCreator();
export const selectBid = makeActionCreator();
export const placeBid = makeActionCreator();
export const selectProp = makeActionCreator();
export const sellProp = makeActionCreator();
export const nextSell = makeActionCreator();

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
    return card.value !== value;
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

function handlePlaceBid(state, payload){
  let {myProps, jessProps, jessCoins, marketProps, gProps, gChecks, phase, marketChecks, availableBids, round} = state;
  // console.log('handlePlaceBid', myProps);
  let myCoins = state.myCoins - payload;
  if(payload > jessCoins){
    myProps.push(marketProps[2]);
    jessProps.push(marketProps[1]);
    jessCoins++;
  }
  else if(payload === jessCoins){
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

  return {...state, myProps, jessProps, jessCoins, myCoins, marketProps, gProps, phase, marketChecks, gChecks, selectedBid: null, availableBids, round};
}

function handleSellProperty(state, payload){
  let {myProps, myChecks, jessProps, jessChecks, gChecks, phase, marketChecks, selectedProp, jessCheckReward, myCheckReward, round, myScore, jessScore, winner} = state;
  jessProps = shuffle(jessProps);
  console.log('jess pre draw', JSON.stringify(jessProps));
  let jessChoices = drawCards(jessProps, 2).sort(customSorter);
  console.log('jess post draw', JSON.stringify(jessProps))
  const mySoldProp = selectCard(myProps, payload);
  let jessSoldProp, jessUnsoldProp;
  myProps = removeCards(myProps, payload);
  selectedProp = null;


  if(payload > jessChoices[0].value && (!jessChoices[1] || (payload > jessChoices[1].value))){
    //1. Your card is the highest:
    //  The third check is always discarded.
    //  Discard your property and take the highest value check, awesome.
    myChecks.push(marketChecks[2]);
    //  Jessica discards her lowest value property and takes the second highest check.
    jessSoldProp = jessChoices[0];
    console.log('removing jessprop', jessSoldProp);
    jessProps = removeCards(jessProps, jessSoldProp.value);
    console.log('jess remaining', jessProps);
    jessUnsoldProp = jessChoices[1];
    jessChecks.push(marketChecks[1]);
    //  Return Jessica's other property to her deck and shuffle for her.
    if(jessUnsoldProp){
      jessProps.push(jessUnsoldProp);
    }

  }
  else if(payload < jessChoices[0].value && (!jessChoices[1] || (payload < jessChoices[1].value))){
    //2. Your card is the lowest:
    //  Take the lowest value check, lame, but don't discard your property.
    myChecks.push(marketChecks[0]);
    //  Jessica discards her highest value card for the highest value check.
    jessSoldProp = jessChoices[1] || jessChoices[0];
    console.log('removing jessprop', jessSoldProp);
    jessProps = removeCards(jessProps, jessSoldProp.value);
    console.log('jess remaining', jessProps);
    jessUnsoldProp = jessChoices[0];
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
    console.log('removing jessprop', jessSoldProp);
    jessProps = removeCards(jessProps, jessSoldProp.value);
    // console.log('jess remaining', jessProps);
    if(jessChoices[1]){
      jessUnsoldProp = jessChoices[0];
    }
    jessChecks.push(marketChecks[2]);
    //  Return Jessica's unused card to her deck.
    if(jessUnsoldProp){
      jessProps.push(jessUnsoldProp);
    }
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

  return {...state, myProps, jessProps, gChecks, phase, marketChecks, selectedProp, round, jessCheckReward, myCheckReward, jessSoldProp, jessUnsoldProp, mySoldProp, myScore, jessScore, winner}
}

function reducer(state = initialize(), {type, payload}) {

  switch (type) {
    case startGame.type:
      return initialize();
    case selectBid.type:
      // console.log('forsolitaireReducer', type, payload);
      return {...state, selectedBid: payload};
    case selectProp.type:
      return {...state, selectedProp: payload};
    case placeBid.type:
      return handlePlaceBid(state, payload);
    case sellProp.type:
      return handleSellProperty(state, payload);
    case nextSell.type:
      return {...state, phase: 'sell'}
    default:
      return state;
    }
}

export default reducer;
