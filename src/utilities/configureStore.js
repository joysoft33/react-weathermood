import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import appReducers from '../reducers';

const configureStore = history => {
  // Build the middleware for intercepting and dispatching navigation actions
  const router = routerMiddleware(history);

  const middlewares = [router, thunk];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
  }

  const reducers = combineReducers({
    ...appReducers,
    router: routerReducer
  });

  return createStore(reducers, applyMiddleware(...middlewares));
};

export default configureStore;
