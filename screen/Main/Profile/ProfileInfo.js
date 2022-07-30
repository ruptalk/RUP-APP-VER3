import React ,{useState}from 'react'
import {
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    KeyboardAvoidingView
} from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { useNavigation } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import styles from './style.js'

export const storage = new MMKV()
const ProfileInfo=()=>{
    const navigation = useNavigation()
    const toast = useToast();
    const jsonUser = storage.getString('user')
    const userObject = JSON.parse(jsonUser)
    const [name,setName] = useState(userObject.userName)
    const [email,setEmail] = useState(userObject.email)
    const [phoneNumber,setPhoneNumber] = useState(userObject.phoneNumber)
    const [pw,setPw]= useState(userObject.pw)
    const [placeHolderName,setPlaceHolderName] = useState(userObject.userName)
    const [placeHolderEmail,setPlaceHolderEmail] = useState(userObject.email)
    const [placeHolderPhoneNumber,setPlaceHolderPhoneNumber] = useState(userObject.phoneNumber)
    const [placeHolderPw,setPlaceHolderPw]= useState(userObject.pw)
    const editProfile=()=>{
        userObject.userName = name
        userObject.email = email
        userObject.phoneNumber = phoneNumber
        userObject.pw = pw
        storage.set('user', JSON.stringify(userObject))

        setPlaceHolderName(name)
        setPlaceHolderEmail(email)
        setPlaceHolderPhoneNumber(phoneNumber)
        setPlaceHolderPw(pw)
    }
    const showToast = () => {
        toast.show("수정되었습니다!",{  //https://github.com/arnnis/react-native-toast-notifications
            type:'custom',
            duration:1000,
            animationType:'zoom-in',
        })
      }
    return(
        <View>
            <Text style={styles.profileText}>이름</Text>
            <View style={styles.middle}>
                <TextInput 
                    placeholder={placeHolderName}
                    style={styles.sectionStyle}
                    onChangeText={name => setName(name)}
                    defaultValue={placeHolderName}/>
            </View>
            <Text style={styles.profileText}>이메일</Text>
            <View style={styles.middle}>
                <TextInput 
                    placeholder={placeHolderEmail}
                    style={styles.sectionStyle}
                    onChangeText={email => setEmail(email)}
                    defaultValue={placeHolderEmail}/>
            </View>
            <Text style={styles.profileText}>전화번호</Text>
            <View style={styles.middle}>
                <TextInput 
                    placeholder={placeHolderPhoneNumber}
                    style={styles.sectionStyle}
                    onChangeText={phoneNumber => setPhoneNumber(phoneNumber)}
                    defaultValue={placeHolderPhoneNumber}/>
            </View>
            <Text style={styles.profileText}>비밀번호</Text>
            <View style={styles.middle}>
                <TextInput 
                    placeholder={placeHolderPw}
                    style={styles.sectionStyle}
                    onChangeText={pw => setPw(pw)}
                    defaultValue={placeHolderPw}/>
            </View>
            <View style={{marginTop:'4%'}}/>
            <View style={styles.middle}>
                <View>
                    <TouchableOpacity 
                        onPress={()=>{editProfile(),showToast()}}
                        style={styles.signUp}
                    >
                        <Text style={styles.editProfileButton}>수정</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity 
                        onPress={()=>{
                            storage.clearAll()
                            navigation.reset({routes:[{name:'Login'}]})
                        }}
                        style={styles.secretSignUp}>
                        <Text style={styles.do_login_text}>로그아웃</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.secretSignUp}>
                        <Text style={styles.do_login_text}>의견 남기기</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default ProfileInfo

//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업
//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업
//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업
//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업
//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업
//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업
//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업//58줄 수정버튼 onPress 작업