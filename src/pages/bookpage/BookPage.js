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


const BookPage = (props) => {

    const { bookId } = props.location.state;
    const [show, setShow] = useState(false)
    const [subjects, setSubjects] = useState(null)
    const dispatch = useDispatch();
    const { putBookKeyInState } = bindActionCreators(actionCreators, dispatch);
    const handleToggle = () => setShow(!show)
    const [hasRead, setHasRead] = useState(false);

    const {
        book,
        error,
        loading
    } = useBookSingleInfo(bookId);

    const parseSubject = () => {
        var subsArr= [];
        book.categories.map((subject) => {
            var sub  = subject.split("/");
            sub.map((subs) => {
                subsArr.push(subs.trim());
            })
        })
        setSubjects(subsArr);
    }

    useEffect(() => {
        putBookKeyInState(bookId);
    }, [])

    if(!book) {
        return <div className='container'>
            <Loader />
        </div>
    }

    parseSubject()
     
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
                            {subjects.map((subject) => {
                                return (
                                    <SubjectButton key={subject} subject={subject} />
                                )
                            })}
                        </Box>
                    </Flex>
                    <CommentSection bookId={bookId} />
                </Box>
            </Flex>
        </div>
    )

    // const { bookKey } = props.location.state;
    // const { bookEditionKey } = props.location.state;
    // const { coverId } = props.location.state;
    // const [hasRead, setHasRead] = useState(false);
    // const [show, setShow] = useState(false)
    // const dispatch = useDispatch();
    // const { putBookKeyInState } = bindActionCreators(actionCreators, dispatch);
    // const handleToggle = () => setShow(!show)

    // const {
    //     book,
    //     error,
    //     loading
    // } = useBookSingleInfo(bookKey, bookEditionKey);

    // useEffect(() => {
    //     putBookKeyInState(bookEditionKey);
    // }, [])


    // if(!book) {
    //     return <div className='container'>
    //         <Loader />
    //     </div>
    // }

    

    // return (
    //     <div className='container'>
    //         <Flex direction={['column', 'column', 'column', 'row', 'row']} style={{marginTop: "80px"}}>
    //             <Box 
    //                 flexShrink={0} 
    //                 w={["100%", "100%","100%", "auto", "30%"]} 
    //                 pr={[0, 6]} 
    //                 align="center" 
    //                 className="column-1"
    //             >
    //                 <Box className="sticky-left-column">
    //                     <CoverImagePreview coverId={coverId} classType="cover-preview-page" />
    //                     <RatingInput bookEditionKey={bookEditionKey} hasRead={hasRead} setHasRead={setHasRead} />
    //                     <ReadButtonInput bookEditionKey={bookEditionKey} hasRead={hasRead} setHasRead={setHasRead}  />
    //                 </Box>
    //             </Box>
    //             <Box w={["100%", "100%","100%", "100%", "70%"]} className="column-2">
    //                 <Box mt={["15px", "15px", "15px", "15px", "0px"]}>
    //                     <Text><b>{book.title}</b></Text>
    //                     <Author authorKey={book.authors[0].author.key} />
    //                 </Box>
    //                 <Flex direction="column">
    //                     <Box>
    //                         <Collapse startingHeight={100} in={show}>
    //                             {typeof book.description === 'object' ? book.description.value : book.description !== null ? book.description : "This edition doesn't have a description yet."}
    //                         </Collapse>
    //                         <Button 
    //                             colorScheme="purple" 
    //                             size='sm' 
    //                             onClick={handleToggle} mt='1rem' 
    //                             style={{float: "right", marginBottom: "20px"}}
    //                         >
    //                             Show {show ? 'Less' : 'More'}
    //                         </Button>
    //                     </Box>
    //                     <Box>
    //                         {book.subjects ? book.subjects.slice(0, 7).map((subject) => {
    //                             return (
    //                                 <SubjectButton key={subject} subject={subject} />
    //                             )
    //                         }) : ""}
    //                     </Box>
    //                 </Flex>
    //                 <CommentSection bookEditionKey={bookEditionKey} />
    //             </Box>
    //         </Flex>
    //     </div>
    // )
}

export default BookPage