import { 
    FETCH_COMMENTS
} from "./types";

export const fetchComments = (bookEditionKey) => async (dispatch, getState, { getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore
    .collection("UserBookComments")
    .where("bookEditionKey", "==", bookEditionKey)
    .orderBy('createdAt', 'desc')
    .onSnapshot((snapshot) => {
        dispatch({type: FETCH_COMMENTS, payload: snapshot.docs});
    });
};