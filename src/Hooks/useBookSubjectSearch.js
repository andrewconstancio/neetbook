import {useEffect, useState} from 'react'
import OpenLibrary from '../apis/OpenLibrary';
import axios from 'axios';

export default function useBookSubjectSearch(subject, offset) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [books, setBooks] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        async function fetchData() {
            await OpenLibrary.get(`/subjects/${subject}.json?details=true`, {
                params: { offset: offset },
                cancelToken: new axios.CancelToken(c => cancel = c)
            }).then(res => {
                setBooks(prevBooks => {
                    return [...new Set([...prevBooks, ...res.data.works])]
                })
                setHasMore(res.data.works.length > 0)
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
