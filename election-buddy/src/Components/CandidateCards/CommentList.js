import React from 'react';
import { Comment } from './Comment';

export default class CommentList extends React.Component {

  constructor(props){
    super(props);

    this.state = {
        candidateName: '',
        response: ''
    };
  }



    handleResponse = (event) => {
        event.preventDefault();
        this.props.handleResponse(this.state);
        this.setState({
            candidateName: '',
            response: ''
        });
    };

    render() {
        return (
          <div>
            <h1>Questions and Answers</h1>
            {/*<{div className="jumbotron">
              <p className="lead">Question here</p>
              <p className="author">Donald Trump</p>
              <hr className="my-4"/>
              <p>Answers here</p>
              <p className="author">Donald Trump</p>
        </div}>*/}

              <div className="CommentList container-fluid">

                  <div className="no_reviews bg-light" style={{ "display": this.props.questions.length == 0 ? 'block' : 'none' }}>
                      Be the first to ask a question!
                  </div>

                  <ul>
                      {this.props.questions.map((x, i) =>
                          <li key={i} className="list-group-item">
                              <div className="card">


                              <div className="card-header">
                                  <p>{x.userName}</p>
                              </div>

                              <div className="card-body">
                                  {x.comment}
                              </div>
                              </div>

                              <div className="card" style={{ "display": x.response != '' ? 'block' : 'none' }}>

                                  <p className="card-header">{this.props.candidateName}</p>

                                  <p className="card-body">{x.response}</p>
                              </div>

                              <div style={{ "display": x.response.length == 0 ? 'block' : 'none' }}>
                                  <form className="candidate_response card"
                                        onSubmit={this.handleResponse}>
                                      <input type="text"
                                          id="name"
                                          name="name"
                                          placeholder="Candidate Name"
                                          className="form-control"
                                          value={this.state.candidateName}
                                          onChange={ e => this.setState({ candidateName: e.target.value }) } />

                                      <input type="text"
                                          id="question"
                                          name="question"
                                          placeholder="What's your response?"
                                          className="form-control"
                                          value={this.state.response}
                                          onChange={ e => this.setState({ response: e.target.value }) } />
                                      <button type="submit"
                                          className="btn btn-primary">
                                          Post
                                      </button>
                                  </form>
                              </div>
                          </li>
                      )}
                  </ul>
              </div>
            </div>
        )
    }
}
