import React from 'react';
import {Link} from 'react-router-dom';
import CandidateFunctions from '../../API/CandidateFunctions';
import UserFunctions from '../../API/UserFunctions';

export default class News extends React.Component {
    constructor(props) {
        super(props);
    }
  
    state = {
        generalNews:[]
    };

    componentDidMount() {
        const key = [`elections`,`politics`,`united states`,`democrat`,`republican`,`congress`,`president`,`senate`]
        var tempDate = new Date();
        const date = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' +(tempDate.getDate()-1)
  
        const url = `https://newsapi.org/v2/everything?q=((${key[0]})AND(${key[1]}))AND(${key[2]})AND(${key[3]})AND(${key[4]})AND(${key[5]})AND((${key[6]})OR(${key[7]}))&from=${date}&to=2019-12-25&sortBy=popularity&apiKey=53b1b21475f84b9894e0e6a987ff211d`
        fetch(url)
        .then(res => res.json())
        .then((data) => {
          this.setState({ generalNews: data.articles })
        })
        .catch(console.log)
    }
  
  
      createGroups() {
        var groupedArticles = [];
        var howMany = 3;
        var idx = 0;
  
        while (idx < this.state.generalNews.length) {
              if (idx % howMany === 0)
                  groupedArticles.push([])
  
              groupedArticles[groupedArticles.length - 1].push(this.state.generalNews[idx++]);
  
            if(groupedArticles.length === 3  &&  groupedArticles[howMany-1].length  === 3){
                  console.log(groupedArticles.length);
                  break;
            }
      }
  
        return groupedArticles
      }

      render() {

        const groupedArticles = this.createGroups()
        return (
          <div>
              <div className="generalNews">
                  <h3 style={{padding: "0em 0.8em"}}>
                      Live Updates
                  </h3>
  
                      { groupedArticles  && groupedArticles.map((articles,index) =>
                              (
                              <div>
                              <div className="row">
                              {articles.map(article=>
                                  <div className="col-lg-4 d-flex align-items-stretch" >
                                    <div className="card" id="card">
                                      <div className="card-body">
                                       <img class="card-img-top" src={article.urlToImage}/>
                                        <h5 id="title" className="card-title">{article.title}</h5>
                                      </div>
                                      <h6 className="card-subtitle">
                                          From {article.source.name}
                                      </h6>
                                      <button type="submit"
                                              id = "button"
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
              </div>
          </div>
        );
      }
}