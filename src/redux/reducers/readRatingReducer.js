import _ from 'lodash';

import { 
    HANDLE_RATING_CHANGE, 
    HANDLE_RATING_CHANGE_ERROR,
    FETCH_RATING,
    CLEAR_RATING
} from "../actions/types";

const INITIAL_STATE = {
    rating: null,
    ratingChanged: false,
    msg: ""
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case HANDLE_RATING_CHANGE:
            return { ...state, rating: action.payload, ratingChanged: true, msg: "Success"  };
        case HANDLE_RATING_CHANGE_ERROR:
            return { ...state, rating: null, ratingChanged: false, msg: action.payload};
        case CLEAR_RATING:
            return { ...state, rating: null, ratingChanged: false, msg: "Cleared"};
        default: 
            return state;
    }
};