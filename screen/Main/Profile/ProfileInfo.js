import React ,{useState}from 'react'
import {
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { useNavigation } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import SearchUniversity from '../../LoadingLoginSignup/SearchUniversity';
import SearchMajor from '../../LoadingLoginSignup/SearchMajor'
import KakaoSDK from '@actbase/react-kakaosdk'
import styles from './style.js'

export const storage = new MMKV()
const ProfileInfo=()=>{
    const navigation = useNavigation()
    const toast = useToast();
    const jsonUser = storage.getString('user')
    const userObject = JSON.parse(jsonUser)
    const [name,setName] = useState(userObject.userName)
    const [email,setEmail] = useState(userObject.email)
    const [univ,setUniv] = useState(userObject.univ)
    const [major,setMajor]= useState(userObject.major)
    const [pw,setPw]= useState(userObject.password)
    const [birth,setBirth]= useState(userObject.birth)
    const [sex,setSex] = useState(userObject.sex)
    const [universityModal, setUniversityModal] = useState(false);
    const [majorModal, setMajorModal] = useState(false);
    const [placeHolderName,setPlaceHolderName] = useState(userObject.userName)
    const [placeHolderEmail,setPlaceHolderEmail] = useState(userObject.email)
    const [placeHolderPhoneNumber,setPlaceHolderPhoneNumber] = useState(userObject.phoneNumber)
    const [placeHolderPw,setPlaceHolderPw]= useState(userObject.pw)
    const editProfile=()=>{
        userObject.userName = name
        userObject.email = email
        userObject.password = pw
        storage.set('user', JSON.stringify(userObject))

        setPlaceHolderName(name)
        setPlaceHolderEmail(email)

    }
    const showToast = () => {
        toast.show("수정되었습니다!",{  //https://github.com/arnnis/react-native-toast-notifications
            type:'custom',
            duration:1000,
            animationType:'zoom-in',
        })
      }
    return(
        <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text style={styles.profileText}>학교</Text>
            <View style={styles.middle}>
                <TouchableOpacity
                    style={[styles.sectionStyle,{justifyContent:'center'}]}    
                    onPress={()=>setUniversityModal(true)}
                >
                    <Text>{univ}</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.profileText}>학과</Text>
            <View style={styles.middle}>
                <TouchableOpacity
                    style={[styles.sectionStyle,{justifyContent:'center'}]}    
                    onPress={()=>setMajorModal(true)}
                >
                    <Text>{major}</Text>
                </TouchableOpacity>
            </View>
            {userObject.sex===null && 
                <>
                    <Text style={styles.profileText}>성별</Text>
                    <View style={styles.middle}>
                        <TextInput
                            style={styles.sectionStyle}
                            placeholder='수정'
                        />
                    </View>
                </>}
            {userObject.sex!==null && 
                <>
                    <Text style={styles.profileText}>성별</Text>
                    <View style={styles.middle}>
                        <View style={[styles.sectionStyle,{justifyContent:'center'}]}>
                            <Text>{userObject.sex==='M'?'남':'여'}</Text>
                        </View>
                    </View>
                </>}
            {userObject.birth===null && 
                <>
                    <Text style={styles.profileText}>생일</Text>
                    <View style={styles.middle}>
                        <TextInput
                            style={styles.sectionStyle}
                            placeholder='수정'
                        />
                    </View>
                </>}
            {userObject.sex!==null && 
                <>
                    <Text style={styles.profileText}>생일</Text>
                    <View style={styles.middle}>
                        <View style={[styles.sectionStyle,{justifyContent:'center'}]}>
                            <Text>{userObject.birth}</Text>
                        </View>
                    </View>
                </>}
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
                        onPress={async()=>{
                            //await KakaoSDK.unlink()
                            storage.clearAll()
                            //await KakaoSDK.logout()
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
            <SearchUniversity
                universityModal={universityModal}
                setUniversityModal={setUniversityModal}
                setUserUniversity={setUniv}
            />
            <SearchMajor
                majorModal={majorModal}
                setMajorModal={setMajorModal}
                setUserMajor={setMajor}
            />
        </ScrollView>
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