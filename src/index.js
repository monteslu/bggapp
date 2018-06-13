import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

import reducers from './state';

import Hotness from './pages/Hotness';
import Settings from './pages/Settings';
import Picker from './pages/Picker';
import GameDetails from './pages/GameDetails';
import ForSolitaire from './pages/webgames/ForSolitaire';
import DomSim from './pages/webgames/DomSim';
import WebGamesList from './pages/webgames/List';

import './index.css';

import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

injectTapEventPlugin();

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

render((
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router history={hashHistory}>
        <Route path="/" component={Picker} />
        <Route path="hotness" component={Hotness} />
        <Route path="settings" component={Settings} />
        <Route path="details/:objectid" component={GameDetails} />
        <Route path="webgames" component={WebGamesList} />
        <Route path="fs" component={ForSolitaire} />
        <Route path="domsim" component={DomSim} />
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
