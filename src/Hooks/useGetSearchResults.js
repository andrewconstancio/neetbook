import {useEffect, useState} from 'react'
import GoogleBooks from '../apis/GoogleBooks';

    export default function useGetSearchResults(term) {
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(false)
        const [results, setResults] = useState(null)
    
        useEffect(() =>{
                setLoading(true)
                setError(false)
                async function fetchData() {
                    const resultBooks = [];
                    await GoogleBooks.get(`/v1/volumes?q=intitle:${term}&maxResults=40&langRestrict=en`)
                    .then(res => {
                        res.data.items.map((info) => {
                            resultBooks.push({id: info.id, data: info.volumeInfo});
                        })
                        setResults(resultBooks);
                        setLoading(false)
                    }).catch(e => {
                        console.log(e);
                    });
                }
                fetchData();
        },[])
    
        return {loading, error, results}
}