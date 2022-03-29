import { 
    PUT_BOOK_KEY_IN_STATE
} from "../actions/types";

const INITIAL_STATE = {
    bookKey: null,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PUT_BOOK_KEY_IN_STATE:
            return { ...state, bookKey: action.payload  };
        default: 
            return state;
    }
};