import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import { ChakraProvider } from '@chakra-ui/react'
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './store/reducers';
import reduxThunk from 'redux-thunk';
import {reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import {reduxFirestore, getFirestore } from 'redux-firestore';
import config from './config/firebase-config'
import { Provider } from 'react-redux';

import theme from './theme';

const store = createStore(reducers,
    compose(
        applyMiddleware(reduxThunk.withExtraArgument( {getFirebase, getFirestore} )),
        reduxFirestore(config),
        reactReduxFirebase(config)
    )    
)

ReactDOM.render(
    <Provider store={store}>
    <ChakraProvider theme={theme}>
        <App />
    </ChakraProvider>
    </Provider>,
    document.querySelector('#root')
)