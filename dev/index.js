import React from 'react';
import ReactDOM from "react-dom";
//import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-logger';
import createReducers from './reducers';
import Routes from './Routes'
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux'
import {browserHistory} from 'react-router'

import { ApolloProvider } from 'react-apollo';
import client from './apolloClient'

import 'font-awesome/css/font-awesome.css';
import 'react-toastify/dist/ReactToastify.min.css'
//import 'react-flexbox-grid/lib/index.css'

import injectTapEventPlugin from 'react-tap-event-plugin';
import './styles.css';

injectTapEventPlugin();

export const store = createStore(
    createReducers(client),
    //{},//initial state (asi esta en la doc de apollo)
    compose(
        applyMiddleware(
            routerMiddleware(browserHistory),
            client.middleware()/*,
            logger*/
        ),
        // If you are using the devToolsExtension, you can add it here also
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    ) 
);

ReactDOM.render(
    <ApolloProvider store={store} client={client}>
    	<Routes history={syncHistoryWithStore(browserHistory, store)}/>
    </ApolloProvider>,
    document.getElementById('root')
);