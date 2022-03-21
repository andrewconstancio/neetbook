import { 
    SIGN_IN_SUCCESS,
    SIGN_IN_ERROR,
} from "./types";
import { auth } from '../../config/firebase-config'

export const signInWithGoogle = () => async (dispatch, getState, { getFirebase, getFirestore}) =>{

    const firebase = getFirebase();
    const provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
    .then((re) => {
        dispatch(checkProfileImage(re.user.uid))
    })
    .catch((err) => {
        dispatch({
            type: SIGN_IN_ERROR, 
            payload: "Something went wrong, we couldn't sign you in. Please try again."
        })
    }) 
};

export const checkProfileImage = (uid) => async (dispatch, getState, { getFirebase, getFirestore}) => {

    const firestore = getFirestore();
    const document = firestore
    .collection("users")
    .doc(uid)

    await document.get()
    .then((docSnapshot)  =>  {
        if (!docSnapshot.exists) {
            dispatch(setUserProfileImage(document));
        } else if(docSnapshot.data().profileURLGoogle !== auth.currentUser.photoURL) {
            dispatch(updateUserProfileImage(document));
        }
        dispatch({
            type: SIGN_IN_SUCCESS, 
            payload: "Your were successfuly signed in!"
        })
    }).catch(() => {
        dispatch({
            type: SIGN_IN_ERROR, 
            payload: "Something went wrong, we couldn't sign you in. Please try again."
        })
    })
};

export const setUserProfileImage = (doc) => async (dispatch, getState, { getFirebase, getFirestore}) => {
    await doc.set({
        name: auth.currentUser.displayName,
        profileURLGoogle: auth.currentUser.photoURL,
        createdAt: new Date()
    }).then(() => {
        dispatch({
            type: SIGN_IN_SUCCESS, 
            payload: "Your were successfuly signed in!"
        })
    }).catch(() =>{
        dispatch({
            type: SIGN_IN_ERROR, 
            payload: "Something went wrong, we couldn't sign you in. Please try again."
        })
    })
};

export const updateUserProfileImage = (doc) => async (dispatch, getState, { getFirebase, getFirestore}) => {
    await doc.set({
        profileURLGoogle: auth.currentUser.photoURL
    }).then(() => {
        dispatch({
            type: SIGN_IN_SUCCESS, 
            payload: "Your were successfuly signed in!"
        })
    }).catch(() =>{
        dispatch({
            type: SIGN_IN_ERROR, 
            payload: "Something went wrong, we couldn't sign you in. Please try again."
        })
    })
};