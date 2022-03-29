import React from "react";
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
import { useSelector } from 'react-redux';
import { Logo } from '../Logo'

const Header = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const user = useSelector((state) => state.auth.user);

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

                {/* <Stack
                    direction={{ base: "row"}}
                    display={{ base: "block", md: "none" }}
                    width={{ base: "auto"}}
                    alignItems="center"
                    flexGrow={1}
                    mt={{ base: 4, md: 0 }}
                    spacing='15px'
                    >
                    <Link 
                        to="/mycollection" 
                    > 
                        <i className="fa fa-heart fa-lg"></i>
                    </Link>
                    <Link 
                        to="/explore" 
                    > 
                        <i className="fa fa-compass fa-lg"></i>
                    </Link>
                    <i className="fa fa-magnifying-glass"></i>
                </Stack>


                <Stack
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
            <div class="wave">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
                </svg>
            </div>
        </Flex>
    );
};

export default Header;