import React from 'react';
import Task from "./task";
import Comments from "./comments";
import '../css/list.css';

class List extends React.Component{
    constructor(){
        super();
        this.state={
            listArray: localStorage.listArray ? JSON.parse(localStorage.listArray): [],
            commentsArray: localStorage.commentsArray ? JSON.parse(localStorage.commentsArray): [],
            idComments: 0,
            idTask:localStorage.idTask ? JSON.parse(localStorage.idTask): 0,
            countComments:1,
            textFlag: 'active'
        }
        this.handleTextArea= this.handleTextArea.bind(this);
        this.addTask=this.addTask.bind(this);
        this.delTask= this.delTask.bind(this);
        this.getId= this.getId.bind(this);
        this.addComment= this.addComment.bind(this);
    }
    getId(e){
        this.setState({
            idComments: e.target.value,
            textFlag:'',
        })
        this.state.listArray.map((comments,index)=>{
            (comments.id==e.target.value)? this.setState({
                    countComments: index+1
                }): e.preventDefault
        })
    }
    handleTextArea(e){
        this.setState({
            textarea: e.target.value
        })
    }
    addTask(){
        if (this.state.textarea!=undefined&&this.state.textarea!=''){
        let localArr = this.state.listArray;
        localArr.push({
            title: this.state.textarea,
            id: this.state.idTask+1,
            comments: 0
        })
        this.setState({
            idTask: this.state.idTask+1,
            listArray: localArr,
            textarea:'',
        })}else{
            alert('Нельзя отправить пустое задание')
        }
        localStorage.idTask= JSON.stringify(this.state.idTask+1);
        localStorage.listArray= JSON.stringify(this.state.listArray);

    }

    delTask(e){
        let localArrComments=[];
        let localArrDel=[];
        this.state.listArray.map((task)=> {
            (task.id==e.target.value)?
                undefined : localArrDel.push(task)
        })
        this.state.commentsArray.map((comments)=> {
            (comments.id==e.target.value)?
            undefined : localArrComments.push(comments)
        })
        this.setState({
            listArray: localArrDel,
            commentsArray: localArrComments
        })
        if (localArrDel.length==0){
            this.setState({
                textFlag: false,
                countComments: 0,
                textFlag: 'active'
            })
        }if(localArrDel.length>0&&this.state.countComments-2<0){
            this.setState({
                idComments: this.state.listArray[this.state.countComments].id,
                countComments: this.state.countComments
            })
        }if(localArrDel.length>0&&this.state.countComments-2>=0){
            this.setState({
                idComments: this.state.listArray[this.state.countComments-2].id,
                countComments: this.state.countComments-1
            })
        }
        localStorage.commentsArray= JSON.stringify(localArrComments)
        localStorage.listArray= JSON.stringify(localArrDel)
    }
    addComment(e){
        if (e.key == 'Enter'&& e.ctrlKey){
            let localArrComments = this.state.commentsArray;
            localArrComments.push({
                title: e.target.value,
                id: this.state.idComments,
            })
            this.state.listArray[this.state.countComments-1].comments= this.state.listArray[this.state.countComments-1].comments+1
            this.setState({
                commentsArray: localArrComments
            })
            e.target.value=''
        }
        localStorage.commentsArray= JSON.stringify(this.state.commentsArray)
        localStorage.listArray= JSON.stringify(this.state.listArray);
    }
    render(){
        return(
            <div className="flex-container">
                <div className="list">
                    <div className="title"> <span>Items</span></div>
                    <div className="addCard">
                        <textarea placeholder="Type name here..." value={this.state.textarea} onChange={this.handleTextArea}/>
                        <button onClick={this.addTask}>Add new</button>
                    </div>
                    {this.state.listArray.map((task,index)=>{
                        return <div className={(task.id==this.state.idComments)? 'active-task': ''} key={index}>
                            <Task id={task.id} getID={this.getId} delTask={this.delTask} task={task} comment={task.comments}/>
                        </div>
                    })}
                </div>
                <div className="comments">
                    <h2 className={this.state.textFlag}>Comments #{this.state.countComments}</h2>
                    {this.state.commentsArray.map((comments,index)=>{
                        return ((this.state.idComments==comments.id)?
                            <div className="comments-info" key={index}>
                                <Comments id={comments.id} comments={comments}/>
                            </div>: undefined)
                    })}
                    <div className="display-flex">
                       <div className={this.state.textFlag}><div className="box"></div></div>
                        <textarea className={this.state.textFlag} name="" id="" cols="30" rows="2" onKeyDown={this.addComment} placeholder="Добавить комментарий"></textarea>
                    </div>

                </div>
            </div>
        )
    }
}

export default List;