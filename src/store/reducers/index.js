import { combineReducers } from 'redux';
import booksReducer from './booksReducer';
import { firestoreReducer } from 'redux-firestore';

export default combineReducers({
    homePage: booksReducer,
    firestore: firestoreReducer
});
