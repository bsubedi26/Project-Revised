import React from 'react';
import ReactDOM from 'react-dom';

class User {
    
    constructor(title, todo, height) {
        this.title = title;
        this.todo = todo;
        this.height = height;
    }
  
    removeTodo(todo) {
    // Increase "this" date by n days
    if (this.todo = todo) {
        console.log(this)
    }
  }

  getDay() {
    return this._day;
  }

}




export default class Input extends React.Component{

constructor() {
    super()

    this.state = {
        arr: []
    }

}



  getInput(event) {
     event.preventDefault()
     var obj = {}
     obj[event.target.id] = event.target.value

    this.setState(obj)
    console.log(this.state)
     const {title, todo, height} = this.state;
    //  var instance =  new User(title, todo, height)

  }

  createInstance(e) {
    e.preventDefault()
    const {title, todo, height} = this.state;
    //  this.state.arr.push(instance)
    
    // console.log(title)
     var instance =  new User(title, todo, height)
     console.log(instance)
    //  this.state.arr.push(instance)


      }



  render() {
     
     function selectTodo(arr) {
       return arr.map((todo,i) => {

          return (
            <div className="card col-md-6">
                <div className="card-block well">
                    <h2>{todo.title}</h2>

          
              </div>
        </div>
      )
    })
   }
   
     return (

     <div>
        <input placeholder="Quick Search" type="text" onChange={this.getInput.bind(this)} className="form-control" id="title" />
        <input placeholder="Quick Search" type="text" onChange={this.getInput.bind(this)} className="form-control" id="todo" />
        <input placeholder="Quick Search" type="text" onChange={this.getInput.bind(this)} className="form-control" id="height" />

        <button onClick={this.createInstance.bind(this)} className="btn button-well">+</button>
        
        <div className="container"> 
        {selectTodo(this.state.arr)}
        </div>
        

        

    </div>

    )
  }


}

// var inst = new user(2000,4000)

// inst.sayName(0)
