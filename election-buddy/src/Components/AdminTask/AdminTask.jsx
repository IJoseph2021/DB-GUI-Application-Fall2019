
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
        candidateNeedsVerification: [],
        candidateId: [],
        candidateName: [],
        value: ''
      }


    }


   componentDidMount(){
     this.adminfuncs.getUnverified().then(res => {
       console.log(res)
       if (Object.entries(res).length === 0 && res.constructor === Object) {


      }

      else {

        this.setState({ candidateNeedsVerification: Object.keys(res) })
        console.log(res)
        for (var i = 0; i < res.length; i++) {
          this.setState({ candidateId: [...this.state.candidateId, res[i].userId] });

          this.candidatefuncs.getCandidateInfo(res[i].userId).then(response=>{
            this.setState({ candidateName: [...this.state.candidateName, `${response[0].fname} ${response[0].lname}` ]});
          }).catch(err=> {

          })
        }


      }
     }).catch(err => {

     })
    }


    onApprove(e){
      var user ={
        userId: e.target.id
      }

      this.setState({
        candidateNeedsVerification: [],
        candidateId: [],
        candidateName: [],
        value: ''
      })
      this.adminfuncs.getUnverified().then(res => {
        console.log(res)
        if (Object.entries(res).length === 0 && res.constructor === Object) {


       }

       else {

         this.setState({ candidateNeedsVerification: Object.keys(res) })
         console.log(res)
         for (var i = 0; i < res.length; i++) {
           this.setState({ candidateId: [...this.state.candidateId, res[i].userId] });

           this.candidatefuncs.getCandidateInfo(res[i].userId).then(response=>{
             this.setState({ candidateName: [...this.state.candidateName, `${response[0].fname} ${response[0].lname}` ]});
           }).catch(err=> {

           })
         }


       }
      }).catch(err => {

      })
      this.adminfuncs.verifyCandidate(user)
      this.forceUpdate()
    }

    onDecline(){

    }


    render() {
      return (
        <div>
        <h3 style={{textAlign: "center"}}>Tasks for Administrator</h3>

        {
          this.state.candidateNeedsVerification.map((item, i) =>
            <div className="row justify-content-md-center">
            <div class="card" style={{width: "20rem"}}>
              <div class="card-body">
                <h5 class="card-title">Candidate Verification Request from {this.state.candidateName[i]}</h5>
                <button onClick={e => this.onApprove(e)} id={this.state.candidateId[i]} class="btn btn-success" style={{marginRight: "2rem"}}>Approve</button>
                <button class="btn btn-danger" style={{marginRight: "2rem"}}>Decline</button>
              </div>
            </div>
            </div>
          )
        }

        </div>

      );
    }
}
