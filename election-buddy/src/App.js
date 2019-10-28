import React from 'react';
import logo from './logo.svg';
import './App.css';
import Footer from './Components/Homepage/Footer';
import Homepage from './Components/Homepage/Homepage';
import LoginPage from './Components/LoginPage/LoginPage';
import SignupPage from './Components/SignupPage/SignupPage';

var loggedin = true;
var signedup = true;

function App() {
  return (
    <div>
      <Homepage/>
      <div>{loggedin && <LoginPage/>}</div>
      <div>{signedup && <SignupPage/>}</div>
      <Footer/>
    </div>
  );
}

export default App;
