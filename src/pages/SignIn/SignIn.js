import React, { useEffect, useState, useRef } from 'react'
import { Button, Box, HStack, Heading, Flex, Stack, Input, Text} from '@chakra-ui/react'
import { Logo } from '../../components/Logo'
import firebase, {auth, firestore} from '../../config/firebase-config'
import { useHistory, Redirect } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux'
import { Link, useNavigate } from 'react-router-dom'
import './SignIn.css'

const SignIn = ({websitename}) => {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch();
    const { signInWithGoogle, demoSignIn } = bindActionCreators(actionCreators, dispatch)

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" p={12} rounded={6}>
                <Box align="center">
                    <Logo websitename={websitename}  />
                </Box>
                <Button 
                        onClick={signInWithGoogle} 
                        disabled={loading} 
                        mt={50}
                        mb={1}
                        style={{backgroundColor: "black", color: "white", marginTop: "20px"}}
                    ><i className="fa-brands fa-google"></i>&nbsp;&nbsp;Sign in With Google
                </Button>
                <Button 
                        onClick={demoSignIn} 
                        disabled={loading} 
                        mb={1}
                        style={{backgroundColor: "black", color: "white", marginTop: "20px"}}
                    >Demo Sign In
                </Button>
            </Flex>
        </Flex>
    )
}

export default SignIn
