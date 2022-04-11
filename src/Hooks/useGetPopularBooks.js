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

        // console.log("process.env.REACT_APP_NEW_YORK_TIMES_API_KEY: " + process.env.REACT_APP_NEW_YORK_TIMES_API_KEY);

        // const urlNewYorktime = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=YnfINN7ZG1aH7zkqEooljdQiBXOivgiY`;

        // NewYorkTimes.get(urlNewYorktime).then(async res => {
        //     const newYorktimeBooks = res.data.results.books;
        //     const tBooks = [];
        //     const request = newYorktimeBooks.map( async (book) => {
        //         if(book.isbns[0].isbn13 == '') {
        //             var isbn = book.isbns[1].isbn13;
        //         } else {
        //             var isbn = book.isbns[0].isbn13;
        //         }
        //         console.log(isbn);
        //         const url = `/isbn/${isbn}.json?details=true`;
        //         return OpenLibrary.get(url).then(res => {
        //             tBooks.push(res.data);
        //         });
        //     })

        //     console.log("tBooks: " + JSON.stringify(tBooks));

        //     await Promise.all(request);
        //     setBooks(tBooks);
        //     setLoading(false);
        // })


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