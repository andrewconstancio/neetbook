import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './redux/reducers';
import thunk from 'redux-thunk';
import {reactReduxFirebase, getFirebase, reduxFirebase } from 'react-redux-firebase';
import {reduxFirestore, getFirestore } from 'redux-firestore';
import firebase from './config/firebase-config'
import { Provider } from 'react-redux';
import theme from './theme';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';

const persistConfig = {
    key: 'main-root',
    storage
}
const persistedReducer = persistReducer(persistConfig, reducers);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    persistedReducer,
    composeEnhancers(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reduxFirestore(firebase),
        reduxFirebase(firebase)
    )
);
const Persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={Persistor}>
            <ChakraProvider theme={theme}>
                <App />
            </ChakraProvider>
        </PersistGate>
    </Provider>
    ,
    document.querySelector('#root')
)