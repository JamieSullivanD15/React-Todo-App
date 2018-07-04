import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Todos from './Components/Todos';
import AddTodo from './Components/AddTodo';
import { Grid, Row, Col } from 'react-bootstrap';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoList: [],
      date: this.formatDate(new Date())
    }

    this.getTasksPending = this.getTasksPending.bind(this);
  }

  // Get list of todos when the component is created before being rendered
  componentDidMount() {
    this.getTodos();
  }

  /*
    Function will set component state with todo items from local storage
    Pass the list of todos to determine which todos are pending and which are not
  */
  getTodos() {
    const todos = this.createLocalStorageTodos();

    this.setState({
      todoList: todos.map(todo => {
        return todo;
      })
    });

    this.getTasksPending(todos);
  }

  /*
    Determine how many tasks are pending by counting each task that is not completed
    Update text to reflect number of pending tasks
  */
  getTasksPending(todos) {
    let count = 0;

    todos.forEach((todo) => {
      if(!todo.isCompleted) {
        ++count;
      }
    });

    this.refs.tasksPendingCount.innerHTML = count;
    count === 1 ? this.refs.tasksPendingText.innerHTML = ' Task Pending' : this.refs.tasksPendingText.innerHTML = ' Tasks Pending';
  }

  /*
    Creates a new array of todos in local storage if one is not present
    Parses todos if an array is already present
  */
  createLocalStorageTodos() {
    let todos;

    if(localStorage.getItem('todos') === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem('todos'));
    }

    return todos;
  }

  /*
    Called whenever a new todo item is added to the list
    Retrieves todos from local storage and updates it with new todo
  */
  handleSaveTodo(todo) {
    const todos = this.createLocalStorageTodos();
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    this.getTodos();
  }

  /*
    Called whenever a todo item is deleted from  the list
    Retrieves todos from local storage and updates todo list
  */
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

  /*
    Called whenever a todo item is checked or unchecked
    Retrieves todos from local storage and updates todo list
  */
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

  /*
    Called when clear all button is clicked. Removes everything from local storage
    and retrieves todo list
  */
  handleClearAll() {
    localStorage.clear();
    this.getTodos();
  }

  /*
    Format date to display day name - date subscript - month
  */
  formatDate(date) {
    let day;
    let subscript;
    let month = date.toString().split(' ')[1];

    if(date.getDate() === 1 || date.getDate() === 31 || date.getDate() === 21) {
      subscript = 'st ';
    } else if(date.getDate() === 2 || date.getDate() === 22) {
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

    return day + ', ' + date.getDate() + subscript + ' ' + month;
  }

  render() {
    return (
      <div className="todo-app">
        <Grid className="interface">

          <Row className="header">
            <Col className="date" sm={6}>
              <span>
                {this.state.date}
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

App.propTypes = {
  todos: PropTypes.array,
  deleteTodo: PropTypes.func,
  updateTodo: PropTypes.func,
  addTodo: PropTypes.func,
  clearAll: PropTypes.func
}

export default App;
