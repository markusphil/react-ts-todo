import React from "react";

import TaskOverview from "./components/tasks/TaskOverview";
import { Col, Row, Container } from "./components/styled/base";
import CategoryOverview from "./components/category/CategoryOverview";
import { FilterContextProvider } from "./context/FilterContext";
import { CategoryContextProvider } from "./context/CategoryContext";


function App() {
  return (
    <div className="App">
      <CategoryContextProvider>
      <FilterContextProvider> 
        <h1>TODO</h1>
        <Container>
          <Row>
            <Col width="25%"><CategoryOverview /></Col>
            <Col width="75%"><TaskOverview /></Col>
          </Row>
        </Container>
      </FilterContextProvider>
      </CategoryContextProvider>
    </div>
  );
}

export default App;
