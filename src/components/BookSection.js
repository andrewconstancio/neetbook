import React, { useState, useEffect } from 'react'
import OpenLibrary from '../apis/OpenLibrary';
import LoadingBook from './LoadingBook'
import {
    Box,
    SimpleGrid,
    Image,
    Heading,
    Flex
} from "@chakra-ui/react"
import { Link } from 'react-router-dom'
import '../pages/AllBooksBySubject/Book.css'
import Book from './Book';

const BookSection = ( {subject, limit, pageNumber} ) => {

    const [data, setData] = useState('');
    const [books, setBooks] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await OpenLibrary.get(`/subjects/${subject}.json?details=true`, {
                limit: 4
            });

            setData(response.data);
            setBooks(response.data.works);
        }
        fetchData();
    }, []);

    if(!books) {
        return (
            <div className='center'>
                <Heading as='h3' size='lg' mt={5} mb={5}>&nbsp;</Heading>
                <SimpleGrid columns={4} spacingX='40px' spacingY='20px'>
                {[...Array(limit)].map((i) =>
                    <LoadingBook key={i} />
                )}
                </SimpleGrid>
            </div>
        )
    }
    
    return (
        <div>
            <Flex justify="space-between"> 
                <Link to={`/subject/${subject}`}>
                    <Heading as='h3' size='lg' mt={5} mb={5} style={{cursor: "pointer"}}>{subject.toUpperCase()}</Heading>
                </Link>
            </Flex>
            <SimpleGrid columns={[1, 2, 4]} spacingX='40px' spacingY='20px'>
                {books.map((book) => {
                    return (
                        <Book key={book.cover_id} edition={book.cover_edition_key} title={book.title} bookKey={book.key} coverId={book.cover_id}></Book>
                    )
                })
            }
            </SimpleGrid>
        </div>
    )
}

export default BookSection