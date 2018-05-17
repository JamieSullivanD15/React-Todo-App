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

  submitTodo(e) {
    if(this.refs.content.value === '') {
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

  cancelNewTodo() {
    const newTodo = document.querySelector('.new-todo');
    document.querySelector('.error-text').style.visibility = 'hidden';
    newTodo.style.visibility = 'hidden';
    newTodo.firstChild.firstChild.firstChild.value = '';
  }

  showTodoInput() {
    document.querySelector('.new-todo').style.visibility = 'visible';
  }

  clearAll() {
    this.props.clearAll();
  }

  render() {
    return (
      <div>
        <Row className="new-todo">
          <form onSubmit={this.submitTodo.bind(this)}>
            <Col className="todo-content" xs={9}>
              <input type="text" ref="content" />
            </Col>
          </form>

          <Col className="confirm-todo" xs={1}>
            <button className="confirm-button" onClick={this.submitTodo.bind(this)}>
              <Glyphicon className="confirm-icon" glyph="ok" />
            </button>
          </Col>

          <Col className="cancel-todo" xs={1}>
            <button className="cancel-button" onClick={this.cancelNewTodo}>
              <Glyphicon className="cancel-icon" glyph="remove" />
            </button>
          </Col>
        </Row>

        <Row className="error-text">
          Please enter a value.
        </Row>

        <Row className="footer">
          <Col xs={6}>
            <button className="clear-button" onClick={this.clearAll.bind(this)}>Clear All</button>
          </Col>
          <Col xs={6}>
            <button className="add-button" onClick={ this.showTodoInput}>+</button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddTodo;
