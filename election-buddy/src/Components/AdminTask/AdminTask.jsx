
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Forms from '../../API/Forms';
import AdminFunctions from '../../API/AdminFunctions';
import CandidateFunctions from '../../API/CandidateFunctions';


export default class AdminTask extends React.Component{
    forms = new Forms()
    adminfuncs = new AdminFunctions();
    candidatefuncs = new CandidateFunctions();

    constructor(){
      super()

      this.state = {
        candidateNeedsVerification: []
      }
    }

   componentDidMount(){
     this.adminfuncs.getUnverified().then(res => {
       console.log(res)
     }).catch(err => {

     })
    }

    onApprove(){

    }

    onDecline(){

    }


    render() {
      return (
        <div>
        <h3 style={{textAlign: "center"}}>Tasks for Administrator</h3>
        <div className="row justify-content-md-center">
        <div class="card" style={{width: "20rem"}}>
          <div class="card-body">
            <h5 class="card-title">Candidate Verification Request from </h5>
            <button class="btn btn-success" style={{marginRight: "2rem"}}>Approve</button>
            <button class="btn btn-danger" style={{marginRight: "2rem"}}>Decline</button>
          </div>
        </div>
        </div>
        </div>

      );
    }
}
