import { 
    SIGN_IN, 
    SIGN_OUT,
    LOGGED_IN,
    SET_USER
} from "./types";

export const signIn = () => async (dispatch, getState, { getFirebase, getFirestore}) =>{

    const firebase = getFirebase();

    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
    .then((re) => {
        console.log("re: " + JSON.stringify(re));
    })
    .catch((err) => {
        console.log(err);
    }) 


    return (dispatch) => {
        dispatch({
            type: SIGN_IN,
            payload: uid
        })
    }
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const setUser = user => async (dispatch, getState) => {
    dispatch({
        type: SET_USER, 
        payload: user
    })
};