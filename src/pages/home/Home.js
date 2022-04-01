import React, { useState, useEffect } from 'react'
import {
    Flex,
    Box,
    Text,
} from "@chakra-ui/react"
import './Home.css'
import OpenLibrary from '../../apis/OpenLibrary';
import BookSection from '../../components/BookSection';
import ProfileSideBar from '../../components/ProfileSideBar/ProfileSideBar';
// import HorizontalGallery from 'react-dynamic-carousel';
import SimpleSlider from '../../components/SimpleSlider'


const Home = () => {
    const example = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

    const [data, setData] = useState('');
    const [books, setBooks] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await OpenLibrary.get(`/subjects/space.json?details=true`, {
                limit: 20
            });

            setData(response.data);
            setBooks(response.data.works);
        }
        fetchData();
    }, []);

    if(!books) {
        return (
            <></>
        )
    }

    return (
        <div className='container'>
            <Flex direction={['column', 'column', 'column', 'row', 'row']}>
                <Box 
                    flexShrink={0} 
                    w={["100%", "100%","100%", "auto", "30%"]} 
                    pr={[0, 6]} 
                    align="center" 
                    className="column-1"
                >
                    <Box className="sticky-left-column-home">
                        <ProfileSideBar />
                    </Box>
                </Box>
                <Box w={["100%", "100%","100%", "100%", "70%"]} className="column-2">
                    <SimpleSlider />
                {/* <HorizontalGallery
                    tiles={books.map((book) => {
                        if(book.cover_id !== null) {
                            return (
                                <Book key={book.cover_edition_key} edition={book.cover_edition_key} title={book.title} bookKey={book.key} coverId={book.cover_id}></Book>
                            )
                        }
                    })}
                    elementWidth={195}
                    minPadding={5}
                /> */}
                </Box>
            </Flex>
        </div>
    )
}

export default Home