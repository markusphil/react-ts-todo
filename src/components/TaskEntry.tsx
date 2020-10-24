import React from "react";
import { Task } from "../types/types";
import styled from "styled-components";

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

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
    position: relative;
    width: 1.2rem;
    height: 1.2rem;
    border: 1px solid ${props => props.color || "white"};
    border-radius: .25rem;
    appearance: none;
    outline: 0;
    cursor: pointer;
    margin-right: 1rem;
    transition: background 175ms cubic-bezier(0.1, 0.1, 0.25, 1);
    &::before {
      position: absolute;
      content: "";
      display: block;
      left: 0.375em;
      width: 0.5em;
      height: 1em;
      border-style: solid;
      border-color: black;
      border-width: 0 2px 2px 0;
      transform: rotate(65deg);
      opacity: 0;
      transition: opacity .3s ease, transform .5s ease;
    }
    &::after {
      content: "";
      width: 100%;
      height: 100%;
      display:block;
      position: absolute;
      z-index: -1;
      background: ${(props) => props.color || "white"};
      opacity:0;
      transition: opacity .3s ease, transform .5s ease;
      transform-origin: center;
      transform: scale(1.5);
      border-radius: .25rem;
    }
    &:checked {
      color: black;
      background: ${(props) => props.color || "white"};
      &::before {
        opacity: 1;
        transform: rotate(45deg)
      }
      &::after {
        opacity: 1;
        transform: scale(1);
      }
      & + label {
        text-decoration: line-through;
        opacity: 0.7;
      }
    }
    &:hover{
      &::after{
        opacity: 0.5;
        transform: scale(1.1);
      }
      & + label {
        opacity: 0.8;
      }
    }
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
