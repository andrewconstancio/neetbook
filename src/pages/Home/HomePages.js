import React from 'react'
import { useSelector } from 'react-redux';
import Explore from '../Explore/Explore';
import Search from '../Search/Search';
import CurrentlyReading from '../CurrentlyReading/CurrentlyReading';

const HomePages = () => {
    const page = useSelector((state) => state.page.page);

    console.log(page);

    if(page == "explore") {
        return <Explore />;
    }

    if(page == "currentlyreading") {
        return <CurrentlyReading />;
    }

    return <></>
}

export default HomePages