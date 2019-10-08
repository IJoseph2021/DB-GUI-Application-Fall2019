import React from 'react';
import logo from './logo.svg';
import './App.css';
import Footer from './Components/Homepage/Footer';
import Homepage from './Components/Homepage/Homepage';
import LoginPage from './Components/LoginPage/LoginPage';

function App() {
  return (
    <div>
      <Homepage/>
      <LoginPage/>
      <Footer/>
    </div>
  );
}

export default App;
