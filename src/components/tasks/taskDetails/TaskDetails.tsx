import React from "react";
import { ValueUnion } from "../../../types/helpers";
import { Task } from "../../../types/types";
import { partialUpdate } from "../../../utils/partialUpdates";
import TaskHeadline from "./TaskHeadline";

/*
IDEA:
- task is done -> strikethrough headline
- button to set done
- textarea to change description
- category selection with button to add new category
- styled coponents for each element


--> Make UI conecpt first!
*/


interface TaskDetailsProps {
    task: Task
    updateTaskHandler: (task:Task) => void
}

function TaskDetails ({task, updateTaskHandler}:TaskDetailsProps){

    function partialTaskUpdate(key: keyof Task, value: ValueUnion<Task>){
        updateTaskHandler(partialUpdate(task, key, value))
    }

    return (
        <div>
            <TaskHeadline {...task}
                updateTitleHandler={title => partialTaskUpdate("name", title)}
                updateStateHandler={isDone => partialTaskUpdate("done", isDone)}/>
            <p>{task.description}</p>
            
        </div>
    )
}

export default TaskDetails