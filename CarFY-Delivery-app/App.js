import React, { useState, useEffect } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HomeScreen, LoginScreen, DeliveryDetailScreen, AdminScreen, CarImgFullScreen } from './src/screens';

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Login: {
      screen: LoginScreen,
    },
    DeliveryDetail: {
      screen: DeliveryDetailScreen,
    },
    CarImg: {
      screen: CarImgFullScreen,
    },
    Registration: {
      screen: AdminScreen,
    }
  },
  {
    initialRouteName: 'Login'
  }
)

const AppContainer = createAppContainer(AppNavigator);

const App = () => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    // Функция для асинхронного получения данных из AsyncStorage
    const getUserInfo = async () => {
      try {
        const res = await AsyncStorage.getItem('userInfo');
        if (res) {
          setUserInfo(res);
        }
      } catch (error) {
        console.error('Ошибка при получении данных из AsyncStorage', error);
      }
    }

    // Вызываем функцию для получения данных
    getUserInfo();
  }, []); // Пустой массив зависимостей, чтобы useEffect выполнялся только один раз

  return <AppContainer />;
}

export default App;