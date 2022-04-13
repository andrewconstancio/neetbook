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
            search(term);
        } else {
            clearOutSearch();
        }
    }

    const clearOutSearch = () => {
        setTermStateLocal('');
        clearSearch();
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
                colorScheme="orange"
                display={termStateLocal ? "block" : "none"}
                onClick={clearOutSearch}
                ><i class="fa-regular fa-circle-xmark"></i>
            </Button>
        </>
    )
}

export default Search