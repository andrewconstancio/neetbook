import { useEffect, useState } from 'react'
import OpenLibrary from '../apis/OpenLibrary';
import axios from 'axios';
import GoogleBooks from '../apis/GoogleBooks';


export default function useBookSingleInfo(bookId) {
    const [book, setBook] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    useEffect(() =>{
        setLoading(true)
        setError(false)
        async function fetchData() {
            await GoogleBooks.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
            .then(res => {
                setBook(res.data.volumeInfo)
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
