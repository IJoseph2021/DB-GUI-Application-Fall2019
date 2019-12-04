import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Forms from '../../API/Forms';
import UserFunctions from '../../API/UserFunctions';

export default class ConvertToCandidateForm extends React.Component{
    forms = new Forms()
    userFuncs = new UserFunctions();

    constructor(props){
      super(props)

      this.state = {
        name: ""
      }

      this.onChange = this.onChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)

    }

    onChange = event => {
  		this.setState({[event.target.name]: event.target.value})
  	}

   componentDidMount(){
     const user = {
       userId: localStorage.getItem('token')
     }

     this.userFuncs.getUserInfo(user).then(res => {
       this.setState({
         name: `${res[0].fname} ${res[0].lname}`
       })
     }).catch(err => {
     //error caught here

   });
    }

    handleSubmit(){
      const user = {
        id: localStorage.getItem('token')
      }

      this.forms.convertCandidate(user).then(res => {
        //do something here
      }).catch(err => {
        //do sth here
      })

      this.setState({
        subject: "",
        details: ""
      })

      this.props.finishSubmission("convertSubmit")
      this.props.backToSupportAfterSubmit()

    }



    render() {
      return (
        <div className="">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link onClick={this.props.backToSupport}>Support</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Convert To Candidate Form</li>
          </ol>
        </nav>
        <div>
          <div className="container ">
            <div className="row">
              <div className="col-sm-9 col-md-7 col-lg-5 mx-auto  ">
                <div className="card card-signin my-5 bg-primary" >
                  <div className="card-body">
                    <h5 className="card-title text-center text-white btn-block text-uppercase">Convert To Candidate</h5>
                    <hr className="my-4"/>
                    <form className="form-signin">

                      <div className="form-group">
                      <label htmlFor="email_for_form">Email address: </label>
                      <input
                      type="email"
                      className="form-control"
                      id="email_for_form"
                      disabled
                      value={this.props.email_for_form}
                      />
                      </div>

                      <div className="form-group">
                      <label htmlFor="reason">Reason for converting to candidate account:</label>
                      <textarea
                      onChange={this.onChange}
                      className="form-control"
                      value={this.state.reason}
                      id="reason"
                      rows="3"
                      ></textarea>
                      </div>

                      <button
                      className="btn btn-lg btn-success btn-block text-uppercase"
                      type="button"
                      onClick={this.handleSubmit}
                      >Submit Request</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      );
    }
}
