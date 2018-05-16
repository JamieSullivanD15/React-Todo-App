import React, { Component } from 'react';
import Todos from './Components/Todos';
import AddTodo from './Components/AddTodo';
import { Grid, Row, Col } from 'react-bootstrap';
import uuid from 'uuid';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      todoList: [],
      date: this.formatDate(),
      month: new Date().toString().split(' ')[1]
    }
  }

  // Function will set state with todo items from local storage
  getTodos() {
    this.setState(
      {
        todoList: [
          {
            id: uuid.v4(),
            content: 'Test Todo Item 1',
            isCompleted: false
          },
          {
            id: uuid.v4(),
            content: 'Test Todo Item 2',
            isCompleted: false
          },
          {
            id: uuid.v4(),
            content: 'Test Todo Item 3',
            isCompleted: false
          }
        ]
      }
    )
  }

  formatDate() {
    const today = new Date();
    let date;
    let subscript;

    if(today.getDate() === 1 || today.getDate() === 31 || today.getDate() === 21) {
      subscript = 'st';
    } else if(today.getDate() === 2  || today.getDate() === 22) {
      subscript = 'nd';
    } else if(today.getDate() === 3 || today.getDate() === 23) {
      subscript = 'rd';
    } else {
      subscript = 'th';
    }

    switch (today.getDay()) {
      case 0:
        date = 'Sunday'
        break;
      case 1:
        date = 'Monday'
        break;
      case 2:
        date = 'Tuesday'
        break;
      case 3:
        date = 'Wednesday'
        break;
      case 4:
        date = 'Thursday'
        break;
      case 5:
        date = 'Friday'
        break;
      case 6:
        date = 'Saturday'
        break;
      default:
    }

    return date + ', ' + today.getDate() + subscript;
  }

  componentWillMount() {
    this.getTodos();
  }

  componentDidMount() {
    // console.log(this.state.todoList);
    // console.log(this.state.date);
  }

  handleSubmitTodo(todo) {
    let todos = this.state.todoList;
    todos.push(todo);
    this.setState({todoList: todos})
    console.log(todos);
  }

  render() {
    return (
      <div className="todo-app">
        <Grid className="interface">

          <Row className="header">
            <Col className="date" xs={6}>
              <h1>{this.state.date}</h1>
              <h2>{this.state.month}</h2>
            </Col>
            <Col className="num-of-tasks" xs={6}>
              <h2>6 Tasks Pending</h2>
            </Col>
          </Row>

          <Row className="body">
            <Col xs={12}>
              <Todos todos={this.state.todoList} />
            </Col>
          </Row>

          <AddTodo addTodo={this.handleSubmitTodo.bind(this)} />

        </Grid>
      </div>
    );
  }
}

// App.propTypes = {
//   // prop: PropTypes.type.isRequired
// }

export default App;
