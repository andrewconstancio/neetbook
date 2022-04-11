import React, { Component, useState, useRef, useCallback } from 'react'
import BookSection from '../../components/BookSection';
import useBookSubjectSearch from '../../Hooks/useBookSubjectSearch';
import {
    Box,
    SimpleGrid,
    Image,
    Heading
} from "@chakra-ui/react"
import LoadingBook from '../../components/LoadingBook';
import { Oval } from  'react-loader-spinner'
import Book from '../../components/Book';

const AllBooksBySubject = (props) => {
    const [offset, setOffset] = useState(12)

    const {
        books,
        hasMore,
        loading,
        error
    } = useBookSubjectSearch(props.match.params.name, offset)

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

    if(!books) {
        return (
            <div className='center'>
            <Heading as='h3' size='lg' mt={5} mb={5}>{props.match.params.name.toUpperCase()}</Heading>
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
            <Heading as='h3' size='lg' mt={5} mb={5}>{props.match.params.name.toUpperCase()}</Heading>
            <SimpleGrid columns={[2,2,3,4,5]} spacingX='40px' spacingY='20px'>
                    {books.map((book, index) => {
                        if(books.length === index + 1) {
                            return (
                                <Book key={book.cover_id} lastElemRef={lastBookElementRef} edition={book.cover_edition_key} title={book.title} bookKey={book.key} coverId={book.cover_id}></Book>
                            )
                        }
                        return (
                            <Book key={book.cover_id} edition={book.cover_edition_key} title={book.title} bookKey={book.key} coverId={book.cover_id}></Book>
                        )
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

export default AllBooksBySubject
