import React from 'react';
import { Comment } from './Comment';
import CandidateFunctions from '../../API/CandidateFunctions';

export default class CommentList extends React.Component {
    candidateFuncs = new CandidateFunctions();
    constructor(props){
        super(props);
        console.log(this.props.userId);
        this.state = {
            userId: this.props.userId || localStorage.getItem('token'),
            candidateName: '',
            response: ''
        };
        console.log(this.props.candidateId);
        console.log(this.props.userId);
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
            {/*
            <div className="header container-fluid background: lightgray
                            width: 100%">
                    <h3 style={{padding: "0em 0.8em"}}>
                        Questions and Answers
                    </h3>
            </div>*/}

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

                                <div className="card-body font-weight-bold">
                                    {x.comment}
                                </div>
                              </div>

                              <div className="card" style={{ "display": x.response != '' ? 'block' : 'none' }}>

                                  <p className="card-header">{this.props.candidateName}</p>

                                  <p className="card-body">{x.response}</p>
                              </div>

                              <div className="candidate_response card" style={{ "display": x.response.length == 0 ? 'block' : 'none' }}>
                                  <form className="candidate_response card"
                                        style={{ "display": this.props.candidateId === this.props.userId ? 'block' : 'none' }}
                                        onSubmit={this.handleResponse}>
                                      <input type="text"
                                          id="name"
                                          name="name"
                                          className="form-control"
                                          value={this.props.candidateName}
                                          onChange={ e => this.setState({ candidateName: e.target.value }) } />

                                      <input type="text"
                                          id="question"
                                          name="question"
                                          placeholder="What's your response?"
                                          className="form-control"
                                          value={i.response}
                                          onChange={ e => ( x.response = e.target.value) }
                                          />
                                      <button type="submit"
                                          className="btn btn-primary">
                                          Post
                                      </button>
                                  </form>
                                  <div  style={{ "display": i.response != '' && this.props.candidateId !== this.props.userId ? 'block' : 'none' }}
                                        className="candidate_response card form-control">
                                        <p><mark>{this.props.candidateName} has not answered this question</mark></p>
                                  </div>
                              </div>
                          </li>
                      )}
                  </ul>
              </div>
            </div>
        )
    }
}
