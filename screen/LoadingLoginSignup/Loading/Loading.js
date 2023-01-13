import React ,{useEffect}from 'react'
import {View, Image, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv'
import axios from 'axios';
import styles from './style.js';

export const storage = new MMKV()
function Loading(){
    const navigation = useNavigation()
    
    useEffect(()=>{
        if(storage.getString('user')===undefined){
            setTimeout(()=>{navigation.reset({routes:[{name:'Login'}]})}, 1500);
        }
        else{
            const jsonUser = storage.getString('user') // { 'userName': '박재연', 'point': 0 }
            const userObject = JSON.parse(jsonUser)
            axios.get('http://13.124.80.15/home/main', {
                params: {
                uid: userObject.uid
                }
            })
            .then(function (response) {
                const user = {
                    uid:response.data.uid,
                    userName: response.data.nickname,
                    email: response.data.email,
                    password: response.data.password,
                    profileImgPath:response.data.profileImgPath,
                    point:response.data.point,
                    countRecycle:response.data.countRecycle,
                    calendarDate:response.data.calendarDate,
                    flowerRecord:response.data.flowerRecord,
                    birth:response.data.birth,
                    sex:response.data.sex,
                    univ:response.data.college,
                    major:response.data.major,
                    nowFlowerSeed:response.data.nowFlowerSeed, 
                    nowFlowerName:'',
                    flowerUri:{
                        "0" : -1,
                        "1" : -1,
                        "2" : -1,
                        "3" : -1,
                        "4" : -1,
                        "5" : -1,
                        "6" : -1,
                        "7" : -1,
                        "8" : -1,
                        "9" : -1
                    }      
                }      
                storage.set('user', JSON.stringify(user))
                setTimeout(()=>{navigation.reset({routes:[{name:'Main'}]})}, 1500);
            })
            .catch(function (error) {
                console.log(error);
                console.log('fail')
            });
        }
    },[])

    return(
        <View style={styles.container}>
            <Image source={require('../../../imageResource/logo/logo_main.png')}/>
        </View>
    )
}

export default Loading