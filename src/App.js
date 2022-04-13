import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import AllBooksBySubject from './pages/AllBooksBySubject/AllBooksBySubject'
import BookPage from './pages/BookPage/BookPage';
import './App.css'
import SignIn from './pages/SignIn/SignIn';;
import { useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config'
import CurrentlyReading from './pages/CurrentlyReading/CurrentlyReading'
const App = () => {
    const webSiteName = "NEETBOOK";
    const [user] = useAuthState(auth);
    const curr_user = useSelector((state) => state.auth.user);

    return <div id="page-container">
        <BrowserRouter>
            <div>
                {user && curr_user && <Header websitename={webSiteName} />}
                <Switch>
                    <Route exact path="/">
                        {user && curr_user ? <Route path="/" exact component={Home} /> : <SignIn websitename={webSiteName} />}
                    </Route>
                    <Route path="/currentlyreading" exact component={CurrentlyReading} />
                    <Route path="/subject/:name" exact component={AllBooksBySubject} />
                    <Route path="/book/:edition" exact component={BookPage} />
                </Switch>
            </div>
        </BrowserRouter >
    </div>;
};

export default App;