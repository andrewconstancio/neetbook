import React from 'react'
import {
    Box,
    SimpleGrid,
    Image,
    Heading
} from "@chakra-ui/react"
import Book from './Book'

const BookGrid = ( {books} ) => {
    return (
        <>
            <SimpleGrid columns={[2,2,3,3,4]}  spacingX='20px' spacingY='20px'>
            {books.map((book, index) => {
                        if(book.cover_i) {
                            return (
                                <Book 
                                    key={book.cover_id} 
                                    edition={book.cover_edition_key} 
                                    title={book.title} 
                                    bookKey={book.key} 
                                    coverId={book.cover_i}
                                />
                            )
                        }
                    })
                }
            </SimpleGrid>
        </>
    )
}

export default BookGrid