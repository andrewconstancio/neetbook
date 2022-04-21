import React, { useState, useEffect, useRef } from 'react'
import Rating from 'react-rating';
import {
    Box
} from "@chakra-ui/react";
import { auth, firestore } from '../config/firebase-config';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../redux';
import './RatingInput.css';

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
                    style={{display: ratingChanged ? "inline-block" : "none"}} 
                    p={5} 
                    className="fa-solid fa-xmark fa-lg"
                    onClick={uncheckRating}
                ></i>
                <Rating stop={5}
                    emptySymbol={"fa fa-star-o fa-xl medium " + (ratingChanged ? "fa-star-rated" : "fa-star-o-unrated")}
                    fullSymbol={"fa fa-star fa-xl medium "  + (ratingChanged ? "fa-star-rated" : "fa-star-unrated")}
                    fractions={4}
                    flexShrink={0}
                    onChange={handleRatingChange} 
                    initialRating={rating}
                />
            </Box>
        </>
    )
}

export default RatingCustom