import React, { Component } from 'react';
import "../css/comments.css"

class Comments extends Component {
    render() {
        return (
            <div className="comments-container">
                <div className="box"></div>
                <span>{this.props.comments.title}</span>
            </div>
        );
    }
}

export default Comments;
