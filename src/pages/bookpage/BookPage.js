import React, { useState, useEffect } from 'react'
import {
    Flex,
    Box,
    Text,
    Button,
    Collapse
} from "@chakra-ui/react"
import CoverImagePreview from '../../components/CoverImagePreview'
import useBookSingleInfo from '../../Hooks/useBookSingleInfo';
import './BookPage.css'
import RatingInput from '../../components/RatingInput';
import ReadButtonInput from '../../components/ReadButtonInput';
import Author from '../../components/Author';
import SubjectButton from '../../components/SubjectButton';
import CommentSection from '../../components/Comments/CommentSection';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import { Redirect } from 'react-router-dom';
import Loader from '../../components/Loader';
import Subjects from './Subjects';


const BookPage = (props) => {

    const { bookId } = props.location.state;
    const [show, setShow] = useState(false)
    const dispatch = useDispatch();
    const { putBookKeyInState } = bindActionCreators(actionCreators, dispatch);
    const handleToggle = () => setShow(!show)
    const [hasRead, setHasRead] = useState(false);

    const {
        book,
        error,
        loading
    } = useBookSingleInfo(bookId);

    useEffect(() => {
        putBookKeyInState(bookId);
    }, [])

    if(!book) {
        return <div className='container'>
            <Loader />
        </div>
    }

    console.log(book.categories);

    return (
        <div className='container'>
            <Flex direction={['column', 'column', 'column', 'row', 'row']} style={{marginTop: "80px"}}>
                <Box 
                    flexShrink={0} 
                    w={["100%", "100%","100%", "auto", "30%"]} 
                    pr={[0, 6]} 
                    align="center" 
                    className="column-1"
                >
                    <Box className="sticky-left-column">
                        <CoverImagePreview coverURL={book.imageLinks.thumbnail} classType="cover-preview-page" />
                        <RatingInput />
                        <ReadButtonInput bookEditionKey={bookId} hasRead={hasRead} setHasRead={setHasRead}  />
                    </Box>
                </Box>
                <Box w={["100%", "100%","100%", "100%", "70%"]} className="column-2">
                    <Box mt={["15px", "15px", "15px", "15px", "0px"]}>
                        <Text><b>{book.title}</b></Text>
                        <Text>
                            <i>{book.authors[0]} ({book.publishedDate})</i>
                        </Text>
                    </Box>
                    <Flex direction="column">
                        <Box>
                            <Collapse startingHeight={100} in={show}>
                                <div className="content" dangerouslySetInnerHTML={{__html: book.description}}></div>
                            </Collapse>
                            <Button 
                                colorScheme="purple" 
                                size='sm' 
                                onClick={handleToggle} mt='1rem' 
                                style={{float: "right", marginBottom: "20px"}}
                            >
                                Show {show ? 'Less' : 'More'}
                            </Button>
                        </Box>
                        <Box>
                            {book.categories ? <Subjects categories={book.categories}/> : ""}
                        </Box>
                    </Flex>
                    <CommentSection bookId={bookId} />
                </Box>
            </Flex>
        </div>
    )
}

export default BookPage