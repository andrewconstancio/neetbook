import React from 'react'
import {
    Input
} from "@chakra-ui/react"
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../redux';




const Search = ( {searchTerm} ) => {
    const dispatch = useDispatch();
    const { search, clearSearch } = bindActionCreators(actionCreators, dispatch);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        if(term.length > 3) {
            search(term);
        } else {
            clearSearch();
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
        </>
    )
}

export default Search