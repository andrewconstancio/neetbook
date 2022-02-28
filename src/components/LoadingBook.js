import React from 'react'
import '../pages//explore/Explore.css'
import {
    Box
} from "@chakra-ui/react"

const LoadingBook = ( {total} ) => {

    return (
        <div>
            <Box 
                className='book shimmer' 
                style={{borderRadius: "20px", backgroundColor: "rgb(59, 59, 59)"}}
                h={[450, 350, 450]}  
            >
            </Box>
        </div>
    )
}

export default LoadingBook