import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { firestoreReducer } from 'redux-firestore';
import commentsReducer from './commentsReducer';
import authReducer from './authReducer';

export default combineReducers({
    form: formReducer,
    firestore: firestoreReducer,
    comments: commentsReducer,
    auth: authReducer
});
