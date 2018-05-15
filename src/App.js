import React, { Component } from 'react';
import Todos from './Components/Todos';
import { Grid, Row, Col } from 'react-bootstrap';
import uuid from 'uuid';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoList: []
    }
  }

  // Function will set state with todo items from local storage
  getTodos() {
    this.setState(
      {
        todoList: [
          {
            id: uuid.v4(),
            content: 'Test Todo Item 1'
          },
          {
            id: uuid.v4(),
            content: 'Test Todo Item 2'
          },
          {
            id: uuid.v4(),
            content: 'Test Todo Item 3'
          }
        ]
      }
    )
  }

  componentWillMount() {
    this.getTodos();
  }

  componentDidMount() {
    console.log(this.state.todoList);
  }

  render() {
    return (
      <div className="todo-app">
        <Grid className="interface">

          <Row className="header">
            <Col className="date" xs={6}>
              <h1>Tuesday, 15th</h1>
              <h2>May</h2>
            </Col>
            <Col className="num-of-tasks" xs={6}>
              <h2>6 Tasks</h2>
            </Col>
          </Row>

          <Row className="body">
            <Col xs={12}>
              <Todos todos={this.state.todoList} />
            </Col>
          </Row>

          <Row className="footer">
            <Col xs={12}>
              <button className="add-button">+</button>
            </Col>
          </Row>

        </Grid>
      </div>
    );
  }
}

// App.propTypes = {
//   // prop: PropTypes.type.isRequired
// }

export default App;
