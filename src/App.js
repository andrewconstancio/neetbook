import React, { useEffect } from 'react';
// import { Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/home/Home'
import Explore from './pages/explore/Explore'
import MyCollection from './pages/collection/MyCollection'
import AllBooksBySubject from './pages/AllBooksBySubject/AllBooksBySubject'
import BookPage from './pages/bookpage/BookPage';
import Footer from './components/Footer'
import './App.css'
import { useAuthState } from 'react-firebase-hooks/auth';
import SignIn from './pages/SignIn/SignIn';
import { auth } from './config/firebase-config'
import CreateUserProfile from './pages/CreateUserProfile/CreateUserProfile';


const App = () => {
    const webSiteName = "NEETBOOK";
    const bgColor = ""
    const [user] = useAuthState(auth);

    if(!user) {
        return <SignIn websitename={webSiteName} />
    }

    return <div id="page-container">
        <BrowserRouter>
            <div>
                <Header websitename={webSiteName} />
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/signin" exact component={SignIn} />
                    <Route path="/createprofile" exact component={CreateUserProfile} />
                    <Route path="/explore" exact component={Explore} />
                    <Route path="/mycollection" exact component={MyCollection} />
                    <Route path="/subject/:name" exact component={AllBooksBySubject} />
                    <Route path="/book/:edition" exact component={BookPage} />
                </Switch>
                {/* <Footer className="footer" websitename={webSiteName}  /> */}
            </div>
        </BrowserRouter >
    </div>;
};

export default App;