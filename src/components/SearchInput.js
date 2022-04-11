import React, { useState } from 'react'
import {
    Input,
    Button,
    Slide
} from "@chakra-ui/react"
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../redux';

const Search = ( {searchTerm} ) => {
    const dispatch = useDispatch();
    const { search, clearSearch } = bindActionCreators(actionCreators, dispatch);
    const [termStateLocal, setTermStateLocal] = useState('');

    const handleSearchChange = (e) => {
        const term = e.target.value;
        if(term.length > 3) {
            setTermStateLocal(term);
            // search(term);
        } else {
            setTermStateLocal('');
            // clearSearch();
        }
    }

    return (
        <>
            <Input 
                variant='filled' 
                size='lg'  
                placeholder='Search a Book, Author, Subject... ' 
                style={{marginTop: "15px", marginBottom: "30px"}} 
                onKeyUp={handleSearchChange}
            />
            <Button
                style={{marginTop: "15px", marginBottom: "30px", marginLeft: "20px"}}
                size='lg' 
                colorScheme="teal"
                display={termStateLocal ? "block" : "none"}
                >Search
            </Button>
            {/* <Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }}>
                <Box
                p='40px'
                color='white'
                mt='4'
                bg='teal.500'
                rounded='md'
                shadow='md'
                >
                <Lorem count={2} />
                </Box>
            </Slide> */}
        </>
    )
}

export default Search