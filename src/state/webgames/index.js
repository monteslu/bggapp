import { combineReducers } from 'redux';
import forsolitaire from './forsolitaire';
import domsim from './domsim';

const reducer = combineReducers({
    forsolitaire,
    domsim
});

export default reducer;
