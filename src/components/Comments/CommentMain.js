import React, {useState, useEffect } from 'react'
import NotesInput from '../../old/NotesInput';
import {
    Heading,
    Button,
    Textarea
} from "@chakra-ui/react"
import Comment from './Comment';
import {auth, firestore } from '../../config/firebase-config';
import { TailSpin } from  'react-loader-spinner'
import '../loader.css'

const CommentMain = ( {bookEditionKey} ) => {
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments();
    }, []);

    const getComments = () => {

        setLoading(true);
        
        async function fetchData() {
            await firestore
            .collection("UserBookNotes")
            .where("bookEditionKey", "==", bookEditionKey)
            .orderBy('createdAt', 'desc')
            .get()
            .then(res => {
                setComments([...res.docs])
                setLoading(false);
            })
        }
    
        fetchData();
    }

    if(!loading) {
        return (
            <div className='outer-container'>
                <div className='inner-container'>
                    <TailSpin color="rgb(255, 0, 77)" height={40} width={40} />
                </div>
            </div>
        )
    }

    return (
        <div>
            {comments.map((com, i) => {
                return (
                    <Comment key={i} uid={com.data().uid} bookEditionKey={bookEditionKey} docRef={com.ref} getComments={getComments} value={com.data().notes} />
                )
            })}
        </div>
    )
}

export default CommentMain