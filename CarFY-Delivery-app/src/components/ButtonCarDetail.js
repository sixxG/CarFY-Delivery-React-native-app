import React from "react";
import styled from 'styled-components';

const Button = ({children, color}) => {
    return (
        <ButtonWraper color={color}>
            <ButtonDetailCarText>{children}</ButtonDetailCarText>
        </ButtonWraper>
    )
}

Button.defaultProps = {
    color: '#2a86ff'
};

const ButtonWraper = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    height: 45px;
    background: ${props => props.color};
`;

const ButtonDetailCarText = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 16px;
`;

export default Button;