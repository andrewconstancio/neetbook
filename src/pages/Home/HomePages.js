import React from 'react'
import { useSelector } from 'react-redux';
import Explore from '../Explore/Explore';
import Search from '../Search/Search';
import CurrentlyReading from '../CurrentlyReading/CurrentlyReading';
import WantToRead from '../WantToRead/WantToRead';
import Read from '../Read/Read';

const HomePages = () => {
    const page = useSelector((state) => state.page.page);

    if(page == "explore") {
        return <Explore />;
    }

    if(page == "currentlyreading") {
        return <CurrentlyReading />;
    }

    if(page == "wanttoread") {
        return <WantToRead />;
    }

    if(page == "read") {
        return <Read />;
    }

    return <></>
}

export default HomePages