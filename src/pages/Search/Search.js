import React from 'react'
import {
    Flex,
    Box,
    Text,
    Heading,
    HStack
} from "@chakra-ui/react"
import useGetSearchResults from '../../Hooks/useGetSearchResults';

const Search = ( {term} ) => {

    const {
        results,
        error,
        loading
    } = useGetSearchResults(term);

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
                {JSON.stringify(results)}
            </Box>
        </>
    )
}

export default Search
