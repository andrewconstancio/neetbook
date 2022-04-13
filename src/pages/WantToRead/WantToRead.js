import React from 'react'
import {
    Flex,
    Box,
    Text,
    Heading,
    SimpleGrid
} from "@chakra-ui/react"
import useGetUserWantToRead from '../../Hooks/useGetUserWantToRead'
import Book from '../../components/Book'


const WantToRead = () => {
    const {
        error,
        loading,
        books
    } = useGetUserWantToRead();

    if(loading) {
        console.log("loading");
    }

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

export default WantToRead