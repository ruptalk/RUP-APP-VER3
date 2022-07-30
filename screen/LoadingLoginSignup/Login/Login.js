import React, { useState,useEffect } from 'react';
import {
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Text,
    BackHandler,
    Alert
} from 'react-native';
import BottomSheet_login from './BottomSheet_login';
import styles from './style.js';

// import { MMKV } from 'react-native-mmkv'
// export const storage = new MMKV()

const Login = (props) => {
    // storage.clearAll()
    const [ modalVisible, setModalVisible ] = useState(true);

    const pressButton=()=>{
        setModalVisible(true);
    }

    return (
        <View style={styles.container}>
            <Image source = {require('../../../imageResource/logo/logo_main.png')}/>
            <View style={{padding:20}}></View>
            <TouchableOpacity  
                onPress={pressButton}
            >
                <Text>로그인/회원가입</Text>
            </TouchableOpacity>
            <BottomSheet_login
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
        </View>
    )
}

export default Login;
