import React, { Component } from 'react';
import logo from './logo.svg';
import './myApp.css';
import axios from 'axios'
//import styled from 'styled-components'
//import PropType from 'prop-types'
// import uuid from 'uuid';  // Not Used Anymore

// Importing React-Router
import { BrowserRouter as Router, Route } from 'react-router-dom';

// Importing Components
import Todos from './Todos';
import Header from './Header';
import AddTodo from './AddTodo';
import About from './About';

const Loading = (loading) => {
  console.log('Loading..', loading);

  return(<div > Loading ... </div>); 
}

class App extends Component {
  state = {
    todos: [],
    isLoading : false
  }

  componentDidMount() {
    axios.get('https://my-json-server.typicode.com/AchuthanKV/todo/todos?_limit=10')
        .then(res => {
            console.log("list res: ", res);
            this.setState({ todos: res.data })
        });
  }

  // Toggle Complete
  markComplete = (id) => {
      this.setState({
        todos: this.state.todos.map(todo => {
          if(todo.id === id)
            todo.completed = !todo.completed;
          return todo;
        })
      });
  }

  // Delete Todo
  delTodo = (id) => {
    this.setState({loading: true});
    axios.delete(`https://my-json-server.typicode.com/AchuthanKV/todo/todos/${id}`)
      .then(res => {
          this.setState({loading: false});
          console.log("delete res: ", res);
          this.setState({ todos: [...this.state.todos.filter(todo => todo.id !== id)]})
    });
  }

   // Edit Todo
   editTodo = (id, title) => {
    axios.post('https://my-json-server.typicode.com/AchuthanKV/todo/todos/${id}', {
        title: title,
        completed: false
      })
      .then(res => {
          console.log("editTodo res: ", res);
          this.setState({
              todos: [...this.state.todos.filter(todo => todo.id !== id), res.data]
          })
      });
    }

 addTodo = (title) => {
    /*
    const newTodo = {
      id: uuid.v4(),
      title: title,
      completed: false
    }
    this.setState({ todos: [...this.state.todos, newTodo]})
    */
    axios.post('https://my-json-server.typicode.com/AchuthanKV/todo/todos', {
      title: title,
      completed: false
    })
    .then(res => {
        console.log("addTodo res: ", res);
        this.setState({
            todos: [...this.state.todos, res.data]
        })
    });
  }
 
  render() {
    return (
      <Router>
        <div className="MyApp">
            <img src={logo} className="MyApp-logo" alt="logo" /> 
            {/* <div className="App-headerr"></div>    */}
          <div className="container">
            <Header />
            
            <Route exact path="/" render={props => (
              <React.Fragment>
                  <Loading isLoading={this.state.isLoading}/>  
                  <AddTodo addTodo={this.addTodo} />
                  <Todos todos={this.state.todos} markComplete={this.markComplete} delTodo={this.delTodo} editTodo={this.editTodo} />
              </React.Fragment>
            )} />

            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;