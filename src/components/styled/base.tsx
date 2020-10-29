import styled from "styled-components";
import { size } from "./variables";

type FlexJustify = "center"| "space-between" | "space-around" | "flex-start" | "flex-end"
type FlexAlign = "center" | "flex-start" | "flex-end"
type ColSizes = "20%" | "25%" | "30%" | "40%" | "50%" | "60%" | "70%" | "75%" | "80%"

export const Container = styled.div`
    max-width: ${size.grid_width};
    margin: auto;
`
export const Row = styled.div<{justify?:FlexJustify, align?: FlexAlign }>`
    display: flex;
    flex-wrap: wrap;
    ${props => props.justify && `justify-content: ${props.justify};`}
    ${props => props.align && `align-items: ${props.align};`}
`
export const Col = styled.div<{width?:ColSizes}>`
    padding: ${size.space_s};
    flex: 1 1 calc(${props => props.width || "100%"} - 2 * ${size.space_s}) ;
`
