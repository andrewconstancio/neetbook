import React from 'react'
import '../pages/Explore/Explore.css'
import {
    Box
} from "@chakra-ui/react"
import '../pages/Explore/Explore.css'

const LoadingBook = ( {total} ) => {

    return (
        <div  className='shimmer'>
            <Box  
                style={{borderRadius: "20px", backgroundColor: "rgb(59, 59, 59)", margin: "10px"}}
                w={[160, 150, 175]}
                h={[250, 275, 300]}  
            >
            </Box>
        </div>
    )
}

export default LoadingBook