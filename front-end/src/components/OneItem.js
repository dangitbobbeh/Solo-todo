import React, { Component } from 'react';


function OneItem(props){
    console.log("OneItem props", props)
    if(props.rando.task){
    return <div>
      <p style={{fontSize: 30}}>You should: {`${props.rando.task}`}</p>
      <p style={{fontSize: 20}}>For {`${props.timer}`} more seconds</p>
            <button onClick={() => props.shuffle()}>give me a task</button>
            <button onClick={() => props.completeTask()}>task completed</button>
          </div>
    }else{
          return <div>
      <p style={{fontSize: 30}}>GET A TASK ALREADY!  </p>
            <button onClick={() => props.shuffle()}>give me a task</button>
            <button onClick={() => props.completeTask()}>task completed</button>
        </div>
    }
}

export default OneItem