import React, { useState, useEffect } from 'react'
import {
    Button,
} from "@chakra-ui/react"
import { auth, firestore } from '../config/firebase-config';

const ReadButton = ( {bookEditionKey, hasRead, setHasRead, handleChange} ) => {


    const handleOnClick = async () => {

        try {

            let read = hasRead ? false : true
            let document = await firestore
            .collection("UserBookRatings")
            .where("uid", "==", auth.currentUser.uid)
            .where("bookEditionKey", "==", bookEditionKey)
            .get()

            if(!document.empty) {
                firestore.collection('UserBookRatings').doc(document.docs[0].id).set({
                    read: read,
                    modifiedAt: new Date()
                }, {merge: true})
            } else {
                firestore.collection('UserBookRatings').add({
                    read: read,
                    bookEditionKey: bookEditionKey,
                    uid: auth.currentUser.uid,
                    createdAt: new Date()
                })
            }
            setHasRead(read);
        } catch(err) {
            console.log("err" + err);
        }
    }

    return (
        <>
            <Button onClick={handleChange} colorScheme={hasRead ? "teal" : "grey"} size='md' w={{ base: '100%', sm: '100%' }} variant={hasRead ? "solid" : "outline"}>
                <i className="fa-solid fa-book-open"></i>
                &nbsp;&nbsp;Read
            </Button>
        </>
    )
}

export default ReadButton
