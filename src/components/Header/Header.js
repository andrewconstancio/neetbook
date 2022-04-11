import React, { useState, useEffect } from "react";
import {
    Box,
    Stack,
    Heading,
    Flex,
    Text,
    useDisclosure,
    Image,
    Input,
    Avatar
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import './Header.css'
import { auth } from '../../config/firebase-config'
import { Logo } from '../Logo'
import {useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';

const Header = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const page = useSelector((state) => state.page.page);
    const [pageLocal, setPageLocal] = useState(page ? page : 'explore');
    const { setPage } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        setPage(pageLocal);
    }, [pageLocal])


    const signOut = () => {
        auth.signOut();
    }

    return (
        <Flex
            // color="white" 
            className="sticky header"
        >
            <Flex 
                className="center"
                as="nav"
                align="center"
                justify="space-between"
                wrap="wrap"
                padding={6}
                {...props}
            >
                <Flex align="center" mr={5}>
                    {/* <Heading as="h1" size="lg" letterSpacing={"tighter"} style={{ color: '#FF004D'}}>
                        {props.websitename}
                    </Heading> */}
                    <Link 
                        to="/" 
                    >
                        <Logo />
                    </Link>
                </Flex>

                <Stack
                    direction={{ base: "row"}}
                    // display={{ base: "block", md: "none" }}
                    width={{ base: "auto"}}
                    alignItems="center"
                    flexGrow={1}
                    mt={{ base: 4, md: 0 }}
                    spacing='20px'
                    >
                    <i onClick={() => setPageLocal('explore')} className="fa fa-solid fa-house"></i>
                    {/* <Text>Home</Text> */}
                    <i onClick={() => setPageLocal('currentlyreading')} className="fa fa-solid fa-book"></i>
                    {/* <Text>Reading</Text> */}
                    <i onClick={() => setPageLocal('wanttoread')} className="fa fa-regular fa-heart"></i>
                    {/* <Text>Saved</Text> */}
                    <i  onClick={() => setPageLocal('read')}className="fa fa-solid fa-check"></i>
                    {/* <Text>Completed</Text> */}
                </Stack>


                {/* <Stack
                    direction={{ base: "column", md: "row" }}
                    display={{ base: isOpen ? "block" : "none", md: "flex" }}
                    width={{ base: "full", md: "auto" }}
                    alignItems="center"
                    flexGrow={1}
                    mt={{ base: 4, md: 0 }}
                >
                    <Link 
                        to="/mycollection" 
                    > 
                        <Text>My Collection</Text>
                    </Link>
                    <Link 
                        to="/explore" 
                    > 
                        <Text>Explore</Text>
                    </Link>
                </Stack> */}

                {/* <Box 
                    mt={{ base: 4, md: 0 }} mr={5} ml={5} flexGrow={1} 
                    display={{ base: "none", md: "flex" }}
                >
                    <Input variant='filled'  style={{ backgroundColor : "#232323"}}  placeholder='Search...' size='md' />
                </Box> */}

                <Box
                    mt={{ base: 4, md: 0 }}
                >
                    <Avatar name={user.displayName} onClick={signOut} boxSize='50px' src={user.photoURL} />
                </Box>
            </Flex>
            <div className="wave">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
        </Flex>
    );
};

export default Header;