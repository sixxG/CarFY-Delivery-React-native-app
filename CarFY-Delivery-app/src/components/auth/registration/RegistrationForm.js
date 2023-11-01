import { React, useState } from "react";
import { View, TextInput, Text, Pressable, StyleSheet } from "react-native";
import styled from 'styled-components';
import axios from "axios";
import { URL } from "../../../config";
import { AntDesign } from '@expo/vector-icons';
import Spinner from "react-native-loading-spinner-overlay";

const RegistrationForm = ({navigate}) => {

    const [fio, setFio] = useState(null);
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const [isFioInputFocus, setFioFocus] = useState(false);
    const [isEmailInputFocus, setEmailFocus] = useState(false);
    const [isUsernameInputFocus, setUsernameFocus] = useState(false);
    const [isPasswordInputFocus, setPasswordFocus] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [isErrorReg, setIsErrorReg] = useState(false);
    const [isRegistred, setRegistred] = useState(false);

    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showLogoutBtn, setLogoutBtn] = useState(true);

    const [isValid, setIsValid] = useState(false);

    const handleRegistration = () => {
        if (fio && username && email && password) {
            setIsErrorReg(false);
            registration(fio, email, username, password);
        } else {
            setIsValid(true);
        }
    };

    function registration (fio, email, username, password) {
        setIsLoading(true);
        setIsErrorReg(false);

        axios
            .post(`${URL}/auth/register`, {
                username,
                fio,
                email,
                password
            })
            .then(res => {
                setIsLoading(false);
                setRegistred(true);
                setTimeout(() => {setRegistred(false);}, 5000);

                setFio(null);
                setEmail(null);
                setUsername(null);
                setPassword(null);
                setIsValid(false);
                setFioFocus(false);
                setPasswordFocus(false);
                setUsernameFocus(false);
                setEmailFocus(false);
            })
            .catch(e => {
                console.log(`Registration error ${e}`);
                setIsLoading(false);
                setIsErrorReg(true);
            })
    }

    return (
    
        <Container>

            <Spinner visible={isLoading}/>
            
            { isErrorReg && 
                <ValidateBlock>
                    <ErrorValidateText>Произошла ошибка! Попробуйте позднее.</ErrorValidateText>
                </ValidateBlock>
            }

            { isValid && 
                <ValidateBlock>
                    <ErrorValidateText>Форма заполнена некоректно!</ErrorValidateText>
                </ValidateBlock>
            }

            { isRegistred && 
                <ValidateBlock>
                    <SuccessRegisterText>Регистрация прошла успешно!</SuccessRegisterText>
                </ValidateBlock>
            }

            <ShowRegisterFormButton onPress={() => {
                    setShowRegisterForm(!showRegisterForm);
                    setIsValid(false);
                    setFioFocus(false);
                    setPasswordFocus(false);
                    setUsernameFocus(false);
                    setEmailFocus(false);
                    setLogoutBtn(true);
                }}>
                <ShowRegisterFormButtonBody>
                    <ShowRegisterFormButtonText>Зарегистрировать доставщика</ShowRegisterFormButtonText>
                    {showRegisterForm ? 
                        <AntDesign name="minuscircle" size={24} color="black" />
                    :
                        <AntDesign name="pluscircle" size={24} color="black" />
                    }
                </ShowRegisterFormButtonBody>
            </ShowRegisterFormButton>

            {showRegisterForm && 
                <View style={isValid ? styles.containerWithError : styles.container}>
                    <Text style={styles.title}>Регистрация</Text>
            
                    <TextInput
                        value={fio}
                        style={isFioInputFocus ? styles.inputFocus : styles.input}
                        placeholder="ФИО"
                        maxLength={30}
                        onFocus={() => {
                            setFioFocus(true);
                            setLogoutBtn(false);
                        }}
                        onEndEditing={() => {
                            setFioFocus(false);
                            setLogoutBtn(true);
                        }}
                        onChangeText={(text) => {
                            setFio(text);
                            setIsErrorReg(false);
                            setIsValid(false);
                        }}
                    />
            
                    <TextInput
                        value={username}
                        style={isUsernameInputFocus ? styles.inputFocus : styles.input}
                        placeholder="Логин"
                        maxLength={15}
                        onFocus={() => {
                            setUsernameFocus(true);
                            setLogoutBtn(false);
                        }}
                        onEndEditing={() => {
                            setUsernameFocus(false);
                            setLogoutBtn(true);
                        }}
                        onChangeText={(text) => {
                            setUsername(text);
                            setIsErrorReg(false);
                            setIsValid(false);
                        }}
                        autoCapitalize="none"
                    />
            
                    <TextInput
                        value={email}
                        style={isEmailInputFocus ? styles.inputFocus : styles.input}
                        placeholder="Email"
                        onFocus={() => {
                            setEmailFocus(true);
                            setLogoutBtn(false);
                        }}
                        onEndEditing={() => {
                            setEmailFocus(false);
                            setLogoutBtn(true);
                        }}
                        onChangeText={(text) => {
                            setEmail(text);
                            setIsErrorReg(false);
                            setIsValid(false);
                        }}
                        autoCapitalize="none"
                    />
            
                    <TextInput
                        value={password}
                        style={isPasswordInputFocus ? styles.inputFocus : styles.input}
                        placeholder="Пароль"
                        onFocus={() => {
                            setPasswordFocus(true);
                            setLogoutBtn(false);
                        }}
                        onEndEditing={() => {
                            setPasswordFocus(false);
                            setLogoutBtn(true);
                        }}
                        onChangeText={(text) => {
                            setPassword(text);
                            setIsErrorReg(false);
                            setIsValid(false);
                        }}
                        secureTextEntry
                        autoCapitalize="none"
                    />
            
                    <Pressable style={styles.button} onPress={() => handleRegistration()}>
                        <Text style={styles.buttonText}>Зарегистрировать</Text>
                    </Pressable>
              </View>
            }

    </Container>
    );
}

const ValidateBlock = styled.View`
    justify-content: center;
    align-items: center;
    padding: 10px;
`;

const SuccessRegisterText = styled.Text`
    font-size: 16px;
    color: green;
    font-weight: 600;
`;

const ErrorValidateText = styled.Text`
    font-size: 16px;
    color: red;
    font-weight: 600;
`;

const ShowRegisterFormButton = styled.Pressable`
    border-radius: 30px;
    height: 45px;
    background: #11cb11;
`;

const ShowRegisterFormButtonBody = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ShowRegisterFormButtonText = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    marginRight: 10px;
    width: 80%;
`;

const Container = styled.View`
    /* height: 100%; */
    padding: 25px;
`;

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#8c8c8c',
      marginTop: 25,
      borderRadius: 25,
    },
    containerWithError: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#8c8c8c',
        marginTop: 25,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: "red",
        shadowColor: "red",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    title: {
      fontSize: 24,
      marginBottom: 16,
    },
    input: {
      width: '100%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingLeft: 10,
      marginBottom: 10,
      color: 'white',
    },
    inputFocus: {
        borderWidth: 2,
        borderColor: "#46F046",
        width: '100%',
        height: 40,
        borderRadius: 5,
        paddingLeft: 10,
        marginBottom: 10,
        color: 'white',
        fontSize: 20,
    },
    button: {
      backgroundColor: '#007BFF',
      padding: 10,
      borderRadius: 5,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
    icon: {
        width: 50,
    }
  });

export default RegistrationForm;