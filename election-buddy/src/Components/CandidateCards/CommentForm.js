import React from 'react';

export class CommentForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            question: ''
        };
    }

    handeSubmit = event => {
        event.preventDefault();
        this.props.onQuestionSubmit(this.state);
        this.setState({
            author: '',
            question: ''
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
                       value={this.state.author} 
                       onChange={ e => this.setState({ author: e.target.value }) } />

                <input type="text"
                       id="question"
                       name="question" 
                       placeholder="What's your question?"
                       className="form-control" 
                       value={this.state.question} 
                       onChange={ e => this.setState({ question: e.target.value }) } />
                <button type="submit"
                        className="btn btn-primary">
                    Post
                </button>
            </form>
        )
    }
}