import React from "react";

import TaskOverview from "./components/tasks/TaskOverview";
import { Col, Row, Container } from "./components/styled/base";
import CategoryOverview from "./components/category/CategoryOverview";
import { TodoContext, todoDefaultContext } from "./context/TodoContext";

function App() {
  return (
    <div className="App">
      <TodoContext.Provider value={todoDefaultContext}>
        <h1>TODO</h1>
        <Container>
          <Row>
            <Col width="25%"><CategoryOverview/></Col> 
            <Col width="75%"><TaskOverview /></Col> 
          </Row>
        </Container>
      </TodoContext.Provider>
      
    </div>
  );
}

export default App;
