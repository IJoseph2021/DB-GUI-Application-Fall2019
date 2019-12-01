import React from 'react';
import './Candidate.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CandidateFunctions from '../../API/CandidateFunctions';
const faker = require("faker");

export default class Candidate extends React.Component{
    candidateFuncs = new CandidateFunctions()
    constructor(){
      super()

      this.state = {
        DEM: [],
        FES: [],
        REP: []
      }
    }

   componentDidMount(){
     this.populateInfo()
    }

    async populateInfo(){
      var party_code = ['DEM', 'FES', 'REP'];

      party_code.map(each => {
        var array = [];
        var obj = {
          userId: "",
          name: ""
        }
        this.candidateFuncs.getCandidatebypartyCode(each)
        .then(resp => {
          for (var j = 0; j < resp.length; j++) {
            this.getCandidateFirstNameAndLastName(resp[j].userID)
            .then(response => {
              obj = {
                userId: response.userID,
                name: response.name
              };
              console.log(obj)
              array.push(obj)
              this.setState({[each]: array})
            })
          }
        })
        .catch(err => {
          console.log("Error Occured")
        })
      })
    }

    async getCandidateFirstNameAndLastName(userId){
      var name = "";
      let firstname = await this.candidateFuncs.getCandidateFirstName(userId)
      let lastname = await this.candidateFuncs.getCandidateLastName(userId)
      var response = {
        name: firstname[0].fname + " " + lastname[0].lname,
        userID: userId
      }
      return (response)
    }



    render() {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-4 bg-primary">
            {
              this.state.DEM.map(each =>
                <div key = {each.userId} className="card" style={{"width": "12rem"}}>
                  <img src={faker.image.avatar()} className="card-img-top" alt=""/>
                  <div className="card-body">
                    <h5 className="card-title">{each.name}</h5>
                    <Link to={`/candidate/${each.userId}`} className="btn btn-primary"> More Information </Link>
                  </div>
                </div>

              )
            }

            </div>

            <div className="col-sm-4 bg-success">

            </div>

            <div className="col-sm-4 bg-danger">

            </div>
          </div>
        </div>
      );
    }
}
