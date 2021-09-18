import React, { useMemo } from "react";
import TaskEntry from "./TaskEntry";
import { Task } from "../../types/types";
import useSearch from "../../hooks/useSearch";
import { useFilterContext } from "../../context/FilterContext";

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

  const {activeFilters} = useFilterContext();

  const renderedList = useMemo(
    ()=> activeFilters.categoryIds.length ? filteredList.filter(t => t.category && activeFilters.categoryIds.includes(t.category.id)) : filteredList,
    [activeFilters, filteredList ]
  )

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
      {renderedList.length > 0 ? (
        <ul data-testid="tasklist">
          {renderedList.map((task) => (
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
