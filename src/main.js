// import 'babel-core/polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './store/configureStore'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.bundle.js')
  .then(function(reg) {
    console.log('Yey serivceworker!', reg);

  }).catch(function(err) {
    console.log('Boo no serviceWorker!', err);
  });
}

const store = configureStore();

React.render(
  <Provider store={store}>
    {() => <App />}
  </Provider>,
  document.getElementById('root')
);
