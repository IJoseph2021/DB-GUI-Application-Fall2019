import React, { Component } from 'react';
import './Homepage.css';
import Content from './Content.js';
import Candidate from '../CandidateCards/Candidate.js';

class Homepage extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <div>
        <Candidate/>
        <Content/>
        </div>
      );
    }
}

export default Homepage;
