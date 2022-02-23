import React from 'react'
import '../pages//explore/Explore.css'
import {
    Box
} from "@chakra-ui/react"

const LoadingBook = ( {total} ) => {

    return (
        <>
            <Box
                w={[400, 300, 400]} 
                h={[450, 350, 450]}  
            >
                <div
                    style={{borderRadius: "20px", backgroundColor: "rgb(59, 59, 59)", width: "inherit", height: "inherit"}}
                    className="shimmer"
                >
                    &nbsp;
                </div>
            </Box>
        </>
    )
}

export default LoadingBook