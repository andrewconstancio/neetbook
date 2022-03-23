import React, { useState, useEffect } from 'react'
import {
    Button
} from "@chakra-ui/react"
import { auth, firestore } from '../config/firebase-config';
import '../pages/Explore/Explore.css'
import { useSelector } from 'react-redux';

const ReadButton = ( {bookEditionKey, hasRead, setHasRead} ) => {


    const [loading, setLoading] = useState(false);
    const [wantsToRead, setWantsToRead] = useState(false);
    const [currentlyReading, setCurrentlyReading] = useState(false);
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {

        setLoading(true)

        async function fetchData() {
            let doc = await firestore
            .collection("UserBookRead")
            .where("uid", "==", user.uid)
            .where("bookEditionKey", "==", bookEditionKey)
            .get()
            .then(res => {
                if(res.docs[0]) {
                    setHasRead(res.docs[0].data().read);
                    setWantsToRead(res.docs[0].data().wantsToRead);
                    setCurrentlyReading(res.docs[0].data().currentlyReading);
                }
                setLoading(false)
            })
        }

        fetchData();
    }, []);
    

    const checkButtonValRead = () => {
        let read = hasRead ? false : true
        handleOnClick(read, false, false);
    }

    const checkButtonValWantToRead = () => {
        let wantRead = wantsToRead ? false : true
        handleOnClick(false, wantRead, false);
    }

    const checkButtonValCurrentlyReading = () => {
        let currReading = currentlyReading ? false : true
        handleOnClick(false, false, currReading);
    }

    const handleOnClick = async (read, wantRead, currReading) => {

        try {

            setHasRead(read);
            setWantsToRead(wantRead);
            setCurrentlyReading(currReading);

            let document = await firestore
            .collection("UserBookRead")
            .where("uid", "==", user.uid)
            .where("bookEditionKey", "==", bookEditionKey)
            .get()

            if(!document.empty) {
                firestore.collection('UserBookRead').doc(document.docs[0].id).set({
                    read: read,
                    wantsToRead: wantRead,
                    currentlyReading: currReading,
                    modifiedAt: new Date()
                }, {merge: true})
            } else {
                firestore.collection('UserBookRead').add({
                    read: read,
                    wantsToRead: wantRead,
                    currentlyReading: currReading,
                    bookEditionKey: bookEditionKey,
                    uid: user.uid,
                    createdAt: new Date()
                })
            }

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

            <Button onClick={checkButtonValCurrentlyReading} colorScheme={currentlyReading ? "whiteAlpha" : "grey"} mt={5} size='md' w={{ base: '100%' }} variant={currentlyReading ? "solid" : "outline"}>
                <i className="fa-solid fa-check" style={{display: currentlyReading ? "block" : "none"}}></i>
                &nbsp;&nbsp;Currently Reading
            </Button>
        </>
    )
}

export default ReadButton
