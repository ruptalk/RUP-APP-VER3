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
import BottomSheet_login from './BottomSheet_login.js';
import styles from './style.js';
import { useIsFocused } from '@react-navigation/native';


// import { MMKV } from 'react-native-mmkv'
// export const storage = new MMKV()

const Login = ({props,route}) => {
    // storage.clearAll()
    const [ modalVisible, setModalVisible ] = useState(false);
    const [major,setMajor] = useState("")
    const [university,setUniversity] = useState("")

    const [check,setCheck]=useState(0)
    const pressButton=()=>{
        setModalVisible(true);
    }
    const isFocused = useIsFocused();
    useEffect(()=>{                 ///비밀번호를 잊으셨나요 페이지 들어갔다 나와도 로그인모달 올라오게 하는 함수
        if(check%2===0){
            setCheck(check+1)
            setModalVisible(true)
        }
        else{
            setCheck(check+1)
            setModalVisible(false)
        }
            
        if(route.params!=undefined){
            if(route.params.major!=undefined)
                setMajor(route.params.major)
            if(route.params.university!=undefined)
                setUniversity(route.params.university)
        }    
    },[isFocused])

    return (
        <View style={styles.container}>
            <View style={{marginTop:'25%'}}/>
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
                major={major}            
                university={university}
            />
        </View>
    )
}

export default Login;
