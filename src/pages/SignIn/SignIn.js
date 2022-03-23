import React, { useEffect, useState } from 'react'
import { Button, Flex, Stack, Input} from '@chakra-ui/react'
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
    const { signInWithGoogle } = bindActionCreators(actionCreators, dispatch)

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex>
                <Stack align="center">
                    <Logo websitename={websitename}  />
                    <Input placeholder='Email' size='md' />
                    <Input placeholder='Password' size='md' />
                    <Button colorScheme='teal' size='md'>
                        Sign In
                    </Button>
                    <hr style={{marginTop: "20px"}} />
                    <Button 
                        onClick={signInWithGoogle} 
                        disabled={loading} 
                        colorScheme="pink" mb={1}
                    ><i className="fa-brands fa-google"></i>&nbsp;&nbsp;Sign in With Google
                    </Button>
                </Stack>
            </Flex>
        </Flex> 
    )
}

export default SignIn
