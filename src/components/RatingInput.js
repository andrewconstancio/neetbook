import React, { useState, useEffect, useRef } from 'react'
import Rating from 'react-rating';
import {
    Box
} from "@chakra-ui/react";
import { auth, firestore } from '../config/firebase-config';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../redux';

const RatingCustom = () => {

    const [loading, setLoading] = useState(true);
    const rating = useSelector((state) => state.readRating.rating);
    const ratingChanged = useSelector((state) => state.readRating.ratingChanged);
    const bookKey = useSelector((state) => state.book.bookKey);
    const dispatch = useDispatch();
    const { fetchRating, handleRatingChange, uncheckRating } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        fetchRating();
    }, []);

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
                    fractions={4}
                    style={{color: ratingChanged ? "#ffd600" : "#444444"}}
                    flexShrink={0}
                    onChange={handleRatingChange} 
                    initialRating={rating}
                />
            </Box>
        </>
    )
}

export default RatingCustom