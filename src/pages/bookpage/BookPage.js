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
import { useSelector,  useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import Loader from '../../components/Loader';
import ErrorPage from '../../components/ErrorPage'
import { Link } from 'react-router-dom';


const BookPage = (props) => {

    const { bookKey } = props.location.state;
    const { bookEditionKey } = props.location.state;
    const { coverId } = props.location.state;
    const [hasRead, setHasRead] = useState(false);
    const [show, setShow] = useState(false)
    const dispatch = useDispatch();
    const { putBookKeyInState } = bindActionCreators(actionCreators, dispatch);
    const handleToggle = () => setShow(!show)

    const {
        book,
        error,
        loading
    } = useBookSingleInfo(bookKey, bookEditionKey);

    useEffect(() => {
        putBookKeyInState(bookEditionKey);
    }, [])



    if(loading) {
        return <>
            <Loader />
        </>
    }

    if(error) {
        return <>
            <ErrorPage />
        </>
    }

    return (
        <>
            <Flex direction={['column', 'column', 'row', 'row', 'row']} style={{marginTop: "40px"}}>
            <Box>
                <Link to="/">
                    <Button>
                        <i class="fa-solid fa-arrow-left"></i>
                    </Button>
                </Link>
            </Box>
                <Box 
                    flexShrink={0} 
                    w={["100%", "100%","30%", "30%", "30%"]} 
                    pr={[0, 6]} 
                    align="center" 
                    className="column-1"
                >
                    <Box className="sticky-left-column">
                        <CoverImagePreview coverId={coverId} classType="cover-preview-page" />
                        <RatingInput bookEditionKey={bookEditionKey} hasRead={hasRead} setHasRead={setHasRead} />
                        <ReadButtonInput bookEditionKey={bookEditionKey} hasRead={hasRead} setHasRead={setHasRead}  />
                    </Box>
                </Box>
                <Box w={["100%", "100%","70%", "70%", "70%"]} className="column-2">
                    <Box mt={["15px", "15px", "15px", "15px", "0px"]}>
                        <Text><b>{book.title}</b></Text>
                        <Author authorKey={book.authors[0].author.key} />
                    </Box>
                    <Flex direction="column">
                        <Box>
                            <Collapse startingHeight={100} in={show}>
                                {typeof book.description === 'object' ? book.description.value : book.description !== null ? book.description : "This edition doesn't have a description yet."}
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
                            {book.subjects ? book.subjects.slice(0, 7).map((subject) => {
                                return (
                                    <SubjectButton key={subject} subject={subject} />
                                )
                            }) : ""}
                        </Box>
                    </Flex>
                    <CommentSection bookEditionKey={bookEditionKey} />
                </Box>
            </Flex>
        </>
    )
}

export default BookPage