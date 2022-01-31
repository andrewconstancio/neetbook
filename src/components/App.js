import React from 'react';
// import { Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header/Header';
import Home from '../components/Pages/Home'
import Explore from '../components/Pages/Explore'
import MyCollection from '../components/Pages/MyCollection'
import NewBookFrom from './Pages/NewBookForm';



const App = () => {
    return <div >
        <BrowserRouter>
            <Header webSiteName="NEETBOOK" />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/explore" exact component={Explore} />
                <Route path="/mycollection" exact component={MyCollection} />
                <Route path="/newbook" exact component={NewBookFrom} />
            </Switch>
        </BrowserRouter>
    </div>;
};

export default App;