import { React, useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../context/AuthContext";
import styled from 'styled-components/native';

const HomeScreen = () => {

    const {userInfo, isLoading, logout} = useContext(AuthContext);

    return (
        // <View style={styles.container}>
        //     <Spinner visible={isLoading}/>
        //     <Text>Welcome {userInfo.username}</Text>
        //     <Pressable style={styles.loginButton} onPress={logout}>
        //             <Text style={styles.loginButtonText}>Выйти</Text>
        //     </Pressable>
        // </View>

        <Container>
            <Group>
                <GroupTitle>10 октября</GroupTitle>

                <GroupItem>
                    <Pressable onPress={() => {
                        console.log("Press");
                    }}>
                        <CarImg 
                            source={{
                                uri:
                                    'https://img.championat.com/s/1350x900/news/big/y/g/avatar-2-sobral-v-rossii-bolshe-2-4-mlrd-rublej_16758793371084217002.jpg'
                            }}
                        />
                    </Pressable>

                    <View style={{ flex: 1 }}>
                        <FullName>Иванов Иван Иванович</FullName>
                        <GrayText>Описание доставки</GrayText>
                    </View>

                    <GroupDate active>15:40</GroupDate>

                </GroupItem>

                <GroupItem>
                    <Pressable onPress={() => {
                        console.log("Press");
                    }}>
                        <CarImg 
                            source={{
                                uri:
                                    'https://img.championat.com/s/1350x900/news/big/y/g/avatar-2-sobral-v-rossii-bolshe-2-4-mlrd-rublej_16758793371084217002.jpg'
                            }}
                        />
                    </Pressable>

                    <View style={{ flex: 1 }}>
                        <FullName>{userInfo.username}</FullName>
                        <GrayText>{userInfo.token}</GrayText>
                    </View>

                    <GroupDate>15:40</GroupDate>

                </GroupItem>
                
            </Group>
            <Pressable style={styles.loginButton} onPress={logout}>
                <Text style={styles.loginButtonText}>Выйти</Text>
            </Pressable>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#808080'
        backgroundColor: 'white',
    },
    wrapper: {
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        borderRadius: 20,
        backgroundColor: '#404040',
    },
    input: {
        marginBottom: 12,
        borderWidth: 2,
        textAlign: "center",
        backgroundColor: '#E5E3E3',
        padding: 10,
        fontSize: 20,
        borderColor: '#bbb',
        borderRadius: 15,
        width: '100%',
    },
    loginButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 15,
        backgroundColor: '#46F046',
        width: '100%',

    },
    loginButtonText: {
        fontSize: 35,
        fontWeight: 'bold',
        color: 'black',
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 25,
    }
});

const GroupDate = styled.Text`
    background: ${props => props.active ? '#46F046' : '#bcfabc'};
    border-radius: 18px;
    font-weight: 600;
    font-size: 16px;
    width: 70px;
    height: 35px;
    text-align: center;
    line_height: 35px;
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
    padding: 20px 0;
    border-bottom-width: 1px;
    border-bottom-color: #c3dcff;
`;

const GroupTitle = styled.Text`
    font-weight: 800;
    font-size: 22px;
    color: #4294ff;
`;

const Group = styled.View`
    padding: 0 20px;
`;

const Container = styled.View`
    flex: 1;
    margin-top: 50px;
`;

export default HomeScreen;