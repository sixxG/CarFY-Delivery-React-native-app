import { React, useState, createContext, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

axios.defaults.timeout = 5000;

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    
    const [userInfo, setUserInfo] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isErrorAuth, setIsErrorAuth] = useState(false);
    const [splashLoading, setSplashLoading] = useState(false);

    const login = (username, password) => {
        setIsLoading(true);
        setIsErrorAuth(false);

        const body = {
            username: username,
            password: password,
        };

        axios
            .post(`${BASE_URL}auth/authenticate`, {
                username,
                password
            })
            .then(res => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
                setIsLoading(false);
            })
            .catch(e => {
                console.log(`login error ${e}`);
                setIsLoading(false);
                setIsErrorAuth(true);


                // let userInfo = {
                //     username: "oleg",
                //     token: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJvbGVnIiwiaWF0IjoxNjk2NzY5MzE1LCJleHAiOjE2OTY3NzA3NTV9.9MWwquwlElKVNRLa1VahrdoJnus-yd2ykrLSCQNx-og"
                // };
                // setUserInfo(userInfo);
            })
    };

    const logout = () => {
        setIsLoading(true);

        // axios.post(`${BASE_URL}/logout`, {}, {
        //     headers: {Authorization: `Bearer ${userInfo.token}`},
        // }).then(res => {
        //     AsyncStorage.removeItem('userInfo');
        //     setUserInfo({});
        //     setIsLoading(false);
        // }).catch(e => {
        //     console.log(`logout error ${e}`);
        //     setIsLoading(false);
        // });

        AsyncStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoading(false);
    };

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);

            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if (userInfo) {
                setUserInfo(userInfo);
            }

            setSplashLoading(false);
        } catch (e) {
            setSplashLoading(false);
            console.log(`is logged in error ${e}`);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                isErrorAuth,
                userInfo,
                splashLoading,
                setIsErrorAuth,
                login,
                logout,
            }} >
            {children}
        </AuthContext.Provider>
    )
}