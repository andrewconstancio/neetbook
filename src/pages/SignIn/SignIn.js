import React, { useEffect, useState } from 'react'
import { Button, Flex, Heading, Input, Text, Alert, AlertIcon, Stack} from '@chakra-ui/react'
import { useAuth } from '../../contexts/AuthContext'
import { Logo } from '../../components/Logo'
import firebase, {auth} from '../../config/firebase-config'
import CreateUserProfile from  '../CreateUserProfile/CreateUserProfile'
import { useHistory, Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'

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
        history.push('/createprofile')
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