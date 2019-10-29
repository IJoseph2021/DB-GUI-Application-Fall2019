import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from './Components/NavBar/Nav'
import Footer from './Components/Footer/Footer';
import Homepage from './Components/Homepage/Homepage';
import LoginPage from './Components/Login/Login';
import SignupPage from './Components/Signup/Signup';

var loggedin = true;
var signedup = true;

function App() {
  return (
    <div>
    <Router>
      <Nav/>
        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route path="/login" component={Login}/>
          <Route path="/registration" component={Signup}/>
        </Switch>
      <Footer/>
    </Router>

    </div>
  );
}

export default App;
