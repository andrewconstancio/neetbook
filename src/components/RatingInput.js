import React, { useState, useEffect, useRef } from 'react'
import Rating from 'react-rating';
import {
    Box
} from "@chakra-ui/react";
import { auth, firestore } from '../config/firebase-config';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const RatingCustom = ( {bookEditionKey, setHasRead} ) => {

    const [loading, setLoading] = useState(true);
    const [ratingChanged, setRatingChanged] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);

    useEffect(() => {
        setLoading(true);
        async function fetchData() {
            await firestore
            .collection("UserBookRatings")
            .where("uid", "==", auth.currentUser.uid)
            .where("bookEditionKey", "==", bookEditionKey)
            .get()
            .then(res =>{
                if(res.docs[0]) {
                    setRatingChanged(true);
                    setRatingValue(res.docs[0].data().rating);
                }
                setLoading(false);
            })
        }

        fetchData();
    }, []);

    const handleRatingChange = async value => {

        try {

            let document = await firestore
            .collection("UserBookRatings")
            .where("uid", "==", auth.currentUser.uid)
            .where("bookEditionKey", "==", bookEditionKey)
            .get()

            if(!document.empty) {
                firestore.collection('UserBookRatings').doc(document.docs[0].id).set({
                    rating: value,
                    bookEditionKey: bookEditionKey,
                    uid: auth.currentUser.uid,
                    modifiedAt: new Date()
                }, {merge: true})
            } else {
                firestore.collection('UserBookRatings').add({
                    rating: value,
                    bookEditionKey: bookEditionKey,
                    uid: auth.currentUser.uid,
                    createdAt: new Date()
                })
            }

            setRatingChanged(true);
            setRatingValue(value)

        } catch(err) {
            console.log("err" + err);
        }

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
        <>
            <Box align="center" mt={5}>
                <i 
                    style={{display: ratingChanged ? "inline-block" : "none", marginRight: "10px"}} 
                    p={5} 
                    className="fa-solid fa-xmark fa-lg"
                    onClick={uncheckRating}
                ></i>
                <Rating stop={5}
                    emptySymbol="fa fa-star-o fa-xl medium"
                    fullSymbol="fa fa-star fa-xl medium"
                    fractions={2}
                    style={{color: ratingChanged ? "#ffd600" : "white"}}
                    flexShrink={0}
                    onChange={handleRatingChange} 
                    initialRating={ratingValue}
                />
            </Box>
        </>
    )
}

export default RatingCustom