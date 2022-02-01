import { combineReducers } from 'redux';
import booksReducer from './booksReducer';
import { reducer as formReducer } from 'redux-form';
import { firestoreReducer } from 'redux-firestore';

export default combineReducers({
    homePage: booksReducer,
    form: formReducer,
    firestore: firestoreReducer
});
