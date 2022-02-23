import React from 'react'
import '../pages//explore/Explore.css'
import {
    Box
} from "@chakra-ui/react"

const LoadingBook = ( {total} ) => {

    return (
        <div>
            <Box w={[200, 300, 400]} h={[200, 350, 450]} style={{borderRadius: "20px", backgroundColor: "rgb(59, 59, 59)"}} className="shimmer">
                &nbsp;
            </Box>
        </div>
    )
}

export default LoadingBook