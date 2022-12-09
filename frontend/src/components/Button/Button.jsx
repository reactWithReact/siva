import React from 'react';
import { Wrapper } from './Wrapper';

export const Button = ({ text, ...props }) => {
    return (
        <Wrapper {...props}>{text}</Wrapper>
    )
}
