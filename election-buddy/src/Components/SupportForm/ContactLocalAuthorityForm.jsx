import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Forms from '../../API/Forms';

export default class ContactLocalAuthorityForm extends React.Component{
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
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Support</a></li>
            <li class="breadcrumb-item active" aria-current="page">Contact Local Authority Form</li>
          </ol>
        </nav>
        Contact Local Authority Form
        <form>
          <div class="form-group">
            <label for="email_for_form">Email address</label>
            <input
            disabled
            value={this.props.email}
            type="email"
            class="form-control"
            id="email_for_form"
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
