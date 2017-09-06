import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route } from 'react-router-dom';

import client from './store/configureApollo';
import configureStore from './store/configureStore';
// eslint-disable-next-line
import { ApolloClient, ApolloProvider } from 'react-apollo';

import App from './containers/App';
import './css/index.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

const store = configureStore();

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

ReactDOM.render(<ApolloProvider client={ client } store={ store }>
                  <MuiThemeProvider>
                    <BrowserRouter>
                      <div>
                        <Route path="/" component={ App } />
                      </div>
                    </BrowserRouter>
                  </MuiThemeProvider>
                </ApolloProvider>, document.getElementById('root'));

//registerServiceWorker();
/*
* Alternatively use the serviceWorkerRegistration.unregister()
* function that is in the registerServiceWorker.js file to unregister
* a service worker that has already been registered to an app deployed
* to production.
*/
