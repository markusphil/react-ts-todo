import React, { FormEvent, useState } from "react";

interface QuickAddProps{
    addTaskHandler:(val: string)=>void
}

function QuickAddTask({addTaskHandler}:QuickAddProps){
    const [taskName, setTaskName] = useState("");
    const handleSubmit=(event: FormEvent) => {
        event.preventDefault();
        if(taskName.length){
            addTaskHandler(taskName);
            setTaskName("");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="new-task-name">Add new task</label>
            <input id="new-task-name" type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
            <input type="submit" value="Add"/>
        </form>
    )
}

export default QuickAddTask