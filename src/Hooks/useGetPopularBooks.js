import {useEffect, useState} from 'react'
import OpenLibrary from '../apis/OpenLibrary';
import NewYorkTimes from '../apis/NewYorkTimes';
import { firestore } from '../config/firebase-config';

export default function useGetPopularBooks() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [books, setBooks] = useState([])

    useEffect(() => {
        setLoading(true)
        setError(false)

        firestore
        .collection("TrendingBooks")
        .onSnapshot(async (snapshot) => {
            const tBooks = [];
            const request = snapshot.docs.map( async (doc) => {
                const url = `/isbn/${doc.data().isbn}.json?details=true`;
                return OpenLibrary.get(url).then(res => {
                    tBooks.push(res.data);
                });
            })

            await Promise.all(request);
            setBooks(tBooks);
            setLoading(false);
        })
    }, []);

    return {loading, error, books}
}