import React from "react";
import TaskEntry from "./TaskEntry";
import { Task } from "../types/types";
import useSearch from "../hooks/useSearch";

// Concern: Display, Search and Filter List of Tasks
interface TaskListProps {
  tasks: Task[];
  updateTaskHandler: (id: number, value: boolean) => void;
}

function TaskList({ tasks, updateTaskHandler }: TaskListProps) {
  const { filteredList, search, setSearch } = useSearch(tasks, [
    "name",
    "description",
  ]);

  return (
    <div>
      {tasks.length > 0 && (
        <div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}
      {filteredList.length > 0 ? (
        <ul data-testid="tasklist">
          {filteredList.map((task) => (
            <TaskEntry
              {...task}
              changeHandler={updateTaskHandler}
              key={task.id}
            />
          ))}
        </ul>
      ) : (
        <div>No Tasks Found!</div>
      )}
    </div>
  );
}

export default TaskList;
