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
    this.setState({
      newTodo: {
        id: uuid.v4(),
        content: this.refs.content.value,
        isCompleted: false
      }}, function() {
        this.props.addTodo(this.state.newTodo);
      });
    e.preventDefault();
  }

  cancelNewTodo() {
    const newTodo = document.querySelector('.new-todo');
    newTodo.style.visibility = 'hidden';
  }

  showTodoInput() {
    const newTodo = document.querySelector('.new-todo');
    newTodo.style.visibility = 'visible';
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitTodo.bind(this)}>
          <Row className="new-todo">
            <Col className="todo-content" xs={10}>
                <input type="text" ref="content"></input>
            </Col>

            <Col className="cancel-todo" xs={1}>
              <button className="cancel-button" onClick={() => {this.cancelNewTodo()}}>
                <Glyphicon className="cancel-icon" glyph="remove" />
              </button>
            </Col>
          </Row>
        </form>

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
