import { 
    PUT_BOOK_KEY_IN_STATE,
    FETCH_TRENDING_BOOKS
} from "./types";
import OpenLibrary from '../../apis/OpenLibrary';

export const putBookKeyInState = (value) => async (dispatch, getState) => {
    dispatch({ type: PUT_BOOK_KEY_IN_STATE, payload: value })
};

export const fetchTrendingBooks = () => async (dispatch, getState, {getFirebase, getFirestore}) => {

    let firestore = getFirestore();
    const arr = [];

    await firestore
    .collection("TrendingBooks")
    .onSnapshot((snapshot) => {
        snapshot.docs.map( (doc) => {
            const response =  OpenLibrary.get(`/isbn/${doc.data().isbn}.json?details=true`);
            arr.concat(response.data)
        })

        console.log(arr);
    });
};

