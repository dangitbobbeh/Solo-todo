import React, { Component } from 'react';
import AddItemForm from './AddItemForm'
import OneItem from './OneItem'

class Listcontainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
        items :[],
        rando: {},
        timer: 0,
    }
    this.addItem = this.addItem.bind(this)
    this.shuffle = this.shuffle.bind(this)
    this.getData = this.getData.bind(this)
    this.completeTask = this.completeTask.bind(this)
}

componentDidMount(){
    fetch("/list")
    .then((res) => res.json())
    .then((data) => this.setState({...this.state, items: data}))
    .catch(err => console.log(err));

      setInterval(
      () => this.tick(),
      1000
    );
}

getData(){
  console.log("getting data")
    fetch("/list")
    .then((res) => res.json())
    .then((data) => this.setState({...this.state, items: data}))
    .catch(err => console.log(err))
}

shuffle(){
  let myArray = this.state.items
  let timer = 10
  let rando = myArray[Math.floor(Math.random()*myArray.length)]
  // console.log("rando", rando)
  if(rando.completed === false){this.setState({...this.state, rando, timer})}
  else{while(rando.completed===true){rando = myArray[Math.floor(Math.random()*myArray.length)]}}
}

completeTask(){
  let rando = this.state.rando
  rando.completed = true;
  //fetch put request
      fetch('http://localhost:3000/list', {
      method: 'PUT', 
      headers: {
     'Content-Type': 'application/json',
      },
      body: JSON.stringify(rando),
      })
// .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        })
    .catch((error) => {
        console.error('Error:', error);
        });


  this.setState({...this.state, rando})
  console.log("post-completion state", this.state)
  this.shuffle();
  console.log("post-completion, post shuffle state", this.state)
}
tick() {
  let timer = this.state.timer;
  timer--;
  if(timer<0){timer=10}
  else if(timer===0){timer=10; this.shuffle()}
    this.setState({timer});
  }


addItem(e) {
    this.setState((prevState) => {
      return { 
        items: prevState.items.push(e) 
        };
    });

    fetch('http://localhost:3000/list', {
      method: 'POST', 
      headers: {
     'Content-Type': 'application/json',
      },
      body: JSON.stringify(e),
      })
// .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        })
    .catch((error) => {
        console.error('Error:', error);
        });
   
    console.log("state", this.state);
    console.log("new item", e)
  
  }
    
   //this.setState({...this.state, items: data})
render(){
    console.log("state", this.state)
    return (
        <div className="Items">
        <OneItem className='OneItem' 
        rando={this.state.rando} 
        shuffle={this.shuffle}
        completeTask={this.completeTask}
        timer={this.state.timer}/>
        <br></br>
        <AddItemForm entries={this.state.items} addItem={this.addItem}/>
        </div>
    )
}
}

export default Listcontainer