import React, { useState, useEffect } from 'react';
import { SectionList, View, Modal, StyleSheet, Text, Pressable, Image } from "react-native";
import styled from 'styled-components/native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import { URL, IMAGE_CUSTOMER_URL } from '../../config';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { DeliveriesToCustomer, SectionTitle } from '../../components';
import { Header } from '../../components/index';
import { RefreshControl } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation, update }) => {
    const [DATA, setData] = useState([]);

    const [userName, setUserName] = useState('');
    const [userImg, setUserImg] = useState("");
    const [countDelivery, setCountDelivery] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const [openModal, setOpenModal] = useState(false);

    const [refresh, setRefresh] = useState(false);

    const onMenuPress = () => {
        setOpenModal(!openModal);
    };

    function logOut(navigation) {
        setOpenModal(false);
        navigation.navigate('Login');
    };

    function renderModal() {
        return (
            <Modal 
                visible={openModal} 
                animationIn="slideInLeft"
                animationOut="slideOutRight" 
                transparent={true}
                onRequestClose={() => {
                    setOpenModal(!openModal);
                }}
            >
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            flex: 4,
                            borderTopRightRadius: 20,
                            borderBottomRightRadius: 20,
                            height: '100%'
                        }}
                    >
                        <View
                            style={{ 
                                width: undefined, 
                                padding: 16, 
                                paddingTop: 30, 
                                borderTopRightRadius: 20, 
                                backgroundColor: '#77b1ff'
                            }}
                        >
                            <Image
                                source={{
                                    uri:
                                    `${IMAGE_CUSTOMER_URL}/${userImg}`,
                                }} 
                                style={styles.profile}
                            />
                            <Text style={styles.name}>{userName}</Text>

                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.deliveries}>Доставок: {countDelivery}</Text>
                                <Ionicons name="md-car-sport-sharp" size={20} color="black" />
                            </View>
                        </View>

                        <View style={styles.container}>

                            <NavLink onPress={() => setOpenModal(false)}>
                                <NavLinkBody active={true}>
                                    <Ionicons name="md-list" size={30} color="black" />
                                    <Text style={{ marginLeft: 10 }}>Доставки</Text>
                                </NavLinkBody>
                            </NavLink>

                            <NavLink onPress={() => {
                                    setOpenModal(false)
                                    navigation.navigate('MyDelivery', {userName: userName});
                                }}>
                                <NavLinkBody active={false}>
                                    <AntDesign name="calendar" size={30} color="black" />
                                    <Text style={{ marginLeft: 10 }}>Мои доставки</Text>
                                </NavLinkBody>
                            </NavLink>

                            <NavLink onPress={() => {
                                    setOpenModal(false);
                                    navigation.navigate('Settings', {userName: userName});
                                }}>
                                <NavLinkBody active={false}>
                                    <Ionicons name="settings" size={30} color="black" />
                                    <Text style={{ marginLeft: 10 }}>Настройки</Text>
                                </NavLinkBody>
                            </NavLink>

                            <LogoutButton onPress={() => logOut(navigation)}>
                                <AntDesign name="logout" size={30} color="#46F046" />
                            </LogoutButton>

                        </View>
                    </View>
                    
                    <Pressable
                        style={{
                            backgroundColor: 'rgba(0,0,0,0)',
                            padding: 15,
                            flex: 1,
                            height: '100%'
                        }}
                        onPress={() => setOpenModal(!openModal)}
                    >
                    </Pressable>
                </View>
            </Modal>
        )
    }

    const fetchDataFromServer = async () => {
        setRefresh(true);
        const newData = [];

        AsyncStorage.getItem('userInfo').then(res => { 
            const respObject = JSON.parse(res);
            // let token = res.toString().split("\"")[3];
            // let userName = res.toString().split("\"")[7];
            // let userImg = res.toString().split("\"")[19];
            // let countDelivery = res.toString().split("\"")[22];
            let token = respObject.token;
            let userName = respObject.username;
            let userImg = respObject.img;
            let countDelivery = respObject.countDelivery;

            setCountDelivery(countDelivery);
            setUserImg(userImg);
            setUserName(userName);
            
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

                            const dataForDate = [];

                            for (const item in dateData) {
                                const element = {
                                    id: dateData[item].id,
                                    time: dateData[item].dateStart.split('T')[1].slice(0, 5),
                                    customer: {
                                        fullName: dateData[item].customer.fio,
                                        phone: dateData[item].customer.phone,
                                        img: dateData[item].customer.img,
                                    },
                                    car: {
                                        id: dateData[item].autoId,
                                    },
                                    addressDelivery: dateData[item].typeReceipt,
                                    active: active,
                                }
                                active = false;
                                dataForDate.push(element);
                            }

                            newData.push({
                                title: formattedDate,
                                data: dataForDate,
                            });
                        }
                    }

                    setData(newData);
                    setIsLoading(false);
                    setRefresh(false);
                })
                .catch(e => {
                    console.log(`Server error ${e}`);
                    setIsLoading(false);
                    setRefresh(false);
                })
        })
        .catch(error => {
            console.log(error);
        })
    };
  
    useEffect(() => {
        setOpenModal(false);
        setIsLoading(true);

        fetchDataFromServer();
        setIsLoading(false);
    }, [navigation, update]);
  
    return (
        <Container>

            <Spinner visible={isLoading}/>

            <Header onMenuPress={onMenuPress} title={'Доставки'}/>

            <SectionList
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={() => fetchDataFromServer()}
                    />
                }
                sections={DATA}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => <DeliveriesToCustomer navigation={navigation} item={item} isActiveDelivery={false}/>}
                renderSectionHeader={({ section: { title } }) => (
                    <SectionTitle>{title}</SectionTitle>
                )}
            />

            {renderModal()}

        </Container>
    );
  };

HomeScreen.navigationOptions = {
    title: null,
    headerLeft: () => {},
    defaultNavigationOptions: {
        gesturesEnabled: false,
    },
    headerTintColor: '#2a86ff',
    headerStyle: {
        height: 0,
        backgroundColor: '#06bcee',
        elevation: 0.8,
        shadowOpacity: 0.8
    },
}

const Container = styled.View`
    flex: 1;
`;

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

const NavLink = styled.TouchableOpacity`
    padding: 15px 0 0 0;
`;

const NavLinkBody = styled.View`
    background: ${props => props.active ? '#46F046' : '#bcfabc'};
    padding: 5px;
    flex-direction: row;
    align-items: center;
    text-align: center;
`;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    profile: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#fff'
    },
    name: {
        color: '#fff',
        fontSize: 20,
        fontWeight: '800',
        marginVertical: 8
    },
    deliveries: {
        color: '#000',
        fontSize: 13,
        marginRight: 4
    }
})
  
export default HomeScreen;