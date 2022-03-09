import React from "react";
import {
    Box,
    Stack,
    Heading,
    Flex,
    Text,
    Button,
    useDisclosure,
    Image,
    Input
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import './Header.css'
import { auth } from '../config/firebase-config'

const Header = (props) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleToggle = () => (isOpen ? onClose() : onOpen());


    const signOut = () => {
        console.log(auth.currentUser);
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

                {/* <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
                    <HamburgerIcon />
                </Box> */}

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
                    mt={{ base: 4, md: 0 }} mt={1} mr={5} ml={5} flexGrow={1} 
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


// class Header extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             home: 1,
//             explore: 0, 
//             collection: 0
//         };
//     }

//     render(props) {
        
//         return ( 
//             <div>
//                 <Flex as="nav" align="center" justify="space-between" wrap="wrap" padding={6} bg="#161616" color="white" {...props}>
//                     <Flex className="center">
//                         <Flex  mr={5} mt={1}>
//                             <Link to="/" onClick={() => this.setState({home: 1, explore: 0, collection: 0})}>
//                                 <Heading as="h1" size="lg" letterSpacing={"tighter"} style={{ color: '#FF004D'}}>
//                                     {this.props.websitename}
//                                 </Heading>
//                             </Link>
//                         </Flex>

//                         <Stack direction={{ base: "column", md: "row" }} width={{ base: "full", md: "auto" }} spacing='35px' alignItems="center" mt={{ base: 4, md: 0 }}>
//                             <Link 
//                                 to="/mycollection" 
//                                 onClick={() => this.setState({home: 0, explore: 0, collection: 1})}
//                                 className={(this.state.collection ? 'clicked' : 'unclicked')}
//                             > My Collection
//                             </Link>
//                             <Link 
//                                 to="/explore" 
//                                 onClick={() => this.setState({home: 0, explore: 1, collection: 0})}
//                                 className={(this.state.explore ? 'clicked' : 'unclicked')}
//                             >Explore
//                             </Link>
//                         </Stack>
                        
//                         <Box mt={{ base: 4, md: 0 }} mt={1} mr={5} ml={5} flexGrow={1} >
//                             <Input variant='filled'  style={{ backgroundColor : "#232323"}}  placeholder='Search...' size='md' />
//                         </Box>

//                         <Box mt={{ base: 4, md: 0 }} mr={5}>
//                             <Image borderRadius='full' boxSize='50px' src='https://bit.ly/dan-abramov' alt='Dan Abramov' />
//                         </Box>
//                     </Flex>
//                 </Flex>
//             </div>
//         )
//     }
// }

// export default Header;