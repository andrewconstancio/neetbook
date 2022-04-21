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



    if(loading) {
        return (
            <div className="center">
                <SimpleGrid columns={[2,3,5,5,5]} spacingX='20px' spacingY='20px'>
                    {[...Array(40)].map((i) =>
                        <LoadingBook key={i} />
                    )}
                </SimpleGrid>
            </div>
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
                <BookGrid books={results} />
            </Box>
        </>
    )
}

export default Search
