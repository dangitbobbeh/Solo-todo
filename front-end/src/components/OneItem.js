import React, { Component } from 'react';


function OneItem(props){
    console.log("OneItem props", props)
    if(props.rando.task){
    return <div>
      <p>You should: {`${props.rando.task}`}</p>
            <button onClick={() => props.shuffle()}>give me a task</button>
          </div>
    }else{
          return <div>
      <p>Hit shuffle</p>
            <button onClick={() => props.shuffle()}>give me a task</button>
            <button onClick={() => props.completeTask()}>task completed</button>
        </div>
    }
}

export default OneItem