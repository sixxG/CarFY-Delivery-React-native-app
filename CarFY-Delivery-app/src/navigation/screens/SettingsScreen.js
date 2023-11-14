import React, { useState, useEffect } from 'react';
import { View, Modal, StyleSheet, Text, Pressable, Image } from "react-native";
import styled from 'styled-components/native';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import { URL, IMAGE_CUSTOMER_URL } from '../../config';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { Header } from '../../components/index';
import EditDeliverymanForm from '../../components/settings/EditDeliverymanForm';

const SettingsScreen = ({ navigation }) => {
    const userName = navigation.state.params.userName || null;

    const [userInfo, setUserInfo] = useState(null);
    const [userImg, setUserImg] = useState("");
    const [countDelivery, setCountDelivery] = useState(0);

    const [isLoading, setIsLoading] = useState(false);

    const [openModal, setOpenModal] = useState(false);

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

                            <NavLink onPress={() => {
                                    setOpenModal(false);
                                    navigation.navigate('Home');
                                }}>
                                <NavLinkBody active={false}>
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

                            <NavLink onPress={() => setOpenModal(false)}>
                                <NavLinkBody active={true}>
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
  
    useEffect(() => {
        setOpenModal(false);
        const fetchDataFromServer = async () => {
            setIsLoading(true);
            AsyncStorage.getItem('userInfo').then(res => { 
                const respObject = JSON.parse(res);

                let token = respObject.token;
                let userName = respObject.username;
                let userImg = respObject.img;
                let countDelivery = respObject.countDelivery;

                setCountDelivery(countDelivery);
                setUserImg(userImg);
    
                axios
                    .get(`${URL}/deliverymans/${userName}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                            }
                    })
                    .then(res => {
                        const data = res.data;
                        AsyncStorage.setItem("userData", JSON.stringify(data))
                        setUserInfo(data);
                        setIsLoading(false);
                    })
                    .catch(e => {
                        console.log(`Server error ${e}`);
                        setIsLoading(false);
                    })
            })
        };
    
        fetchDataFromServer();
    }, []);
  
    return (
        <Container>

            <Header onMenuPress={onMenuPress} title={'Настройки'}/>

            <Spinner visible={isLoading}/>

            <EditDeliverymanForm navigation={navigation}></EditDeliverymanForm>

            {renderModal()}

        </Container>
    );
  };

SettingsScreen.navigationOptions = {
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
  
export default SettingsScreen;