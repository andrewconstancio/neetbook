import React from 'react'
import {
    Flex,
    Box,
    Text,
    Heading,
    HStack,
    SimpleGrid,
    Image
} from "@chakra-ui/react"
import useGetSearchResults from '../../Hooks/useGetSearchResults';
import LoadingBook from '../../components/LoadingBook';
import Book from '../../components/Book';

const Search = ( {term} ) => {

    const {
        results,
        error,
        loading
    } = useGetSearchResults(term);



    if(loading) {
        return (
            <SimpleGrid columns={{sm: 2, md: 3, lg: 4}} spacingX='20px' spacingY='20px'>
                {[...Array(40)].map((i) =>
                    <LoadingBook key={i} />
                )}
            </SimpleGrid>
        )
    }

    if(!results) {
        return (
            <div>
                <Heading>No Results</Heading>
            </div>
        )
    }

    return (
        <>
            <HStack>
                <Box>
                    <Text size="md" >Search: </Text>
                </Box>
                <Box>
                    <Text size="md" ><b>{term}</b></Text>
                </Box>
            </HStack>
            <Box>
            <SimpleGrid columns={[2,2,3,4,4]}  spacingX='20px' spacingY='20px'>
                {results.map((book) => {
                            if(book.data.imageLinks) {
                                return (
                                    <Book
                                        bookId={book.id}
                                        coverURL={book.data.imageLinks.thumbnail}
                                    />
                                )
                            }
                        })
                    }
                </SimpleGrid>
            </Box>
        </>
    )
}

export default Search
