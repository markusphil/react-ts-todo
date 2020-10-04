import React, { Fragment, useEffect, useState } from "react";
import { doneTask, undoneTask } from "../taskFixtures";
import { Task } from "../types";
import TaskList from "./TaskList";

// concern handle API connection and changes to task data

//function taskReducer()
// TODO: refactor to useReducer (addList, add, remove, updateTask, toggleTaskDone)

function TaskOverview() {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  function toggleTaskDone(id: number, value: boolean) {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, done: value } : task))
    );
  }

  // TODO: request Data from API
  // IDEA: build a customHook, that triggers calls to the API in a given interval.
  // first mock: set fixture task, with empty dep array (behaves like componentDidMount)
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setTasks([doneTask, undoneTask]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Fragment>
      <h1>TODO</h1>
      {isLoading ? (
        <div>...loading</div>
      ) : (
        <TaskList tasks={tasks} updateTaskHandler={toggleTaskDone} />
      )}
    </Fragment>
    //IDEA: display TaskList Skeleton while loading
  );
}

export default TaskOverview;
