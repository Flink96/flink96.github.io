import React from 'react';
import '../css/task.css'

class Task extends React.Component{
    constructor(){
        super();
    }
    render(){
        return(
            <div className="task">
                <div className="task-title-cont">
                    <button className="task-title" value={this.props.id} onClick={this.props.getID}>{this.props.task.title}</button>
                    <span>{this.props.comment}</span>
                </div>
                <button className="button-del" value={this.props.id} onClick={this.props.delTask}>
                    Delete
                </button>
            </div>
        )
    }
}

export default Task;