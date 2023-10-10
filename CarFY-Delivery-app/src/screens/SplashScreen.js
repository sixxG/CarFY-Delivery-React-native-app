import { React } from 'react';
import { View, ActivityIndicator } from 'react-native';

const SplashScreen = () => {
    return (
        <View style={{flex: 1, justifyContent: 'center', backgroundColor: '#06bcee'}}>
            <ActivityIndicator size="large" color="#fff" />
        </View>
    )
};

export default SplashScreen;