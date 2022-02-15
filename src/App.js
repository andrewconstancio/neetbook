import React from 'react';
// import { Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/home/Home'
import Explore from './pages/explore/Explore'
import MyCollection from './pages/collection/MyCollection'

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