import React, {useEffect, Component } from 'react';
import './Explore.css'
import BookSection from '../../components/BookSection';
import PopularBookSlider from '../../components/PopularBookSlider'
import PopularAuthorSlider from '../../components/PopularAuthorSlider';
import Search from '../Search/Search'
import { useSelector } from 'react-redux';
import {
    Flex,
    Box,
    Text,
    Heading
} from "@chakra-ui/react"
import SearchInput from '../../components/SearchInput';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';

const Explore = () => {

    const searchTerm = useSelector((state) => state.search.term)

    const dispatch = useDispatch();
    const { clearSearch } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        clearSearch();
    }, [])

    return (
        <>
            <Flex justify="space-between"> 
                <Heading as='h3' size='lg' mt={5} mb={5} style={{cursor: "pointer"}}>Explore</Heading>
            </Flex>
            <Flex>
                <SearchInput searchTerm={searchTerm} />
            </Flex>
            {searchTerm ? (
                <>
                    <Search term={searchTerm} />
                </>
            ) : (
                <>
                    <PopularBookSlider />
                    <PopularAuthorSlider />
                    <BookSection subject={"space"} />
                    <BookSection subject={"habit"} />
                    <BookSection subject={"business"} />
                    <BookSection subject={"history"} />
                </>
            )}
        </>
    )
}

export default Explore
