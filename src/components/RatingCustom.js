import React, { useState, useEffect, useRef } from 'react'
import Rating from 'react-rating';
import {
    Box
} from "@chakra-ui/react";
import { auth, firestore, query, where } from '../config/firebase-config';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const RatingCustom = ( {bookEditionKey} ) => {

    const [ratingChanged, setRatingChanged] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);

    useEffect(() => {

        const q = firestore
        .collection('UserBookRatings')
        .where("uid", "==", auth.currentUser.uid)
        .where("bookEditionKey", "==", bookEditionKey)
        .onSnapshot((doc) => {
            console.log(doc)
        })

    
        // const [results]  = useCollectionData(query, {idField: "id"})
        // if(results) {
        //     console.log(results[0].rating);
        // }
    }, []);


    const handleRatingChange = value => {
        firestore.collection('UserBookRatings').add({
            rating: value,
            bookEditionKey: bookEditionKey,
            uid: auth.currentUser.uid,
            createdAt: new Date()
        }).then(() => {
            setRatingChanged(true);
            setRatingValue(value)
        }).catch((err) => {
            setRatingChanged(false);
            setRatingValue(0)
        })
    }

    const uncheckRating = () =>{
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
                    // initialRating={results[0].rating ? results[0].rating : 0}
                />
            </Box>
        </div>
    )
}

export default RatingCustom