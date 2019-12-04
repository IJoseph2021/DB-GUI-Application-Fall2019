import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CandidateFunctions from '../../API/CandidateFunctions';
import ContactLocalAuthorityForm from '../SupportForm/ContactLocalAuthorityForm';
import ConvertToCandidateForm from '../SupportForm/ConvertToCandidateForm';
import OtherIssuesForm from '../SupportForm/OtherIssuesForm';
import UserFunctions from '../../API/UserFunctions';

const faker = require("faker");

export default class Support extends React.Component{
    userFuncs = new UserFunctions();
    candidateFuncs = new CandidateFunctions()

    constructor(){
      super()

      this.state = {
        convertForm: false,
        contactForm: false,
        OtherIssuesForm: false,
        convertSubmit: false,
        contactSubmit: false,
        otherIssuesSubmit: false,
        email: ""
      }

      this.onClick = this.onClick.bind(this)
      this.backToSupport = this.backToSupport.bind(this)
      this.backToSupportAfterSubmit = this.backToSupportAfterSubmit.bind(this)

      this.finishSubmission = this.finishSubmission.bind(this)
    }

   componentDidMount(){
     this.userFuncs.getUserEmail(localStorage.getItem('token')).then(res => {
       this.setState({
         email: res.EMAIL
       })
     }).catch(err => {
     //error caught here

   });

    }

    onClick(event){
      this.setState({[event.target.name]: !this.state[event.target.name]})
    }

    backToSupport(event){
      this.setState({
        convertForm: false,
        contactForm: false,
        OtherIssuesForm: false,
        convertSubmit: false,
        contactSubmit: false,
        otherIssuesSubmit: false,
      })
    }

    backToSupportAfterSubmit(event){
      this.setState({
        convertForm: false,
        contactForm: false,
        OtherIssuesForm: false,
      })
    }

    finishSubmission(a_state) {
      this.setState({
        convertSubmit: false,
        contactSubmit: false,
        otherIssuesSubmit: false
      })

      this.setState({
        [a_state]: !this.state.a_state
      })
    }

    render() {
      return (
        <div className="">
        {
          this.state.convertForm ?
          ( <ConvertToCandidateForm
            finishSubmission={this.finishSubmission}
            backToSupport={this.backToSupport}
            email_for_form={this.state.email}
            backToSupportAfterSubmit={this.backToSupportAfterSubmit}
            /> )
            : (
              this.state.contactForm ?
              ( <ContactLocalAuthorityForm
                finishSubmission={this.finishSubmission}
                backToSupport={this.backToSupport}
                email_for_form={this.state.email}
                backToSupportAfterSubmit={this.backToSupportAfterSubmit}

                /> )
              : (
                this.state.OtherIssuesForm ?
              ( <OtherIssuesForm
                finishSubmission={this.finishSubmission}
                backToSupport={this.backToSupport}
                email_for_form={this.state.email}
                backToSupportAfterSubmit={this.backToSupportAfterSubmit}
                /> )
              : (

                <div className="jumbotron" style={{"textAlign": "center"}}>
                {
                  this.state.contactSubmit ? (
                    <p class="text-success">We Have Sent A Message To Local Authority For You. Your Concerns Will Be Soon Resolved. Thanks!</p>
                  ) : ""
                }

                {
                  this.state.otherIssuesSubmit ? (
                  <p class="text-success">We Have Sent Your Issues To Our Support. Your Issues Will Be Soon Resolved. Thanks!</p>
                  ) : ""
                }

                {
                  this.state.convertSubmit ? (
                    <p class="text-success">We Have Sent A Message To Election Buddy Admin About Your Request. Please Wait Until We Get Back To You With Update On Your Status and Role. Thanks!</p>
                  ) : ""
                }

                  <h1 className="display-5">Election Buddy Premium Support</h1>
                  <p className="lead">Contact our support for further assistance</p>
                  <hr className="my-4"/>
                  <button
                  onClick={this.onClick}
                  type="button"
                  name="convertForm"
                  className="btn btn-primary btn-lg"
                  style={{marginRight: "1rem"}}
                  role="button">
                  Convert To Candidate Account
                  </button>

                  <button
                  onClick={this.onClick}
                  type="button"
                  name="contactForm"
                  className="btn btn-warning btn-lg"
                  style={{marginRight: "1rem"}}
                  role="button">
                  Contact Local Authority
                  </button>

                  <button
                  onClick={this.onClick}
                  type="button"
                  name="OtherIssuesForm"
                  className="btn btn-success btn-lg"
                  style={{marginRight: "1rem"}}
                  role="button">
                  Other Issues
                  </button>

                </div>
              )
            )
          )
        }

        </div>
      );
    }
}
