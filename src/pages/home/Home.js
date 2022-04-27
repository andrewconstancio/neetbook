import React, { useState, useEffect, useRef } from 'react'
import {
    Flex,
    Box,
    Text,
    Heading,
    useColorModeValue
} from "@chakra-ui/react"
import './Home.css'
import ProfileSideBar from '../../components/ProfileSideBar/ProfileSideBar';
import HomePages from './HomePages';
import { Logo } from '../../components/Logo';



const Home = () => {

    const bg = useColorModeValue('side-panel-bg-light', 'side-panel-bg-dark');

    console.log("bg: " + bg);

    return (
        <>
            <Flex direction={['column', 'column', 'row', 'row', 'row']}
            >
                <Box 
                    flexShrink={0} 
                    w={["100%", "100%","30%", "30%", "30%"]} 
                    align="center" 
                    // pr={5}
                    className="column-1"
                    // display={{ base: "none", md: "block" }}
                
                >
                    {/* <Box>
                        <Logo />
                    </Box> */}
                    <Box className={"sticky-left-column-home " + bg}>
                        <ProfileSideBar />
                    </Box>
                </Box>
                <Box w={["100%", "100%","70%", "70%", "70%"]} className="column-2">
                {/* <Box w={["100%", "100%","100%", "100%", "100%"]} className="column-2"> */}
                    <HomePages />
                </Box>
            </Flex>
        </>
    )
}

export default Home