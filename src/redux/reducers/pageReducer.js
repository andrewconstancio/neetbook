import { 
    SET_PAGE
} from "../actions/types";

const INITIAL_STATE = {
    page: ''
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_PAGE:
            return { ...state, page: action.payload  };
        default: 
            return state;
    }
};