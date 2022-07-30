import React,{useEffect,useState} from 'react'
import {
    View,
    Image,
    Dimensions,
    StyleSheet,
    Alert,
    BackHandler,
    Text,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import { useNavigation,useIsFocused } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv'
import BottomSheet_InFullBloom from './BottomSheet_InFullBloom';
import styles from './style';

export const storage = new MMKV()
function InFullBloom(){
    const screenHeight = Dimensions.get("screen").height //phone 높이,폭 px
    const screenWidth = Dimensions.get("screen").width
    const jsonUser = storage.getString('user') // { 'userName': '박재연', 'point': 0 }
    const userObject = JSON.parse(jsonUser)
    const isFocused = useIsFocused();
    const navigation = useNavigation()
    const [modalVisible,setModalVisible]=useState(false)
    const [recycle,setRecycle]=useState(userObject.recycle)
    const [point,setPoint]=useState(userObject.point)
    useEffect(() => {}, [isFocused]); //isFocused로 화면 전환시 리렌더링
    return(
        <View style={{flex:1}}>
            <ImageBackground style={{
                    height: '100%',
                    flex: 1,
                    width: '100%',
                }}
                source={require('../../../imageResource/background/bg_06.png')}>
                <View>
                    <View style={{flexDirection:'row',height:'15%'}}>
                        <View style={{width:'62%',justifyContent:'center'}}>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity 
                                    onPress={()=>navigation.navigate('Profile')}
                                    style={styles.profileImageContainer}>
                                    <Image 
                                        source={{uri:userObject.profileImage}}
                                        style={styles.profileImage}/>
                                </TouchableOpacity>
                                <View style={{justifyContent:'center',marginLeft:'5%'}}>
                                    <Text style={styles.name}>{userObject.userName}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{width:'38%',flexDirection:'row'}}>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                                <Image style ={{width:30,height:30}} source={require('../../../imageResource/icon/ic_recycle_0.png')}/>
                                <Text style={styles.name}>+{recycle}</Text>
                            </View>
                            <View style={{flex:1,alignItems:'center',justifyContent:'center',flexDirection:'column',marginRight:'20%'}}>
                                <Image style ={{width:30,height:30,}} source={require('../../../imageResource/icon/ic_point.png')}/>
                                <Text style={styles.name}>{point}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{height:'70%'}}/>
                    <View style={{height:'15%',justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>setModalVisible(true)}>
                            <Text style={styles.QrText}>QR코드</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <BottomSheet_InFullBloom
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                />
            </ImageBackground>
        </View>
    )
}
export default InFullBloom


//51 55줄 text userObject.xxx-> useState 로 바꾸기//51 55줄 text userObject.xxx-> useState 로 바꾸기//51 55줄 text userObject.xxx-> useState 로 바꾸기
//51 55줄 text userObject.xxx-> useState 로 바꾸기//51 55줄 text userObject.xxx-> useState 로 바꾸기//51 55줄 text userObject.xxx-> useState 로 바꾸기
//51 55줄 text userObject.xxx-> useState 로 바꾸기//51 55줄 text userObject.xxx-> useState 로 바꾸기//51 55줄 text userObject.xxx-> useState 로 바꾸기
//51 55줄 text userObject.xxx-> useState 로 바꾸기//51 55줄 text userObject.xxx-> useState 로 바꾸기//51 55줄 text userObject.xxx-> useState 로 바꾸기

//style변경//style변경//style변경//style변경//style변경//style변경//style변경//style변경//style변경//style변경