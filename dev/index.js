import React from 'react';
import ReactDOM from "react-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import logger from 'redux-logger';
import createReducers from './common/reducers/index';
import Routes from './Routes'
import {routerMiddleware, syncHistoryWithStore} from 'react-router-redux'
import {browserHistory} from 'react-router'

import { ApolloProvider } from 'react-apollo';
import client from './apolloClient'

import 'font-awesome/css/font-awesome.css';
import 'react-toastify/dist/ReactToastify.min.css'
//import 'react-flexbox-grid/lib/index.css'

import injectTapEventPlugin from 'react-tap-event-plugin';
import 'react-select/dist/react-select.css';
import  'flexboxgrid/css/flexboxgrid.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './styles/css/material-select.scss'
import './styles/css/styles.css';
import './styles/css/richEditor.scss';

injectTapEventPlugin();

export const store = createStore(
    createReducers(),
    //{},//initial state (asi esta en la doc de apollo)
    compose(
        applyMiddleware(
            routerMiddleware(browserHistory)/*,
            logger*/

        ),
	      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    ) 
);

ReactDOM.render(
    <Provider store={store}>
        <ApolloProvider client={client}>
        	<Routes history={syncHistoryWithStore(browserHistory, store)}/>
        </ApolloProvider>
    </Provider>,
    document.getElementById('root')
);
