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
        if(term.length > 1) {
            setTermStateLocal(term);
        } else {
            clearOutSearch();
        }
    }

    const clearOutSearch = () => {
        setTermStateLocal('');
        clearSearch();
    }

    const handleSearch = () => {
        search(termStateLocal);
    }

    return (
        <>
            <Button
                style={{marginTop: "15px", marginBottom: "30px", marginRight: "20px"}}
                size='lg' 
                colorScheme="red"
                display={termStateLocal ? "block" : "none"}
                onClick={clearOutSearch}
                ><i className="fa-solid fa-xmark"></i>
            </Button>
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
                onClick={handleSearch}
                >Go
            </Button>
        </>
    )
}

export default Search