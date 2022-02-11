import React, { useState, Component } from "react";
import {
    Box,
    Stack,
    Heading,
    Flex,
    Text,
    Button,
    useDisclosure,
    Spacer,
    Image,
    Input
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import './Header.css';


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            home: 1,
            explore: 0, 
            collection: 0
        };
    }

    render(props) {
        
        return ( 
            <div>
                <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding={6} bg="#161616" color="white" {...props}>
                    <Flex className="center">
                        <Flex  mr={5} mt={1}>
                            <Link to="/" onClick={() => this.setState({home: 1, explore: 0, collection: 0})}>
                                <Heading as="h1" size="lg" letterSpacing={"tighter"} style={{ color: '#FF004D'}}>
                                    {this.props.webSiteName}
                                </Heading>
                            </Link>
                        </Flex>

                        <Stack direction={{ base: "column", md: "row" }} width={{ base: "full", md: "auto" }} spacing='35px' alignItems="center" mt={{ base: 4, md: 0 }}>
                            <Link 
                                to="/" 
                                onClick={() => this.setState({home: 1, explore: 0, collection: 0})}
                                className={(this.state.home ? 'clicked' : 'unclicked')}
                            > Home
                            </Link>
                            <Link 
                                to="/explore" 
                                onClick={() => this.setState({home: 0, explore: 1, collection: 0})}
                                className={(this.state.explore ? 'clicked' : 'unclicked')}
                            >Explore
                            </Link>
                            <Link 
                                to="/mycollection" 
                                onClick={() => this.setState({home: 0, explore: 0, collection: 1})}
                                className={(this.state.collection ? 'clicked' : 'unclicked')}
                            > My Collection
                            </Link>
                        </Stack>
                        
                        <Box mt={{ base: 4, md: 0 }} mt={1} mr={5} ml={5} flexGrow={1} >
                            <Input variant='filled'  style={{ backgroundColor : "#232323"}}  placeholder='Search...' size='md' />
                        </Box>

                        <Box mt={{ base: 4, md: 0 }} mr={5}>
                            <Image borderRadius='full' boxSize='50px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
                            {/* <Link to="newbook">
                                <Button variant="outline" style={ {border: "none", background: "#7926FF"} }>
                                    Add Book
                                </Button>
                            </Link> */}
                        </Box>
                    </Flex>
                </Flex>
            </div>
        )
    }
}

export default Header;