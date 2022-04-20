import { useEffect, useState } from 'react'
import OpenLibrary from '../apis/OpenLibrary';
import axios from 'axios';
import { auth, firestore } from '../config/firebase-config';


export default function useBookSingleInfo(bookKey, bookEditionKey) {
    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    console.log(bookKey);

    useEffect(() =>{
        setLoading(true)
        setError(false)
        async function fetchData() {
            await OpenLibrary.get(`${bookKey}.json`)
            .then(res => {
                setBook(res.data)
                setLoading(false)
            }).catch(e => {
                if(axios.isCancel(e)) return
                setLoading(true)
            });
        }
        fetchData();
    },[])

    return {book, error, loading};
}
