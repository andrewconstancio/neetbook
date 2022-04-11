import React from 'react'
import {
    Flex,
    Box,
    Text,
    Heading,
    HStack,
    SimpleGrid
} from "@chakra-ui/react"
import useGetSearchResults from '../../Hooks/useGetSearchResults';
import BookGrid from '../../components/BookGrid';
import LoadingBook from '../../components/LoadingBook';

const Search = ( {term} ) => {

    const {
        results,
        error,
        loading
    } = useGetSearchResults(term);


    if(!results) {
        return (
            <SimpleGrid columns={{sm: 2, md: 3, lg: 4}} spacingX='20px' spacingY='20px'>
                {[...Array(40)].map((i) =>
                    <LoadingBook key={i} />
                )}
            </SimpleGrid>
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
                <BookGrid books={results} />
            </Box>
        </>
    )
}

export default Search
