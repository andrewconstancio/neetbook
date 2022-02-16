import React, { useState, useEffect } from 'react'
import OpenLibrary from '../apis/OpenLibrary';
import LoadingBook from '../components/LoadBookShimmer'
import {
    Box,
    SimpleGrid,
    Image,
    Heading
} from "@chakra-ui/react"

const BookSection = ( {subject} ) => {

    const [data, setData] = useState('');
    const [books, setBooks] = useState(null);
    const [fetchLimit, setFetchLimit] = useState(4);

    useEffect(() => {
        async function fetchData() {
            const response = await OpenLibrary.get(`/subjects/${subject}.json?details=true`, {
                params: {
                    limit: fetchLimit
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
                <Heading as='h3' size='lg' mt={5} mb={5}>Love</Heading>
                <SimpleGrid columns={4} spacingX='40px' spacingY='20px'>
                {[...Array(fetchLimit)].map((i) =>
                    <LoadingBook key={i} />
                )}
                </SimpleGrid>
            </div>
        )
    }

    return (
        <div>
            <Heading as='h3' size='lg' mt={5} mb={5}>{subject.toUpperCase()}</Heading>
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