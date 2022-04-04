import {useEffect, useState} from 'react'
import OpenLibrary from '../apis/OpenLibrary';
import { firestore } from '../config/firebase-config';

export default function useGetPopularBooks() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [authors, setAuthors] = useState([])

    useEffect(() => {
        setLoading(true)
        setError(false)
        firestore
        .collection("TopAuthors")
        .onSnapshot(async (snapshot) => {
            const authorsArr = [];
            const request = snapshot.docs.map( async (doc) => {
                const url = `/authors/${doc.data().authorKey}.json`;
                return OpenLibrary.get(url).then(res => {
                    authorsArr.push(res.data);
                });
            })

            await Promise.all(request);
            setAuthors(authorsArr);
            setLoading(false);
        })
    }, []);

    return {loading, error, authors}
}