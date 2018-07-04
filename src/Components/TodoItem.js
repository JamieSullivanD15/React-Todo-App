import React, { Component } from 'react';
import { Glyphicon, Row, Col } from 'react-bootstrap';

class TodoItem extends Component {

  // When each todo item has been created we check to see if it is completed or not before rendering
  componentDidMount() {
    this.checkIfPending(this.props.todoItem);
  }

  // Delete todo item that was selected. Pass it back through props delete function
  deleteTodoItem() {
    this.props.deleteTodoItem(this.props.todoItem);
  }

  /*
   Checks if the current todoItem is completed
   If it is then mark as checked and apply completed style
  */
  checkIfPending(todoItem) {
    const content = this.refs.todoContent;

    if(todoItem.isCompleted) {
      this.refs.todoCheckbox.checked = true;
      content.className = 'completed-todo';
    } else {
      content.className = 'pending-todo';
    }
  }

  /*
    If checkbox is clicked, then toggle todoItem isCompleted on or off
    Check if it is completed and add appropriate style
    Update todo list in local storage through props update function
  */
  toggleCheckbox() {
    this.props.todoItem.isCompleted = !this.props.todoItem.isCompleted;
    this.checkIfPending(this.props.todoItem);
    this.props.updateTodoItem(this.props.todoItem);
  }

  /*
    Each todoItem is rendered here. It includes a checkbox, todo content and a delete icon
  */
  render() {
    return (
      <div>
        <Row className="todo-item">
          <Col xs={10}>
            <label className="container">
              <span ref="todoContent">
                {this.props.todoItem.content}
              </span>
              <input type="checkbox" ref="todoCheckbox" onChange={() => this.toggleCheckbox(this)}></input>
              <span className="checkmark"></span>
            </label>
          </Col>
          <Col className="delete" xs={2}>
            <button className="delete-button" onClick={() => {this.deleteTodoItem(this)}} >
              <Glyphicon className="delete-icon" glyph="trash" />
            </button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default TodoItem;
