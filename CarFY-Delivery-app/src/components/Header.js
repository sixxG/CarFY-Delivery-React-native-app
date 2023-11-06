import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ onMenuPress, title }) => {
  return (
    <HeaderContainer>
      <MenuBtn onPress={onMenuPress}>
        <Ionicons name="menu" size={30} color="black" />
      </MenuBtn>
      <Title>{title}</Title>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
  height: 70px;
  margin-top: 30px;
`;

const MenuBtn = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    margin-left: 15px;
    color: black;
`;

const Title = styled.Text`
  font-size: 20px;
  color: #2a86ff;
  font-weight: bold;
  margin-left: 10px;
`;

export default Header;
