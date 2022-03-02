import React, { useRef, useState } from 'react'
import { Button, Flex, Heading, Input, Text, Alert, AlertIcon, Stack} from '@chakra-ui/react'
import { useAuth } from '../../contexts/AuthContext'
import { Logo } from '../../components/Logo'
import firebase, {auth} from '../../config/firebase-config'

const SignUp = ({websitename}) => {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    // const { signUp } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    // const navigate = useNavigate();
 
    function handleSubmit(e)  {
        e.preventDefault()

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if ( !re.test(emailRef.current.value) ) {
            return setError("Invalid email!")
        }

        if(passwordRef.current.value !== passwordConfirmRef.current.value ) {
            return setError("Passwords do not match!")
        }

        var pass = passwordRef.current.value
        var passLength = pass.length
        if(passLength <= 6) {
            return setError("Passwords should be greater\n than 6 characters.")
        }

        try {
            setError("")
            setLoading(true)
            // signUp(emailRef.current.value, passwordRef.current.value)
            // navigate('/')
        } catch{
            setError("Failed to create an account.")
        }

        setLoading(false)
    }

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        console.log(firebase.auth());
        firebase.auth().signInWithPopup(provider)
        .then((re) => {
            console.log(re);
        })
        .catch((err) => {
            console.log(err);
        }) 
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

export default SignUp