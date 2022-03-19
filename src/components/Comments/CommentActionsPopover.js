import React from 'react'
import {
    Box,
    Text,
    HStack,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
} from '@chakra-ui/react'
import './Comment.css'
import { auth } from '../../config/firebase-config';

const CommentActionsPopover = ( {uid, docRef, getComments} ) => {

    const handleEdit = () => {
        console.log("edit");
    }

    const handleDelete = () => {
        docRef.delete();
        getComments(0);
    }

    const handleReport = () => {
        console.log("report");
    }

    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <i className="fa-solid fa-ellipsis-vertical action-comment"></i>
                </PopoverTrigger>
                { (uid == auth.currentUser.uid) ? (
                    <PopoverContent color='white' bg='#282828' style={{border: "none"}}  >
                        <PopoverBody className="popover-body">
                            <Box onClick={handleEdit} className="comment-action-item">
                                <HStack>
                                    <Box>
                                        <i className="fa-solid fa-pen"></i>
                                    </Box>
                                    <Box>
                                        <Text>Edit</Text>
                                    </Box>
                                </HStack>
                            </Box>
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
                <PopoverContent color='white' bg='#282828' style={{border: "none"}}  >
                <PopoverBody className="popover-body">
                        <Box onClick={handleReport} className="comment-action-item">
                            <HStack>
                                <Box>
                                    <i className="fa-solid fa-flag"></i>
                                </Box>
                                <Box>
                                    <Text>Report</Text>
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