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

    if(!authorInfo) {
        return (
            <></>
        )
    }

    return (
        <Text>
            <i>{authorInfo.name}</i>
        </Text>
    )
}

export default Author
