import _ from 'lodash';

export default (state = {}, action) => {
    switch(action.type) {
        case "GET_BOOKS":
            return { ...state, yo: action.payload };
        default:
            return state;
    }
};