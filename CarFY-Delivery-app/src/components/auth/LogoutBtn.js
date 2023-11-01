import React from "react";
import styled from 'styled-components';
import { AntDesign } from '@expo/vector-icons';

const LogoutBtn = ({ navigation, parent }) => {
    return (
        <LogoutButton onPress={navigation.navigate.bind(parent, 'Login')}>
            <AntDesign name="logout" size={30} color="#46F046" />
        </LogoutButton>
    )
}

const LogoutButton = styled.TouchableOpacity`
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    width: 65px;
    height: 65px;
    background: black;
    position: absolute;
    right: 15px;
    bottom: 25px;

    shadow-color: #46F046;
    shadow-opacity: 0.5;
    elevation: 12;
`;

export default LogoutBtn;