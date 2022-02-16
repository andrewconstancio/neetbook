import React from 'react'
import '../pages//explore/Explore.css'
import {
    Box
} from "@chakra-ui/react"

const LoadingBook = ( {total} ) => {

    return (
        <>
            <Box>
                <div
                    style={{borderRadius: "20px", backgroundColor: "rgb(59, 59, 59)", height: "350px", width: "235px"}}
                    className="shimmer"
                >
                    &nbsp;
                </div>
            </Box>
        </>
    )
}

export default LoadingBook