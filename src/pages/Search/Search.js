import React from 'react'
import {
    Flex,
    Box,
    Text,
    Heading
} from "@chakra-ui/react"

const Search = ( {term} ) => {
    return (
        <>
            <Heading size="md" colorScheme='blue' >Search: </Heading>
            <Heading size="lg">{term}</Heading>
        </>
    )
}

export default Search
