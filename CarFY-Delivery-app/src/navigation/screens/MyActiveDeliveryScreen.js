import React, { useState } from 'react';
import { Alert, ScrollView } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import styled from 'styled-components';
import { Foundation } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons';
import {Linking} from 'react-native'
import { URL } from '../../config';

import {CarDetail} from '../../components';

const MyActiveDeliveryScreen = ({ navigation }) => {

    const { item } = navigation.state.params;

    const [isLoading, setIsLoading] = useState(false);

    const completeDeliveryContract = async (contractId) => {
        setIsLoading(true);

        AsyncStorage.getItem('userInfo').then(res => { 
            const respObject = JSON.parse(res);

            let token = respObject.token;
            
            axios
            .get(`${URL}/contracts/complete/${contractId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                    }
            })
            .then(res => {
                const status = res.status;
                if (status === 200) {
                    setIsLoading(false);
                    navigation.navigate('MyDelivery', {update: true});
                }
                setIsLoading(false);
            })
            .catch(e => {
                if (e.response) {
                    console.log(`Status code: ${e.response.status}`);
                    console.log(`Response data:`, e.response.data);
                } else {
                    console.log(`Network Error: ${e.message}`);
                }
                if (e.response.status === 400) {
                    setIsLoading(false);
                    Alert.alert('Ещё не время!', 'Время аренды ещё не настало!', [
                        {
                            text: 'Ясно',
                            style: 'cancel',
                        },
                        {text: 'Понятно'},
                    ]);
                }
                setIsLoading(false);
            })
        })
        .catch(error => {
            console.log(error);
        })
    };

    return (
        <ScrollView>

            <Spinner visible={isLoading}/>

            <Container>
                <CustomerFullName>{item.customer.fullName}</CustomerFullName>
                <GrayText>{item.customer.phone}</GrayText>

                <DeliveryDetailButtons>

                    <FormulaButtonView>
                        <ButtonWraper 
                            onPress={() => {
                                completeDeliveryContract(item.id);
                            }}
                        >
                            <ButtonDetailCarText>Завершить доставку</ButtonDetailCarText>
                        </ButtonWraper>
                    </FormulaButtonView>

                    <PhoneButtonView>
                        <ButtonWraperGeo 
                            onPress={() => {
                                Linking.openURL(`geo:0,0?q=${item.addressDelivery}`)
                            }}
                        >
                            <ButtonDetailCarText>
                                <Feather name="map-pin" size={30} color="white" />
                            </ButtonDetailCarText>
                        </ButtonWraperGeo>
                    </PhoneButtonView>

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

const ButtonWraperGeo = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    height: 45px;
    background: red;
`;

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
    background: #84d269;
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

MyActiveDeliveryScreen.navigationOptions = {
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

export default MyActiveDeliveryScreen;