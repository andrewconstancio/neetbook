import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Book from './Book';
import {
    Input,
    Heading,
    Flex
} from "@chakra-ui/react"
import useGetPopularBooks from "../Hooks/useGetPopularBooks";

const PopularBookSlider = () => {

    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        swipe: true,
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            }
            },
            {
                breakpoint: 600,
                settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2
            }
            },
            {
                breakpoint: 480,
                settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
            }
        ]
    };

    const {
        loading, 
        books,
        error
    } = useGetPopularBooks();

    if(loading) {
        return (
            <></>
        )
    }

    return (
        <>
            <Flex justify="space-between"> 
                <Heading as='h5' size='lg' mt={5} mb={5} style={{cursor: "pointer"}}>Popular</Heading>
            </Flex>
            <Slider {...settings}>
                {books.map((book) => {
                    if(book.covers[0] !== null) {
                        var coverEditionKey = book.key.slice(7);
                        return (
                            <Book 
                                key={coverEditionKey} 
                                edition={coverEditionKey}
                                title={book.title}  
                                bookKey={book.works[0].key}
                                coverId={book.covers[0]}
                            />
                        )
                    }
                })
                }
            </Slider>
        </>
    )
}

export default PopularBookSlider