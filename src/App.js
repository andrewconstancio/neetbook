import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import AllBooksBySubject from './pages/AllBooksBySubject/AllBooksBySubject'
import BookPage from './pages/BookPage/BookPage';
import './App.css'
import SignIn from './pages/SignIn/SignIn';
import { useSelector } from 'react-redux';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './config/firebase-config';
import Explore from './pages/Explore/Explore';
import CurrentlyReading from './pages/CurrentlyReading/CurrentlyReading';
import WantToRead from './pages/WantToRead/WantToRead';
import Read from './pages/Read/Read';
import AuthorsBooks from './pages/AuthorsBooks/AuthorsBooks';
import RouteRequiresLogin from './RouteRequiresLogin';

const App = () => {
    const webSiteName = "NEETBOOK";
    const [user] = useAuthState(auth);
    const curr_user = useSelector((state) => state.auth.user);

    return <div id="page-container">
        <BrowserRouter>
            <div>
                {user && curr_user && <Header websitename={webSiteName} />}
                <Switch>
                    <div className="container">
                        <RouteRequiresLogin path="/" exact component={Home} />
                        <RouteRequiresLogin path="/authors/:key" exact component={AuthorsBooks} />
                        <RouteRequiresLogin path="/currentlyreading" exact component={CurrentlyReading} />
                        <RouteRequiresLogin path="/WantToRead" exact component={WantToRead} />
                        <RouteRequiresLogin path="/Read" exact component={Read} />
                        <RouteRequiresLogin path="/subject/:name" exact component={AllBooksBySubject} />
                        <RouteRequiresLogin path="/book/:edition" exact component={BookPage} />
                    </div>
                </Switch>
            </div>
        </BrowserRouter >
    </div>;
};

export default App;