import React, { useState,  useEffect } from 'react'
import {
    Heading
} from "@chakra-ui/react"
import CommentMain from './CommentMain';
import CommentNew from './CommentNew';
import Loader from '../loader';
import {auth, firestore } from '../../config/firebase-config';


const CommentSection = ({currUserPhotoURL, bookEditionKey}) => {

    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        getComments(1);
    }, []);

    const getComments = (showLoader) => {

        console.log("showLoader: " + showLoader);

        if(showLoader) setLoading(true);
        
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

    if(loading) {
        return (
            <>
                <Loader /> 
            </>
        )
    }

    return (
        <>
            <Heading as='h5' size='md' mt={5} mb={5} style={{cursor: "pointer"}}>Notes</Heading>
            {loading ? <Loader /> : <CommentNew profileURL={currUserPhotoURL} getComments={getComments} bookEditionKey={bookEditionKey} />}
            <CommentMain comments={comments} getComments={getComments} bookEditionKey={bookEditionKey} />
        </>
    )
}

export default CommentSection