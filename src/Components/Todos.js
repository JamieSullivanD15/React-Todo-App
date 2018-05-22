import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

class Todos extends Component {

  // Pass todo item to be deleted into function that was passed by App.js props
  deleteTodo(todoItem) {
    this.props.deleteTodo(todoItem);
  }

  // Pass todo item to be updated into function that was passed by App.js props
  updateTodo(todoItem) {
    this.props.updateTodo(todoItem);
  }

  /*
    Create a todoItems variable and map every todo item that is passed through App.js props
    These todos are created by retrieving them from local storage in App.js
    Each todo item found in local storage todos is passed through to the
    todoItem component to be rendered there along with a delete and update function.
    After each item has been mapped to the variable, it then displays a list of all the rendered todoItems
  */
  render() {
    let todoItems;

    if(this.props.todos) {
      todoItems = this.props.todos.map(todoItem => {
        return (
          <TodoItem todoItem={todoItem} deleteTodoItem={this.deleteTodo.bind(this)} key={todoItem.id} updateTodoItem={this.updateTodo.bind(this)} />
        );
      });
    }

    return (
      <div>
        {todoItems}
      </div>
    );
  }
}

Todos.propTypes = {
  todos: PropTypes.array,
  todoItem: PropTypes.object,
  deleteTodoItem: PropTypes.func,
  updateTodoItem: PropTypes.func
}

export default Todos;
