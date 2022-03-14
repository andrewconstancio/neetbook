import { Image, 
        Box, 
        Stack, 
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
import React, {useEffect, useState} from 'react'
import './Comment.css';
import { auth, firestore } from '../../config/firebase-config';

const Comment = ( {value, setHasNotes, uid} ) => {

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
                            <Popover>
                                <PopoverTrigger>
                                    <i style={{float: "right", marginTop: "4px", opacity: "0.5"}} className="fa-solid fa-ellipsis-vertical"></i>
                                </PopoverTrigger>
                                <PopoverContent color='white' bg='#282828' style={{border: "none"}}  >
                                    <PopoverBody>
                                        <HStack>
                                            <Box>
                                                <i className="fa-solid fa-trash-can"></i>
                                            </Box>
                                            <Box>
                                                <Text>Delete</Text>
                                            </Box>
                                        </HStack>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </Box>
                        <Box>
                            {value}
                        </Box>
                        <Box>
                            {/* <HStack spacing={15}>
                                <Box>
                                    <i class="fa-solid fa-thumbs-up"></i>
                                </Box>
                                <Box>
                                    <i class="fa-solid fa-thumbs-down"></i>
                                </Box>
                            </HStack> */}
                        </Box>
                    </Stack>
                </Box>
            </Stack>
        </div>
    )
}

export default Comment