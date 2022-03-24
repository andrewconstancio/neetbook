import { Box, 
        Stack, 
        Text,
        HStack,
        Avatar
} from '@chakra-ui/react'
import React from 'react'
import './Comment.css';
import CommentActionsPopover from './CommentActionsPopover';
import LikeButton from './LikeButton';
import DislikeButton from './DislikeButton';

const Comment = ( {notes, profileURL, displayName, commentDocID, commentUID, docRef, bookEditionKey, likeCount, dislikeCount} ) => {
    return (
        <div className='view-outer-container'>
            <Stack direction={['row']} spacing='15px'>
                <Box style={{maxWidth: "50px", minWidth: "50px"}}>
                    <Avatar src={profileURL} name={displayName}  />
                </Box>
                <Box w="90%">
                    <Stack>
                        <Box>
                            <Text style={{display: "inline"}}>{displayName}</Text>
                            <CommentActionsPopover commentDocID={commentDocID} commentUID={commentUID} docRef={docRef} />
                        </Box>
                        <Box>
                            {notes}
                        </Box>
                        <Box>
                            <HStack spacing={4}>
                                <Box>
                                    <LikeButton docRef={docRef} likeCount={likeCount} bookEditionKey={bookEditionKey} />
                                </Box>
                                {/* <Box>
                                    <DislikeButton docRef={docRef} dislikeCount={dislikeCount} bookEditionKey={bookEditionKey} />
                                </Box> */}
                            </HStack>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </div>
    )
}

export default Comment