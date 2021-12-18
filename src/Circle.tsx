import { useState } from "react";
import styled from "styled-components";

interface ContainerProps {
    bgColor: string
    borderColor : string;
}

interface CircleProps {
    bgColor: string
    borderColor ?: string;
}

const Container  = styled.div<ContainerProps>`
    width:200px;
    height:200px;
    background-color: ${props => props.bgColor};
    border-radius:100px;
    border:1px solid ${props => props.borderColor};
`;

const Circle = ( {bgColor , borderColor} : CircleProps) => {
    
    return (
        <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}/>
    )
}

export default Circle;