import React, { useState, useEffect } from 'react'
import {
    Flex,
    Box,
    Text,
    Heading
} from "@chakra-ui/react"
import './Home.css'
import OpenLibrary from '../../apis/OpenLibrary';
import BookSection from '../../components/BookSection';
import ProfileSideBar from '../../components/ProfileSideBar/ProfileSideBar';
// import HorizontalGallery from 'react-dynamic-carousel';
import PopularBookSlider from '../../components/PopularBookSlider'
import PopularAuthorSlider from '../../components/PopularAuthorSlider';
import Search from '../../components/Search';


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
                    <Flex justify="space-between"> 
                        <Heading as='h3' size='lg' mt={5} mb={5} style={{cursor: "pointer"}}>Explore</Heading>
                    </Flex>
                    <Flex>
                        <Search />
                    </Flex>
                    <PopularBookSlider />
                    <PopularAuthorSlider />
                    <BookSection subject={"space"} />
                    <BookSection subject={"self-help"} />
                    <BookSection subject={"business"} />
                    <BookSection subject={"fitness"} />
                </Box>
            </Flex>
        </div>
    )
}

export default Home