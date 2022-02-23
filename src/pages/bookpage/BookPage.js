import React from 'react'
import {
    Grid,
    GridItem,
    Heading,
    Flex,
    Box,
    Text,
    Center,
    Square,
    SimpleGrid,
    grid,
    Image,
    Link
} from "@chakra-ui/react"
import CoverImagePreview from '../../components/CoverImagePreview'
import Rating from 'react-rating';
import useBookSingleInfo from '../../Hooks/useBookSingleInfo';
import './BookPage.css'

const BookPage = (props) => {

    const { bookKey } = props.location.state;

    const {
        book,
        error,
        loading
    } = useBookSingleInfo(bookKey);

    if(!book) {
        return <div>Loading</div>
    }

    return (
        <div className='container'>
            <Flex
                direction={['column', 'column', 'column', 'row', 'row']}
            >
                <Box flexShrink={0}>
                    <CoverImagePreview coverId={book.covers[0]} />
                </Box>
                <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                    <Text ><h2>{book.title}</h2></Text>
                    <Text>
                        <i>Andrew Constancio (2009)</i>
                    </Text>
                </Box>
                <Box flexShrink={0} w={{md: "650px"}} mt={{ base: 4, md: 0 }} ml={{ md: 6 }} align="right">
                    <Rating style={{textAlign: "center"}} stop={10} />
                </Box>
            </Flex>
            {/* <Box p={4} display={{ md: 'flex' }}>
                <Box flexShrink={0}>
                    <CoverImagePreview coverId={book.covers[0]} />
                </Box>
                <Box mt={{ base: 4, md: 0 }} ml={{ md: 6 }}>
                    <Text align={{base: 'center', md: 'left'}}><h2>{book.title}</h2></Text>
                    <div style={{justifyContent: "center"}} >
                        <Rating style={{textAlign: "center"}} stop={10} />
                    </div>
                    <Text as='h5' size='sm' align={{base: 'center', md: 'left'}}>
                        <i>Andrew Constancio (2009)</i>
                    </Text>
                    <Text mt={5}>
                        {book.description ? book.description : "This edition doesn't have a description yet."}
                    </Text>
                </Box>
            </Box> */}
        </div>
    )
}

export default BookPage