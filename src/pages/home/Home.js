import React, { useState, useEffect, useRef } from 'react'
import {
    Flex,
    Box,
    Text,
    Heading
} from "@chakra-ui/react"
import './Home.css'
import ProfileSideBar from '../../components/ProfileSideBar/ProfileSideBar';
import HomePages from './HomePages';



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
                    <HomePages />
                </Box>
            </Flex>
        </div>
    )
}

export default Home