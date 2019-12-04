import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Forms from '../../API/Forms';
import UserFunctions from '../../API/UserFunctions';

export default class ContactLocalAuthorityForm extends React.Component{
    forms = new Forms()
    userFuncs = new UserFunctions();

    constructor(props){
      super(props)

      this.state = {
        email: this.props.email_for_form,
        concern: "",
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
      const content = {
        sender: this.state.name,
        concern: this.state.concern
      }
      this.forms.localAuth(content).then(res => {
        //do something here
      }).catch(err => {
        //do sth here
      })

      this.setState({
        concern: ""
      })

      this.props.finishSubmission("contactSubmit")
      this.props.backToSupportAfterSubmit()

    }


    render() {
      return (
        <div className="">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/support" onClick={this.props.backToSupport}>Support</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Contact Local Authority Form</li>
          </ol>
        </nav>
        <div>
          <div className="container ">
            <div className="row">
              <div className="col-sm-9 col-md-7 col-lg-5 mx-auto  ">
                <div className="card card-signin my-5 bg-warning" >
                  <div className="card-body">
                    <h5 className="card-title text-center text-black btn-block text-uppercase">Contact Local Authority</h5>
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
                      <label htmlFor="concern">Concern to send to local authority:</label>
                      <textarea
                      value={this.state.concern}
                      name="concern"
                      onChange={this.onChange}
                      className="form-control" id="concern" rows="4"></textarea>
                      </div>

                      <button
                      className="btn btn-lg btn-primary btn-block text-uppercase"
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
