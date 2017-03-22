import 'isomorphic-fetch';
import es6p from 'es6-promise';
es6p.polyfill();
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

import reducers from './state';

import Hotness from './pages/Hotness';
import Settings from './pages/Settings';
import Picker from './pages/Picker';
import GameDetails from './pages/GameDetails';
import ForSolitaire from './pages/webgames/ForSolitaire';

import './index.css';

injectTapEventPlugin();

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

render((
  <Provider store={store}>
    <MuiThemeProvider>
      <Router history={hashHistory}>
        <Route path="/" component={Picker} />
        <Route path="hotness" component={Hotness} />
        <Route path="settings" component={Settings} />
        <Route path="details/:objectid" component={GameDetails} />
        <Route path="fs" component={ForSolitaire} />
      </Router>
    </MuiThemeProvider>
  </Provider>
), document.getElementById('root'));

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
  .then(function(reg) {
    console.log('Yey!!! serivceworker!', reg);

  }).catch(function(err) {
    console.log('Boo no serviceWorker!', err);
  });
}
