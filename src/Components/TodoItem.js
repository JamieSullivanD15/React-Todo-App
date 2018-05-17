import React, { Component } from 'react';
import { Glyphicon, Row, Col } from 'react-bootstrap';

class TodoItem extends Component {

  componentDidMount() {
    if(this.props.todoItem.isCompleted) {
      this.refs.todoCheckbox.checked = true;
    }
  }

  deleteTodoItem() {
    this.props.deleteTodoItem(this.props.todoItem);
  }

  toggleCheckbox(element) {
    element.props.todoItem.isCompleted = !element.props.todoItem.isCompleted;
    this.props.updateTodoItem(this.props.todoItem);
  }

  render() {
    return (
      <div>
        <Row className="todo-item">
          <Col className="todo-content" xs={10}>
            <label className="container">
              {this.props.todoItem.content}
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
