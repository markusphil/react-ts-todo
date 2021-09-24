import { title } from "process";
import React from "react"
import { Category } from "../../../types/types";
import { StyledCheckbox, StyledTextInput } from "../../styled/inputs";

interface TaskHeadlineProps {
    id: number,
    name: string,
    done: boolean,
    category?: Category,
    updateTitleHandler: (title: string) => void
    updateStateHandler: (isDone: boolean) => void
}

function TaskHeadline({id, name, done, category, updateTitleHandler, updateStateHandler}:TaskHeadlineProps){
    return (
        <div>
            <StyledCheckbox
                id="selected-task"
                checked={done}
                onChange={(e) => updateStateHandler(e.target.checked)}
                color={category?.color}
            />
            <label htmlFor="selected-task">{name}</label>
            <StyledTextInput color={category?.color} sizing="l" value={name} onChange={(e) => updateTitleHandler(title) }></StyledTextInput>
        </div>
    )
}

export default TaskHeadline