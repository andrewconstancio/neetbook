import { useState, useEffect } from 'react';
import { useLocation, Redirect, Route } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../config/firebase-config'

const AuthRoute = props => {
    const location = useLocation();
    const [user] = useAuthState(auth);

    if (user === undefined) return null; // <-- or loading indicator, etc...
    
    return !user ? (
      <Route {...props} />
    ) : (
      <Redirect
        to={{
          pathname: "/explore"
        }}
      />
    );
  };

export default AuthRoute