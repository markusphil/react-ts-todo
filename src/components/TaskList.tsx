import React from "react";
import TaskEntry from "./TaskEntry";
import { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  updateTaskHandler: (id: number, value: boolean) => void;
}

function TaskList({ tasks, updateTaskHandler }: TaskListProps) {
  return (
    <div>
      {tasks.length > 0 && (
        <ul data-testid="tasklist">
          {tasks.map((task) => (
            <TaskEntry
              {...task}
              changeHandler={updateTaskHandler}
              key={task.id}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
