import React from 'react';
import { SubmitButton, Wrapper } from './Button.styles';

const Button = ({label, disabled, width, height, color, colorHover, backColor, backColorHover, onClick}) => {
    return (
        <Wrapper width={width} height={height} onClick={onClick}>
            <SubmitButton color={color} colorHover={colorHover} backColor={backColor} backColorHover={backColorHover} disabled={disabled !== undefined ? disabled : false}>{label}</SubmitButton>
        </Wrapper>
    );

}

export default Button;