import { Textarea, Image, Box, HStack } from '@chakra-ui/react'
import React, { useRef } from 'react'
import './Notes.css';
import { auth, firestore } from '../config/firebase-config';

const NotesInputView = ( {currentValue, setHasNotes} ) => {
    return (
        <div className='view-outer-container'>
            <HStack spacing='15px'>
                <Box>
                    <Image 
                        borderRadius='full' 
                        style={{width: "50px", verticalAlign: "top"}}
                        src={auth.currentUser.photoURL} 
                        alt={auth.currentUser.displayName} 
                    />
                </Box>
                <Box
                    width={"90%"}
                    >
                    "<i>{currentValue}</i>"
                </Box>
                <Box>
                    <i className="fa-solid fa-pen"
                        onClick={(() => setHasNotes(false))}
                    >
                     
                    </i>
                </Box>
            </HStack>
        </div>
    )
}

export default NotesInputView