import React from "react";
import logo from "./logo.svg";
import "./App.css";

import TaskEntry from "./components/TaskEntry";
import { Task } from "./types";

const taskFixture: Task = {
  id: 1,
  name: "First Test",
  createdAt: new Date(),
  done: false,
};
function onChange(id: number, value: boolean): void {
  console.log(id, value);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <TaskEntry {...taskFixture} changeHandler={onChange} />
    </div>
  );
}

export default App;
