import { Image, 
        Box, 
        Stack, 
        Text,
        HStack
} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import './Comment.css';
import { auth, firestore } from '../../config/firebase-config';
import CommentActionsPopover from './CommentActionsPopover';
import LikeButton from './LikeButton';

const Comment = ( {bookEditionKey, value, uid, docRef, getComments} ) => {

    const [profileURL, setProfileURL] = useState('');
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    // const [dislikes, setDislikes] = useState(0);
    // const [userHasDisliked, setUserHasDisliked] = useState(false);

    useEffect(() => {
        async function fetchData() {

            setLoading(true)

            const document = firestore
            .collection("users")
            .doc(uid)

            document.get()
            .then((docSnapshot) => {
                setProfileURL(docSnapshot.data().profileURLGoogle);
                setName(docSnapshot.data().name);
                setLoading(false)
            })
        }
        if(uid) {
            // fetchDislikeData();
            fetchData();
        } 
    }, [uid]);

    // const fetchDislikeData = async () => {

    //     setLoading(true)

    //     const document = firestore
    //     .collection("UserBookDislikes")
    //     .where("bookEditionKey", "==", bookEditionKey)
    //     .where("commentID", "==", docRef.id)
    //     document.get()
    //     .then((docSnapshot) => {
    //         setDislikes(docSnapshot.docs.length);
    //         fetchUserHasDisliked();
    //         setLoading(false)
    //     })
    // }

    const fetchUserHasDisliked = async () => {
        setLoading(true)
        
        const document = firestore
        .collection("UserBookDislikes")
        .where("bookEditionKey", "==", bookEditionKey)
        .where("commentID", "==", docRef.id)
        .where("uid", "==", auth.currentUser.uid)
        document.get()

        .then((docSnapshot) => {
            if(!docSnapshot.empty) {
                setUserHasDisliked(true)
                setLoading(false)
            }
        })
    }



    // const handleDislike = () => {
    //     firestore.collection('UserBookDislikes').add({
    //         commentID: docRef.id,
    //         uid: auth.currentUser.uid,
    //         bookEditionKey: bookEditionKey,
    //         createdAt: new Date()
    //     })
        
    //     fetchDislikeData();
    // }

    if(loading) {
        return (
            <></>
        )
    }

    console.log("HEREEE");

    return (
        <div className='view-outer-container'>
            <Stack direction={['row']} spacing='15px'>
                <Box style={{maxWidth: "50px", minWidth: "50px"}}>
                    <Image 
                        borderRadius='full' 
                        src={profileURL} 
                        alt={name} 
                    />
                </Box>
                <Box w="90%">
                    <Stack>
                        <Box>
                            <Text style={{display: "inline"}}>{auth.currentUser.displayName}</Text>
                            <CommentActionsPopover uid={uid} docRef={docRef} getComments={getComments} />
                        </Box>
                        <Box>
                            {value}
                        </Box>
                        {/* <Box>
                            <HStack spacing={4}>
                                <Box>
                                    <LikeButton docRef={docRef} currUID={auth.currentUser.uid} bookEditionKey={bookEditionKey} />
                                </Box>
                                <Box>
                                    {!userHasDisliked ? (
                                        <i onClick={handleDislike} className="fa-regular fa-thumbs-down like-button"></i>
                                    ) : (
                                        <i className="fa-solid fa-thumbs-down like-button"></i>
                                    )}

                                    <Text style={{display: "inline"}} fontSize='xs'>{dislikes > 0 ? dislikes : ''}</Text>
                                </Box>
                            </HStack>
                        </Box> */}
                    </Stack>
                </Box>
            </Stack>
        </div>
    )
}

export default Comment