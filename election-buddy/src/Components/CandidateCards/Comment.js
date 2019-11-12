import React from 'react';

export const Comment = props => (
    <div className="comment">
        <h5 className="commentAuthor">
            {props.author}
        </h5>
        <p>
            {props.children}
        </p>
    </div>
)