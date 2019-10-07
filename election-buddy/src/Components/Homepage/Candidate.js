import React from 'react';
import './Candidate.css';
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


function Candidate() {
  return (
    <div>
      <div className = "republican-left">
      <p className = "republican-center">Donald Trump</p>
      <p className = "republican-center">Candidates' cards go here</p>

      </div>
      <div className = "democratic-right">
      <p className = "democratic-center">Joe Biden</p>
      <p className = "democratic-center">Candidates' cards go here</p>
      </div>
      <div className = "clear"/>
    </div>
  );
}

export default Candidate;
