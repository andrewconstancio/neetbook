import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    styles: {
        global: () => ({
            body: {   
                bg: "#1b1b1b",
                color: "white"
            }
        })
    },
})


export default theme;