import { 
    SIGN_IN_GOOGLE, 
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR
} from "../actions/types";

const INITIAL_STATE = {
    user: null,
    msg: ""
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case SIGN_IN_SUCCESS:
            return { ...state, user: action.payload, msg: "Success"  };
        case SIGN_IN_ERROR:
            return { ...state, user: null, msg: action.payload};
        default: 
            return state;
    }
};