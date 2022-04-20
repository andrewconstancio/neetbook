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
import AuthorMainCoverImage from "./AuthorMainCoverImage";
import useGetPopularAuthors from "../Hooks/useGetPopularAuthors";
import LoadingSlider from "./LoadingSlider";

const PopularAuthorSlider = () => {

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
        authors,
        error
    } = useGetPopularAuthors();

    if(loading) {
        return <LoadingSlider />
    }

    return (
        <>
            <Flex justify="space-between"> 
                <Heading as='h5' size='lg' mt={5} mb={5} style={{cursor: "pointer"}}>Top Authors</Heading>
            </Flex>
            <Slider {...settings}>
                {authors.map((author) => {
    
                    return (
                        <AuthorMainCoverImage 
                            authorKey={author.key}
                            coverId={author.photos[0]}
                            name={author.name}
                        />
                    )
                })
                }
            </Slider>
        </>
    )
}

export default PopularAuthorSlider