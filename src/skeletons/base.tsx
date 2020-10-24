import styled, { css, keyframes } from "styled-components";
import { color } from "../styled/variables";

const shimmer = keyframes`
    from {
        transform: translate(-20%);
    }
    to {
        transform: translate(120%);
    }
`

const skeletonShimmer = css`
    overflow: hidden;
    position: relative;
    background-color: ${color.gray_dark};

    &::after {
        content:"";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;

        background-image:       linear-gradient(
            to right, 
            transparent 0, 
            ${color.gray_light} 20px,
            transparent 40px,
            transparent 100%
            );  
            animation: ${shimmer} 2s infinite;
        }
`

export const SkeletonText = styled.div<{width?:string}>`
    width: ${props => props.width || "75%"};
    height:.9rem;
    margin-top: .25rem;
    ${skeletonShimmer}
`
export const SkeletonCheckBox = styled.div`
    width: 1.2rem;
    height: 1.2rem;
    border: 1px solid white;
    border-radius: .25rem;
    margin-right: 1.25rem;
    ${skeletonShimmer}
`



