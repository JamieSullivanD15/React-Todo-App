import React, { Component } from 'react';
import uuid from 'uuid';
import { Glyphicon, Row, Col } from 'react-bootstrap';

class AddTodo extends Component {

  constructor() {
    super();
    this.state = {
      newTodo: {}
    }
  }

  submitTodo(e) {
    if(this.refs.content.value === '') {
      const errorText = document.querySelector('.error-text');
      errorText.style.visibility = 'visible';
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
    const errorText = document.querySelector('.error-text');
    errorText.style.visibility = 'hidden';
    newTodo.style.visibility = 'hidden';
    newTodo.firstChild.firstChild.firstChild.value = '';
  }

  showTodoInput() {
    const newTodo = document.querySelector('.new-todo');
    newTodo.style.visibility = 'visible';
  }

  render() {
    return (
      <div>
        <Row className="new-todo">
          <form onSubmit={this.submitTodo.bind(this)}>
            <Col className="todo-content" xs={9}>
                <input type="text" ref="content"></input>
            </Col>
          </form>

          <Col className="confirm-todo" xs={1}>
            <button className="confirm-button" onClick={this.submitTodo.bind(this)}>
              <Glyphicon className="confirm-icon" glyph="ok" />
            </button>
          </Col>

          <Col className="cancel-todo" xs={1}>
            <button className="cancel-button" onClick={() => {this.cancelNewTodo()}}>
              <Glyphicon className="cancel-icon" glyph="remove" />
            </button>
          </Col>
        </Row>

        <Row className="error-text">
          Please enter a value.
        </Row>

        <Row className="add-todo">
          <Col xs={12}>
            <button className="add-button" onClick={ this.showTodoInput}>+</button>
          </Col>
        </Row>
      </div>
    );
  }
}

export default AddTodo;
