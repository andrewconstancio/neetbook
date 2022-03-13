import { Image, Box, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import './Comment.css';
import { auth } from '../../config/firebase-config';

const Comment = ( {value, setHasNotes} ) => {
    return (
        <div className='view-outer-container'>
            <Stack direction={['row']} spacing='15px'>
                <Box style={{maxWidth: "50px", minWidth: "50px"}}>
                    <Image 
                        borderRadius='full' 
                        src={auth.currentUser.photoURL} 
                        alt={auth.currentUser.displayName} 
                    />
                </Box>
                <Box w="90%">
                    <Stack>
                        <Box>
                            <Text>{auth.currentUser.displayName}</Text>
                        </Box>
                        <Box>
                            {value}
                        </Box>
                    </Stack>
                </Box>
                {/* <Box>
                    <i className="fa-solid fa-pen"
                        onClick={(() => setHasNotes(false))}
                    > 
                    </i>
                </Box> */}
            </Stack>
        </div>
    )
}

export default Comment