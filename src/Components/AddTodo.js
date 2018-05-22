import React, { Component } from 'react';
import uuid from 'uuid';
import { Glyphicon, Row, Col } from 'react-bootstrap';

class AddTodo extends Component {

  constructor() {
    super();
    this.state = {
      newTodo: {}
    }

    this.submitTodo = this.submitTodo.bind(this);
    this.cancelNewTodo = this.cancelNewTodo.bind(this);
  }

  /*
    When form is submitted, check if there is input then submit a new todoItem
    Upadate state and then pass new object through callback props function addTodo
    Remove input after submit by calling cancelNewTodo
  */
  submitTodo(e) {
    if (this.refs.content.value === '') {
      document.querySelector('.error-text').style.visibility = 'visible';
    } else {
      this.setState({
        newTodo: {
          id: uuid.v4(),
          content: this.refs.content.value,
          isCompleted: false
        }}, function() {
          this.props.addTodo(this.state.newTodo);
        });
      this.cancelNewTodo();
    }
    e.preventDefault();
  }

  // Cancel, remove input, its value and error text
  cancelNewTodo() {
    const newTodo = document.querySelector('.new-todo');
    document.querySelector('.error-text').style.visibility = 'hidden';
    newTodo.style.visibility = 'hidden';
    newTodo.firstChild.firstChild.firstChild.value = '';
  }

  // Show new todo input field
  showTodoInput() {
    document.querySelector('.new-todo').style.visibility = 'visible';
  }

  // Prompt confirmation to clear all tasks. Call props clearAll function on confirm
  clearAll() {
    if (window.confirm('Delete all tasks?')) {
      this.props.clearAll();
    }
  }

  /*
    This compnonent consists of the new todo input, error text, submit and cancel buttons
    It also contains the footer which holds the add and clear all buttons
  */
  render() {
    return (
      <div>
        <Row className="new-todo">
          <form onSubmit={this.submitTodo.bind(this)}>
            <Col className="todo-content" xs={8} md={10}>
              <input type="text" ref="content" />
            </Col>
          </form>

          <Col className="cancel-todo" xs={1} md={1}>
            <button className="cancel-button" onClick={this.cancelNewTodo}>
              <Glyphicon className="cancel-icon" glyph="remove" />
            </button>
          </Col>

          <Col className="confirm-todo" xs={1} md={1}>
            <button className="confirm-button" onClick={this.submitTodo.bind(this)}>
              <Glyphicon className="confirm-icon" glyph="ok" />
            </button>
          </Col>
        </Row>

        <Row className="error-text">
          Please enter a value.
        </Row>

        <Row className="footer">
          <Col xs={6}>
            <span >
              <button className="add-button" onClick={ this.showTodoInput}>+</button>
            </span>
          </Col>
          <Col xs={6}>
            <button className="clear-button" onClick={this.clearAll.bind(this)}>Clear All</button>
          </Col>
        </Row>

      </div>
    );
  }
}

export default AddTodo;
