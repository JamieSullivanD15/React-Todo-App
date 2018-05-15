import React, { Component } from 'react';
import TodoItem from './TodoItem';

class Todos extends Component {

  deleteTodo(id) {
    this.props.onDelete(id);
  }

  render() {
    let todoItems;

    if(this.props.todos) {
      todoItems = this.props.todos.map(todoItem => {
        return (
          <TodoItem todoItem={todoItem} onDelete={this.deleteTodo.bind(this)} key={todoItem.id} />
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
