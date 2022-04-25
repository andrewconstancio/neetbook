import React from 'react'
import {
    Box,
    Button
} from "@chakra-ui/react"
import { Link } from 'react-router-dom';

const BackButton = () => {

    const handleBack = () => {
        window.history.go(-1)
    }

    return (
        <Button className="back-button" onClick={handleBack}>
            <i class="fa-solid fa-arrow-left"></i>
        </Button>
    )
}

export default BackButton