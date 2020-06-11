import React, { Component } from 'react';
import logo from './logo.svg';
import './myApp.css';
import axios from 'axios'
import styled from 'styled-components'
//import PropType from 'prop-types'

// Importing Components
//import Todos from './Todos';
//import Header from './components/layout/Header';
//import AddTodo from './AddTodo';
//import About from './components/pages/About';

const Greet = () => {
    return <h3>Welcome to React </h3>
}

const Headline = () => {
    return <h2>Todo-List </h2>
}

const ToggleDivChkbox = styled.div`
  background-color: bisque;
  height: 25px;
  position: absolute;
  &.ifChecked {
    text-decoration: line-through;
    background-color: lightblue;
    height: 23px;
  }
`;

const MyChkbox = ({checked}, task, index) => {
  console.log('xx', checked, '--',index, '-', task);
  return (
    <ToggleDivChkbox className={checked ? 'ifChecked' : null} >
      <input type="checkbox" id={'checkbox' + index} name={'checkbox' + index} value={task} />               
      <span id={'span' + index} > {task} </span> 
      <button id={'btn' + index}  className="deleteico" > 
        <i className="fa fa-trash" aria-hidden="true"></i>
      </button> <br /> 
    </ToggleDivChkbox>)
}

class MyApp extends Component {
  constructor(prop) {
    super(prop)
    this.myObject = {
      names: []
    }

    /*
    function app(){
      const [checked, setChecked] = useState(false);
      this.myObject.checked = checked;
      this.myObject.setChecked = setChecked;
      console.log('this.myObject.checked : ', this.myObject.checked );
      console.log('this.myObject.setChecked : ', this.myObject.setChecked );
    }

    app(); */

    // creating state
    this.state = {
      users: [],
      tasks: [],
      existingTasks: [ 'Todo-List (React)',
        'Weather Finder (React)', 'Cooking recipe app (Flutter)',
        'Google map integration (React)', 'Person list app (Flutter)',
        'Kerala Tourist guide (Flutter)', 'Movie dashboard (React)'
      ],
      checked: false
      //setChecked: val => this.setState({checked: val})
    }
    console.log('MyApp constructor(prop): ', this)
  }

  componentDidMount() {
      // executes after mounting the Component
  }

  /*
  // executes before mounting the Component
  UNSAFE_componentWillMount() {
    this.getUsers();
  }

  
  getUsers() {
    axios('https://api.randomuser.me?nat=US&results=5')
    .then(response => {
      console.log('Response: ', response);
      this.myObject.names = ['Achu', 'Delvin', 'Jithin'];
      this.setState({users: response.data.results});
    })
  }
*/ 
  getTasks() {
    axios('https://api.randomuser.me?nat=US&results=5')
    .then(response => {
      console.log('Response: ', response);
      this.setState({tasks: response.data.results});
    })
  }
  
  render() {
    return (
      <div className="MyApp">
        <img src={logo} className="MyApp-logo" alt="logo" />
        
        <div className="App-headerr">
          {
            // this.state.users.map((user, index )=> {
            //   let {title, first, last} = user.name;
            //   console.log('|',title, ' ', first,  ' '  , last, '|');
            //     return <div id={index}> 
            //       {title} {first} {last} to React <hr />
            //     </div>
            //   }
            // )
          }
        </div>
        
        <div>
          <Greet />
          <Headline />
        </div>
        <div className="todoListMain">
          <div className="header">
            <form>
              <input type="text" placeholder="Enter task name" />
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
        <div className="divChkbxs" >
          {
            this.state.existingTasks.map((task, index )=> {
              console.log('|', task, '', index,'|');
              console.log(this.state.checked);
              //this.setState({checked: !this.state.checked})
              
              return ( //onClick={()=> this.setState({checked: !this.state.checked})}
                <div id={'div' + index} className="divChkbx" key={index}>
                  <MyChkbox checked={this.state.checked} task={task} index={index}>
                    <input type="checkbox" id={'checkbox' + index} name={'checkbox' + index} value={task} 
                     /> 
                    <span id={'span' + index} > {task} </span> 
                    <button id={'btn' + index}  className="deleteico" > 
                        <i className="fa fa-trash" aria-hidden="true"></i>
                    </button> <br /> 
                    {/* <AddTodo addTodo={this.addTodo} />
                    <Todos todos={this.state.todos} markComplete={this.markComplete}  
                  delTodo={this.delTodo}/>*/}
                 </MyChkbox>
                </div>)
              }
            )
          }
        </div>
        {/* <Router>
          <div className="App">
            <div className="container">
              <Header />
              <br />
              <Route exact path="/" render={props => (
                  <React.Fragment>
                  //  <AddTodo addTodo={this.addTodo} />
                  //  <Todos todos={this.state.todos} markComplete = {this.markComplete} delTodo={this.delTodo}/>
                  </React.Fragment>
              )} />
              <Route path="/about" component={About} />
            </div>
          </div>
        </Router> */}
      </div>
    );
  }
}

export default MyApp;
