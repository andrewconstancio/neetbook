import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import {
    Avatar,
    Stack,
    Box,
    Text,
    HStack
} from "@chakra-ui/react"
import './ProfileSideBar.css'

const ProfileSideBar = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const page = useSelector((state) => state.page.page);
    const [pageLocal, setPageLocal] = useState(page ? page : 'explore');
    const { setPage } = bindActionCreators(actionCreators, dispatch);

    useEffect(() => {
        setPage(pageLocal);
    }, [pageLocal])

    return (
        <>
            <Stack className='user-info' direction={['row']} spacing='15px'>
                <Box style={{maxWidth: "50px", minWidth: "50px"}}>
                    <Avatar src={user.photoURL} name={user.displayName}  />
                </Box>
                <Box>
                    <Stack>
                        <Box>
                            <Text style={{display: "inline"}}>{user.displayName}</Text><br />
                            <Text fontSize='s' as='i'>Basic Plan</Text>
                        </Box>
                    </Stack>
                </Box>
            </Stack>
            <Stack className="nav-items-outer" style={{marginTop: "40px"}}>
                <Box style={{marginTop: "15px"}} className={page == "explore" ? "page-selected" : ""}>
                    <HStack onClick={() => setPageLocal('explore')}  className='nav-selction'>
                        <Box><i className="fa fa-solid fa-house"></i></Box>
                        <Box style={{width: "90%"}}><Text>Explore</Text></Box>
                        <Box><i className="fa-right fa-solid fa-chevron-right"></i></Box>
                    </HStack>
                </Box>
                <Box className={page == "currentlyreading" ? "page-selected" : ""}>
                    <HStack onClick={() => setPageLocal('currentlyreading')} className='nav-selction'>
                        <Box><i className="fa fa-solid fa-book"></i></Box>
                        <Box style={{width: "90%"}}><Text>Currently Reading</Text></Box>
                        <Box><i className="fa-right fa-solid fa-chevron-right"></i></Box>
                    </HStack>
                </Box>
                <Box className={page == "wanttoread" ? "page-selected" : ""}>
                    <HStack onClick={() => setPageLocal('wanttoread')}  className='nav-selction'>
                        <Box><i className="fa fa-regular fa-heart"></i></Box>
                        <Box style={{width: "90%"}}><Text>Want To Read</Text></Box>
                        <Box><i className="fa-right fa-solid fa-chevron-right"></i></Box>
                    </HStack>
                </Box>
                <Box className={page == "read" ? "page-selected" : ""}>
                    <HStack onClick={() => setPageLocal('read')}  className='nav-selction'>
                        <Box><i className="fa fa-solid fa-check"></i></Box>
                        <Box style={{width: "90%"}}><Text>Read</Text></Box>
                        <Box><i className="fa-right fa-solid fa-chevron-right"></i></Box>
                    </HStack>
                </Box>
            </Stack>
        </>
    )
}

export default ProfileSideBar