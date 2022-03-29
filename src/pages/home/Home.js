import React, { useState, useEffect } from 'react'
import {
    Flex,
    Box,
    Text,
} from "@chakra-ui/react"
import './Home.css'
import BookSection from '../../components/BookSection';
import ProfileSideBar from '../../components/ProfileSideBar/ProfileSideBar';

const Home = () => {
    return (
        <div className='container'>
            <Flex direction={['column', 'column', 'column', 'row', 'row']}>
                <Box 
                    flexShrink={0} 
                    w={["100%", "100%","100%", "auto", "30%"]} 
                    pr={[0, 6]} 
                    align="center" 
                    className="column-1"
                >
                    <Box className="sticky-left-column-home">
                        <ProfileSideBar />
                    </Box>
                </Box>
                <Box w={["100%", "100%","100%", "100%", "70%"]} className="column-2">
                    <BookSection subject="sci-fi" limit={4}/>
                </Box>
            </Flex>
        </div>
    )
}

export default Home