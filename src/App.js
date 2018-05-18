import React, { Component } from 'react';
import Todos from './Components/Todos';
import AddTodo from './Components/AddTodo';
import { Grid, Row, Col } from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoList: [],
      day: this.formatDate(new Date()),
      month: new Date().toString().split(' ')[1]
    }

    this.getTasksPending = this.getTasksPending.bind(this);
  }

  componentDidMount() {
    this.getTodos();
  }

  // Function will set state with todo items from local storage
  getTodos(checkbox) {
    const todos = this.createLocalStorageTodos();

    this.setState({
      todoList: todos.map(todo => {
        return todo;
      })
    });

    this.getTasksPending(todos);
  }

  getTasksPending(todos) {
    let count = 0;

    todos.forEach((todo) => {
      if(!todo.isCompleted) {
        ++count;
      }
    });

    this.refs.tasksPendingCount.innerHTML = count;
    this.refs.tasksPendingCount.innerHTML === 1 ? this.refs.tasksPendingText.innerHTML = ' Task Pending' :
    this.refs.tasksPendingText.innerHTML = ' Tasks Pending';
  }

  createLocalStorageTodos() {
    let todos;

    if(localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
  }

  handleSaveTodo(todo) {
    const todos = this.createLocalStorageTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    this.getTodos();
  }

  handleDeleteTodo(todoItem) {
    const todos = this.createLocalStorageTodos();

    todos.forEach((todo, index) => {
      if(todoItem.id === todo.id) {
        todos.splice(index, 1);
      }
    });

    localStorage.setItem('todos', JSON.stringify(todos));
    this.getTodos();
  }

  handleUpdateTodo(todoItem) {
    const todos = this.createLocalStorageTodos();

    todos.forEach((todo, index) => {
      if(todoItem.id === todo.id) {
        todos[index] = todoItem;
      }
    });

    localStorage.setItem('todos', JSON.stringify(todos));
    this.getTodos();
  }

  handleClearAll() {
    localStorage.clear();
    this.getTodos();
  }

  formatDate(date) {
    let day;
    let subscript;

    if(date.getDate() === 1 || date.getDate() === 31 || date.getDate() === 21) {
      subscript = 'st ';
    } else if(date.getDate() === 2  || date.getDate() === 22) {
      subscript = 'nd ';
    } else if(date.getDate() === 3 || date.getDate() === 23) {
      subscript = 'rd ';
    } else {
      subscript = 'th ';
    }

    switch (date.getDay()) {
      case 0:
        day = 'Sunday'
        break;
      case 1:
        day = 'Monday'
        break;
      case 2:
        day = 'Tuesday'
        break;
      case 3:
        day = 'Wednesday'
        break;
      case 4:
        day = 'Thursday'
        break;
      case 5:
        day = 'Friday'
        break;
      case 6:
        day = 'Saturday'
        break;
      default:
    }

    return day + ', ' + date.getDate() + subscript;
  }

  render() {
    return (
      <div className="todo-app">
        <Grid className="interface">

          <Row className="header">
            <Col className="date" sm={6}>
              <span>
                {this.state.day}
                {this.state.month}
              </span>
            </Col>
            <Col className="num-of-tasks" sm={6}>
              <span ref="tasksPendingCount"></span>
              <span ref="tasksPendingText"></span>
            </Col>
          </Row>

          <Row className="body">
            <Col xs={12}>
              <Todos todos={this.state.todoList} deleteTodo={this.handleDeleteTodo.bind(this)} updateTodo={this.handleUpdateTodo.bind(this)} />
            </Col>
          </Row>

          <AddTodo addTodo={this.handleSaveTodo.bind(this)} clearAll={this.handleClearAll.bind(this)} />

        </Grid>
      </div>
    );
  }
}

// App.propTypes = {
//   // prop: PropTypes.type.isRequired
// }

export default App;
