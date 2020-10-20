import React, { Fragment, useEffect, useReducer, useState } from "react";
import { Task } from "../types/types";
import { ActionUnion } from "../types/helpers";
import TaskList from "./TaskList";
import QuickAddTask from "./QuickAddTask";
import { apiService } from "../services/mockedApiService";

// concern: handle API connection and changes to task data

// TODO: write tests for TaskOverview

enum Actions {
  Add = "ADD_TASK",
  AddList = "ADD_TASK_LIST",
  Remove = "REMOVE_TASK",
  Toggle = "TOGGLE_DONE",
  Update = "UPDATE_TASK",
  Refresh = "REPLACE_TASK_LIST"
}

type TaskActionPayloads = {
  [Actions.Add]: Task;
  [Actions.AddList]: Task[];
  [Actions.Remove]: { id: number };
  [Actions.Toggle]: { id: number; done: boolean };
  [Actions.Update]: Task;
  [Actions.Refresh]: Task[];
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
    case Actions.Refresh:
      return action.payload
  }
}

function TaskOverview() {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, dispatch] = useReducer(taskReducer, []);

  function fetchTasks(){
    console.log("fetch")
    return apiService.get("task").then(res => {
        dispatch({
          type: Actions.Refresh,
          payload: res,
        });
      })
  }

  useEffect(() => {
    setIsLoading(true);
    fetchTasks().then(()=> setIsLoading(false));
    setInterval(fetchTasks,10*1000);
  }, []);

  function quickAddHandler(taskName: string){
    apiService.post("task", {
      name: taskName,
      done: false,
      createdAt:new Date()
    }).then(res => dispatch({type: Actions.Add, payload:res}));
  }

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
      <QuickAddTask addTaskHandler={quickAddHandler}/>
    </Fragment>
    //IDEA: display TaskList Skeleton while loading
  );
}

export default TaskOverview;
