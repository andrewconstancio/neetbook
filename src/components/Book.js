import React, {useState} from 'react'
import {
    Box,
    Image
} from "@chakra-ui/react"
import '../pages/AllBooksBySubject/Book.css'
import { Link } from 'react-router-dom'

const Book = ( {coverId, lastElemRef, edition, title, bookKey} ) => {
    console.log("edition: " + edition);
    return (
        <div>
            <Link to={{pathname: `/book/${edition}`, state: {bookKey: bookKey, bookEditionKey: edition} }}>
                <Box ref={lastElemRef} className='book'>
                    <Image
                        src={`https://covers.openlibrary.org/b/id/${coverId}.jpg`}
                        h={[450, 350, 450]}  
                        alt={title} 
                        style={{borderRadius: "20px"}}
                    />
                </Box>
            </Link>
        </div>
    )
}

export default Book