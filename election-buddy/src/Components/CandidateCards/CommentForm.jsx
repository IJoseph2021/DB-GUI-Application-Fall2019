import React from 'react';

export default class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            question: '',
            userName: '',
            comment: ''
        };
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.onQuestionSubmit(this.state);
        this.setState({
            userName: '',
            comment: ''
        });
    };

    render () {
        return (
            <form className="comment-form card"
                    onSubmit={this.handleSubmit}>
                <input type="text"
                       id="name"
                       name="name"
                       placeholder="Your name"
                       className="form-control"
                       value={this.state.userName}
                       onChange={ e => this.setState({ userName: e.target.value }) } />

                <input type="text"
                       id="question"
                       name="question"
                       placeholder="What's your question?"
                       className="form-control"
                       value={this.state.comment}
                       onChange={ e => this.setState({ comment: e.target.value }) } />
                <button type="submit"
                        className="btn btn-primary">
                    Post
                </button>
            </form>
        )
    }
}
