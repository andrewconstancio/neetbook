import { useState, useEffect } from 'react';
import './CoverImagePreview.css'
import {
    Box,
    SimpleGrid,
    Image,
    Heading
} from "@chakra-ui/react"

const CoverImagePreview = ({coverURL, classType}) => {

    return (
        <div>
            <Box alignItems='baseline'>
                <Image 
                    style={{borderRadius: "0px 20px 20px 0px"}} 
                    w={["90%", "90%", 225]} 
                    h={["90%", "90%", 375]}
                    src={coverURL}
                    alt="aye" 
                    className={classType}
                />
            </Box>
        </div>
    )
}

export default CoverImagePreview
