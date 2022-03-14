import React, { useEffect, useState } from 'react'
import { Button, Flex, Stack} from '@chakra-ui/react'
import { Logo } from '../../components/Logo'
import firebase, {auth, firestore} from '../../config/firebase-config'
import { useHistory, Redirect } from 'react-router-dom'

const SignIn = ({websitename}) => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();

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

    const userAccountCreated = (uid) => {
        const document = firestore
        .collection("users")
        .doc(uid)

        document.get()
        .then((docSnapshot) => {
            if (!docSnapshot.exists) {
                document.set({
                    name: auth.currentUser.displayName,
                    profileURLGoogle: auth.currentUser.photoURL,
                    createdAt: new Date()
                })
            } else if(docSnapshot.data().profileURLGoogle !== auth.currentUser.photoURL) {
                document.set({
                    profileURLGoogle: auth.currentUser.photoURL
                })
            }

        });
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