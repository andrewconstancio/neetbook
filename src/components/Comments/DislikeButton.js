import React, { useState, useEffect } from 'react'
import {  
    Text,
} from '@chakra-ui/react'
import { firestore } from '../../config/firebase-config';
import { useSelector } from 'react-redux';

const DislikeButton = ( {docRef, bookEditionKey, dislikeCount } ) => {


    const [userHasDisliked, setUserHasDisliked] = useState(false);
    const [dislikes, setDislikes] = useState(dislikeCount);
    const user = useSelector((state) => state.auth.user);

    const handleDislike = () => {
        firestore
        .collection('UserBookCommentLikes')
        .doc(user.uid)
        .collection("commentDisikes")
        .add({
            commentID: docRef.id,
            uid: user.uid,
            bookEditionKey: bookEditionKey,
            createdAt: new Date()
        })

        firestore.collection('UserBookComments').doc(docRef.id).set({
            dislikeCount: dislikeCount + 1
        }, {merge: true})

        setDislikes(dislikes + 1);
        setUserHasDisliked(true);
    }

    const handleUnlike = async () => {
        await  firestore
        .collection('UserBookCommentLikes')
        .doc(user.uid)
        .collection("commentDisikes")
        .where("commentID", "==", docRef.id)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                doc.ref.delete();
            });
        })

        firestore.collection('UserBookComments').doc(docRef.id).set({
            dislikeCount: dislikeCount - 1
        }, {merge: true})

        setDislikes(dislikes- 1);
        setUserHasDisliked(false);
    }

    useEffect(() => {
        const document = firestore
        .collection("UserBookCommentLikes")
        .doc(user.uid)
        .collection("commentDisikes")
        .where("commentID", "==", docRef.id)

        document.get()
        .then((docSnapshot) => {
            docSnapshot.docs.forEach((doc) => {
                if(doc.data().uid === user.uid) {
                    setUserHasDisliked(true)
                }
            }) 
        })

    }, [])

    return (
        <>
            {!userHasDisliked ? (
                <i onClick={handleDislike} className="fa-regular fa-thumbs-down like-button"></i>
            ) : (
                <i onClick={handleUnlike} className="fa-solid fa-thumbs-down like-button"></i>
            )}
            <Text style={{display: "inline"}} fontSize='xs'>{dislikes> 0 ? dislikes: ''}</Text>
        </>
    )
}

export default DislikeButton