import { 
    HANDLE_RATING_CHANGE,
    HANDLE_RATING_CHANGE_ERROR,
    CLEAR_RATING,
    FETCH_RATING
} from "./types";

export const handleRatingChange = (value) => async (dispatch, getState, { getFirebase, getFirestore}) => {

    try {

        const firestore = getFirestore();
        let document = await firestore
        .collection("UserBookRatings")
        .where("uid", "==", getState().auth.user.uid)
        .where("bookEditionKey", "==", getState().book.bookKey)
        .get()

        if(!document.empty) {
            firestore.collection('UserBookRatings').doc(document.docs[0].id).set({
                rating: value,
                bookEditionKey: getState().book.bookKey,
                uid: getState().auth.user.uid,
                modifiedAt: new Date()
            }, {merge: true})
        } else {
            firestore.collection('UserBookRatings').add({
                rating: value,
                bookEditionKey: getState().book.bookKey,
                uid: getState().auth.user.uid,
                createdAt: new Date()
            })
        }

        dispatch({type: HANDLE_RATING_CHANGE, payload: value});

    } catch(err) {
        dispatch({type: HANDLE_RATING_CHANGE_ERROR, payload: err});
    }
};

export const uncheckRating = () => async (dispatch, getState, { getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    await firestore
    .collection('UserBookRatings')
    .where("uid", "==", getState().auth.user.uid)
    .where("bookEditionKey", "==", getState().book.bookKey)
    .onSnapshot((docs) => {
        if(docs.docs[0]) {
            docs.docs[0].ref.delete()
            dispatch({type: CLEAR_RATING, payload: ""});
        }
    })
};

export const fetchRating = () => async (dispatch, getState, { getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    await firestore
    .collection("UserBookRatings")
    .where("uid", "==", getState().auth.user.uid)
    .where("bookEditionKey", "==", getState().book.bookKey)
    .get()
    .then(res =>{
        console.log(res.docs[0]);
        if(res.docs[0]) {
            dispatch({type: HANDLE_RATING_CHANGE, payload: res.docs[0].data().rating});
        } else {
            dispatch({type: CLEAR_RATING, payload: ""});
        }
    })
};