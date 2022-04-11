import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { firestoreReducer } from 'redux-firestore';
import commentsReducer from './commentsReducer';
import authReducer from './authReducer';
import readRatingReducer from './readRatingReducer'
import bookReducer from './bookReducer';
import seachReducer from './searchReducer';
import pageReducer from './pageReducer';

export default combineReducers({
    form: formReducer,
    firestore: firestoreReducer,
    comments: commentsReducer,
    auth: authReducer,
    readRating: readRatingReducer,
    book: bookReducer,
    search: seachReducer,
    page: pageReducer
});
