import React from 'react';
import { Comment } from './Comment';

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
                    </li>
                )}
            </ul>
        </div>
)
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
        */