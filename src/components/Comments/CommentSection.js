import React, { useState,  useEffect, useRef } from 'react'
import {
    Heading,
    Button,
    Textarea,
    Stack,
    Box,
    Image,
    Avatar
} from "@chakra-ui/react"
import Loader from '../loader';
import {firestore } from '../../config/firebase-config';
import ResizeTextarea from "react-textarea-autosize";
import Comment from './Comment';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux'

const CommentSection = ({ bookEditionKey}) => {

    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const notesRef = useRef('');
    const [notes, setNotes] = useState('');
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    // const { fetchComments } = bindActionCreators(actionCreators, dispatch);
    // const comments = useSelector((state) => state.comments.comments)

    useEffect(() => {
        // fetchComments(bookEditionKey);
        firestore
        .collection("UserBookComments")
        .where("bookEditionKey", "==", bookEditionKey)
        .orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) => {
            setComments(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                    ref: doc.ref
                }))
            )
        });
    }, []);

    const handleOnClick = async () => {
        if(!notes.trim()) {
            alert("no notes");
            return
        }
        firestore.collection('UserBookComments').add({
            notes: notes,
            bookEditionKey: bookEditionKey,
            uid: user.uid,
            displayName: user.displayName,
            profileURL: user.photoURL,
            likeCount: 0,
            dislikeCount: 0,
            createdAt: new Date()
        })
        setNotes('');
    }

    return (
        <>
            <Heading as='h5' size='md' mt={5} mb={5} style={{cursor: "pointer"}}>Notes</Heading>
            <div style={{padding: "5px", marginBottom: "15px"}}>
                <Stack direction={['row']} spacing='15px'>
                    <Box style={{maxWidth: "50px", minWidth: "50px"}}>
                        <Avatar src={user.photoURL} name={user.displayName}  />
                    </Box>
                    <hr />
                    <Box w="90%">
                        <Textarea 
                            size="sm" 
                            focusBorderColor="none" 
                            border="none" 
                            resize="none"
                            placeholder='Your thoughts...' 
                            as={ResizeTextarea}
                            overflow="hidden"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            // ref={notesRef}
                            ></Textarea>
                        <Button 
                            onClick={handleOnClick} 
                            colorScheme='pink' 
                            size='md' 
                            style={{float: "right"}} 
                            w={{ base: '100%', sm: '10%' }} 
                            mt={15}
                            disabled={notes.length==0 || notes.trim() == ''}
                        >
                            Post
                        </Button>
                    </Box>
                </Stack>
                <hr style={{marginTop: "20px", opacity: "0.3"}} />
            </div>
            {comments.map(({id, ref, data: {uid, notes, profileURL, displayName, likeCount, dislikeCount, createdAt }}) => {
                return(
                    <Comment 
                        key={id}
                        notes={notes}
                        profileURL={profileURL}
                        displayName={displayName}
                        commentDocID={id}
                        commentUID={uid}
                        docRef={ref}
                        bookEditionKey={bookEditionKey}
                        likeCount={likeCount}
                        dislikeCount={dislikeCount}
                        createdAt={createdAt}
                    />
                )
            })}
        </>
    )
}

export default CommentSection