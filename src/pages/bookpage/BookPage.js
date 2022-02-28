import React, { useState } from 'react'
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
    Link,
    Spacer,
    Button,
    Textarea
} from "@chakra-ui/react"
import CoverImagePreview from '../../components/CoverImagePreview'
import useBookSingleInfo from '../../Hooks/useBookSingleInfo';
import './BookPage.css'
import RatingCustomer from '../../components/RatingCustom'
import RatingCustom from '../../components/RatingCustom';
import ReadButton from '../../components/ReadButton';

const BookPage = (props) => {

    const { bookKey } = props.location.state;
    const { bookEditionKey } = props.location.state;

    const {
        book,
        error,
        loading
    } = useBookSingleInfo(bookKey);

    if(!book) {
        return <div>Loading</div>
    }

    console.log(bookEditionKey)

    return (
        <div className='container'>
            <Flex direction={['column', 'column', 'column', 'column', 'row']}>
                <Box flexShrink={0} w={["100%", "100%","100%", "auto", "auto"]} pr={[0, 6]} align="center">
                    <CoverImagePreview coverId={book.covers[0]} />
                </Box>
                <Box 
                    w={["100%", "100%","100%", "100%", "60%"]}
                >
                    <Box mt={["15px", "15px", "15px", "15px", "0px"]}>
                        <Text><b>{book.title}</b></Text>
                        <Text>
                            <i>Andrew Constancio ({book.first_publish_date})</i>
                        </Text>
                    </Box>
                    <Box>
                    </Box>
                    <Box>
                        <Text mt={5}>
                            {typeof book.description === 'object' ? book.description.value : book.description !== null ? book.description : "This edition doesn't have a description yet."}
                        </Text>
                    </Box>
                    <Flex direction={['column', 'column', 'column', 'row', 'row']} mt={10}>
                        <Box>
                            <RatingCustom bookEditionKey={bookEditionKey} />
                        </Box>
                        <Spacer />
                        <Box mt={["15px", "15px", "15px", "0px", "0px"]}>
                            <ReadButton />
                            {/* <Button colorScheme='teal' size='md' w={{ base: '100%', sm: '100%' }} variant='outline'>
                                Read
                            </Button> */}
                        </Box>
                    </Flex>
                    <Textarea mt={5} placeholder='Your thoughts...' />
                    <Button colorScheme='pink' size='md' style={{float: "right"}} w={{ base: '100%', sm: '100%' }} mt={15}>
                        Post
                    </Button>
                </Box>
            </Flex>
        </div>
    )
}

export default BookPage