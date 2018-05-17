import React, { Component } from 'react';
import TodoItem from './TodoItem';

class Todos extends Component {

  deleteTodo(todoItem) {
    this.props.deleteTodo(todoItem);
  }

  updateTodo(todoItem) {
    this.props.updateTodo(todoItem);
  }

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

// Todos.propTypes = {
//   // prop: PropTypes.type.isRequired
// }

export default Todos;
