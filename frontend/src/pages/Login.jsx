import { Typography } from '@mui/material'
import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Login = () => {

  const { user, loginWithRedirect, logout, isLoading, error, isAuthenticated } = useAuth0();
  console.log("current User", user);

  const navigate = useNavigate();


  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home'); // or the path you want to navigate to
    }
  }, [isAuthenticated, navigate]);

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Oops... {error.message}</div>;

  return (
    <div>
      <Typography>Login to Continue</Typography>
      <button onClick={loginWithRedirect} style={{backgroundColor:"red"}}>Login with redirect</button>
      </div>
  )
}

export default Login
