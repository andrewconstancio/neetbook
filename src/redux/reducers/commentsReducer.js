import _ from 'lodash';

const INITIAL_STATE = {
    comments: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "FETCH_COMMENTS": 
            return { ...state, comments: action.payload };
        default: 
            return state;
    }
}