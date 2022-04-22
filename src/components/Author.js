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
import { Link } from 'react-router-dom';

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
            <Link to={{pathname: authorKey, state: {authorKey: authorKey, name: authorInfo.name}}}>
                <i>{authorInfo.name}</i>
            </Link>
        </Text>
    )
}

export default Author
