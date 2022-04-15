import React, { Component, useState, useRef, useCallback } from 'react'
import {
    Box,
    SimpleGrid,
    Image,
    Heading
} from "@chakra-ui/react"
import useGetBooksByAuthor from "../../Hooks/useGetBooksByAuthor";
import LoadingBook from '../../components/LoadingBook';
import Book from '../../components/Book';

const AuthorBooks = (props) => {

    const [offset, setOffset] = useState(12)
    const { authorKey } = props.location.state;
    const { name } = props.location.state;

    console.log(authorKey);

    const {
        books,
        hasMore,
        loading,
        error
    } = useGetBooksByAuthor(authorKey, offset)

    const observer = useRef()
    const lastBookElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
            setOffset(prevOffset => prevOffset + offset)
        }
    })
    if (node) observer.current.observe(node)
    }, [loading, hasMore])

    if(loading) {
        return (
            <div className='center'>
                <Heading as='h3' size='lg' mt={5} mb={5}>{name}</Heading>
                <SimpleGrid columns={4} spacingX='40px' spacingY='20px'>
                {[...Array(8)].map((i) =>
                    <LoadingBook key={i} />
                )}
                </SimpleGrid>
            </div>
        )
    }

    return (
        <div className="container">
            <Heading as='h5' size='sm' mt={5} mb={5} mr={5} style={{color: "grey", display: "inline-block"}}>Author: </Heading>
            <Heading as='h3' size='lg' mt={5} mb={5} style={{display: "inline-block"}}>{name}</Heading>
            <SimpleGrid columns={[2,2,3,4,5]} spacingX='40px' spacingY='20px'>
                    {books.map((book, index) => {
                        console.log(books.cover_edition_key);
                        if(book.covers) {
                            if(books.length === index + 1) {
                                return (
                                    <Book 
                                        key={book.covers[0]} 
                                        lastElemRef={lastBookElementRef} 
                                        edition={book.cover_edition_key} 
                                        title={book.title} bookKey={book.key} 
                                        coverId={book.covers[0]}
                                    />
                                )
                            }
                            return (
                                <Book 
                                    key={book.covers[0]} 
                                    edition={book.cover_edition_key} 
                                    title={book.title} 
                                    bookKey={book.key} 
                                    coverId={book.covers[0]} 
                                />
                            )
                        }
                    })
                }
                <div style={{display: loading ? "block" : "none"}} >
                <SimpleGrid columns={5} spacingX='40px' spacingY='20px'>
                    {[...Array(8)].map((i) =>
                        <LoadingBook key={i} />
                    )}
                    </SimpleGrid>
                </div>
            </SimpleGrid>
        </div>
    )
}

export default AuthorBooks;  