import { React, useState, useEffect } from "react";
import { Button, Alert, Text, TextInput, Pressable, View, StyleSheet } from "react-native";
import styled from 'styled-components';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL } from "../../config";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Spinner from "react-native-loading-spinner-overlay";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Dropdown } from 'react-native-element-dropdown';

const DeliveryMansStatisticForm = ({navigate}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorDeliverymanNull, setIsErrorDeliverymanNull] = useState(false);

    const [showStatisticForm, setShowStatisticForm] = useState(false);
    const [showStatistic, setShowStatistic] = useState(false);

    //Date picker
    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const [dateStart, setDateStart] = useState(new Date());
    const [dateEnd, setDateEnd] = useState(new Date());

    const [showDateStartInput, setShowDateStartInput] = useState(false);
    const [showDateEndInput, setShowDateEndInput] = useState(false);

    const onChangeDateStart = (e, selectedDate) => {
        setDateStart(selectedDate);
        setShowDateStartInput(false);
    }

    const onChangeDateEnd = (e, selectedDate) => {
        setDateEnd(selectedDate);
        setShowDateEndInput(false);
    }
    //Date picker

    const [deliverymans, setDeliverymans] = useState([]);
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const [countDelivery, setCountDelivery] = useState(0);
    const [summaryPriceDelivery, setSummaryPriceDelivery] = useState(0);

    function getDeliverymanStatistic() {
        setIsLoading(true);

        if (value === null) {
            setIsErrorDeliverymanNull(true);
            setIsLoading(false);
            return;
        }

        AsyncStorage.getItem('userInfo').then(res => { 
            let token = res.toString().split("\"")[3];
            let deliverymanId = value;

            axios
                .get(`${URL}/deliveries/delivery-man-statistic/${deliverymanId}/${formatDate(dateStart)}/${formatDate(dateEnd)}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                            }
                    }
                )
                .then(res => {
                    let data = res.data;
                    setCountDelivery(data.countContracts);
                    setSummaryPriceDelivery(data.summaryPriceDelivery);
                    console.log(data);

                    setShowStatistic(true);
                    setIsLoading(false);
                })
                .catch(e => {
                    Alert.alert("Произошла ошибка", "Проверьте корректность данных и попробуйте ещё раз");
                    console.log(`Server error ${e}`);
                    setIsLoading(false);
                })
        })

    }

    useEffect(() => {

        function getDeliveryMans() {
            setIsLoading(true);
            setDeliverymans([]);

            AsyncStorage.getItem('userInfo').then(res => { 
                let token = res.toString().split("\"")[3];

                axios
                    .get(`${URL}/deliverymans`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                            }
                    })
                    .then(res => {
                        deliverymans.length = 0;
                        const data = res.data;

                        for (let i = 0; i < data.length; i++) {
                            const fio = data[i].fio;
                            const id = data[i].id;

                            deliverymans.push({
                                label: fio,
                                value: id,
                            });
                        }
                        
                        setDeliverymans(deliverymans);
                        setIsLoading(false);
                    })
                    .catch(e => {
                        console.log(`Server error ${e}`);
                        setIsLoading(false);
                    })
            })
            return deliverymans;
        }
        getDeliveryMans();
    }, []);

    return (
    
        <Container>

            <Spinner visible={isLoading}/>

            <ShowStatisticFormButton onPress={() => {
                    setShowStatisticForm(!showStatisticForm);
                }}>

                <ShowStatisticFormButtonBody>

                    <ShowStatisticFormButtonText>Просмотр статистики</ShowStatisticFormButtonText>

                    {showStatisticForm ? 
                        <AntDesign name="minuscircle" size={24} color="black" />
                    :
                        <AntDesign name="pluscircle" size={24} color="black" />
                    }

                </ShowStatisticFormButtonBody>

            </ShowStatisticFormButton>

            {showStatisticForm && 
                <View>

                    {isErrorDeliverymanNull ? 
                        <Text style={datePicker.dateTextError}>Выберите доставщика!</Text>
                    :
                        <Text style={datePicker.dateText}>Доставщик: </Text>
                    }

                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={deliverymans}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Выберите доставщика' : '...'}
                        searchPlaceholder="Поиск..."
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setIsErrorDeliverymanNull(false);
                            setValue(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <Ionicons 
                                style={styles.icon}
                                name="person" 
                                size={24} 
                                color={isFocus ? 'blue' : 'black'}
                            />
                        )}
                    />

                    <Text style={datePicker.dateText}>Период:</Text>

                    <View style={datePicker.dateContainer}>

                        <View style={datePicker.dateSelectionContainer}>
                            <Pressable style={datePicker.dateSelection} onPress={() => setShowDateStartInput(true)}>
                                <Text style={datePicker.dateValue}>{dateStart.toLocaleDateString()}</Text>
                            </Pressable>

                            <Text style={datePicker.dateDeffice}>-</Text>

                            <Pressable style={datePicker.dateSelection} onPress={() => setShowDateEndInput(true)}>
                                <Text style={datePicker.dateValue}>{dateEnd.toLocaleDateString()}</Text>
                            </Pressable>
                        </View>

                    </View>

                    {showDateStartInput && (
                        <DateTimePicker
                            value={dateStart}
                            onChange={onChangeDateStart}
                        />
                    )}

                    {showDateEndInput && (
                        <DateTimePicker
                            value={dateEnd}
                            onChange={onChangeDateEnd}
                        />
                    )}
            
                    <Button title="Найти" onPress={() => getDeliverymanStatistic()}/>
                    
                    {showStatistic && (
                        <View>
                            <Text style={datePicker.dateText}>Количество доставок: {countDelivery}</Text>
                            <Text style={datePicker.dateText}>Общая стоимость: {summaryPriceDelivery}₽</Text>
                        </View>
                    )}

              </View>
            }

        </Container>
    );
}

const Container = styled.View`
    height: 100%;
    padding: 0 25px 25px 25px;
`;

const ShowStatisticFormButton = styled.Pressable`
    border-radius: 30px;
    height: 45px;
    background: #2a86ff;
`;

const ShowStatisticFormButtonBody = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ShowStatisticFormButtonText = styled.Text`
    color: white;
    font-weight: 600;
    font-size: 16px;
    text-align: center;
    marginRight: 10px;
    width: 80%;
`;

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

const datePicker = StyleSheet.create({
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    dateText: {
        marginRight: 10,
        fontSize: 20,
        padding: 2,
        fontWeight: '600',
    },
    dateTextError: {
        marginRight: 10,
        fontSize: 20,
        padding: 2,
        fontWeight: '600',
        color: 'red',
    },
    dateSelectionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        width: '100%',
    },
    dateSelection: {
        padding: 5,
        marginHorizontal: 5,
    },
    dateValue: {
        fontSize: 24,
        color: '#2a86ff',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 50,
        padding: 10,
        backgroundColor: '#e5e5e5'
    },
    dateDeffice: {
        fontSize: 20,
        color: 'black',
    }
});

export default DeliveryMansStatisticForm;