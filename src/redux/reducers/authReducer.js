import { SIGN_IN, SIGN_OUT, SET_USER } from "../actions/types";

const INITIAL_STATE = {
    user: null
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN: 
            return { ...state, user: user  };
        case SIGN_OUT:
            return { ...state, user: user  };
        case SET_USER:
            return { ...state, user: action.payload };
        default: 
            return state;
    }
};