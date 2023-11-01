import * as React from 'react';
import { RegistrationForm, DeliveryMansStatisticForm, LogoutBtn } from '../components';
import styled from 'styled-components';

const AdminScreen = ({ navigation }) => (
    <Container>
        <RegistrationForm navigate={navigation.navigate}></RegistrationForm>
        
        <DeliveryMansStatisticForm navigate={navigation.navigate}></DeliveryMansStatisticForm>

        <LogoutBtn navigation={navigation} parent={this} />

    </Container>
);

AdminScreen.navigationOptions = {
    title: "Админ панель",
    defaultNavigationOptions: {
        gesturesEnabled: false,
    },
    headerLeft: ()=> null,
    headerTintColor: '#2a86ff',
    headerStyle: {
        // backgroundColor: '#06bcee',
        elevation: 0.8,
        shadowOpacity: 0.8
    }
}

const Container = styled.View`
    flex: 1;
`;

export default AdminScreen;