
export const START_GAME = 'START_GAME';
export const SELECT_BID = 'SELECT_BID';
export const PLACE_BID = 'PLACE_BID';
export const SELECT_PROPERTY = 'SELECT_PROPERTY';
export const SELL_PROPERTY = 'SELL_PROPERTY';
export const NEXT_SELL = 'NEXT_SELL';


export function startGame(){
  return {
    type: START_GAME
  };
}

export function selectBid(amount){
  return {
    type: SELECT_BID,
    amount
  };
}

export function placeBid(amount){
  return {
    type: PLACE_BID,
    amount
  };
}

export function selectProp(propNum){
  return {
    type: SELECT_PROPERTY,
    propNum
  };
}

export function sellProp(propNum){
  return {
    type: SELL_PROPERTY,
    propNum
  };
}

export function nextSell(){
  return {
    type: NEXT_SELL
  };
}
