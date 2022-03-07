import {useEffect, useState} from 'react'
import { auth, firestore } from '../config/firebase-config';

export default function useBookUserInfo(bookKey, bookEditionKey) {
    const [ratingChanged, setRatingChanged] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);


    useEffect(() => {

        async function fetchData() {
            let doc = await firestore
            .collection("UserBookRatings")
            .where("uid", "==", auth.currentUser.uid)
            .where("bookEditionKey", "==", bookEditionKey)
            .get()

            if(doc.docs[0]) {
                if(doc.docs[0].data().rating) {
                    setRatingValue(doc.docs[0].data().rating)
                    setRatingChanged(true)
                }
                setHasRead(doc.docs[0].data().read)
            }
        }

        fetchData();
    }, []);

    return {ratingChanged, ratingValue, hasRead, setRatingChanged, setRatingValue, setHasRead}
}