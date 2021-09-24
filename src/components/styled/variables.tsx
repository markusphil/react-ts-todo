export const color = {
    gray: "gray",
    gray_light: "lightgray",
    gray_dark:"darkgray",
    white: "white",
    black: "black"
}


const space: SizeMap = {
    xs: "0.25rem",
    s: "0.5rem",
    m: "1rem",
    l: "1.5rem",
    xl: "2rem"
}

const font: SizeMap = {
    xs: "0.25rem",
    s: "0.5rem",
    m: "1rem",
    l: "1.5rem",
    xl: "2rem"
}

export const sizes = {
    grid: {
        width: "1400px"
    },
    space,
    font
}


export type Size = "xs" | "s" | "m" | "l" | "xl"

type SizeMap = {
    [key in Size]: string
}

export function getFontSize(size: Size){
    return font[size];
}

export function getSpacing(size: Size){
    return space[size]
}