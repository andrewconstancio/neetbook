import React, { Component } from 'react';
import OpenLibrary from '../../apis/OpenLibrary';
import {
    Box,
    SimpleGrid,
    Image,
    Heading
} from "@chakra-ui/react"
import './Explore.css'
import LoadingBook from '../../components/LoadBookShimmer'
import BookSection from '../../components/BookSection';
import Footer from '../../components/Footer'

export default class Explore extends Component {

    render() {
        return (
            <div>
                <div className='center'>
                    <BookSection subject="love" />
                    <BookSection subject="sci-fi" />
                    <BookSection subject="anime" />
                </div>
            </div>
        )
    }
}