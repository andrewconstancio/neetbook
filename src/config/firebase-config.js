import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; 

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
//     measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID 
// };

const firebaseConfig = {
    apiKey: "AIzaSyC7QPGZ4bly5okSQ1BAmj6eC5gurBp53MU",
    authDomain: "neetbook-71cb0.firebaseapp.com",
    projectId: "neetbook-71cb0",
    storageBucket: "neetbook-71cb0.appspot.com",
    messagingSenderId: "51835178688",
    appId: "1:51835178688:web:0b4536d1682160dc6e2725",
    measurementId: "G-YVF0SS6GEV"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default};