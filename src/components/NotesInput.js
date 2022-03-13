import React, { useRef, useEffect, useState } from 'react'
import { auth, firestore } from '../config/firebase-config';
import NotesInputEdit from './NotesInputEdit';
import Comment from './Comments/Comment';

const NotesInput = ( {bookEditionKey} ) => {
    const [loading, setLoading] = useState(true);
    const notesRef = useRef('');
    const [hasNotes, setHasNotes] = useState(false);

    useEffect(() => {

        async function fetchData() {
            await firestore
            .collection("UserBookNotes")
            .where("uid", "==", auth.currentUser.uid)
            .where("bookEditionKey", "==", bookEditionKey)
            .get()
            .then(res => {
                if(res.docs[0]) {
                    var note = res.docs[0].data().notes
                    notesRef.current = note;
                    setHasNotes(true);
                } 
                setLoading(false)
            })
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

    if(loading){
        return <></>
    }

    if(hasNotes) {
        return (
            <>
                <Comment handleOnClick={handleOnClick} currentValue={notesRef.current} setHasNotes={setHasNotes}/>
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