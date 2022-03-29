import { 
    PUT_BOOK_KEY_IN_STATE
} from "./types";

export const putBookKeyInState = (value) => async (dispatch, getState) => {
    dispatch({ type: PUT_BOOK_KEY_IN_STATE, payload: value })
};
