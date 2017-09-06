import { createStore, compose, applyMiddleware } from 'redux';
// add middlewares here
import ReduxPromise from 'redux-promise';

import rootReducer from '../reducers/index';
import client from './configureApollo'

export default function configureStore(initialState = {}) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(client.middleware(),ReduxPromise),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
};

