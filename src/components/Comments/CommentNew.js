import React, { useRef } from 'react'
import {
    Button,
    Textarea,
    Stack,
    Box,
    Image
} from "@chakra-ui/react"
import { auth, firestore } from '../../config/firebase-config';

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

        getComments();
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
                    <Textarea size="sm" focusBorderColor="none" border="none" placeholder='Your thoughts...' ref={notesRef}></Textarea>
                    <Button onClick={handleOnClick} colorScheme='pink' size='md' style={{float: "right"}} w={{ base: '100%', md: '10%' }} mt={15}>
                        Post
                    </Button>
                </Box>
            </Stack>
        </div>
    )
}

export default CommentNew
