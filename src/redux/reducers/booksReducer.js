import _ from 'lodash';

export default (state = {}, action) => {
    switch(action.type) {
        case "INSERT_BOOK":
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
};