import * as React from 'react';
import { Login } from '../../components';

const LoginScreen = ({ navigation }) => (
    <Login navigation={navigation}></Login>
);

LoginScreen.navigationOptions = {
    title: null,
    headerLeft: () => {},
    defaultNavigationOptions: {
        gesturesEnabled: false,
    },
    headerTintColor: '#2a86ff',
    headerStyle: {
        backgroundColor: '#06bcee',
        elevation: 0.8,
        shadowOpacity: 0.8
    },
}

export default LoginScreen;