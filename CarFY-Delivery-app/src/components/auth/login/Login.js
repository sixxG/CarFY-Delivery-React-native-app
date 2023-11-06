import { React, useState } from "react";
import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import styled from 'styled-components/native';
import axios from "axios";
import { URL } from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
axios.defaults.timeout = 5000

const Login = ({navigation}) => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const [usernameError, setUsetnameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [userInfo, setUserInfo] = useState();
    const [isLoading, setIsLoading] = useState(false);

    function login (username, password) {
        setIsLoading(true);

        if (username === null || password === null || username === '' || password === '') {
            if (username === null || username === '') {
                setUsetnameError(true);
            }
            if (password === null || password === '') {
                setPasswordError(true);
            }
            setIsLoading(false);
            return;
        }

        axios
            .post(`${URL}/auth/authenticate`, {
                username,
                password
            })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem("userInfo", JSON.stringify(userInfo)).then(() => {
                    setIsLoading(false);
                    if (userInfo.role === "DELIVERY_MAN") {
                        navigation.navigate('Home', {userInfo: userInfo});
                    } else if (userInfo.role === "ADMIN") {
                        navigation.navigate('Admin');
                    }
                }).catch(() => {
                    navigation.navigate('Login');
                });
            })
            .catch(e => {
                console.log(`login error ${e}`);
                Alert.alert("Ошибка авторизации", "Проверьте корректность данных и попробуйте ещё раз");
                setIsLoading(false);
            })
    }

    return (
    
        <View style={styles.container}>

            <Spinner visible={isLoading}/>

            <View style={styles.wrapper}>

                <Text
                    style={styles.headerText}
                >
                    Вход
                </Text>

                <Input 
                    error={usernameError}
                    value={username}
                    autoCapitalize="none"
                    placeholder={usernameError ? "Введите логин!" : "Логин"} 
                    onChangeText={(text) => {setUsername(text); setUsetnameError(false);}}
                />

                <Input
                    error={passwordError}
                    value={password}
                    placeholder={passwordError ? "Введите пароль!" : "Пароль"} 
                    onChangeText={(text) => {setPassword(text); setPasswordError(false);}} 
                    autoCapitalize="none"
                    secureTextEntry
                />

                <TouchableOpacity style={styles.loginButton} onPress={() => {login(username, password)}}>
                    <Text style={styles.loginButtonText}>Войти</Text>
                </TouchableOpacity>

            </View>

    </View>
    );
}

const Input = styled.TextInput`
    margin-bottom: 12px;
    border-width: 2px;
    text-align: center;
    background-color: #E5E3E3;
    padding: 10px;
    font-size: 20px;
    border-color: ${props => props.error ? 'red' : '#bbb'};
    color: ${props => props.error ? 'red' : 'black'};
    border-radius: 15px;
    width: 100%;
`;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#06bcee',
    },
    wrapper: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#404040',
    },
    loginButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 15,
        backgroundColor: '#46F046',
        width: '100%',
    },
    loginButtonText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 25,
    }
});

export default Login;