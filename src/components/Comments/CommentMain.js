import React, {useState, useEffect } from 'react'
import NotesInput from '../../components/NotesInput';
import {
    Heading,
    Button,
    Textarea
} from "@chakra-ui/react"
import Comment from './Comment';
import {auth, firestore } from '../../config/firebase-config';
import CommentNew from './CommentNew';

const CommentMain = ( {bookEditionKey} ) => {
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments();
    }, []);

    const getComments = () => {

        console.log("it got here")
        async function fetchData() {
            await firestore
            .collection("UserBookNotes")
            .where("bookEditionKey", "==", bookEditionKey)
            .orderBy('createdAt', 'desc')
            .get()
            .then(res => {
                setComments([...res.docs])
            })
        }
    
        fetchData();
    }

    return (
        <div>
            <Heading as='h5' size='md' mt={5} mb={5} style={{cursor: "pointer"}}>Comments</Heading>
            <CommentNew profileURL={auth.currentUser.photoURL} bookEditionKey={bookEditionKey} getComments={getComments} />
            <hr style={{opacity: "0.3"}} />
            {comments.map((com) => {
                return (
                    <Comment key={com.data().uid} uid={com.data().uid} bookEditionKey={bookEditionKey} value={com.data().notes} />
                )
            })}
        </div>
    )
}

export default CommentMain