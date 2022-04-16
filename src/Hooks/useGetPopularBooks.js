import {useEffect, useState} from 'react'
import OpenLibrary from '../apis/OpenLibrary';
import NewYorkTimes from '../apis/NewYorkTimes';
import { firestore } from '../config/firebase-config';
import GoogleBook from '../apis/GoogleBooks';

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
                const url = `/v1/volumes?q=isbn:${doc.data().isbn}`;
                return GoogleBook.get(url).then(res => {
                    if(res.data) {
                        // console.log(res.data.items[0].volumeInfo);
                        if(res.data.items) {
                            tBooks.push({id: res.data.items[0].id, data: res.data.items[0].volumeInfo});
                        }
                    }
                });
            })

            await Promise.all(request);
            console.log(tBooks);
            setBooks(tBooks);
            setLoading(false);
        })
    }, []);

    return {loading, error, books}
}