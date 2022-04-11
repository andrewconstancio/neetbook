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
                style={{borderRadius: "20px", backgroundColor: "rgb(59, 59, 59)"}}
                h={[300, 400, 300]}  
                w={[175, 250, 175]}   
            >
            </Box>
        </div>
    )
}

export default LoadingBook