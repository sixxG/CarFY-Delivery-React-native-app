import * as React from 'react';
import { Login } from '../components';

const LoginScreen = ({ navigation }) => (
    <Login navigate={navigation.navigate}></Login>
);

LoginScreen.navigationOptions = {
    title: null,
    defaultNavigationOptions: {
        gesturesEnabled: false,
        },
    headerTintColor: '#2a86ff',
    headerStyle: {
        backgroundColor: '#06bcee',
        elevation: 0.8,
        shadowOpacity: 0.8
    }
}

export default LoginScreen;