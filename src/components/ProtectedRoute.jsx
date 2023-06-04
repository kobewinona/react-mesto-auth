import React, {useContext} from 'react';
import {Navigate} from 'react-router-dom';

import {AuthContext} from '../contexts/AuthContext';


const ProtectedRoute = ({element: Component, ...props}) => {
  const isLoggedIn = useContext(AuthContext);
  
  return (
    isLoggedIn ? <Component {...props}/> : <Navigate to="sign-up" replace/>
  );
}

export default ProtectedRoute;