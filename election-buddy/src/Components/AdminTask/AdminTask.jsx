
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Forms from '../../API/Forms';

export default class AdminTask extends React.Component{
    forms = new Forms()
    constructor(){
      super()

      this.state = {

      }
    }

   componentDidMount(){

    }

    onApprove(){

    }

    onDecline(){

    }


    render() {
      return (
        <div className="row justify-content-md-center">
        <div class="card" style={{width: "18rem"}}>
          <div class="card-body">
            <h5 class="card-title">Candidate Verification Request from </h5>
            <button class="btn btn-primary" style={{marginRight: "2rem"}}>Approve</button>
            <button class="btn btn-primary" style={{marginRight: "2rem"}}>Decline</button>


          </div>
        </div>
        </div>
      );
    }
}
