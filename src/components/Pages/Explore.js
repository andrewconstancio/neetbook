import React, { Component } from 'react';
import OpenLibrary from '../apis/OpenLibrary';
import {
    Box,
    SimpleGrid,
    Image,
    Heading
} from "@chakra-ui/react"
import './css/Explore.css'
import LoadingBook from './LoadingBook';

export default class Explore extends Component {

    state = {
        data: "",
        works: null,
        limitFetch: 100 
    }

    componentDidMount() {
        this.renderList()
    }

    renderList = async () => {
        const response = await OpenLibrary.get(`/subjects/love.json?details=true`, {
            params: {
                limit: this.state.limitFetch
            }
        });
        
        this.setState({
            data: response.data,
            works: response.data.works
        } );
    }

    render() {
        if(!this.state.works) {
            return (
                <div className='center'>
                    <Heading as='h3' size='lg' mt={5} mb={5}>Love</Heading>
                    <SimpleGrid columns={4} spacingX='40px' spacingY='20px'>
                    {[...Array(this.state.limitFetch)].map((i) =>
                        <LoadingBook key={i} />
                    )}
                    </SimpleGrid>
                </div>
            )
        }

        const books = this.state.works;
        return (
            <div>
                <div className='center'>
                    <Heading as='h3' size='lg' mt={5} mb={5}>Love</Heading>
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
                                        // className="shimmer"
                                    />
                                </Box>
                            )
                        })
                    }
                    </SimpleGrid>
                </div>
            </div>
        )
    }
}