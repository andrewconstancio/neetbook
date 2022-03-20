import React, { useState, useEffect } from 'react'
import {  
    Text,
} from '@chakra-ui/react'
import { firestore } from '../../config/firebase-config';

const LikeButton = ( {docRef, currUID, bookEditionKey} ) => {

    const [userHasLiked, setUserHasLiked] = useState(false);
    const [likes, setLikes] = useState(0);

    const handleLike = () => {

        firestore.collection('UserBookLikes').add({
            commentID: docRef.id,
            uid: currUID,
            bookEditionKey: bookEditionKey,
            createdAt: new Date()
        })
        
        setLikes(likes + 1);
        setUserHasLiked(true);
    }

    useEffect(() => {
        const document = firestore
        .collection("UserBookLikes")
        .where("bookEditionKey", "==", bookEditionKey)
        .where("commentID", "==", docRef.id)
        document.get()
        .then((docSnapshot) => {
            docSnapshot.docs.forEach((doc) => {
                if(doc.data().uid === currUID) {
                    setUserHasLiked(true)
                }
            }) 
            setLikes(docSnapshot.docs.length);
        })
    }, [])

    return (
        <>
            {!userHasLiked ? (
                <i onClick={handleLike} className="fa-regular fa-thumbs-up like-button"></i>
            ) : (
                <i className="fa-solid fa-thumbs-up like-button"></i>
            )}

            <Text style={{display: "inline"}} fontSize='xs'>{likes > 0 ? likes : ''}</Text>
        </>
    )
}

export default LikeButton