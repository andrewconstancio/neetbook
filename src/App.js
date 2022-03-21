import React, { useEffect } from 'react';
// import { Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home'
import Explore from './pages/Explore/Explore'
import MyCollection from './pages/Collection/MyCollection'
import AllBooksBySubject from './pages/AllBooksBySubject/AllBooksBySubject'
import BookPage from './pages/BookPage/BookPage';
import Footer from './components/Footer'
import './App.css'
import SignIn from './pages/SignIn/SignIn';
// import CreateUserProfile from './pages/CreateUserProfile/CreateUserProfile';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './redux'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config'

const App = () => {
    const webSiteName = "NEETBOOK";
    const bgColor = ""
    const [user] = useAuthState(auth);

    return <div id="page-container">
        <BrowserRouter>
            <div>
                {user && <Header websitename={webSiteName} />}
                <Switch>
                    <Route exact path="/">
                        {user ? <Route path="/" exact component={Explore} /> : <SignIn websitename={webSiteName} />}
                    </Route>
                    {/* <Route path="/createprofile" exact component={CreateUserProfile} /> */}
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