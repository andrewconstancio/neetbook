import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    styles: {
        global: () => ({
            body: {   
                // bg: "#1b1b1b",
                bg: "#FFFFFF",
                color: "black"
            }
        })
    },
    breakpoints: {
        sm: "30em",
        smmd: "40em",
        md: "48em",
        lg: "80em",
        xl: "96em",
    },
})


export default theme;