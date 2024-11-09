import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { isAuthenticated, getCurrentUser } from './AuthService';
import Login from './components/pages/Login';

const ProtectedRoute = ({ element}:any) => {
    console.log(getCurrentUser(),isAuthenticated())
    let token:any = getCurrentUser();
   if(getCurrentUser()){
    localStorage.setItem('authToken', token.accessToken);
   let profileDetails:any = {"name":token.displayName,"email":token.email }
   localStorage.setItem("profile", JSON.stringify(profileDetails));
   }
   //@ts-ignore
   let authToken:any = localStorage.getItem('authToken');
   console.log(authToken);

    if(!authToken){
        return <Navigate to="/" />;
      }
      return element;

    // return (
    //   <Route
    //     element={isAuthenticated() ? <Element /> : <Navigate to="/login" />}
    //   />
    // );
  };
  
  export default ProtectedRoute;
