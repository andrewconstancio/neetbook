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
        const user = {
                displayName: re.user.displayName, 
                photoURL: re.user.photoURL, 
                uid: re.user.uid,
                email: re.user.email
            }
        dispatch(checkProfileImage(user, re.user.uid))
    })
    .catch((err) => {
        dispatch({
            type: SIGN_IN_ERROR, 
            payload: "Something went wrong, we couldn't sign you in. Please try again."
        })
    }) 
};

export const demoSignIn = () => async (dispatch, getState, { getFirebase, getFirestore}) =>{

    const firebase = getFirebase();
    const provider = new firebase.auth();

    firebase.auth().signInWithEmailAndPassword("demo.neetbook@gmail.com", "8Cat!Dog8")
    .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        dispatch({
            type: SIGN_IN_SUCCESS, 
            payload: user
        })
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
    });

    console.log("it got here");
};

export const checkProfileImage = (user, uid) => async (dispatch, getState, { getFirebase, getFirestore}) => {

    const firestore = getFirestore();
    const document = firestore
    .collection("users")
    .doc(uid)

    await document.get()
    .then((docSnapshot)  =>  {
        if (!docSnapshot.exists) {
            dispatch(setUserProfileImage(user, document));
        } else if(docSnapshot.data().profileURLGoogle !== auth.currentUser.photoURL) {
            dispatch(updateUserProfileImage(user, document));
        }
        dispatch({
            type: SIGN_IN_SUCCESS, 
            payload: user
        })
    }).catch(() => {
        dispatch({
            type: SIGN_IN_ERROR, 
            payload: "Something went wrong, we couldn't sign you in. Please try again."
        })
    })
};

export const setUserProfileImage = (user, doc) => async (dispatch, getState, { getFirebase, getFirestore}) => {
    await doc.set({
        name: auth.currentUser.displayName,
        profileURLGoogle: auth.currentUser.photoURL,
        createdAt: new Date()
    }).then(() => {
        dispatch({
            type: SIGN_IN_SUCCESS, 
            payload: user
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
            payload: user
        })
    }).catch(() =>{
        dispatch({
            type: SIGN_IN_ERROR, 
            payload: "Something went wrong, we couldn't sign you in. Please try again."
        })
    })
};