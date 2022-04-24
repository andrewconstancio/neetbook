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
        <Box onClick={toggleColorMode}>
            {colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Box>
    )
}

export default ThemeSelector