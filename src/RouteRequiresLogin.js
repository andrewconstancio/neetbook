import React from 'react'
import { Route } from "react-router-dom";
import SignIn from './pages/SignIn/SignIn';
import { useSelector } from 'react-redux';
import { auth } from './config/firebase-config';
import { useAuthState } from 'react-firebase-hooks/auth';

const RouteRequiresLogin = (props) => {

    const [user] = useAuthState(auth);
    const curr_user = useSelector((state) => state.auth.user);

    return (
        <Route {...props}>{user && curr_user ? props.children : <SignIn/>}</Route>
     );
}

export default RouteRequiresLogin
