import React from 'react'

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function PrivateRoute(props) {

  const isAuth = useSelector(state => state.auth.isAuthenticated);
  
  if (isAuth) { 
      return props.component
  }

  else{
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;