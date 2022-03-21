import React from "react";
import {
    Box,
    Stack,
    Heading,
    Flex,
    Text,
    useDisclosure,
    Image,
    Input
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import './Header.css'
import { auth } from '../../config/firebase-config'
import { useSelector } from 'react-redux';

const Header = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const currentUser = useSelector((state) => state.auth.user);


    const signOut = () => {
        auth.signOut();
    }

    return (
        <Flex
            bg="#161616" 
            color="white" 
            className="sticky"
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
                    <Heading as="h1" size="lg" letterSpacing={"tighter"} style={{ color: '#FF004D'}}>
                        {props.websitename}
                    </Heading>
                </Flex>

                <Stack
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
                </Stack>

                <Box 
                    mt={{ base: 4, md: 0 }} mr={5} ml={5} flexGrow={1} 
                    display={{ base: "none", md: "flex" }}
                >
                    <Input variant='filled'  style={{ backgroundColor : "#232323"}}  placeholder='Search...' size='md' />
                </Box>

                <Box
                    // display={{ base: isOpen ? "block" : "none", md: "block" }}
                    mt={{ base: 4, md: 0 }}
                >
                    <Image borderRadius='full' boxSize='50px' onClick={signOut} src={auth.currentUser.photoURL} alt={auth.currentUser.displayName} />
                </Box>
            </Flex>
        </Flex>
    );
};

export default Header;