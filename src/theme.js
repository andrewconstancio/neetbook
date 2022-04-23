// import { extendTheme } from '@chakra-ui/react'

// const theme = extendTheme({
//     styles: {
//         global: () => ({
//             body: {   
//                 // bg: "#1b1b1b",
//                 // color: "white"
//                 bg: "#FFFFFF",
//                 color: "black",
//             }
//         })
//     },
//     breakpoints: {
//         sm: "30em",
//         // smmd: "40em",
//         md: "48em",
//         lg: "80em",
//         xl: "96em",
//     },
// })


// export default theme;

import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react'

const styles = {
    global: props => ({
        body: {
            color: mode('gray.800', 'whiteAlpha.900')(props),
            bg: mode('gray.100', '#1b1b1b')(props),
        },
    }),
};

const components = {
    Drawer: {
    // setup light/dark mode component defaults
        baseStyle: props => ({
            dialog: {
            bg: mode('white', '#1b1b1b')(props),
            },
        }),
    },
};

const theme = extendTheme({
    components,
    styles,
});

export default theme;