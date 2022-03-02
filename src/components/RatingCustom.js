import React, { useState, useEffect, useRef } from 'react'
import Rating from 'react-rating';
import {
    Box
} from "@chakra-ui/react";
import { auth, firestore } from '../config/firebase-config';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const RatingCustom = ( {bookEditionKey} ) => {

    const [ratingChanged, setRatingChanged] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);

    useEffect(() => {

        async function fetchData() {
            let doc = await firestore
            .collection("UserBookRatings")
            .where("uid", "==", auth.currentUser.uid)
            .where("bookEditionKey", "==", bookEditionKey)
            .get()

            if(doc.docs[0]) {
                setRatingChanged(true);
                setRatingValue(doc.docs[0].data().rating);
            }
        }

        fetchData();
    }, []);

    const handleRatingChange = async value => {

        await firestore.setDoc(firestore.doc(db, "cities", "LA"), {
            name: "Los Angeles",
            state: "CA",
            country: "USA"
        });

        // let document = await firestore
        // .collection("UserBookRatings")
        // .where("uid", "==", auth.currentUser.uid)
        // .where("bookEditionKey", "==", bookEditionKey)
        // .get()

        // if(document.empty) {
        //     firestore.collection('UserBookRatings').add({
        //         rating: value,
        //         bookEditionKey: bookEditionKey,
        //         uid: auth.currentUser.uid,
        //         createdAt: new Date()
        //     },{merge: true}).then(() => {
        //         setRatingChanged(true);
        //         setRatingValue(value)
        //     }).catch((err) => {
        //         setRatingChanged(false);
        //         setRatingValue(0)
        //     })
        // } else {
        //     console.log(document.ref);
        // }
        
        // firestore.collection('UserBookRatings').add({
        //     rating: value,
        //     bookEditionKey: bookEditionKey,
        //     uid: auth.currentUser.uid,
        //     createdAt: new Date()
        // },{merge: true}).then(() => {
        //     setRatingChanged(true);
        //     setRatingValue(value)
        // }).catch((err) => {
        //     setRatingChanged(false);
        //     setRatingValue(0)
        // })
    }

    const uncheckRating = () =>{

        firestore
        .collection('UserBookRatings')
        .where("uid", "==", auth.currentUser.uid)
        .where("bookEditionKey", "==", bookEditionKey)
        .onSnapshot((docs) => {
            docs.docs[0].ref.delete()
        })

        setRatingChanged(false);
        setRatingValue(0)
    }

    return (
        <div>
            <Box align="center">
                <i 
                    style={{display: ratingChanged ? "inline-block" : "none", marginRight: "10px"}} 
                    p={5} 
                    className="fa-solid fa-xmark fa-lg"
                    onClick={uncheckRating}
                ></i>
                <Rating stop={10}
                    emptySymbol="fa fa-star-o fa-xl medium"
                    fullSymbol="fa fa-star fa-xl medium"
                    fractions={2}
                    style={{color: ratingChanged ? "#ffd600" : "white"}}
                    flexShrink={0}
                    onChange={handleRatingChange} 
                    initialRating={ratingValue}
                />
            </Box>
        </div>
    )
}

export default RatingCustom