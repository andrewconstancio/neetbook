import React, { useRef, useEffect, useState } from 'react'
import {
    Button,
    Textarea
} from "@chakra-ui/react"
import { auth, firestore } from '../config/firebase-config';
import NotesInputEdit from './NotesInputEdit';
import NotesInputView from './NotesInputView';

const NotesInput = ( {bookEditionKey} ) => {
    const notesRef = useRef('');
    const [hasNotes, setHasNotes] = useState(false);

    useEffect(() => {

        async function fetchData() {
            let doc = await firestore
            .collection("UserBookNotes")
            .where("uid", "==", auth.currentUser.uid)
            .where("bookEditionKey", "==", bookEditionKey)
            .get()

            if(doc.docs[0]) {
                notesRef.current.value = doc.docs[0].data().notes;
                setHasNotes(true);
            }
        }

        fetchData();
    }, []);

    const handleOnClick = async () => {

        const notes = notesRef.current.value;

        if(!notes.trim()) {
            alert("no notes");
            return
        }

        let document = await firestore
        .collection("UserBookNotes")
        .where("uid", "==", auth.currentUser.uid)
        .where("bookEditionKey", "==", bookEditionKey)
        .get()
        
        if(!document.empty) {
            firestore.collection('UserBookNotes').doc(document.docs[0].id).set({
                notes: notes,
                modifiedAt: new Date()
            }, {merge: true})
        } else {
            firestore.collection('UserBookNotes').add({
                notes: notes,
                bookEditionKey: bookEditionKey,
                uid: auth.currentUser.uid,
                createdAt: new Date()
            })
        }


        setHasNotes(true);
    }

    if(hasNotes) {
        return (
            <>
                <NotesInputView handleOnClick={handleOnClick} currentValue={notesRef.current.value} setHasNotes={setHasNotes}/>
            </>
        )
    }

    return (
        <>
            <NotesInputEdit handleOnClick={handleOnClick} notesRef={notesRef} />
        </>
    )
}

export default NotesInput