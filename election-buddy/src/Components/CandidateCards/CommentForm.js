import React from 'react';

export class CommentForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            question: ''
        };
    }

    handleSubmit = () => {
        //if (!this.state.author || !this.state.question) {
        //    return;
        //}
        this.setState({author: '', question: ''});
        this.props.onQuestionSubmit({author: this.state.author, question: this.state.question});
    }

    render () {
        return (
            <form className="comment-form" onSubmit={this.handleSubmit}>
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
                <input type="submit" value="Post" />
            </form>
        )
    }
}