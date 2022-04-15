import React, { useState, useEffect } from 'react'
import {  
    Text,
} from '@chakra-ui/react'
import { firestore } from '../../config/firebase-config';
import { useSelector } from 'react-redux';

const LikeButton = ( {docRef, bookId, likeCount } ) => {

    const [userHasLiked, setUserHasLiked] = useState(false);
    const [likes, setLikes] = useState(likeCount);
    const user = useSelector((state) => state.auth.user);

    const handleLike = () => {
        firestore
        .collection('UserBookCommentLikes')
        .doc(user.uid)
        .collection("commentLikes")
        .add({
            commentID: docRef.id,
            uid: user.uid,
            bookId: bookId,
            createdAt: new Date()
        })

        firestore.collection('UserBookComments').doc(docRef.id).set({
            likeCount: likeCount + 1
        }, {merge: true})

        setLikes(likes + 1);
        setUserHasLiked(true);
    }

    const handleUnlike = async () => {
        await  firestore
        .collection('UserBookCommentLikes')
        .doc(user.uid)
        .collection("commentLikes")
        .where("commentID", "==", docRef.id)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete();
            });
        })

        firestore.collection('UserBookComments').doc(docRef.id).set({
            likeCount: likeCount - 1
        }, {merge: true})

        setLikes(likes - 1);
        setUserHasLiked(false);
    }

    useEffect(() => {
        const document = firestore
        .collection("UserBookCommentLikes")
        .doc(user.uid)
        .collection("commentLikes")
        .where("commentID", "==", docRef.id)

        document.get()
        .then((docSnapshot) => {
            docSnapshot.docs.forEach((doc) => {
                if(doc.data().uid === user.uid) {
                    setUserHasLiked(true)
                }
            }) 
        })

    }, [])

    return (
        <>
            {!userHasLiked ? (
                <i onClick={handleLike} className="fa-regular fa-thumbs-up like-button"></i>
            ) : (
                <i onClick={handleUnlike} className="fa-solid fa-thumbs-up like-button"></i>
            )}
            <Text style={{display: "inline"}} fontSize='xs'>{likes > 0 ? likes : ''}</Text>
        </>
    )
}

export default LikeButton