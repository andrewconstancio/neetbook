import { 
    SIGN_IN_GOOGLE, 
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR
} from "../actions/types";

const INITIAL_STATE = {
    isSignedIn: false,
    msg: ""
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN_SUCCESS:
            return { ...state, isSignedIn: true, msg: action.payload  };
        case SIGN_IN_ERROR:
            return { ...state, isSignedIn: false, msg: action.payload};
        default: 
            return state;
    }
};