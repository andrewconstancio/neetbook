import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux';
import {
    Avatar,
    Stack,
    Box,
    Text,
    HStack,
    Spacer
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
                <Stack className='user-info' direction={['row', 'row', 'column', 'column', 'column']} spacing='15px'>
                    <Box>
                        <HStack>
                            <Box>
                                <Avatar src={user.photoURL} name={user.displayName}  />
                            </Box>
                            <Stack>
                                <Box className="profile-side-text">
                                    <Text style={{display: "inline"}}>{user.displayName}</Text><br />
                                    &nbsp;
                                    {/* <Text fontSize='s' as='i'>Basic Plan</Text> */}
                                </Box>
                            </Stack>
                        </HStack>

                    </Box>
                    {/* <Spacer /> */}
                    <Box className={"top-nav " + (page == "explore" ? "page-selected" : "")}>
                        <HStack onClick={() => setPageLocal('explore')}  className='nav-selction'>
                            <Box><i className="fa fa-solid fa-house"></i></Box>
                            <Box style={{width: "90%"}}><Text className="profile-side-text">Explore</Text></Box>
                            <Box><i className="fa-right fa-solid fa-chevron-right profile-side-text"></i></Box>
                        </HStack>
                    </Box>
                    <Box className={page == "currentlyreading" ? "page-selected" : ""}>
                        <HStack onClick={() => setPageLocal('currentlyreading')} className='nav-selction'>
                            <Box><i className="fa fa-solid fa-book"></i></Box>
                            <Box style={{width: "90%"}}><Text className="profile-side-text">Currently Reading</Text></Box>
                            <Box><i className="fa-right fa-solid fa-chevron-right profile-side-text"></i></Box>
                        </HStack>
                    </Box>
                    <Box className={page == "wanttoread" ? "page-selected" : ""}>
                        <HStack onClick={() => setPageLocal('wanttoread')}  className='nav-selction'>
                            <Box><i className="fa fa-regular fa-heart"></i></Box>
                            <Box style={{width: "90%"}}><Text className="profile-side-text">Want To Read</Text></Box>
                            <Box><i className="fa-right fa-solid fa-chevron-right profile-side-text"></i></Box>
                        </HStack>
                    </Box>
                    <Box className={page == "read" ? "page-selected" : ""}>
                        <HStack onClick={() => setPageLocal('read')}  className='nav-selction'>
                            <Box><i className="fa fa-solid fa-check"></i></Box>
                            <Box style={{width: "90%"}}><Text className="profile-side-text">Read</Text></Box>
                            <Box><i className="fa-right fa-solid fa-chevron-right profile-side-text"></i></Box>
                        </HStack>
                    </Box>
                </Stack>
                {/* <Stack direction={['row']} className="nav-items-outer" style={{marginTop: "40px"}}>
                    <Box style={{marginTop: "15px"}} className={page == "explore" ? "page-selected" : ""}>
                        <HStack onClick={() => setPageLocal('explore')}  className='nav-selction'>
                            <Box><i className="fa fa-solid fa-house"></i></Box>
                            <Box style={{width: "90%"}}><Text className="profile-side-text">Explore</Text></Box>
                            <Box><i className="fa-right fa-solid fa-chevron-right profile-side-text"></i></Box>
                        </HStack>
                    </Box>
                    <Box className={page == "currentlyreading" ? "page-selected" : ""}>
                        <HStack onClick={() => setPageLocal('currentlyreading')} className='nav-selction'>
                            <Box><i className="fa fa-solid fa-book"></i></Box>
                            <Box style={{width: "90%"}}><Text className="profile-side-text">Currently Reading</Text></Box>
                            <Box><i className="fa-right fa-solid fa-chevron-right profile-side-text"></i></Box>
                        </HStack>
                    </Box>
                    <Box className={page == "wanttoread" ? "page-selected" : ""}>
                        <HStack onClick={() => setPageLocal('wanttoread')}  className='nav-selction'>
                            <Box><i className="fa fa-regular fa-heart"></i></Box>
                            <Box style={{width: "90%"}}><Text className="profile-side-text">Want To Read</Text></Box>
                            <Box><i className="fa-right fa-solid fa-chevron-right profile-side-text"></i></Box>
                        </HStack>
                    </Box>
                    <Box className={page == "read" ? "page-selected" : ""}>
                        <HStack onClick={() => setPageLocal('read')}  className='nav-selction'>
                            <Box><i className="fa fa-solid fa-check"></i></Box>
                            <Box style={{width: "90%"}}><Text className="profile-side-text">Read</Text></Box>
                            <Box><i className="fa-right fa-solid fa-chevron-right profile-side-text"></i></Box>
                        </HStack>
                    </Box>
                </Stack> */}
        </>
    )
}

export default ProfileSideBar