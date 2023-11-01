import * as React from 'react';
import { View } from "react-native";
import styled from 'styled-components';
import { Foundation } from '@expo/vector-icons'; 

import {Button, CarDetail} from '../components';

const CarImgFullScreen = ({ navigation }) => {

    return (
        <View>
            <Container>
                <CustomerFullName>{navigation.getParam("customer").fullName}</CustomerFullName>
                <GrayText>+7 (800) 555-35-35</GrayText>
                <DeliveryDetailButtons>

                    <FormulaButtonView>
                        <Button>Взять доставку</Button>
                    </FormulaButtonView>
                    <PhoneButtonView>
                        <Button color="#84d269">
                            <Foundation name="telephone" size={30} color="white" />
                        </Button>
                    </PhoneButtonView>
                
                </DeliveryDetailButtons>

            </Container>

            <CarDetail carId={navigation.getParam("car").id} navigation={navigation}></CarDetail>
        </View>
    );
};

const FormulaButtonView = styled.View`
    flex: 1;
`;

const PhoneButtonView = styled.View`
    width: 45px;
    margin-left: 10px;
`;

const DeliveryDetailButtons = styled.View`
    flex: 1;
    flex-direction: row;
    margin-top: 20px;
`;

const GrayText = styled.Text`
    font-size: 16px;
    color: #88979F;
`;

const CustomerFullName = styled.Text`
    font-weight: 800;
    font-size: 24px;
    line-height: 30px;
    margin-bottom: 5px;
`;

const Container = styled.View`
    padding: 25px;
    margin-bottom: 10px;
`;

CarImgFullScreen.navigationOptions = {
    title: "Автомобиль",
    defaultNavigationOptions: {
        gesturesEnabled: false,
      },
    headerTintColor: '#2a86ff',
    headerStyle: {
        // backgroundColor: '#06bcee',
        elevation: 0.8,
        shadowOpacity: 0.8
    }
};

export default CarImgFullScreen;