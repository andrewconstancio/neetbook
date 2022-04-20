import React from 'react'
import {
    Input,
    Heading,
    Flex
} from "@chakra-ui/react"
import LoadingBook from "./LoadingBook";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LoadingSlider = () => {
    
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

    return (
    <>
        <Flex justify="space-between"> 
            <Heading as='h5' size='lg' mt={5} mb={5} style={{cursor: "pointer"}}>&nbsp;</Heading>
        </Flex>
        <Slider {...settings}>
            {[...Array(20)].map((i) =>
                <LoadingBook key={i} />
            )}
        </Slider>
        </>
    )
}

export default LoadingSlider