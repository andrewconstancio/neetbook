import React, {useState} from 'react'
import {
    Box,
    Image
} from "@chakra-ui/react"
import '../pages/AllBooksBySubject/Book.css'
import { Link } from 'react-router-dom'
import './CoverImagePreview.css'

const Book = ( {coverId, lastElemRef, edition, title, bookKey} ) => {

    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <>
            <Link to={{pathname: `/book/${edition}`, state: {bookKey: bookKey, bookEditionKey: edition, coverId: coverId} }}>
                <Box ref={lastElemRef} className='book'>
                    <Image
                        src={`https://covers.openlibrary.org/b/id/${coverId}.jpg`}
                        h={[300, 400, 300]}  
                        w={[175, 250, 175]} 
                        // h={[300, 400, 400]}  
                        // w={[175, 250, 250]} 
                        alt={title} 
                        style={{borderRadius: "20px"}}
                        className={imageLoaded ? "cover-preview" : "shimmmer"}
                        onLoad={() => setImageLoaded(true)}
                    />
                </Box>
            </Link>
        </>
    )
}

export default Book