import { Category } from "../../types/types";

import React from "react";
import styled from "styled-components";
import { size } from "../styled/variables";
interface CatEntryProp extends Category{
    selectionHandler: (id:number)=>void
}

const CatEntryCont = styled.li<{color: string}>`
    list-style: none;
  padding: ${size.space_s};
  color: ${(props) => props.color || "white"};
  border: 1px solid ${(props) => props.color || "white"};
  border-radius: ${size.space_s};
  margin: ${size.space_m} 0;
  max-width: 400px;
  display: flex;
  
`

function CategoryListEntry({id, name, color, selectionHandler}:CatEntryProp){
return (
    <CatEntryCont color={color}>
        <span>{name}</span>
        <button onClick={()=>selectionHandler(id)}>select</button>
    </CatEntryCont>)
}

export default CategoryListEntry;