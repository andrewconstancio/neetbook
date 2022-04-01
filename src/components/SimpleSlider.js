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
import OpenLibrary from '../apis/OpenLibrary';

const SimpleSlider = () => {

    const [data, setData] = useState('');
    const [books, setBooks] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await OpenLibrary.get(`/subjects/space.json?details=true`, {
                limit: 20
            });

            setData(response.data);
            setBooks(response.data.works);
        }
        fetchData();
    }, []);

    if(!books) {
        return (
            <></>
        )
    }

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
                <Heading as='h3' size='lg' mt={5} mb={5} style={{cursor: "pointer"}}>Explore</Heading>
            </Flex>
            <Flex>
                <Input variant='filled' size='lg'  placeholder='Search...' style={{marginTop: "15px", marginBottom: "30px"}} />
            </Flex>
            <Flex justify="space-between"> 
                <Heading as='h5' size='lg' mt={5} mb={5} style={{cursor: "pointer"}}>Popular</Heading>
            </Flex>
            <Slider {...settings}>
                {books.map((book) => {
                    if(book.cover_id !== null) {
                        return (
                            <Book 
                                key={book.cover_edition_key} 
                                edition={book.cover_edition_key} 
                                title={book.title} 
                                bookKey={book.key} 
                                coverId={book.cover_id}
                            />
                        )
                    }
                })
                }
            </Slider>
        </>
    )
}

export default SimpleSlider