import React, { useEffect, useState } from 'react'
import { Button, Flex, Stack} from '@chakra-ui/react'
import { Logo } from '../../components/Logo'
import firebase, {auth, firestore} from '../../config/firebase-config'
import { useHistory, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux'

const SignIn = ({websitename}) => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch();
    const { setUser } = bindActionCreators(actionCreators, dispatch)


    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then((re) => {
            userAccountCreated(re.user.uid)
        })
        .catch((err) => {
            console.log(err);
        }) 
    }

    const setUserProfileImage = async (document) => {
        await document.set({
            name: auth.currentUser.displayName,
            profileURLGoogle: auth.currentUser.photoURL,
            createdAt: new Date()
        })
    }

    const updateUserProfileImage = async (document) => {
        await document.set({
            profileURLGoogle: auth.currentUser.photoURL
        })
    }

    const userAccountCreated = async (uid) => {
        const document = firestore
        .collection("users")
        .doc(uid)

        await document.get()
        .then((docSnapshot)  =>  {
            if (!docSnapshot.exists) {
                setUserProfileImage(document);
            } else if(docSnapshot.data().profileURLGoogle !== auth.currentUser.photoURL) {
                updateUserProfileImage(document);
            }
        });

        const userObj = {
            uid: auth.currentUser.uid, 
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
            signOut: auth.signOut
        }

        setUser(userObj)
    } 

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex>
                <Stack align="center">
                    <Logo websitename={websitename}  />
                    <Button onClick={signInWithGoogle} disabled={loading} colorScheme="pink" mb={1}><i className="fa-brands fa-google"></i>&nbsp;&nbsp;Sign in With Google</Button>
                </Stack>
            </Flex>
        </Flex> 
    )
}

export default SignIn
