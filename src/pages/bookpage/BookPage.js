import React from 'react'
import {
    Flex,
    Box,
    Text,
    Spacer,
} from "@chakra-ui/react"
import CoverImagePreview from '../../components/CoverImagePreview'
import useBookSingleInfo from '../../Hooks/useBookSingleInfo';
import './BookPage.css'
import RatingInput from '../../components/RatingInput';
import ReadButtonInput from '../../components/ReadButtonInput';
import NotesInput from '../../components/NotesInput';
import Author from '../../components/Author';

const BookPage = (props) => {

    const { bookKey } = props.location.state;
    const { bookEditionKey } = props.location.state;


    const {
        book,
        error,
        loading
    } = useBookSingleInfo(bookKey, bookEditionKey);

    if(!book) {
        return <div>Loading</div>
    }

    return (
        <div className='container'>
            <Flex direction={['column', 'column', 'column', 'column', 'row']}>
                <Box flexShrink={0} w={["100%", "100%","100%", "auto", "30%"]} pr={[0, 6]} align="center">
                    <CoverImagePreview coverId={book.covers[0]} />
                    <RatingInput bookEditionKey={bookEditionKey} />
                    {/* <Author authorKey={book.authors[0].author.key} /> */}
                </Box>
                <Box 
                    w={["100%", "100%","100%", "100%", "70%"]}
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
                        <Text mt={5} fontSize='sm'>
                            {typeof book.description === 'object' ? book.description.value : book.description !== null ? book.description : "This edition doesn't have a description yet."}
                        </Text>
                    </Box>
                    <Flex direction={['column', 'column', 'column', 'row', 'row']} mt={10}>
                        <Box>
                            {/* <RatingInput bookEditionKey={bookEditionKey} /> */}
                        </Box>
                        <Spacer />
                        <Box mt={["15px", "15px", "15px", "0px", "0px"]}>
                            <ReadButtonInput bookEditionKey={bookEditionKey} />
                        </Box>
                    </Flex>
                    <NotesInput bookEditionKey={bookEditionKey} />
                </Box>
            </Flex>
        </div>
    )
}

export default BookPage