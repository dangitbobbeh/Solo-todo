import React, { Component } from 'react';

function innerClick(props){
    const item = document.getElementById('task').value
    if(item){
        console.log(item)
        props.addItem({"task": item, "completed":false })
    }
}


function AddItemForm(props){
    // console.log("props", props)
    return <div>
        <label>Add a task:</label>
            <input type="text" id="task">
            </input>
            <button onClick={() => innerClick(props)}>add</button>
          </div>
}

export default AddItemForm
