import React, { useState } from 'react'
import Rating from 'react-rating';
import { getFirestore } from 'redux-firestore';
// import {
//     Text
//   } from "@chakra-ui/react";

const RatingCustom = ( {bookEditionKey} ) => {

    const [ratingChanged, setRatingChanged] = useState(false);
    const [ratingValue, setRatingValue] = useState(0);

    const handleRatingChange = value => {

        const firestore = getFirestore();
        firestore.collection('UserBookRatings').add({
            rating: value,
            bookEditionKey: bookEditionKey,
            createdAt: new Date()
        }).then(() => {
            setRatingChanged(true);
            setRatingValue(value)
        }).catch((err) => {
            setRatingChanged(false);
            setRatingValue(0)
        })
    }

    return (
        <div>
            <i style={{display: ratingChanged ? "inline-block" : "none", marginRight: "10px"}} p={5} className="fa-solid fa-xmark fa-lg"></i>
            <Rating stop={10}
                emptySymbol="fa fa-star-o fa-2x medium"
                fullSymbol="fa fa-star fa-2x medium"
                fractions={2}
                style={{color: ratingChanged ? "#ffd600" : "white"}}
                flexShrink={0}
                onChange={handleRatingChange} 
                initialRating={ratingValue}
            />
        </div>
    )
}

export default RatingCustom