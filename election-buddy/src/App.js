import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import  { Redirect } from 'react-router-dom';
import Nav from './Components/NavBar/Nav'
import Footer from './Components/Footer/Footer';
import Homepage from './Components/Homepage/Homepage';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import UserProfile from './Components/ProfilePage/UserProfile';

var userLoggedIn = window.localStorage.getItem('token')

function App() {
  console.log(userLoggedIn)
  return (
    <div>
    <Router>
      <Nav/>
        <Switch>
          <Route exact path="/" render={() => (
            userLoggedIn ? (
              <Homepage/>
            ) : (
              <Redirect to="/login"/>
            )
          )}/>
          <Route path="/login" component={Login}/>
          <Route path="/registration" component={Signup}/>

          <Route exact path="/profile" render={() => (
                      userLoggedIn ? (
                        <UserProfile/>
                      ) : (
                        <Redirect to="/login"/>
                      )
                    )}/>
        </Switch>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
