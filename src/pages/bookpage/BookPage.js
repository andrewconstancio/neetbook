import React, { useState } from 'react'
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
import Author from '../../components/Author';
import SubjectButton from '../../components/SubjectButton';
import CommentMain from '../../components/Comments/CommentMain';

const BookPage = (props) => {

    const { bookKey } = props.location.state;
    const { bookEditionKey } = props.location.state;
    const [hasRead, setHasRead] = useState(false);

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
            <Flex direction={['column', 'column', 'column', 'row', 'row']}>
                <Box 
                    flexShrink={0} 
                    w={["100%", "100%","100%", "auto", "30%"]} 
                    pr={[0, 6]} 
                    align="center" 
                    className="column-1"
                >
                    <Box className="sticky-left-column">
                        <CoverImagePreview coverId={book.covers[0]} />
                        <RatingInput bookEditionKey={bookEditionKey} hasRead={hasRead} setHasRead={setHasRead} />
                        <ReadButtonInput bookEditionKey={bookEditionKey} hasRead={hasRead} setHasRead={setHasRead}  />
                    </Box>
                </Box>
                <Box w={["100%", "100%","100%", "100%", "70%"]} className="column-2">
                    <Box mt={["15px", "15px", "15px", "15px", "0px"]}>
                        <Text><b>{book.title}</b></Text>
                        <Author authorKey={book.authors[0].author.key} />
                    </Box>
                    <Box>
                    </Box>
                    <Box>
                        <Text mt={5} fontSize='sm'>
                            {typeof book.description === 'object' ? book.description.value : book.description !== null ? book.description : "This edition doesn't have a description yet."}
                        </Text>
                        {book.subjects.slice(0, 7).map((subject) => {
                            return (
                                <SubjectButton key={subject} subject={subject} />
                            )
                        })}
                    </Box>
                    <CommentMain bookEditionKey={bookEditionKey} />
                </Box>
            </Flex>
        </div>
    )
}

export default BookPage