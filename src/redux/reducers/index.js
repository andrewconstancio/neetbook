import { combineReducers } from 'redux';
import booksReducer from './booksReducer';
import { reducer as formReducer } from 'redux-form';
import { firestoreReducer } from 'redux-firestore';
import userBookRatingInfo from './userBookRatingInfo';

export default combineReducers({
    homePage: booksReducer,
    userBookInfo: userBookRatingInfo,
    form: formReducer,
    firestore: firestoreReducer
});
