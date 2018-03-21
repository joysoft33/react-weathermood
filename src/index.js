import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/App';

import registerServiceWorker from './registerServiceWorker';
import configureStore from './utilities/configureStore';

const root = document.getElementById('root');
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);

registerServiceWorker();
