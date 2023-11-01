import styled from 'styled-components/native';
import { Pressable, View } from "react-native";

const DeliveriesToCustomer = ({ navigate, item }) => {
    const { customer, car, active, time, addressDelivery } = item;

    return (
        <GroupItem onPress={navigate.bind(this, 'DeliveryDetail', item)}>
            <Pressable onPress={() => {
                console.log("Press");
            }}>
                <CarImg 
                    source={{
                        uri: car.img
                    }}
                />
            </Pressable>

            <View style={{ flex: 1 }}>
                <FullName>{customer.fullName}</FullName>
                <GrayText>{addressDelivery}</GrayText>
            </View>

            <GroupDate active={active}>{time}</GroupDate>

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

const GroupItem = styled.TouchableOpacity`
    align-items: center;
    flex-direction: row;
    padding: 20px;
    border-bottom-width: 1px;
    border-bottom-color: #c3dcff;
`;

export default DeliveriesToCustomer;