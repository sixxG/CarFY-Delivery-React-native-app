import { React, useState } from "react";
import { View, StyleSheet, TextInput, Text, Pressable, Alert } from "react-native";
import axios from "axios";
import { URL } from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
axios.defaults.timeout = 5000

const Login = ({navigate}) => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const [userInfo, setUserInfo] = useState();
    const [isLoading, setIsLoading] = useState(false);

    function login (username, password) {
        setIsLoading(true);

        axios
            .post(`${URL}/auth/authenticate`, {
                username,
                password
            })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
                if (userInfo.role === "USER") {
                    navigate('Home');
                } else if (userInfo.role === "ADMIN") {
                    navigate('Registration');
                } else {
                    navigate('Home');
                }
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

                <TextInput 
                    style={styles.input}
                    value={username}
                    autoCapitalize="none"
                    placeholder="Логин" 
                    onChangeText={(text) => {setUsername(text)}}
                />

                <TextInput 
                    style={styles.input}
                    value={password} 
                    placeholder="Пароль"
                    onChangeText={(text) => {setPassword(text)}} 
                    autoCapitalize="none"
                    secureTextEntry
                />

                <Pressable style={styles.loginButton} onPress={() => {login(username, password)}}>
                    <Text style={styles.loginButtonText}>Войти</Text>
                </Pressable>

            </View>

    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#06bcee',
        // backgroundColor: 'white',
    },
    wrapper: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#404040',
    },
    input: {
        marginBottom: 12,
        borderWidth: 2,
        textAlign: "center",
        backgroundColor: '#E5E3E3',
        padding: 10,
        fontSize: 20,
        borderColor: '#bbb',
        borderRadius: 15,
        width: '100%',
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
    },
    blockError: {
        padding: 10,
        borderRadius: 50,
        borderWidth: 1,
        borderColor: "red",
        backgroundColor: 'white',
        marginBottom: 15,
    },
    textError: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red',
    }
});

export default Login;