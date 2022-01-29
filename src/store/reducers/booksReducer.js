import _ from 'lodash';

// const INTIAL_STATE = {
//     yo: null
// };
export default (state = {}, action) => {
    switch(action.type) {
        case "GET_BOOKS":
            return { ...state, yo: action.payload };
        default:
            return state;
    }
};