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
                    style={{borderRadius: "20px"}} 
                    w={["90%", "90%", 400]} 
                    src={`https://covers.openlibrary.org/b/id/${coverId}.jpg`}
                    alt="aye" 
                />
            </Box>
        </div>
    )
}

export default CoverImagePreview
