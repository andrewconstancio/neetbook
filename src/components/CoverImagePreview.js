import { useState, useEffect } from 'react';
import './CoverImagePreview.css'
import {
    Box,
    SimpleGrid,
    Image,
    Heading
} from "@chakra-ui/react"

const CoverImagePreview = ({coverId}) => {

    return (
        <div>
            <Box alignItems='baseline'>
                <Image 
                    style={{borderRadius: "0px 20px 20px 0px"}} 
                    w={["90%", "90%", 225]} 
                    src={`https://covers.openlibrary.org/b/id/${coverId}.jpg`}
                    alt="aye" 
                />
            </Box>
        </div>
    )
}

export default CoverImagePreview
