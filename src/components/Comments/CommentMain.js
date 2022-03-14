import React, {useState, useEffect } from 'react'
import NotesInput from '../../components/NotesInput';
import {
    Heading,
} from "@chakra-ui/react"
import Comment from './Comment';
import { firestore } from '../../config/firebase-config';

const CommentMain = ( {bookEditionKey} ) => {
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);

    useEffect(() => {

        async function fetchData() {
            await firestore
            .collection("UserBookNotes")
            .where("bookEditionKey", "==", bookEditionKey)
            .get()
            .then(res => {
                setComments([...res.docs])
            })
        }
    
        fetchData();
    }, []);

    return (
        <div>
            <Heading as='h5' size='md' mt={5} mb={5} style={{cursor: "pointer"}}>Comments</Heading>
            {comments.map((com) => {
                return (
                    <Comment key={com.data().uid} uid={com.data().uid} bookEditionKey={bookEditionKey} value={com.data().notes} />
                )
            })}
        </div>
    )
}

export default CommentMain