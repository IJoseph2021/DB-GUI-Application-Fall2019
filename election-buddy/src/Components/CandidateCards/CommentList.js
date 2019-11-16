import React from 'react';
import { Comment } from './Comment';

export class CommentList extends React.Component {

    state = {
        candidateName: '',
        response: ''
    };

    handleResponse = event => {
        event.preventDefault();
        this.props.handleResponse(this.state);
        this.setState({
            candidateName: '',
            response: ''
        });
    };

    render() {
        return (

            <div className="CommentList container-fluid">

                <div className="no_reviews bg-light" style={{ "display": this.props.questions.length == 0 ? 'block' : 'none' }}>
                    Be the first to ask a question!
                </div>

                <ul>
                    {this.props.questions.map((x, i) =>
                        <li key={i} className="list-group-item">
                            <div className="card-header">
                                <p>{x.userName}</p>
                            </div>

                            <div className="card-body">
                                {x.comment}
                            </div>

                            <div style={{ "display": x.response.length > '2' ? 'block' : 'none' }}>
                                <p>{x.response}</p>

                                <p>{x.response}</p>
                            </div>
                            
                            <div style={{ "display": x.response.length != 0 ? 'block' : 'none' }}>
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
        )
    }
}
/*
export class CommentList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
        <div className="CommentList container-fluid">

            <div className="no_reviews bg-light" style={{ "display": this.props.questions.length == 0 ? 'block' : 'none' }}>
                Be the first to ask a question!
            </div>

            <ul>
                {this.props.questions.map(x =>
                    <li className="list-group-item">
                        <div className="card-header">
                            <p>{x.userName}</p>
                        </div>

                        <div className="card-body">
                            {x.comment}
                        </div>
                    </li>
                )}
            </ul>
        </div>
    )
    }
}
*/

/*
        //Might need to change this, not sure if it will work
        var commentNodes = this.props.questions.map(comment =>
            <Comment author={comment.author} key={comment.id}>
                {comment.text}
            </Comment>
        );

        return (
            <div className="commentList">
                {commentNodes}
            </div>
        )



        export const CommentList = props => (
    <div className="CommentList container-fluid">

        <div className="no_reviews bg-light" style={{ "display": props.questions.length == 0 ? 'block' : 'none' }}>
            Be the first to ask a question!
        </div>

        <ul>
            {props.questions.map((x, i) =>
                <li key={i} className="list-group-item">
                    <div className="card-header">
                        <p>{x.userName}</p>
                    </div>

                    <div className="card-body">
                        {x.comment}
                    </div>

                    <div style={{ "display": props.response != '' ? 'block' : 'none' }}>
                        <form className="candidate_response card"
                            onSubmit={this.handleResponse}>
                            <input type="text"
                                id="name"
                                name="name"
                                placeholder="Candidate Nae"
                                className="form-control"
                                value=""
                                onChange="" />

                            <input type="text"
                                id="question"
                                name="question"
                                placeholder="What's your question?"
                                className="form-control"
                                value=""
                                onChange="" />
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
)
        */