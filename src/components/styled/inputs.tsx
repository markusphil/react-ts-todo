import styled from "styled-components";
import { Size } from "./variables";
import { getFontSize } from "../styled/variables";

function getCheckboxSize(size: Size): string {
    switch (size){
        case "xs" : return "1rem"
        case "s" : return "1rem"
        case "m" : return "1.2rem"
        case "l" : return "1.5rem"
        case "xl" : return "1.5rem"
    }
}

export const StyledCheckbox = styled.input.attrs<{water:string}>({ type: "checkbox" })`
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
`;

interface TextInputProps {
    color?: string,
    sizing: Size
}

export const StyledTextInput = styled.input<TextInputProps>`
    border: none;
    font-size: ${props => getFontSize(props.sizing)};
    color: ${props => props.color || "white" };
    background: transparent;
`;