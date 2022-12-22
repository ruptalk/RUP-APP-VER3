import React ,{useEffect}from 'react'
import {View, Image, StyleSheet} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv'
import styles from './style.js';

export const storage = new MMKV()
function Loading(){
    const navigation = useNavigation()
    
    useEffect(()=>{
        if(storage.getString('user')===undefined){
            setTimeout(()=>{navigation.reset({routes:[{name:'Login'}]})}, 1500);
        }
        else{
            setTimeout(()=>{navigation.reset({routes:[{name:'Main'}]})}, 1500);
        }
    },[])

    return(
        <View style={styles.container}>
            <Image source={require('../../../imageResource/logo/logo_main.png')}/>
        </View>
    )
}

export default Loading