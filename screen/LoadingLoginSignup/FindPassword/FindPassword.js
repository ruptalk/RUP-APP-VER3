import React ,{useEffect,useState}from 'react'
import {View, Image, StyleSheet,TouchableOpacity,Text,TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import styles from './style.js';

function FindPassword(){
    const navigation = useNavigation()
    const [findPw,setFindPw]=useState('')
    const findPwTab = () => {    
        if(findPw==='비밀번호 찾기 버튼 클릭'){
            return <FindPw/>
        }
    }
    const FindPw=()=>(
        <>
            <Text style={styles.secretText}>사용자 이메일로 비밀번호를 전송 하였습니다.</Text>
            <TouchableOpacity
                onPress={()=>navigation.goBack()}
                style={styles.secretSignUp}>
                <Text style={styles.do_login_text}>로그인 하기</Text>
            </TouchableOpacity>
        </>
    )
    return(
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={()=>navigation.navigate('Login')}
                style={{marginTop:30,marginLeft:30}}                
            >
                <Image source={require('../../../imageResource/icon/ic_arrow_left.png')}/>
            </TouchableOpacity>
            <View style={{flex:1,alignItems:'center',marginTop:'30%'}}>
                <Text style={styles.passwordText}>비밀번호 찾기</Text>
                <TextInput 
                    placeholder='이름을 입력해 주세요.'
                    style={styles.sectionStyle}/>
                    <TextInput 
                    placeholder='이메일을 입력해 주세요.'
                    style={styles.sectionStyle}/>
                <TouchableOpacity 
                    onPress={()=>setFindPw('비밀번호 찾기 버튼 클릭')}
                    style={styles.signUp}>
                    <Text style={styles.signUpText}>비밀번호 찾기</Text>
                </TouchableOpacity>
                {findPwTab()}
            </View>
        </View>
    )
}

export default FindPassword