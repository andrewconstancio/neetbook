import React from 'react';
// import { Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/home/Home'
import Explore from './pages/explore/Explore'
import MyCollection from './pages/collection/MyCollection'
import AllBooksBySubject from './pages/AllBooksBySubject/AllBooksBySubject'
import Footer from './components/Footer'

const App = () => {
    return <div >
        <BrowserRouter>
            <Header webSiteName="NEETBOOK" />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/explore" exact component={Explore} />
                <Route path="/mycollection" exact component={MyCollection} />
                <Route path="/subject/:name" exact component={AllBooksBySubject} />
            </Switch>
            <Footer webSiteName="NEETBOOK" />
        </BrowserRouter >
    </div>;
};

export default App;