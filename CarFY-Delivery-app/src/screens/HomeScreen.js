import React, { useState, useEffect } from 'react';
import { SectionList } from "react-native";
import styled from 'styled-components/native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from '../config';
import Spinner from "react-native-loading-spinner-overlay";

import { DeliveriesToCustomer, SectionTitle, LogoutBtn } from '../components';

const HomeScreen = ({ navigation }) => {
    const [DATA, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {

        // Загрузка данных с сервера (пример запроса, замените его на свой)
        const fetchDataFromServer = async () => {
            setIsLoading(true);
            AsyncStorage.getItem('userInfo').then(res => { 
                let token = res.toString().split("\"")[3];
                
                // console.log("----------token----------");
                // console.log(token);
                axios
                    .get(`${URL}/contracts/for-delivery`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                            }
                    })
                    .then(res => {
                        const data = res.data;

                        let active = true;

                        for (const date in data) {
                            if (data.hasOwnProperty(date)) {
                                const period = new Date(date);
                                const options = { day: 'numeric', month: 'long' };
                                const formattedDate = period.toLocaleDateString('ru-RU', options);

                                const dateData = data[date];
                                const dataForDate = dateData.map(item => ({
                                    time: item.dateStart.split('T')[1].slice(0, 5),
                                    customer: {
                                        fullName: item.customer.fio,
                                    },
                                    car: {
                                        img: 'https://img.championat.com/s/1350x900/news/big/y/g/avatar-2-sobral-v-rossii-bolshe-2-4-mlrd-rublej_16758793371084217002.jpg',
                                        id: item.autoId,
                                    },
                                    addressDelivery: item.customer.address,
                                    active: active,
                                }));
                                active = false;

                                DATA.push({
                                    title: formattedDate,
                                    data: dataForDate,
                                });
                            }
                        }

                        setData(DATA);
                        setIsLoading(false);
                    })
                    .catch(e => {
                        console.log(`Server error ${e}`);
                        setIsLoading(false);
                    })
            })
        };
    
        // Вызов функции для загрузки данных
        fetchDataFromServer();
    }, []); // Пустой массив зависимостей, чтобы useEffect выполнялся только один раз
  
    return (
        <Container>

            <Spinner visible={isLoading}/>

            <SectionList
                sections={DATA} // Используйте данные, полученные с сервера
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => <DeliveriesToCustomer navigate={navigation.navigate} item={item} />}
                renderSectionHeader={({ section: { title } }) => (
                    <SectionTitle>{title}</SectionTitle>
                )}
            />
    
            <LogoutBtn navigation={navigation} parent={this} />

        </Container>
    );
  };
HomeScreen.navigationOptions = {
    title: 'Клиентам',
    defaultNavigationOptions: {
        gesturesEnabled: false,
    },
    headerLeft: () => {},
    headerTintColor: '#2a86ff',
    headerStyle: {
        elevation: 0.8,
        shadowOpacity: 0.8
    }
}

const Container = styled.View`
    flex: 1;
`;
  
export default HomeScreen;