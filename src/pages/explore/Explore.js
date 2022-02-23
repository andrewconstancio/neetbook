import React, { Component } from 'react';
import OpenLibrary from '../../apis/OpenLibrary';
import {
    Box,
    SimpleGrid,
    Image,
    Heading
} from "@chakra-ui/react"
import './Explore.css'
import LoadingBook from '../../components/LoadingBook'
import BookSection from '../../components/BookSection';

export default class Explore extends Component {

    render() {
        return (
            <div>
                <div className='center'>
                    <BookSection subject="love" limit={4} />
                    <BookSection subject="sci-fi" limit={4}/>
                    <BookSection subject="anime" limit={4}/>
                    <BookSection subject="pirates" limit={4}/>
                    <BookSection subject="space" limit={4}/>
                    <BookSection subject="football" limit={4}/>
                </div>
            </div>
        )
    }
}