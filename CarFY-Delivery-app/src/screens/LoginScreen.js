import { React, useState, useContext } from "react";
import { View, StyleSheet, TextInput, Button, Text, Pressable } from "react-native";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";

const LoginScreen = () => {

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const {isLoading, isErrorAuth, login, setIsErrorAuth} = useContext(AuthContext);

    return (
        <View style={styles.container}>

            { isErrorAuth && 
                <View style={styles.blockError}>
                    <Text style={styles.textError}>Произошла ошибка! Попробуйте позднее.</Text>
                </View>
            }

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
                    onFocus={() => setIsErrorAuth(false)}
                />

                <TextInput 
                    style={styles.input}
                    value={password} 
                    placeholder="Пароль"
                    onChangeText={(text) => {setPassword(text)}} 
                    onFocus={() => setIsErrorAuth(false)}
                    autoCapitalize="none"
                    secureTextEntry
                />

                <Pressable style={styles.loginButton} onPress={() => {login(username, password)}}>
                    <Text style={styles.loginButtonText}>Войти</Text>
                </Pressable>

            </View>

        </View>
    );
};

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

export default LoginScreen;