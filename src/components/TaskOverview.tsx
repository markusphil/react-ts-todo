import React, { Fragment, useEffect, useReducer, useState } from "react";
import { doneTask, undoneTask } from "../taskFixtures";
import { Task } from "../types/types";
import { ActionUnion } from "../types/helpers";
import TaskList from "./TaskList";

// concern: handle API connection and changes to task data

// TODO: write tests for TaskOverview

enum Actions {
  Add = "ADD_TASK",
  AddList = "ADD_TASK_LIST",
  Remove = "REMOVE_TASK",
  Toggle = "TOGGLE_DONE",
  Update = "UPDATE_TASK",
}

type TaskActionPayloads = {
  [Actions.Add]: Task;
  [Actions.AddList]: Task[];
  [Actions.Remove]: { id: number };
  [Actions.Toggle]: { id: number; done: boolean };
  [Actions.Update]: Task;
};

type TaskActions = ActionUnion<TaskActionPayloads>;

function taskReducer(state: Task[], action: TaskActions): Task[] {
  switch (action.type) {
    case Actions.Add:
      return [...state, action.payload];
    case Actions.AddList:
      return [...state, ...action.payload];
    case Actions.Remove:
      return state.filter((t) => t.id !== action.payload.id);
    case Actions.Toggle:
      return state.map((task) =>
        task.id === action.payload.id
          ? { ...task, done: action.payload.done }
          : task
      );
    case Actions.Update:
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
  }
}

function TaskOverview() {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, dispatch] = useReducer(taskReducer, []);

  // TODO: request Data from API
  // IDEA: build a customHook, that triggers calls to the API in a given interval.
  // first mock: set fixture task, with empty dep array (behaves like componentDidMount)
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      dispatch({
        type: Actions.AddList,
        payload: [doneTask, undoneTask],
      });
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Fragment>
      {isLoading ? (
        <div>...loading</div>
      ) : (
        <TaskList
          tasks={tasks}
          updateTaskHandler={(id, val) =>
            dispatch({ type: Actions.Toggle, payload: { id: id, done: val } })
          }
        />
      )}
    </Fragment>
    //IDEA: display TaskList Skeleton while loading
  );
}

export default TaskOverview;
