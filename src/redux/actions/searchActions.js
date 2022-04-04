import { 
    SEARCH
} from "./types";
import OpenLibrary from '../../apis/OpenLibrary';


export const search = (term) => async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch({type: SEARCH, payload: term});
};

export const clearSearch = () => async (dispatch, getState, {getFirebase, getFirestore}) => {
    dispatch({type: SEARCH, payload: ''});
};
