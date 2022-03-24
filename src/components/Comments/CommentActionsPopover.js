import React from 'react'
import {
    Box,
    Text,
    HStack,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody
} from '@chakra-ui/react'
import './Comment.css'
import { useSelector } from 'react-redux';
import { firestore } from '../../config/firebase-config';

const CommentActionsPopover = ( {commentDocID, commentUID, docRef} ) => {
    const user = useSelector((state) => state.auth.user);


    const handleDelete = () => {
        docRef.delete();
    }

    const handleReport = () => {
        firestore
        .collection('UserBookCommentReported')
        .add({
            reportedDocID: commentDocID,
            reporterUID: user.uid,
            createdAt: new Date()
        })
    }

    return (
        <>
            <Popover closeOnBlur={false}>
                <PopoverTrigger>
                    <i className="fa-solid fa-ellipsis-vertical action-comment"></i>
                </PopoverTrigger>
                { (commentUID == user.uid) ? (
                    <PopoverContent color='white' bg='#282828' style={{border: "none", width: "125px"}}  >
                        <PopoverBody className="popover-body">
                            {/* <Box onClick={handleEdit} className="comment-action-item">
                                <HStack>
                                    <Box>
                                        <i className="fa-solid fa-pen"></i>
                                    </Box>
                                    <Box>
                                        <Text>Edit</Text>
                                    </Box>
                                </HStack>
                            </Box> */}
                            <Box onClick={handleDelete} className="comment-action-item">
                                <HStack>
                                    <Box>
                                        <i className="fa-solid fa-trash-can"></i>
                                    </Box>
                                    <Box>
                                        <Text>Delete</Text>
                                    </Box>
                                </HStack>
                            </Box>
                        </PopoverBody>
                    </PopoverContent>
            ) : (
                <PopoverContent color='white' bg='#282828' style={{border: "none", width: "125px"}}  >
                <PopoverBody className="popover-body">
                        <Box onClick={handleReport} className="comment-action-item">
                            <HStack>
                                <Box>
                                    <i className="fa-solid fa-flag"></i>
                                </Box>
                                <Box>
                                    <span>Report</span>
                                </Box>
                            </HStack>
                        </Box>
                    </PopoverBody>
                </PopoverContent>
            )}
            </Popover>
        </>
    )
}

export default CommentActionsPopover