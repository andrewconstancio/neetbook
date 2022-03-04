import React from 'react'
import {
    Flex,
    Box,
    Text,
    Spacer,
    Button,
    Textarea
} from "@chakra-ui/react"
import CoverImagePreview from '../../components/CoverImagePreview'
import useBookSingleInfo from '../../Hooks/useBookSingleInfo';
import './BookPage.css'
import RatingCustom from '../../components/RatingCustom';
import ReadButton from '../../components/ReadButton';
import useBookUserInfo from '../../Hooks/useBookUserInfo';
import { auth, firestore } from '../../config/firebase-config';

const BookPage = (props) => {

    const { bookKey } = props.location.state;
    const { bookEditionKey } = props.location.state;


    const {
        book,
        error,
        loading
    } = useBookSingleInfo(bookKey, bookEditionKey);

    const {
        ratingChanged,
        ratingValue,
        hasRead,
        setRatingChanged,
        setRatingValue,
        setHasRead
    } = useBookUserInfo(bookKey, bookEditionKey);

    if(!book) {
        return <div>Loading</div>
    }

    const handleChange = async () => {
        
        try {

            let read = hasRead ? false : true
            let document = await firestore
            .collection("UserBookRatings")
            .where("uid", "==", auth.currentUser.uid)
            .where("bookEditionKey", "==", bookEditionKey)
            .get()

            if(!document.empty) {
                firestore.collection('UserBookRatings').doc(document.docs[0].id).set({
                    read: read,
                    modifiedAt: new Date()
                }, {merge: true})
            } else {
                firestore.collection('UserBookRatings').add({
                    read: read,
                    bookEditionKey: bookEditionKey,
                    uid: auth.currentUser.uid,
                    createdAt: new Date()
                })
            }
            setHasRead(read);
        } catch(err) {
            console.log("err" + err);
        }
    }


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
                            <RatingCustom 
                                ratingValue={ratingValue} 
                                ratingChanged={ratingChanged} 
                                bookEditionKey={bookEditionKey} 
                                handleChange={handleChange}
                            />
                        </Box>
                        <Spacer />
                        <Box mt={["15px", "15px", "15px", "0px", "0px"]}>
                            <ReadButton 
                                bookEditionKey={bookEditionKey} 
                                hasRead={hasRead}
                                handleChange={handleChange}
                            />
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