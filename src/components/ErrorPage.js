import React from 'react'
import {
    Heading,
} from "@chakra-ui/react"

const ErrorPage = () => {
    return (
        <div>
            <Heading as='h5' size='md' mt={5} mb={5} mr={5} style={{color: "grey"}}>
                Ugh Oh! Something went wrong.  
            </Heading>
        </div>
    )
}

export default ErrorPage