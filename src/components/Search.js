import React from 'react'
import {
    Input
} from "@chakra-ui/react"

const Search = () => {
    return (
        <>
            <Input variant='filled' size='lg'  placeholder='Search...' style={{marginTop: "15px", marginBottom: "30px"}} />
        </>
    )
}

export default Search