import React, { Component } from 'react';
import {
    Box,
    Heading,
    Flex,
    Image,
    SimpleGrid
} from "@chakra-ui/react";
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { getBooks } from '../redux/actions';
import { Oval } from  'react-loader-spinner'

class NewBooks extends Component {

    
    render() {
        const { books } = this.props;

        if(!books) {
            return ( 
                <div className="center" >
                    <div className='container'>
                        <Oval className="loader" color="#161616" height={80} width={80} />
                    </div>
                </div>
            )
        }
    
        return (
            <div>
                <div className="center" >
                    <Heading as='h3' size='lg' mt={10}>New Books</Heading>
                    <Flex justify="space-between" mt={3}>
                        {books.map((book) => {
                            return (
                                    <Image key={book.id} 
                                        src={book.coverImgURL} 
                                        w='240px' 
                                        h='350px' 
                                        alt="yo" 
                                        style={{borderRadius: "20px"}}
                                    />
                            )
                        })}
                    </Flex> 
                </div>
            </div>
        );
    }
}

// const mapStateToProps = state => {
//     console.log(state);
//     return {
//         books: state.firestore.ordered.books
//     };
// };

// export default connect(
//     mapStateToProps,
//     { getBooks }
// ) (NewBooks)

const mapStateToProps = state => {

    const books = state.firestore.ordered.books;

    if(!books) {
        return;
    }
    var newBooks = books.filter(obj => {
        return obj.type === "new"
    })

    return {
        books: newBooks
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'books' }
    ]),
) (NewBooks)