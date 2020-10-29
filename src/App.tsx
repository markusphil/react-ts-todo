import React from "react";

import TaskOverview from "./components/TaskOverview";
import { Col, Row, Container } from "./styled/base";

function App() {
  return (
    <div className="App">
      <h1>TODO</h1>
      <Container>
        <Row>
          <Col width="25%"></Col> 
          <Col width="75%"><TaskOverview /></Col> 
        </Row>
      </Container>
      
    </div>
  );
}

export default App;
