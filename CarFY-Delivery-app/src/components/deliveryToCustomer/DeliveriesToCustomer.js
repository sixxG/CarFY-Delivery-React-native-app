import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Pressable, View, Modal } from "react-native";
import { IMAGE_CUSTOMER_URL } from '../../config';

const DeliveriesToCustomer = ({ navigation, item, isActiveDelivery }) => {
    const { customer, car, active, time, addressDelivery } = item;

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

    function navigateToDeliveryDetailScreen() {
        navigation.setParams(item);

        if (isActiveDelivery) {
            navigation.navigate('MyActiveDeliveryDetail', {item: item});
        } else {
            navigation.navigate('DeliveryDetail', {item: item});
        }
    }

    return (
        <GroupItem onPress={() => navigateToDeliveryDetailScreen()}>
            <Pressable onPress={() => {
                setOpenModal(true);
            }}>
                <CarImg 
                    source={{
                        uri: `${IMAGE_CUSTOMER_URL}/${customer.img}`,
                    }}
                    defaultSource={require('../../../assets/icon.png')}
                />
            </Pressable>

            <View style={{ flex: 1 }}>
                <FullName>{customer.fullName}</FullName>
                <GrayText>{addressDelivery}</GrayText>
            </View>

            <GroupDate active={active}>{time}</GroupDate>

            {renderModal(customer.img)}

        </GroupItem>    
    );
}

DeliveriesToCustomer.defaultProps = {
    title: "Untitled",
    items: []
}

const GroupDate = styled.Text`
    background: ${props => props.active ? '#46F046' : '#bcfabc'};
    border-radius: 18px;
    font-weight: 600;
    font-size: 16px;
    width: 70px;
    height: 35px;
    text-align: center;
    line-height: 35px;
`;

const GrayText = styled.Text`
    font-size: 16px;
    color: #88979F;
`;

const FullName = styled.Text`
    font-weight: 600;
    font-size: 16px;
`;

const CarImg = styled.Image`
    border-radius: 50px;
    width: 40px;
    height: 40px;
    margin-right: 15px;
`;

const CarImgPopup = styled.Image`
    border-radius: 20px;
    width: 100%;
    height: 100%;
`;

const GroupItem = styled.TouchableOpacity`
    align-items: center;
    flex-direction: row;
    padding: 20px;
    border-bottom-width: 1px;
    border-bottom-color: #c3dcff;
`;

export default DeliveriesToCustomer;