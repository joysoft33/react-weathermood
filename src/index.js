import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { ConnectedRouter } from 'react-router-redux';

import App from './components/App';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './utilities/configureStore';

import './index.css';

// Create a browser history
const history = createBrowserHistory();
const store = configureStore(history);
const root = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  root
);

registerServiceWorker();
