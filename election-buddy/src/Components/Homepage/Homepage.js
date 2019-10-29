import React, { Component } from 'react';
import './Homepage.css';
import Content from './Content.js';
import Candidate from '../CandidateCards/Candidate.js';


function Homepage () {
  return (
    <div>
      <Candidate/>
      <Content/>
    </div>
  );
}

export default Homepage;
