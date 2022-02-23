import React, {useState} from 'react'
import {
    Box,
    Image
} from "@chakra-ui/react"
import '../pages/AllBooksBySubject/Book.css'
import { Link } from 'react-router-dom'

const Book = ( {coverId, lastElemRef, edition, title, bookKey} ) => {
    return (
        <div>
            <Link to={{pathname: `/book/${edition}`, state: {bookKey: bookKey} }}>
                <Box ref={lastElemRef} className='book'>
                    <Image
                        src={`https://covers.openlibrary.org/b/id/${coverId}.jpg`}
                        w='240px' 
                        h='350px' 
                        alt="yo" 
                        style={{borderRadius: "20px"}}
                    />
                </Box>
            </Link>
        </div>
    )
}

export default Book