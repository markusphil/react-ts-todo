import React from "react"
import styled from "styled-components";
import { color } from "../styled/variables";
import { SkeletonCheckBox, SkeletonText } from "./base";

export const TaskEntrySkeleton = styled.li`
  display: flex;
  background-color: rgba(55,55,55, 0.6);
  list-style: none;
  padding: 0.75rem;
  border: 1px solid ${color.gray_light};
  border-radius: 0.5rem;
  margin: 1rem 0;
  max-width: 400px;
  display: flex;   
`

export const TaskSkeleton = ({width}:{width?:string})=>(
    <TaskEntrySkeleton>
      <SkeletonCheckBox/>
      <SkeletonText width={width}/>
    </TaskEntrySkeleton>
);

export const TaskListSkeleton = () => (
  <ul>
    <TaskSkeleton width="40%"/>
    <TaskSkeleton width="25%"/>
    <TaskSkeleton width="60%"/>
  </ul>
)