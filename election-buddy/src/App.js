import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import  { Redirect } from 'react-router-dom';
import Nav from './Components/NavBar/Nav'
import Footer from './Components/Footer/Footer';
import Homepage from './Components/Homepage/Homepage';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';

var loggedIn = true;
var signedUp = true;

function App() {
  return (
    <div>
    <Router>
      <Nav/>
        <Switch>
          <Route exact path="/" render={() => (
            loggedIn ? (
              <Redirect to="/login"/>
            ) : (
              <Homepage/>
            )
          )}/>
          <Route path="/login" component={Login}/>
          <Route path="/registration" component={Signup}/>
        </Switch>
      <Footer/>
    </Router>
    </div>
  );
}

export default App;
