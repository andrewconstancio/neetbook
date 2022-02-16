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

const BookSection = ( {subject, limit} ) => {

    const [data, setData] = useState('');
    const [books, setBooks] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await OpenLibrary.get(`/subjects/${subject}.json?details=true`, {
                params: {
                    limit: limit
                }
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
            <SimpleGrid columns={4} spacingX='40px' spacingY='20px'>
                {books.map((book) => {
                    return (
                        <Box key={book.cover_id} >
                            <Image
                                src={`https://covers.openlibrary.org/b/id/${book.cover_id}.jpg`}
                                w='240px' 
                                h='350px' 
                                alt="yo" 
                                style={{borderRadius: "20px"}}
                            />
                        </Box>
                    )
                })
            }
            </SimpleGrid>
        </div>
    )
}

export default BookSection