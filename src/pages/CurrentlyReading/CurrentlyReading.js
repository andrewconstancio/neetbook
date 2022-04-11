import React from 'react'
import {
    Flex,
    Box,
    Text,
    Heading,
    SimpleGrid
} from "@chakra-ui/react"
import useGetUserCurrentlyReading from '../../Hooks/useGetUserCurrentlyReading'
import Book from '../../components/Book'

const CurrentlyReading = () => {
    const {
        error,
        loading,
        books
    } = useGetUserCurrentlyReading();

    if(!loading) {
        console.log(books);
    }

    return (
        <>
            <Flex justify="space-between"> 
                <Heading as='h3' size='lg' mt={5} mb={5} style={{cursor: "pointer"}}>Currently Reading</Heading>
            </Flex>
            <SimpleGrid columns={4} spacingX='20px' spacingY='20px'>
            {books.map((book, index) => {
                console.log(book);
                        if(book.covers[0]) {
                            return (
                                <Book 
                                    key={book.cover_id} 
                                    edition={book.cover_edition_key} 
                                    title={book.title} 
                                    bookKey={book.key} 
                                    coverId={book.covers[0]}
                                />
                            )
                        }
                    })
                }
            </SimpleGrid>
        </>
    )
}

export default CurrentlyReading