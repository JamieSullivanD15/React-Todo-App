import React, { Component } from 'react';
import { Glyphicon, Row, Col } from 'react-bootstrap';

class TodoItem extends Component {

  componentDidMount() {
    this.checkIfPending(this.props.todoItem);
  }

  deleteTodoItem() {
    this.props.deleteTodoItem(this.props.todoItem);
  }

  checkIfPending(todoItem) {
    const content = this.refs.todoContent;

    if(todoItem.isCompleted) {
      this.refs.todoCheckbox.checked = true;
      content.className = 'completed-todo';
    } else {
      content.className = 'pending-todo';
    }
  }

  toggleCheckbox() {
    this.props.todoItem.isCompleted = !this.props.todoItem.isCompleted;

    this.checkIfPending(this.props.todoItem);
    this.props.updateTodoItem(this.props.todoItem);
  }

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

// TodoItem.propTypes = {
//   // prop: PropTypes.type.isRequired
// }

export default TodoItem;
