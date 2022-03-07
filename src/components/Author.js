import React, { useState, useEffect } from 'react'
import OpenLibrary from '../apis/OpenLibrary';
import axios from 'axios';
import {
    Stack,
    Box,
    Text,
    Spacer,
    Image
} from "@chakra-ui/react"

const Author = ( {authorKey} ) => {
    const [authorInfo, setAuthorInfo] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            await OpenLibrary.get(`${authorKey}.json`)
            .then(res => {
                setAuthorInfo(res.data)
                setLoading(false)
            }).catch(e => {
                if(axios.isCancel(e)) return
                setLoading(true)
            });
        }
        fetchData();
    }, []);

    console.log(authorInfo)

    if(!authorInfo) {
        return (
            <></>
        )
    }

    return (
        <Stack w={225} mt={5}>
            <Box >
                <Image 
                    borderRadius='full' 
                    style={{width: "55px", height: "55px", display: "inline-block", float: "left"}}
                    src={`https://covers.openlibrary.org/b/id/${authorInfo.photos[0]}.jpg`}
                    alt="hey"
                />
                <Text style={{float: "right", marginTop: "15px"}}><b>{authorInfo.name}</b></Text>
            </Box>
            <Box w={250} align="left">
                <Text fontSize='sm'>
                    {authorInfo.bio}
                </Text>
            </Box>
        </Stack>
    )
}

export default Author
