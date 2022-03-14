import React, { useState, useEffect } from 'react'
import {
    Button
} from "@chakra-ui/react"
import { auth, firestore } from '../config/firebase-config';
import '../pages/explore/Explore.css'

const ReadButton = ( {bookEditionKey, hasRead, setHasRead} ) => {


    const [loading, setLoading] = useState(false);
    const [wantsToRead, setWantsToRead] = useState(false);

    useEffect(() => {

        setLoading(true)

        async function fetchData() {
            let doc = await firestore
            .collection("UserBookRead")
            .where("uid", "==", auth.currentUser.uid)
            .where("bookEditionKey", "==", bookEditionKey)
            .get()
            .then(res => {
                if(res.docs[0]) {
                    setHasRead(res.docs[0].data().read);
                    setWantsToRead(res.docs[0].data().wantsToRead);
                }
                setLoading(false)
            })
        }

        fetchData();
    }, []);
    

    const checkButtonValRead = () => {
        let read = hasRead ? false : true

        setHasRead(read);
        setWantsToRead(false);

        handleOnClick(read, false);
    }

    const checkButtonValWantToRead = () => {
        let wantRead = wantsToRead ? false : true

        setHasRead(false);
        setWantsToRead(wantRead);

        handleOnClick(false, wantRead);
    }

    const handleOnClick = async (read, wantRead) => {

        try {
            let document = await firestore
            .collection("UserBookRead")
            .where("uid", "==", auth.currentUser.uid)
            .where("bookEditionKey", "==", bookEditionKey)
            .get()

            if(!document.empty) {
                firestore.collection('UserBookRead').doc(document.docs[0].id).set({
                    read: read,
                    wantsToRead: wantRead,
                    modifiedAt: new Date()
                }, {merge: true})
            } else {
                firestore.collection('UserBookRead').add({
                    read: read,
                    wantsToRead: wantRead,
                    bookEditionKey: bookEditionKey,
                    uid: auth.currentUser.uid,
                    createdAt: new Date()
                })
            }

            setHasRead(read);
            setWantsToRead(wantRead);
        } catch(err) {
            console.log("err" + err);
        }
    }

    if(loading) {
        return (
            <>
                <Button bg="#282828" className="shimmer" mt={5} size='md' w={{ base: '100%' }}>
                    &nbsp;&nbsp;
                </Button>
                <Button bg="#282828" className="shimmer" mt={5} size='md' w={{ base: '100%' }}>
                    &nbsp;&nbsp;
                </Button>
            </>
        )
    }

    return (
        <>
            <Button onClick={checkButtonValRead} colorScheme={hasRead ? "teal" : "grey"} mt={5} size='md' w={{ base: '100%' }} variant={hasRead ? "solid" : "outline"}>
                <i className="fa-solid fa-check" style={{display: hasRead ? "block" : "none"}}></i>
                &nbsp;&nbsp;Read
            </Button>

            <Button onClick={checkButtonValWantToRead} colorScheme={wantsToRead ? "orange" : "grey"} mt={5} size='md' w={{ base: '100%' }} variant={wantsToRead ? "solid" : "outline"}>
                <i className="fa-solid fa-check" style={{display: wantsToRead ? "block" : "none"}}></i>
                &nbsp;&nbsp;Want to Read
            </Button>
        </>
    )
}

export default ReadButton
