import {useEffect, useState} from 'react'
import OpenLibrary from '../apis/OpenLibrary';
import axios from 'axios';

export default function useGetBooksByAuthor(name, authorKey, offset) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [books, setBooks] = useState([])
    const [hasMore, setHasMore] = useState(false)


    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        async function fetchData() {
            await OpenLibrary.get(`/search.json?author=${name.split(' ').join('+')}`, {
                params: { offset: offset },
                cancelToken: new axios.CancelToken(c => cancel = c)
            }).then(res => {
                setBooks(prevBooks => {
                    return [...new Set([...prevBooks, ...res.data.docs])]
                })
                setHasMore(res.data.docs.length > 0)
                setLoading(false)
            }).catch(e => {
                if(axios.isCancel(e)) return
                setLoading(true)
            });
        }
        fetchData();
    }, [offset]);

    return {loading, error, books, hasMore}
}