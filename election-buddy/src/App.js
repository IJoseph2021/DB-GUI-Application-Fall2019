import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Nav from './Components/Homepage/Nav'
import Footer from './Components/Homepage/Footer';
import Homepage from './Components/Homepage/Homepage';
import LoginPage from './Components/LoginPage/LoginPage';
import SignupPage from './Components/SignupPage/SignupPage';

var loggedin = true;
var signedup = true;

function App() {
  return (
    <div>
    <Router>
      <Nav/>
        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route path="/login" component={LoginPage}/>
          <Route path="/registration" component={SignupPage}/>
        </Switch>
      <Footer/>
    </Router>

    </div>
  );
}

export default App;
