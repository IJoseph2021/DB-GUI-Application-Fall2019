import React, { Component } from 'react';
import './Homepage.css';
import Content from './Content.js';
import Candidate from '../CandidateCards/Candidate.js';

class Homepage extends Component {
    constructor(props) {
      super(props);
    }

    state = {
        generalNews:[]
    };



    componentDidMount() {
       const key = [`elections`,`politics`,`united states`,`democrat`,`republican`,`congress`,`president`,`senate`]
       var tempDate = new Date();
       const date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' +(tempDate.getDate()-1)

       const url = `https://newsapi.org/v2/everything?q=((${key[0]})AND(${key[1]}))AND(${key[2]})AND(${key[3]})AND(${key[4]})AND(${key[5]})AND((${key[6]})OR(${key[7]}))&from=${date}&to=2019-12-25&sortBy=popularity&apiKey=53b1b21475f84b9894e0e6a987ff211d`
      fetch(url)
      .then(res => res.json())
      .then((data) => {
        this.setState({ generalNews: data.articles })
      })
      .catch(console.log)
    }

    render() {

      return (
        <div>
            <h1>
              Candidates:
            </h1>
            <Candidate/>
            <Content/>
        </div>
      );
    }
}

export default Homepage;
