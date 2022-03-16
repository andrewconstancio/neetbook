import { Image, 
        Box, 
        Stack, 
        Text
} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import './Comment.css';
import { auth, firestore } from '../../config/firebase-config';
import CommentActionsPopover from './CommentActionsPopover';
const Comment = ( {value, setHasNotes, uid, docRef, getComments} ) => {

    const [profileURL, setProfileURL] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        async function fetchData() {
            const document = firestore
            .collection("users")
            .doc(uid)

            document.get()
            .then((docSnapshot) => {
                setProfileURL(docSnapshot.data().profileURLGoogle);
                setName(docSnapshot.data().name);
            })
        }
        if(uid) fetchData();
    }, [uid]);

    return (
        <div className='view-outer-container'>
            <Stack direction={['row']} spacing='15px'>
                <Box style={{maxWidth: "50px", minWidth: "50px"}}>
                    <Image 
                        borderRadius='full' 
                        src={profileURL} 
                        alt={name} 
                    />
                </Box>
                <Box w="90%">
                    <Stack>
                        <Box>
                            <Text style={{display: "inline"}}>{auth.currentUser.displayName}</Text>
                            <CommentActionsPopover uid={uid} docRef={docRef} getComments={getComments} />
                        </Box>
                        <Box>
                            {value}
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </div>
    )
}

export default Comment