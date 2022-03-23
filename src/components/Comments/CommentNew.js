import React, { useRef } from 'react'
import {
    Button,
    Textarea,
    Stack,
    Box,
    Image
} from "@chakra-ui/react"
import { auth, firestore } from '../../config/firebase-config';
import getComments from '../../Hooks/useGetComments'
import ResizeTextarea from "react-textarea-autosize";
import Comment from './Comment';

const CommentNew = ({bookEditionKey, profileURL, getComments}) => {

    const notesRef = useRef('');

    const handleOnClick = async () => {

        const notes = notesRef.current.value;
        if(!notes.trim()) {
            alert("no notes");
            return
        }
        firestore.collection('UserBookNotes').add({
            notes: notes,
            bookEditionKey: bookEditionKey,
            uid: auth.currentUser.uid,
            createdAt: new Date()
        })
        notesRef.current.value = '';
        getComments(1);

    }

    return (
        <div style={{padding: "5px", marginBottom: "15px"}}>
            <Stack direction={['row']} spacing='15px'>
                <Box style={{maxWidth: "50px", minWidth: "50px"}}>
                    <Image 
                        borderRadius='full' 
                        src={profileURL} 
                        alt={"yo"} 
                    />
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
                        ref={notesRef}></Textarea>
                    <Button onClick={handleOnClick} colorScheme='pink' size='md' style={{float: "right"}} w={{ base: '100%', sm: '10%' }} mt={15}>
                        Post
                    </Button>
                </Box>
            </Stack>
            <hr style={{marginTop: "20px", opacity: "0.3"}} />

        </div>
    )
}

export default CommentNew
