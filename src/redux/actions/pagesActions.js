import { 
    SET_PAGE
} from "./types";

export const setPage = value => async (dispatch, getState) => {
    dispatch({type: SET_PAGE, payload: value})
};