import React, { useState, useEffect, useRef } from 'react'
import {
    Flex,
    Box,
    Text,
    Heading
} from "@chakra-ui/react"
import './Home.css'
import OpenLibrary from '../../apis/OpenLibrary';
import ProfileSideBar from '../../components/ProfileSideBar/ProfileSideBar';
// import HorizontalGallery from 'react-dynamic-carousel';
import SearchInput from '../../components/SearchInput';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import Explore from '../Explore/Explore';
import Search from '../Search/Search';



const Home = () => {

    const searchTerm = useSelector((state) => state.search.term);
    const dispatch = useDispatch();
    const { clearSearch } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        clearSearch();
    }, [])

    console.log(searchTerm);


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
                        <SearchInput searchTerm={searchTerm} />
                    </Flex>
                    {searchTerm ? (
                        <Search term={searchTerm} />
                    ) : (
                        <Explore />
                    )}
                </Box>
            </Flex>
        </div>
    )
}

export default Home