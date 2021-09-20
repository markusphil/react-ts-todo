import React, { Fragment, useEffect, useReducer, useState } from "react";
import { Task } from "../../types/types";
import { ActionUnion } from "../../types/helpers";
import TaskList from "./TaskList";
import QuickAddTask from "./QuickAddTask";
import { apiService } from "../../services/mockedApiService";
import { TaskListSkeleton, TaskSkeleton } from "../skeletons/TaskSkeleton";
import useCounter from "../../hooks/useCounter";
import { useCategoryContext } from "../../context/CategoryContext";

// TODO: add Detail view
// TODO: Filter bar entkoppeln?

// concern: handle API connection and changes to task data
 
type TaskActionPayloads = {
  "ADD_TASK": Task;
  "ADD_TASK_LIST": Task[];
  "REMOVE_TASK": { id: number };
  "TOGGLE_DONE": { id: number; done: boolean };
  "UPDATE_TASK": Task;
  "REPLACE_TASK_LIST": Task[];
};

type TaskActions = ActionUnion<TaskActionPayloads>;

function taskReducer(state: Task[], action: TaskActions): Task[] {
  switch (action.type) {
    case "ADD_TASK":
      return [...state, action.payload];
    case "ADD_TASK_LIST":
      return [...state, ...action.payload];
    case "REMOVE_TASK":
      return state.filter((t) => t.id !== action.payload.id);
    case "TOGGLE_DONE":
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, done: action.payload.done }
          : task
      );
    case "UPDATE_TASK":
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
    case "REPLACE_TASK_LIST":
      return action.payload
  }
}

function TaskOverview() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTasksCount, increment, decrement] = useCounter();
  const [tasks, dispatch] = useReducer(taskReducer, []);
  const {defaultCategory} = useCategoryContext()

  function fetchTasks() {
    console.log("fetch tasks")
    return apiService.get("task").then(res => {
      dispatch({
        type: "REPLACE_TASK_LIST",
        payload: res,
      });
    })
  }

  useEffect(() => {
    setIsLoading(true);
    fetchTasks().then(() => setIsLoading(false));
    setInterval(fetchTasks, 10 * 1000);
  }, []);

  function quickAddHandler(taskName: string) {
    increment();
    apiService.post("task", {
      name: taskName,
      done: false,
      createdAt: new Date(),
      category: defaultCategory
    }).then(res => {
      dispatch({ type: "ADD_TASK", payload: res })
      decrement();
    });
  }

  return (
    <Fragment>
      <h2>Tasks</h2>
      {isLoading ? (
        <TaskListSkeleton />
      ) : (
        <TaskList
          tasks={tasks}
          updateTaskHandler={(id, val) =>
            dispatch({ type: "TOGGLE_DONE", payload: { id: id, done: val } })
          }
        />
      )}
      {loadingTasksCount > 0 && (
        <ul>
          {Array(loadingTasksCount).fill(0).map((_, k) => <TaskSkeleton key={k} />)}
        </ul>)}
      <QuickAddTask addTaskHandler={quickAddHandler} />
    </Fragment>
  );
}

export default TaskOverview;