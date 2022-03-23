import { Image, 
        Box, 
        Stack, 
        Text,
        HStack
} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import './Comment.css';
import { auth, firestore } from '../../config/firebase-config';
import CommentActionsPopover from './CommentActionsPopover';
import LikeButton from './LikeButton';

const Comment = ( {notes, profileURL, displayName, docRef, uid, bookEditionKey, likeCount, dislikeCount} ) => {
    return (
        <div className='view-outer-container'>
            <Stack direction={['row']} spacing='15px'>
                <Box style={{maxWidth: "50px", minWidth: "50px"}}>
                    <Image 
                        borderRadius='full' 
                        src={profileURL} 
                        alt={displayName} 
                    />
                </Box>
                <Box w="90%">
                    <Stack>
                        <Box>
                            <Text style={{display: "inline"}}>{displayName}</Text>
                            <CommentActionsPopover uid={uid} docRef={docRef} />
                        </Box>
                        <Box>
                            {notes}
                        </Box>
                        <Box>
                            <HStack spacing={4}>
                                <Box>
                                    <LikeButton docRef={docRef} likeCount={likeCount} currUID={uid} bookEditionKey={bookEditionKey} />
                                </Box>
                            </HStack>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </div>
    )
}

export default Comment