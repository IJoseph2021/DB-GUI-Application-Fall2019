import React from 'react';
import './CandidatePage.css';
import Candidate  from './Candidate';
import Comment from './Comment';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import {Link} from 'react-router-dom';
import CandidateFunctions from '../../API/CandidateFunctions';
import UserFunctions from '../../API/UserFunctions';

export default class CandidatePage extends React.Component {
    candidateFuncs = new CandidateFunctions();
    userFuncs = new UserFunctions();
    
    constructor(props){
        super(props)
        const { match: { params } } = this.props;
        this.state = {
            userId: this.props.userId || localStorage.getItem('token'),
            candidateId: params.id,
            candidateName: '',
            party: '',
            candidateInfo: '',
            candidateNews: [],
            questions: []
        }
      }

    async populateInfo(){
        const { match: { params } } = this.props;
        this.setState({candidateId: params.id})
        console.log(this.state.candidateId);
        //Getting first and last name of the candidate
        this.candidateFuncs.getCandidateFirstName(params.id)
		.then(res => {
			this.setState({candidateName: res[0].fname})
		})
		.catch(err => {
			console.log("Error occured")
        });
        this.candidateFuncs.getCandidateLastName(params.id)
		.then(res => {
			this.setState(prevState => {
                prevState.candidateName = prevState.candidateName + ' ' + res[0].lname;
                return prevState;
            });
		})
		.catch(err => {
			console.log("Error occured")
        });


        this.candidateFuncs.getCandidateBio(params.id)
		.then(res => {
			this.setState({candidateInfo: res[0].bio})
		})
		.catch(err => {
			console.log("Error occured")
        });

        this.candidateFuncs.getCandidateParty(params.id)
		.then(res => {
			this.setState({party: res[0].partyName})
		})
		.catch(err => {
			console.log("Error occured")
        });

        this.candidateFuncs.getCandidateQuestionsAsked(params.id)
		.then(resp => {
            console.log("Theres no error")
            console.log(resp)
            for (var i = 0; i < resp.length; i++) 
            {
                this.setState(prevState => {
                    prevState.questions.push(new Comment(resp[i].questionId, resp[i].username, resp[i].question, ''))
                })
            }
        })
        .catch(err => {
            console.log("Error occured")
        })

        this.candidateFuncs.getCandidateQuestionsAnswered(params.id)
		.then(resp => {
            console.log("Theres no error")
            for (var i = 0; i < resp.length; i++) 
            {
                for (var j = 0; j < this.state.questions.length; j++)
                {
                    if (resp[i].questionId == this.state.questions[j].questionId) {
                        this.setState(prevState => {
                            prevState.questions[j].response = resp[i].comment;
                        });
                    }
                }
            }
        })
        .catch(err => {
            console.log("Error occured")
        })
    }

    handleQuestionSubmit(question) {
        console.log(question.userName);
        this.userFuncs.getUserIdCamel(question).then(res => {
            this.candidateFuncs.createQuestion(this.state.userId, res.userId, question.comment).then(resp => {
                console.log("Question submitted")
            });
        })
        .catch(err => {
            console.log("Error occured in question submitting")
        })
/*
        this.setState(prevState => {
            prevState.questions.push(new Comment(-1, question.userName, question.comment, ''));
            return prevState;
        });*/
    }

    handleResponse(response) {
        console.log(response.response);
        this.setState(prevState => {
            prevState.questions[prevState.questions.length - 1].response = response.response;
        });
        console.log(this.state.questions[this.state.questions.length - 1].comment);
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        this.populateInfo()
        console.log(this.state.candidateId)
        //var id = this.props.userId;
        console.log(this.props.userId)
        const key = this.state.candidateName
        const key2 = this.state.party
        var tempDate = new Date();
        const date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' +(tempDate.getDate()-7)
        const url = `https://newsapi.org/v2/everything?q=((${key})AND(${key2}))&from=${date}&to=2019-12-25&sortBy=popularity&apiKey=53b1b21475f84b9894e0e6a987ff211d`
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
            if (idx % howMany === 0)
                groupedArticles.push([])

            groupedArticles[groupedArticles.length - 1].push(this.state.candidateNews[idx++])


          if(groupedArticles.length === 3  &&  groupedArticles[howMany-1].length  === 3){
                console.log(groupedArticles.length);
                break;
          }
      }

      return groupedArticles
    }

    editBio() {

    }

    render () {

        const groupedArticles = this.createGroups()
        return (
            <div>
                <div className={`${this.state.party} cointainer-fluid`}>
                    <h1 style={{'color': 'black'}}>
                        {this.state.candidateName}
                    </h1>
                    <h3 style={{'color': 'black'}}>
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

                <div className="candidateInfo2">
                    <h3 style={{padding: "0em 0.8em"}}>
                        Questions and Answers
                    </h3>
                    <CommentList questions={this.state.questions} handleResponse={response => this.handleResponse(response)} candidateName={this.state.candidateName} userId={this.state.userId} candidateId={this.state.candidateId}/>
                    <CommentForm onQuestionSubmit={question => this.handleQuestionSubmit(question)}/>
                </div>

                
{/*
                <div className="candidateNews">
                    <h3 style={{padding: "0em 0.8em"}}>
                        Live Candidate Updates
                    </h3>

                        { groupedArticles  && groupedArticles.map((articles,index) =>
                                (
                                <div>
                                <div className="row">
                                {articles.map(article=>
                                    <div className="col-lg-4 d-flex align-items-stretch">
                                      <div className="card" id="card">
                                        <div className="card-body">
                                         <img className="card-img-top" src={article.urlToImage}/>
                                          <h5 className="card-title">{article.title}</h5>
                                        </div>
                                        <h6 className="card-subtitle">
                                                From {article.source.name}
                                        </h6>
                                        <button type="submit"
                                                className="btn btn-primary">
                                            <a href={article.url} id="article_link">Learn More</a>
                                        </button>
                                      </div>
                                    </div>
                                )}
                                </div>
                            </div>
                            ))
                        }
                    </div>*/}

                <div className="questions candidateInfo">
                    
                </div>
            </div>
        )
    }
}
