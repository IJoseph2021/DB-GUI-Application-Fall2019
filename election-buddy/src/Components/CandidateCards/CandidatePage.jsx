import React from 'react';
import './CandidatePage.css';
import Candidate  from './Candidate';
import Comment from './Comment';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import {Link} from 'react-router-dom';

export default class CandidatePage extends React.Component {

    state = {
        candidateName: 'Donald Trump',
        party: 'Republican',
        candidateInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pretium aenean pharetra magna ac placerat vestibulum lectus. Arcu cursus euismod quis viverra nibh cras. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor sit amet. Semper quis lectus nulla at volutpat diam ut venenatis. Amet tellus cras adipiscing enim eu turpis egestas. Sagittis id consectetur purus ut faucibus pulvinar. Volutpat lacus laoreet non curabitur. Velit ut tortor pretium viverra suspendisse. Cras ornare arcu dui vivamus. Quis lectus nulla at volutpat diam ut. Felis eget nunc lobortis mattis. Platea dictumst vestibulum rhoncus est. Turpis egestas integer eget aliquet nibh praesent tristique. At imperdiet dui accumsan sit amet nulla facilisi. Eu tincidunt tortor aliquam nulla facilisi. Amet volutpat consequat mauris nunc congue.',
        candidateNews: [],
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

    componentDidMount() {
       const key = this.state.candidateName
       const key2 = this.state.party
       const url = `https://newsapi.org/v2/everything?q=((${key})AND(${key2}))&from=2019-11-10&to=2019-12-25&sortBy=popularity&apiKey=53b1b21475f84b9894e0e6a987ff211d`
      fetch(url)
      .then(res => res.json())
      .then((data) => {
        this.setState({ candidateNews: data.articles })
      })
      .catch(console.log)

    }

    createGroups() {
      var groupedArticles = [];
      var howMany = 3;
      var idx = 0

      while (idx < this.state.candidateNews.length) {
        if (idx % howMany === 0) groupedArticles.push([])
            groupedArticles[groupedArticles.length - 1].push(this.state.candidateNews[idx++])
      }

      return groupedArticles
    }


    render () {

        const groupedArticles = this.createGroups()
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

                        { groupedArticles  && groupedArticles.map((articles,index) =>
                                (
                                <div>
                                <div className="row">
                                {articles.map(article=>
                                    <div className="col-lg-4 d-flex align-items-stretch">
                                      <div className="card">
                                        <div className="card-body">
                                         <img class="card-img-top" src={article.urlToImage}/>
                                          <h5 className="card-title">{article.title}</h5>
                                          <h6 className="card-subtitle mb-2 text-muted">
                                                <button type="button" variant = "success" className="btn btn-info">
                                                <a target="_blank" href={article.url}>Learn More</a>
                                                </button>
                                          </h6>
                                        </div>
                                      </div>
                                    </div>
                                )}
                                </div>
                            </div>
                            ))
                        }
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
