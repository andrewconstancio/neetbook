import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Book from './Book';
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
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4
    };

    return (
        <>
            <Slider {...settings}>
                {books.map((book) => {
                    if(book.cover_id !== null) {
                        return (
                            <Book key={book.cover_edition_key} edition={book.cover_edition_key} title={book.title} bookKey={book.key} coverId={book.cover_id}></Book>
                        )
                    }
                })
                }
            </Slider>
        </>
    )
}

export default SimpleSlider