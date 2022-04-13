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


const Read = () => {
    const {
        error,
        loading,
        books
    } = useGetUserRead();

    if(loading) {
        console.log("loading");
    }

    console.log(books);

    return (
        <>
            <Flex justify="space-between"> 
                <Heading as='h3' size='lg' mt={5} mb={5} style={{cursor: "pointer"}}>Want to Read</Heading>
            </Flex>
            <SimpleGrid columns={[2, 2, 3, 3, 4]} spacingX='20px' spacingY='20px'>
            {books.map((book, index) => {
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

export default Read