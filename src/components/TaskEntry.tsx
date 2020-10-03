import React from "react";
import { Task } from "../types";

interface TaskEntryProps extends Task {
  changeHandler: (id: number, value: boolean) => void;
}

function TaskEntry({ id, name, done, changeHandler }: TaskEntryProps) {
  return (
    <li>
      <input
        type="checkBox"
        id={"task-" + id}
        checked={done}
        onChange={(e) => changeHandler(id, e.target.checked)}
      ></input>
      <label htmlFor={"task-" + id}>{name}</label>
    </li>
  );
}

export default TaskEntry;
