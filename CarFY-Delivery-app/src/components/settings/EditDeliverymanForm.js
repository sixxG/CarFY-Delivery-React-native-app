import { React, useState, useEffect } from "react";
import { View, TextInput, Text, Pressable, StyleSheet, Image, Alert, ScrollView, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styled from 'styled-components';
import axios from "axios";
import { URL } from "../../config";
import { IMAGE_CUSTOMER_URL } from '../../config';
import Spinner from "react-native-loading-spinner-overlay";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
axios.defaults.timeout = 5000

const EditDeliverymanForm = ({navigation}) => {

    const [id, setId] = useState(0);
    const [fio, setFio] = useState("");
    const [img, setImg] = useState("");
    const [phone, setPhone] = useState("");    

    const [isFioInputFocus, setFioFocus] = useState(false);
    const [isPhoneInputFocus, setPhoneFocus] = useState(false);

    const [isValid, setIsValid] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
    const [isPasswordFormChanged, setPasswordFormChanged] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isPasswordChangedSucces, setChangeSucces] = useState(false);

    const handleChangePasswordForm = () => {
        if (oldPassword && newPassword) {
            if (oldPassword === newPassword) {
                Alert.alert("Новый пароль = старый пароль","Новый пароль не должен совпадать со старым паролем!")
            } else if (newPassword !== confirmPassword) {
                Alert.alert("Пароли не совпадают","Новый пароль не равен подтверждению пароля!")
            } else {
                changePassword();
            }
        } else {
            setIsValid(true);
        }
    };

    const handleSaveForm = () => {
        setFioFocus(false);
        setPhoneFocus(false);
        if (fio && phone) {
            setIsError(false);
            save();
        } else {
            setIsValid(true);
        }
    };

    function changePassword () {
        setIsLoading(true);
        setIsError(false);

        AsyncStorage.getItem('userInfo').then(res => { 
            let token = res.toString().split("\"")[3];

            axios
                .post(`${URL}/deliverymans`, 
                {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword
                }, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    const data = res.data;
                    
                    AsyncStorage.setItem("userData", JSON.stringify(data))

                    setPasswordFormChanged(false);
                    setOldPassword('');
                    setNewPassword('');
                    setConfirmPassword('');

                    setIsLoading(false);
                    setChangeSucces(true);
                    setTimeout(() => {setChangeSucces(false);}, 5000);
                })
                .catch(e => {
                    Alert.alert("Произошла ошибка", "Проверьте корректность данных и попробуйте ещё раз");
                    console.log(`Server error ${e}`);
                    setIsLoading(false);
                })
        })
        .catch(error => {
            Alert.alert("Произошла ошибка", "Проверьте корректность данных и попробуйте ещё раз");
            console.log(error);
        })
    };

    function save () {
        setIsLoading(true);
        setIsError(false);

        AsyncStorage.getItem('userInfo').then(res => { 
            let token = res.toString().split("\"")[3];

            axios
                .put(`${URL}/deliverymans`, 
                {
                    id: id,
                    fio: fio,
                    phone: phone,
                }, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    const data = res.data;
                    
                    AsyncStorage.setItem("userData", JSON.stringify(data))

                    setIsChanged(false);
                    setIsLoading(false);
                    setSuccess(true);
                    setTimeout(() => {setSuccess(false);}, 5000);
                })
                .catch(e => {
                    Alert.alert("Произошла ошибка", "Проверьте корректность данных и попробуйте ещё раз");
                    console.log(`Server error ${e}`);
                    setIsLoading(false);
                })
        })
        .catch(error => {
            Alert.alert("Произошла ошибка", "Проверьте корректность данных и попробуйте ещё раз");
            console.log(error);
        })
    }

    const [openModal, setOpenModal] = useState(false);

    function renderModal(url) {
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
                <Pressable 
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                    onPress={() => setOpenModal(false)}
                >
                    <View
                        style={{
                            backgroundColor: 'white',
                            flex: 1,
                            margin: 20,
                            borderRadius: 20,
                            height: '70%'
                        }}
                    >
                        
                        <CarImgPopup 
                            source={{
                                uri: `${IMAGE_CUSTOMER_URL}/${url}`,
                            }}
                            defaultSource={require('../../../assets/icon.png')}
                        />

                    </View>

                </Pressable>
            </Modal>
        )
    }

    useEffect(() => {
        const fetchDataFromAsyncStorage= async () => {
            setIsLoading(true);

            AsyncStorage.getItem('userData').then(res => { 
                const userData = JSON.parse(res);

                setId(userData.id);
                setFio(userData.fio);
                setImg(userData.img);
                setPhone(userData.phone);

                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
            })
        };

        fetchDataFromAsyncStorage();
    }, [navigation]);

    return (
    
        <ScrollView>
            <Container>

                <Spinner visible={isLoading}/>

                { isError && 
                    <ValidateBlock>
                        <ErrorValidateText>Произошла ошибка! Попробуйте позднее.</ErrorValidateText>
                    </ValidateBlock>
                }

                { isValid && 
                    <ValidateBlock>
                        <ErrorValidateText>Форма заполнена некоректно!</ErrorValidateText>
                    </ValidateBlock>
                }

                { isSuccess && 
                    <ValidateBlock>
                        <SuccessRegisterText>Данные изменены!</SuccessRegisterText>
                    </ValidateBlock>
                }

                <View style={isValid ? styles.containerWithError : styles.container}>

                    <Pressable onPress={() => {
                        setOpenModal(true);
                    }}
                    >
                        <Image 
                            source={{
                                uri:
                                `${IMAGE_CUSTOMER_URL}/${img}`,
                            }}
                            style={styles.profile} 
                        />
                    </Pressable>

                    <TextInput
                        value={fio}
                        style={isFioInputFocus ? styles.inputFocus : styles.input}
                        placeholder="ФИО"
                        maxLength={30}
                        onFocus={() => {
                            setFioFocus(true);
                        }}
                        onEndEditing={() => {
                            setFioFocus(false);
                        }}
                        onChangeText={(text) => {
                            setFio(text);
                            setIsChanged(true);
                            setIsError(false);
                            setIsValid(false);
                        }}
                    />

                    <TextInput
                        value={phone}
                        style={isPhoneInputFocus ? styles.inputFocus : styles.input}
                        placeholder="Логин"
                        maxLength={15}
                        onFocus={() => {
                            setPhoneFocus(true);
                        }}
                        onEndEditing={() => {
                            setPhoneFocus(false);
                        }}
                        onChangeText={(text) => {
                            setUsername(text);
                            setIsChanged(true);
                            setIsError(false);
                            setIsValid(false);
                        }}
                        autoCapitalize="none"
                    />

                    {isChanged ? 
                        <TouchableOpacity style={styles.button} onPress={() => handleSaveForm()}>
                            <Text style={styles.buttonText}>Сохранить</Text>
                        </TouchableOpacity>
                        :
                        <Pressable style={styles.buttonHide} onPress={() => {
                            setPhoneFocus(false);
                            setFioFocus(false);
                        }}>
                            <Text style={styles.buttonText}>Сохранить</Text>
                        </Pressable>
                    }
                </View>

                { isPasswordChangedSucces && 
                    <ValidateBlock>
                        <SuccessRegisterText>Пароль изменён!</SuccessRegisterText>
                    </ValidateBlock>
                }

                <ShowChangePasswordFormButton onPress={() => {
                        setShowChangePasswordForm(!showChangePasswordForm);
                    }}>
                    <ShowChangePasswordFormButtonBody>
                        <ShowChangePasswordFormButtonText>Изменить пароль</ShowChangePasswordFormButtonText>
                        {showChangePasswordForm ? 
                            <AntDesign name="minuscircle" size={24} color="black" />
                        :
                            <AntDesign name="pluscircle" size={24} color="black" />
                        }
                    </ShowChangePasswordFormButtonBody>
                </ShowChangePasswordFormButton>

                {showChangePasswordForm && 
                    <View style={isValid ? styles.containerWithError : styles.container}>

                        <TextInput
                            value={oldPassword}
                            style={styles.input}
                            placeholder="Старый пароль"
                            maxLength={30}
                            onChangeText={(text) => {
                                setOldPassword(text);
                                setPasswordFormChanged(true);
                            }}
                        />

                        <TextInput
                            value={newPassword}
                            style={styles.input}
                            placeholder="Новый пароль"
                            maxLength={15}
                            onChangeText={(text) => {
                                setNewPassword(text);
                                setPasswordFormChanged(true);
                            }}
                            autoCapitalize="none"
                            secureTextEntry
                        />

                        <TextInput
                            value={confirmPassword}
                            style={styles.input}
                            placeholder="Подтвердите пароль"
                            maxLength={15}
                            onChangeText={(text) => {
                                setConfirmPassword(text);
                                setPasswordFormChanged(true);
                            }}
                            autoCapitalize="none"
                            secureTextEntry
                        />

                        {isPasswordFormChanged ? 
                            <TouchableOpacity style={styles.button} onPress={() => handleChangePasswordForm()}>
                                <Text style={styles.buttonText}>Сохранить</Text>
                            </TouchableOpacity>
                            :
                            <Pressable style={styles.buttonHide}>
                                <Text style={styles.buttonText}>Сохранить</Text>
                            </Pressable>
                        }
                    </View>

                }

            </Container>

            {renderModal(img)}

        </ScrollView>
    );
}

const Container = styled.View`
    padding: 25px;
`;

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

const ShowChangePasswordFormButton = styled.Pressable`
    border-radius: 30px;
    height: 45px;
    background: #11cb11;
    margin-top: 20px;
`;

const ShowChangePasswordFormButtonBody = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ShowChangePasswordFormButtonText = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    marginRight: 10px;
    width: 80%;
`;

const CarImgPopup = styled.Image`
    border-radius: 20px;
    width: 100%;
    height: 100%;
`;

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: 'rgba(140,140,140, 0.6)',
      marginTop: 5,
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
      borderColor: 'black',
      borderRadius: 5,
      paddingLeft: 10,
      marginBottom: 10,
      color: '#404040',
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
      minWidth: '100%',
      alignItems: 'center',
    },
    buttonHide: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
        opacity: 0.7,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    icon: {
        width: 50,
    },
    profile: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
        marginBottom: 20
    }
});

export default EditDeliverymanForm;