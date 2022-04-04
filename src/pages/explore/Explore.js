import React, { Component } from 'react';
import './Explore.css'
import BookSection from '../../components/BookSection';
import PopularBookSlider from '../../components/PopularBookSlider'
import PopularAuthorSlider from '../../components/PopularAuthorSlider';

const Explore = () => {
    return (
        <>
            <PopularBookSlider />
            <PopularAuthorSlider />
            <BookSection subject={"space"} />
            <BookSection subject={"self-help"} />
            <BookSection subject={"business"} />
            <BookSection subject={"fitness"} />
        </>
    )
}

export default Explore
