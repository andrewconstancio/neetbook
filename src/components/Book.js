import React, {useState} from 'react'
import {
    Box,
    Image
} from "@chakra-ui/react"
import '../pages/AllBooksBySubject/Book.css'
import { Link } from 'react-router-dom'
import './CoverImagePreview.css'
import {useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../redux';

const Book = ( {coverId, lastElemRef, edition, title, bookKey} ) => {

    const [imageLoaded, setImageLoaded] = useState(false);
    const dispatch = useDispatch();
    const { setPage } = bindActionCreators(actionCreators, dispatch);

    return (
        <>
            <Link to={{pathname: `/book/${edition}`, state: {bookKey: bookKey, bookEditionKey: edition, coverId: coverId} }}>
                <Box ref={lastElemRef} className='book' onClick={() => setPage('book')}>
                    <Image
                        src={`https://covers.openlibrary.org/b/id/${coverId}.jpg`}
                        w={[175, 150, 175]}
                        h={[275, 275, 300]}  
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