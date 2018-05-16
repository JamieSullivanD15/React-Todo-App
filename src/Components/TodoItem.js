import React, { Component } from 'react';
import { Glyphicon, Row, Col } from 'react-bootstrap';

class TodoItem extends Component {

  deleteTodo(id) {
    this.props.onDelete(id);
  }

  toggleCheckbox(element) {
    element.props.todoItem.isCompleted = !element.props.todoItem.isCompleted;
  }

  render() {
    return (
      <div>
        <Row className="todo-item">
          <Col className="todo-content" xs={10}>
            <label className="container">
              {this.props.todoItem.content}
              <input type="checkbox" onChange={() => this.toggleCheckbox(this)}></input>
              <span className="checkmark"></span>
            </label>
          </Col>
          <Col className="delete" xs={2}>
            <button className="delete-button">
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
