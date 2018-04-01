import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';

import App from './components/App';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './utilities/configureStore';

import './index.css';

// Create a browser history
const history = createHistory();
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
