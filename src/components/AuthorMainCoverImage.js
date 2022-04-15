import React, {useState} from 'react'
import {
    Box,
    Image,
    Avatar,
    Text
} from "@chakra-ui/react"
import '../pages/AllBooksBySubject/Book.css'
import { Link } from 'react-router-dom'
import './CoverImagePreview.css'

const AuthorMainCoverImage = ( {authorKey, coverId, name} ) => {

    return (
        <>
            <Link to={{pathname: authorKey, state: {authorKey: authorKey, name: name}}}>
                <Avatar 
                    src={`https://covers.openlibrary.org/b/id/${coverId}.jpg`} 
                    h={[175, 250, 195]}  
                    w={[175, 250, 170]} 
                    style={{marginRight: "15px", border: "none"}}
                    className="author-cover"
                />
                <Text style={{textAlign: "center"}}>{name}</Text>
            </Link>
        </>
    )
}

export default AuthorMainCoverImage