import React, { Component, useState, useEffect } from 'react';
import {
    Box,
    Stack,
    Heading,
    Flex,
    Text,
    Button,
    useDisclosure,
    Spacer,
    Image,
    Input,
    Grid, 
    GridItem
} from "@chakra-ui/react";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';


class Home extends Component {

    renderList() {
        const { books } = this.props;
        return (
            <div>
                {books.map((book) => {
                    <Box key={book.title} w='100%' h='300px' bg='red.500' style={{borderRadius: "20px"}} mr={5}>
                        <Heading>{book.title}</Heading>
                    </Box>
                })}
            </div>
        )
    }

    render() {
        return (
            <div>
                <div className="center" >
                    <Heading as='h3' size='lg' mt={10}>New Books</Heading>
                    <Flex justify="space-between" mt={3}>
                        {this.renderList()}
                    </Flex> 
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        books: state.firestore.ordered.books
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'books' }
    ])
) (Home)