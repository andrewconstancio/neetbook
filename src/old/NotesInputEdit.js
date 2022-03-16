import React, { useRef } from 'react'
import {
    Button,
    Textarea
} from "@chakra-ui/react"

const NotesInputEdit = ( {notesRef, handleOnClick} ) => {
    return (
        <div>
            <Textarea
                id="notes_area" 
                mt={5} 
                placeholder='Your thoughts...' 
                ref={notesRef}
            >{notesRef.current}</Textarea>
            <Button onClick={handleOnClick} colorScheme='pink' size='md' style={{float: "right"}} w={{ base: '100%', md: '10%' }} mt={15}>
                Post
            </Button>
        </div>
    )
}

export default NotesInputEdit