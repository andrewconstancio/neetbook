import React from 'react';
// import { Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header/Header';
import Home from '../components/Pages/Home'
import Explore from '../components/Pages/Explore'
import MyCollection from '../components/Pages/MyCollection'


const App = () => {
    return <div >
        <BrowserRouter>
            <Header webSiteName="NEETBOOK" />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/explore" exact component={Explore} />
                <Route path="/mycollection" exact component={MyCollection} />
            </Switch>
        </BrowserRouter>
    </div>;
};

export default App;