import React, { useState, useEffect } from 'react'
import {
    Button,
} from "@chakra-ui/react"
import { auth, firestore } from '../config/firebase-config';

const ReadButton = ( {bookEditionKey} ) => {

    const [hasRead, setHasRead] = useState(false);

    useEffect(() => {

        async function fetchData() {
            let doc = await firestore
            .collection("UserBookRead")
            .where("uid", "==", auth.currentUser.uid)
            .where("bookEditionKey", "==", bookEditionKey)
            .get()

            if(doc.docs[0]) {
                setHasRead(true);
            }
        }

        fetchData();
    }, []);

    const handleOnClick = async () => {

        try {

            let read = hasRead ? false : true
            let document = await firestore
            .collection("UserBookRead")
            .where("uid", "==", auth.currentUser.uid)
            .where("bookEditionKey", "==", bookEditionKey)
            .get()

            if(!document.empty) {
                firestore.collection('UserBookRead').doc(document.docs[0].id).set({
                    read: read,
                    modifiedAt: new Date()
                }, {merge: true})
            } else {
                firestore.collection('UserBookRead').add({
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
            <Button onClick={handleOnClick} colorScheme={hasRead ? "teal" : "grey"} size='md' w={{ base: '100%', sm: '100%' }} variant={hasRead ? "solid" : "outline"}>
                <i className="fa-solid fa-book-open"></i>
                &nbsp;&nbsp;Read
            </Button>
        </>
    )
}

export default ReadButton
