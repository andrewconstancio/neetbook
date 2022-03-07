import { Textarea, Image } from '@chakra-ui/react'
import React, { useRef } from 'react'
import './Notes.css';
import { auth, firestore } from '../config/firebase-config';

const NotesInputView = ( {currentValue} ) => {
    return (
        <div className='view-outer-container'>
            <Image 
                borderRadius='full' 
                boxSize='35px' 
                src={auth.currentUser.photoURL} 
                alt={auth.currentUser.displayName} 
                style={{display: "inline-block", margin: "5px"}}
            />
            <i>{currentValue} - You </i>
        </div>
    )
}

export default NotesInputView