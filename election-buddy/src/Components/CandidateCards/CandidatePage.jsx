import React from 'react';
import './CandidatePage.css';
import Candidate  from './Candidate';
import Comment from './Comment';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

export default class CandidatePage extends React.Component {

    state = {
        candidateName: 'Donald Trump',
        party: 'Republican',
        candidateInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pretium aenean pharetra magna ac placerat vestibulum lectus. Arcu cursus euismod quis viverra nibh cras. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Semper quis lectus nulla at volutpat diam ut venenatis. Amet tellus cras adipiscing enim eu turpis egestas. Sagittis id consectetur purus ut faucibus pulvinar. Volutpat lacus laoreet non curabitur. Velit ut tortor pretium viverra suspendisse. Cras ornare arcu dui vivamus. Quis lectus nulla at volutpat diam ut. Felis eget nunc lobortis mattis. Platea dictumst vestibulum rhoncus est. Turpis egestas integer eget aliquet nibh praesent tristique. At imperdiet dui accumsan sit amet nulla facilisi. Eu tincidunt tortor aliquam nulla facilisi. Amet volutpat consequat mauris nunc congue.',
        candidateNews: ['This is a fun piece of news', 'Heres some more news',  'Wow! Even more news!', 'So much news this is crazy'],
        questions: []
    };

    handleQuestionSubmit(question) {
        console.log(question.userName);
        this.setState(prevState => {
            prevState.questions.push(new Comment(question.userName, question.comment, ''));
            return prevState;
        });
    }

    handleResponse(response) {
        console.log(response.response);
        this.setState(prevState => {
            prevState.questions[prevState.questions.length - 1].response = response.response;
        });
        console.log(this.state.questions[this.state.questions.length - 1].comment);
    }

    render () {
        return (
            <div>
                <div className="header-republican container-fluid">
                    <h1 style={{color: 'black'}}>
                        {this.state.candidateName}
                    </h1>
                    <h3 style={{color: 'black'}}>
                        {this.state.party}
                    </h3>
                </div>

                <div className="candidateInfo">
                    <h3 style={{padding: "0em 0.8em"}}>
                        Candidate Information
                    </h3>
                    <p style={{padding: "0em 1.5em"}}>
                        {this.state.candidateInfo}
                    </p>
                </div>

                <div className="candidateNews">
                    <h3 style={{padding: "0em 0.8em"}}>
                        Candidate News
                    </h3>
                    <div>
                        {this.state.candidateNews.map((x, i) => <ul key={i}>{x}</ul>)}
                    </div>
                </div>

                <div className="questions">
                    <h3 style={{padding: "0em 0.8em"}}>
                        Questions for {this.state.candidateName}
                    </h3>
                    <CommentList questions={this.state.questions} handleResponse={response => this.handleResponse(response)} candidateName={this.state.candidateName}/>
                    <CommentForm onQuestionSubmit={question => this.handleQuestionSubmit(question)}/>
                </div>
            </div>
        )
    }
}