import {useEffect, useState} from 'react'
import OpenLibrary from '../apis/OpenLibrary';
import { firestore } from '../config/firebase-config';
import { useSelector } from 'react-redux';

export default function useGetUserCurrentlyReading() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [books, setBooks] = useState([])
    const user = useSelector((state) => state.auth.user)

    console.log(user.uid);

    useEffect(() => {
        setLoading(true)
        setError(false)
        firestore
        .collection("UserBookRead")
        .where("uid", "==", user.uid)
        .where("currentlyReading", "==", true)
        .orderBy('createdAt', 'desc')
        .onSnapshot( async (snapshot) => {
            const bookArr = [];
            const request = snapshot.docs.map( async (doc) => {
                const url = `books/${doc.data().bookEditionKey}.json`;
                return OpenLibrary.get(url).then(res => {
                    bookArr.push(res.data);
                    // bookArr.push({bookEditionKey: doc.data().bookEditionKey, data: res.data});
                });
            })
            await Promise.all(request);
            setBooks(bookArr);
            setLoading(false);
        })
    }, []);

    return {loading, error, books}
}