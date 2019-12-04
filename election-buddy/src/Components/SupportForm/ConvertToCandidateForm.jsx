import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Forms from '../../API/Forms';

export default class ConvertToCandidateForm extends React.Component{
    forms = new Forms()
    constructor(){
      super()

      this.state = {

      }
    }

   componentDidMount(){
    }





    render() {
      return (
        <div className="">
        <div>
          <div className="container ">
            <div className="row">
              <div className="col-sm-9 col-md-7 col-lg-5 mx-auto  ">
                <div className="card card-signin my-5 bg-primary" >
                  <div className="card-body">
                    <h5 className="card-title text-center text-white btn-block text-uppercase">Convert To Candidate</h5>
                    <hr className="my-4"/>
                    <form className="form-signin">
                      <div class="form-group">
                        <label for="email_for_form">Email address</label>
                        <input
                        type="email"
                        class="form-control"
                        id="email_for_form"
                        disabled
                        value={this.props.email}
                        />
                      </div>

                      <div className="form-label-group">
                        <input
                        type="text"
                        id="Reason"
                        className="form-control"
                        placeholder="Reason" required
                        onChange={event => this.setState({ password: event.target.value })}
                        />
                        <label htmlFor="inputPassword">Reason for converting to candidate:</label>
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
        Convert To Candidate
        <form>
          <div class="form-group">
            <label for="email_for_form">Email address</label>
            <input
            type="email"
            class="form-control"
            id="email_for_form"
            disabled
            value={this.props.email}
            />
          </div>

          <div class="form-group">
            <label for="exampleFormControlTextarea1">Example textarea</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
        </form>
        </div>
      );
    }
}
