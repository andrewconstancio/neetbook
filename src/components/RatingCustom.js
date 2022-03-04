import React, { useState, useEffect, useRef } from 'react'
import Rating from 'react-rating';
import {
    Box
} from "@chakra-ui/react";
import { auth, firestore } from '../config/firebase-config';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const RatingCustom = (props) => {

    // const handleRatingChange = async value => {

    //     try {

    //         let document = await firestore
    //         .collection("UserBookRatings")
    //         .where("uid", "==", auth.currentUser.uid)
    //         .where("bookEditionKey", "==", props.bookEditionKey)
    //         .get()

    //         if(!document.empty) {
    //             firestore.collection('UserBookRatings').doc(document.docs[0].id).set({
    //                 rating: value,
    //                 bookEditionKey: props.bookEditionKey,
    //                 uid: auth.currentUser.uid,
    //                 modifiedAt: new Date()
    //             }, {merge: true})
    //         } else {
    //             firestore.collection('UserBookRatings').add({
    //                 rating: value,
    //                 bookEditionKey: props.bookEditionKey,
    //                 uid: auth.currentUser.uid,
    //                 createdAt: new Date()
    //             })
    //         }

    //         props.setRatingChanged(true);
    //         props.setRatingValue(value)

    //     } catch(err) {
    //         console.log("err" + err);
    //     }

    // }

    const uncheckRating = () =>{

        firestore
        .collection('UserBookRatings')
        .where("uid", "==", auth.currentUser.uid)
        .where("bookEditionKey", "==", props.bookEditionKey)
        .onSnapshot((docs) => {
            docs.docs[0].ref.delete()
        })

        props.setRatingChanged(false);
        props.setRatingValue(0)
    }

    return (
        <div>
            <Box align="center">
                <i 
                    style={{display: props.ratingChanged ? "inline-block" : "none", marginRight: "10px"}} 
                    p={5} 
                    className="fa-solid fa-xmark fa-lg"
                    onClick={uncheckRating}
                ></i>
                <Rating stop={10}
                    emptySymbol="fa fa-star-o fa-xl medium"
                    fullSymbol="fa fa-star fa-xl medium"
                    fractions={2}
                    style={{color: props.ratingChanged ? "#ffd600" : "white"}}
                    flexShrink={0}
                    onChange={props.handleChange} 
                    initialRating={props.ratingValue}
                />
            </Box>
        </div>
    )
}

export default RatingCustom