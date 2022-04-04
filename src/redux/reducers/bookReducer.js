import { 
    PUT_BOOK_KEY_IN_STATE,
    FETCH_TRENDING_BOOKS
} from "../actions/types";

const INITIAL_STATE = {
    bookKey: null,
    trendingBooks: []
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case PUT_BOOK_KEY_IN_STATE:
            return { ...state, bookKey: action.payload  };
        case FETCH_TRENDING_BOOKS:
                return { ...state, trendingBooks: trendingBooks.concat(action.payload) };
        default: 
            return state;
    }
};