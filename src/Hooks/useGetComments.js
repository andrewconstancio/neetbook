import {useEffect, useState} from 'react'
import { firestore } from '../config/firebase-config';

export default function getComments(bookId, showLoader) {
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(false)


    useEffect(() => {
        if(showLoader) setLoading(true);
        
        async function fetchData() {
            await firestore
            .collection("UserBookNotes")
            .where("bookId", "==", bookId)
            .orderBy('createdAt', 'desc')
            .get()
            .then(res => {
                setComments([...res.docs])
                setLoading(false);
            })
        }
    
        fetchData();
    }, []) 

    return {loading, error, comments}
}