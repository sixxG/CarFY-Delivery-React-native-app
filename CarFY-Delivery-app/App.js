import React, { useState, useEffect } from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { HomeScreen, LoginScreen, DeliveryDetailScreen, AdminScreen, SettingsScreen } from './src/navigation';

const AppNavigatorLogin = createStackNavigator(
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
    Admin: {
      screen: AdminScreen,
    },
    Settings: {
      screen: SettingsScreen,
    }
  },
  {
    initialRouteName: 'Login'
  }
)

const AppNavigatorAuthted = createStackNavigator(
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
    Admin: {
      screen: AdminScreen,
    },
    Settings: {
      screen: SettingsScreen,
    }
  },
  {
    initialRouteName: 'Home'
  }
)

const AppNavigatorAdmin = createStackNavigator(
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
    Admin: {
      screen: AdminScreen,
    },
    Settings: {
      screen: SettingsScreen,
    }
  },
  {
    initialRouteName: 'Admin'
  }
)

const AppContainerLogin = createAppContainer(AppNavigatorLogin);
const AppContainerAuthted = createAppContainer(AppNavigatorAuthted);
const AppContainerAdmin = createAppContainer(AppNavigatorAdmin);

const App = () => {
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
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

    getUserInfo();
  }, []);

  if (userInfo) {
    let validUntil = userInfo.toString().split("\"")[15];
    let role = userInfo.toString().split("\"")[11];

    if (new Date(validUntil) < new Date()) {
      return <AppContainerLogin />;
    } 
    else {
      if (role === "ADMIN") {
        return <AppContainerAdmin />;
      } else {
        return (
          <AppContainerAuthted />
        );
      }
    }

  } else {
    return <AppContainerLogin />;
  }
}

export default App;