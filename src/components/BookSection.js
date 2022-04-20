import React, { useState, useEffect } from 'react'
import OpenLibrary from '../apis/OpenLibrary';
import LoadingBook from './LoadingBook'
import {
    SimpleGrid,
    Heading,
    Flex
} from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import '../pages/AllBooksBySubject/Book.css'
import Book from './Book';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../redux';
import LoadingSlider from './LoadingSlider';


const BookSection = ( {subject, limit, pageNumber} ) => {

    const [data, setData] = useState('');
    const [books, setBooks] = useState(null);

    const dispatch = useDispatch();
    const { setPage } = bindActionCreators(actionCreators, dispatch);

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

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    useEffect(() => {
        async function fetchData() {
            const response = await OpenLibrary.get(`/subjects/${subject}.json?details=true`, {
                limit: 20
            });
            setData(response.data);
            setBooks(response.data.works);
        }
        fetchData();
    }, []);

    if(!books) {
        return <LoadingSlider />
    }
    
    return (
        <>
            <Flex> 
                <Link to={`/subject/${subject}`}>
                    <Heading onClick={() => setPage('subject')} as='h3' size='lg' mt={5} mb={5} style={{cursor: "pointer"}}>
                        {capitalizeFirstLetter(subject)}
                    </Heading>
                </Link>
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

export default BookSection