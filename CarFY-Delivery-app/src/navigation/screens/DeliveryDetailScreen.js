import * as React from 'react';
import { ScrollView } from "react-native";
import styled from 'styled-components';
import { Foundation } from '@expo/vector-icons'; 
import {Linking} from 'react-native'

import {CarDetail} from '../../components';

const DeliveryDetailScreen = ({ navigation }) => {

    const { item } = navigation.state.params;

    return (
        <ScrollView>
            <Container>
                <CustomerFullName>{item.customer.fullName}</CustomerFullName>
                <GrayText>{item.customer.phone}</GrayText>

                <DeliveryDetailButtons>

                    <FormulaButtonView>
                        <ButtonWraper 
                            onPress={() => {
                                console.log("press");
                                Linking.openURL(`geo:0,0?q=${item.addressDelivery}`)
                            }}
                        >
                            <ButtonDetailCarText>Взять доставку</ButtonDetailCarText>
                        </ButtonWraper>
                    </FormulaButtonView>

                    <PhoneButtonView>
                        <ButtonWraperPhone 
                            onPress={() => {
                                Linking.openURL(`tel:${item.customer.phone.substring(1, 15)}`);
                            }}
                        >
                            <ButtonDetailCarText>
                                <Foundation name="telephone" size={30} color="white" />
                            </ButtonDetailCarText>
                        </ButtonWraperPhone>
                    </PhoneButtonView>
                
                </DeliveryDetailButtons>

            </Container>

            <CarDetail carId={item.car.id} navigation={navigation}></CarDetail>
        </ScrollView>
    );
};

const ButtonWraperPhone = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    height: 45px;
    background: #84d269;
`;

const ButtonWraper = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 30px;
    height: 45px;
    background: #2a86ff;
`;

const ButtonDetailCarText = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 16px;
`;

const FormulaButtonView = styled.View`
    flex: 1;
`;

const PhoneButtonView = styled.TouchableOpacity`
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

DeliveryDetailScreen.navigationOptions = {
    title: "Информация о доставке",
    defaultNavigationOptions: {
        gesturesEnabled: false,
      },
    headerTintColor: '#2a86ff',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    }
};

export default DeliveryDetailScreen;