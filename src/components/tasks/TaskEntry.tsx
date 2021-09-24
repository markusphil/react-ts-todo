import React from "react";
import { Task } from "../../types/types";
import styled from "styled-components";
import { StyledCheckbox } from "../styled/inputs";

interface TaskEntryProps extends Task {
  changeHandler: (id: number, value: boolean) => void;
}

const TaskContainer = styled.li`
  list-style: none;
  padding: 0.75rem;
  border: 1px solid ${(props) => props.color || "white"};
  border-radius: 0.5rem;
  margin: 1rem 0;
  max-width: 400px;
  display: flex;

  label {
    cursor: pointer;
  }
`;


function TaskEntry({
  id,
  name,
  done,
  category,
  changeHandler
}: TaskEntryProps) {
  return (
    <TaskContainer color={category?.color}>
      <StyledCheckbox
        id={"task-" + id}
        checked={done}
        onChange={(e) => changeHandler(id, e.target.checked)}
        color={category?.color}
      ></StyledCheckbox>
      <label htmlFor={"task-" + id}>{name}</label>
    </TaskContainer>
  );
}

export default TaskEntry;
