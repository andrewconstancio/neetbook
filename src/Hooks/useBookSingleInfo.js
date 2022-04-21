import { useEffect, useState } from 'react'
import OpenLibrary from '../apis/OpenLibrary';
import axios from 'axios';
import { auth, firestore } from '../config/firebase-config';


export default function useBookSingleInfo(bookKey, bookEditionKey) {
    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(true)

    useEffect(() =>{

        setLoading(true)
        async function fetchData() {
            await OpenLibrary.get(`${bookKey}.json`)
            .then(res => {
                setBook(res.data)
                setLoading(false)
                setError(false)
            }).catch(e => {
                if(axios.isCancel(e)) return
                setLoading(true)
            });
        }
        if(bookKey && bookEditionKey) {
            fetchData();
        } else {
            setLoading(false)
        }
    },[])

    return {book, error, loading};
}
