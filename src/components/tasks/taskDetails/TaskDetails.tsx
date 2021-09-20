import React from "react";
import { Task } from "../../../types/types";

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
}

function TaskDetails ({task}:TaskDetailsProps){
    return (
        <div>
            <h1>{task.name}</h1>
            <p>{task.description}</p>
            
        </div>
    )
}

export default TaskDetails