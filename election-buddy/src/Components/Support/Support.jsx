import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CandidateFunctions from '../../API/CandidateFunctions';
import ContactLocalAuthorityForm from '../SupportForm/ContactLocalAuthorityForm';
import ConvertToCandidateForm from '../SupportForm/ConvertToCandidateForm';
import OtherIssuesForm from '../SupportForm/OtherIssuesForm';
const faker = require("faker");

export default class Support extends React.Component{
    candidateFuncs = new CandidateFunctions()
    constructor(){
      super()

      this.state = {
        convertForm: false,
        contactForm: false,
        OtherIssuesForm: false,
        email: ""
      }

      this.onClick = this.onClick.bind(this)
    }

   componentDidMount(){
    }

    onClick(event){
      console.log(event.target.name)
      this.setState({[event.target.name]: !this.state[event.target.name]})
    }



    render() {
      return (
        <div className="">
        {
          this.state.convertForm ?
          ( <ConvertToCandidateForm email_for_form={this.state.email}/> )
            : (
              this.state.contactForm ?
              ( <ContactLocalAuthorityForm email_for_form={this.state.email}/> )
              : (
                this.state.OtherIssuesForm ?
              ( <OtherIssuesForm email_for_form={this.state.email}/> )
              : (
                <div className="jumbotron" style={{"textAlign": "center"}}>
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
