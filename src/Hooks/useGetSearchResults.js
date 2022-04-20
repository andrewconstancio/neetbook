import {useEffect, useState} from 'react'
import OpenLibrary from '../apis/OpenLibrary';
import { firestore } from '../config/firebase-config';
import axios from 'axios';

export default function useGetSearchResults(term) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [results, setResults] = useState(null)

    useEffect(() =>{
            setLoading(true)
            setError(false)
            async function fetchData() {
                await OpenLibrary.get(`/search.json?q=${term.toLowerCase()}`)
                .then(res => {
                    setResults(res.data.docs)
                    setLoading(false)
                }).catch(e => {
                    if(axios.isCancel(e)) return
                    setLoading(true)
                    setError(true)
                });
            }
            fetchData();
    },[])

    return {loading, error, results}
}