import React, { useState, useEffect } from "react";
import {
    Box,
    Stack,
    Flex,
    Avatar,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    useColorModeValue
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import './Header.css'
import { auth } from '../../config/firebase-config'
import { Logo } from '../Logo'
import {useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import LogoSmall from '../LogoSmall';
import ThemeSelector from "./ThemeSelector";

const Header = (props) => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const page = useSelector((state) => state.page.page);
    const { setPage } = bindActionCreators(actionCreators, dispatch);
    const headerFillClass = useColorModeValue('shape-fill-light', 'shape-fill-dark')

    const signOut = () => {
        auth.signOut();
    }

    return (
        <Flex
            className={"sticky header"}
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
                    <Link 
                        to="/" 
                    >
                        <Box
                            onClick={() => setPage("explore")}
                            display={{ base: "none", md: "block" }}
                        >
                            <Logo />
                        </Box>
                        <Box
                            onClick={() => setPage("explore")}
                            display={{ base: "block", md: "none" }}
                        >
                            <LogoSmall />
                        </Box>
                    </Link>
                </Flex>
                <Stack
                    direction={{ base: "row"}}
                    width={{ base: "auto"}}
                    alignItems="center"
                    flexGrow={1}
                    mt={{ base: 4, md: 0 }}
                    spacing='2px'
                    >
                </Stack>
                <Box mt={{ base: 4, md: 0 }}>
                    <Popover>
                        <PopoverTrigger>
                            <Avatar name={user.displayName} boxSize='50px' src={user.photoURL} />
                        </PopoverTrigger>
                        <PopoverContent style={{paddingLeft: "0px"}}>
                            <PopoverArrow />
                            <PopoverBody style={{border: "none", paddingLeft: "0px", paddingRight: "0px"}}>
                                <Box className="popout-item-selection">
                                    <ThemeSelector />
                                </Box>
                                <Box className="popout-item-selection" onClick={signOut}>
                                    Log out
                                </Box>
                            </PopoverBody>
                        </PopoverContent>
                    </Popover>
                </Box>
            </Flex>
            <div className="wave">
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className={headerFillClass}></path>
                </svg>
            </div>
        </Flex>
    );
};

export default Header;