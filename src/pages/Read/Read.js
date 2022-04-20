import React from 'react'
import {
    Flex,
    Box,
    Text,
    Heading,
    SimpleGrid
} from "@chakra-ui/react"
import useGetUserRead from '../../Hooks/useGetUserRead'
import Book from '../../components/Book'
import Loader from '../../components/Loader'
import ErrorPage from '../../components/ErrorPage'


const Read = () => {
    const {
        error,
        loading,
        books
    } = useGetUserRead();

    if(loading) {
        return (
            <Loader />
        )
    }

    if(error) {
        return (
            <ErrorPage />
        )
    }

    return (
        <>
            <Flex justify="space-between"> 
                <Heading as='h3' size='lg' mt={5} mb={5} style={{cursor: "pointer"}}>Read</Heading>
            </Flex>
            <SimpleGrid columns={[2, 2, 3, 3, 4]} spacingX='20px' spacingY='20px'>
            {books.map((book, index) => {
                    if(book.data.covers[0]) {
                        return (
                            <Book 
                                key={book.data.cover_id} 
                                bookKey={book.data.works[0].key} 
                                edition={book.bookKey} 
                                title={book.data.title} 
                                coverId={book.data.covers[0]}
                            />
                        )
                    }
                })
            }
            </SimpleGrid>
            {books.length < 1 ? <Heading as='h5' size='md' mt={5} mb={5} mr={5} style={{color: "grey"}}>Nothing to see here! </Heading> : ""}
        </>
    )
}

export default Read