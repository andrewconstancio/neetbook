import React from 'react'
import {
    useColorMode,
    IconButton,
    Box,
    Button
} from "@chakra-ui/react";

const ThemeSelector = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Button onClick={toggleColorMode}>
            {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
    )
}

export default ThemeSelector