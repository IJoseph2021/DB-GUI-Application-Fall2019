import React from 'react';
import { Comment } from './Comment';

export class CommentList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
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
    }
}