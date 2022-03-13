import React from 'react'
import {
    Flex,
    Box,
    Text,
    Button,
} from "@chakra-ui/react"
import { Link } from 'react-router-dom'

const SubjectButton = ( {subject} ) => {

    return (
        <Link to={`/subject/${subject}`}>
            <Button mt={3} mr={2} colorScheme="teal" variant="outline" size='sm'>
                <b>{subject}</b>
            </Button>
        </Link>
    )
}

export default SubjectButton