import styled from 'styled-components/native';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { URL, IMAGE_URL } from '../../config';
import { Pressable } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const CarDetail = ({ carId, navigation  }) => {

    const [carInfo, setCarInfo] = useState(Object);

    const [isLoading, setIsLoading] = useState(false);

    const [showCarImg, setShowCarImg] = useState(false);

    useEffect(() => {

        function getCarInfo (carId) {
            setIsLoading(true);
            AsyncStorage.getItem('userInfo').then(res => { 
                let token = res.toString().split("\"")[3];

                axios
                    .get(`${URL}/cars/${carId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                            }
                    })
                    .then(res => {
                        const data = res.data;
                        
                        setCarInfo(data);
                        setIsLoading(false);
                    })
                    .catch(e => {
                        console.log(`Server error ${e}`);
                        setIsLoading(false);
                    })
            })
        }
        getCarInfo(carId);
    }, []);

    console.log(carInfo);

    return (

        <CarInfoContainer>

            <Spinner visible={isLoading} />

            <Pressable onPress={() => {
                                navigation.navigate.bind('CarImg');
            }}>
                <CarImg 
                    source={{
                        uri:
                        `${IMAGE_URL}/${carInfo.image}`,
                    }}
                />
            </Pressable>

            <CarInfoBlock>
                <FullName>{carInfo.brand} {carInfo.model}</FullName>
                <InfoRow>
                    <LabelText>Кузов:</LabelText>
                    <AttributeValue>{carInfo.body}</AttributeValue>
                </InfoRow>
                <InfoRow>
                    <LabelText>Цвет:</LabelText>
                    <AttributeValue>{carInfo.color}</AttributeValue>
                </InfoRow>
                <InfoRow>
                    <LabelText>Привод:</LabelText>
                    <AttributeValue>{carInfo.drive}</AttributeValue>
                </InfoRow>
                <InfoRow>
                    <LabelText>КПП:</LabelText>
                    <AttributeValue>{carInfo.transmission}</AttributeValue>
                </InfoRow>
                <InfoRow>
                    <LabelText>Мощность:</LabelText>
                    <AttributeValue>{carInfo.power} лс</AttributeValue>
                </InfoRow>
                <InfoRow>
                    <LabelText>Пробег:</LabelText>
                    <AttributeValue>{carInfo.mileage} км</AttributeValue>
                </InfoRow>
                <InfoRow>
                    <LabelText>Год выпуска:</LabelText>
                    <AttributeValue>{carInfo.year}</AttributeValue>
                </InfoRow>
                <InfoRow>
                    <LabelText>Цена /день:</LabelText>
                    <AttributeValue>{carInfo.price} Р</AttributeValue>
                </InfoRow>
                <InfoRow>
                    <LabelText>WIN:</LabelText>
                    <AttributeValue>{carInfo.win_Number}</AttributeValue>
                </InfoRow>
            </CarInfoBlock>
        </CarInfoContainer>
    );
};

const FullName = styled.Text`
    font-weight: 600;
    font-size: 25px;
    text-align: center;
    color: #2a86ff;
`;

const CarImgFullScreen = styled.Image`
    display: flex;
    width: 100%;
    height: 500px;
`;

const CarImg = styled.Image`
    width: 100%;
    height: 150px;
`;

const CarInfoBlock = styled.View`
    width: 100%;
`;

const CarInfoContainer = styled.View`
    padding: 10px 20px 0 20px;
    margin-top: 20px;
    border-top-width: 1px;
    border-top-color: #c3dcff;
`;

const InfoRow = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 3px;
`;

const LabelText = styled.Text`
    font-size: 25px;
    color: #88979F;
`;

const AttributeValue = styled.Text`
    font-size: 25px;
`;

export default CarDetail;