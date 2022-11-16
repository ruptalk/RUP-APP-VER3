import React, { useState,useEffect, useRef } from 'react';
import {
    View,
    StyleSheet,
    Modal,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
    PanResponder,
    Image,
    TouchableOpacity,
    TextInput,
    Text,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import KakaoSDK from '@actbase/react-kakaosdk'
import { useToast } from "react-native-toast-notifications";
import {validateNickName,validateEmail,validatePw} from '../../../validate.js'
import SearchUniversity from '../SearchUniversity.js';
import SearchMajor from '../SearchMajor.js'
import uuid from 'react-native-uuid';
import styles from './style'

const BottomSheet_login = (props) => {
    const { modalVisible, setModalVisible } = props;
    const screenHeight = Dimensions.get("screen").height;
    const panY_login = useRef(new Animated.Value(screenHeight)).current;
    const [selectedTab, setSelectedTab] = useState('Login');
    const [isNameBlank,setIsNameBlank]=useState('NotBlankName')
    const navigation = useNavigation()
    const [userName,setUserName]=useState(null)
    const [nameCheke,setNameCheck]=useState(false)
    const [userEmail,setUserEmail]=useState('')
    const [userPw,setUserPw]=useState('')
    const [userPwAgain,setUserPwAgain]=useState('')
    const [userUniversity,setUserUniversity]=useState('학교찾기')
    const [userMajor,setUserMajor]=useState('학과')
    const [universityModal, setUniversityModal] = useState(false);
    const [majorModal, setMajorModal] = useState(false);
    const [openToastMessage,setOpenToastMessage]=useState(0)
    const [loginEmail,setLoginEmail]=useState('')
    const [loginPw,setLoginPw]=useState('')
    const [uid,setUid]=useState(null)
    const toast = useToast();
    const signInWithKakao=async()=>{
        await KakaoSDK.init("6d2aa639e8ea6e75a8dd34f45ad60cf0")
        try{
            const token = await KakaoSDK.login();
            setModalVisible(false)
            navigation.reset({routes:[{name:'Main'}]})
        }catch(err){
            if(err.message==='user cancelled.')
                console.log('toast message 카카오 로그인 취소하셨습니다')
            console.log(err.message)
        }
      }

    const loginSignUpSelectedTab = () => {    
        switch(selectedTab){
            case 'Login':
                return <Login />
            case 'SignUp':
                return <SignUp />
        }
    }

    const Login=()=>{
        const [email,setEmail]=useState('')
        const [pw,setPw]=useState('')
        return(       //Login 아이콘 클릭시 띄울 화면
            <>  
                <View>
                    <TextInput
                        placeholder='이메일'
                        style={styles.sectionStyle}
                        onChangeText={email => setEmail(email)}
                    />
                    <TextInput
                        placeholder='비밀번호'
                        style={styles.sectionStyle}
                        onChangeText={pw => setPw(pw)}
                    />
                    <TouchableOpacity
                        onPress={()=>
                            {
                                //navigation.reset({routes:[{name:'Main'}]})
                                postLogin(email,pw)
                            }}
                        style={styles.signUp}
                    >
                        <Text style={styles.signUpText}>로그인</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={{margin:'5%'}}/> */}
                <View>
                    <TouchableOpacity onPress={signInWithKakao} style={styles.kakaoLogin}>
                        <View style={styles.twentyPercent}>
                            <Image style={styles.kakaoSymbolImage} source={require('../../../imageResource/jobDaHan/kakao_login_symbol.png')}/>
                        </View>
                        <View style={styles.kakaoLoginTextView}>
                            <Text style={styles.kakaoLoginText}>카카오 로그인</Text>
                        </View>
                        <View style={styles.twentyPercent}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    onPress={()=>
                    {
                        setModalVisible(false),
                        navigation.navigate('FindPassword')
                    }}>
                    <Text style={styles.passwordPage}>비밀번호를 잊으셨나요?</Text>
                </TouchableOpacity>
            </>
        )
    }
    const SignUp=()=>{
        const [name,setName] = useState(userName)
        const [email,setEmail] = useState(userEmail)
        const [pw,setPw] = useState(userPw)
        const [pwAgain,setPwAgain] = useState(userPwAgain)
        return(    //SignUp 아이콘 클릭시 띄울 화면
            <>
                <ScrollView>
                    <View style={{flexDirection:'row'}}>
                        <TextInput
                            placeholder='닉네임(2~16자)'
                            style={styles.sectionStyle2}
                            onChangeText={name => setName(name)}
                            defaultValue={userName}
                            />
                        <TouchableOpacity 
                            onPress={()=>validation_nickName(name)}
                            style={styles.nickNameCheck}
                        >
                            <Text style={{fontSize:12,color:'white'}}>중복 확인</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        placeholder='이메일'
                        style={styles.sectionStyle}
                        onChangeText={email => setEmail(email)}
                        defaultValue={email}
                        />
                    <TextInput
                        placeholder='비밀번호(4자 이상)'
                        style={styles.sectionStyle}
                        onChangeText={pw => setPw(pw)}
                        defaultValue={pw}
                        secureTextEntry={true}
                        />
                    <TextInput
                        placeholder='비밀번호 재입력'
                        style={styles.sectionStyle}
                        onChangeText={pwAgain => setPwAgain(pwAgain)}
                        defaultValue={pwAgain}
                        secureTextEntry={true}
                        />
                    <View style={styles.rowDirection}>    
                        <TouchableOpacity                                                  
                            style={[styles.sectionStyle,{flexDirection:'row',alignItems:'center'}]}
                            onPress={()=>userUniversityModalOpen(name,email,pw,pwAgain)}
                        >
                            <Image style={styles.imageStyle} source={require('../../../imageResource/jobDaHan/search.png')}/>
                            <Text>{userUniversity}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.sectionStyle,{flexDirection:'row',alignItems:'center'}]}
                            onPress={()=>userMajorModalOpen(name,email,pw,pwAgain)}
                        >
                            <Image style={styles.imageStyle} source={require('../../../imageResource/jobDaHan/triangle.png')}/>
                            <Text >{userMajor}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <TouchableOpacity
                    onPress={()=>signUp(name,email,pw,pwAgain)}
                    style={styles.signUp}
                >
                    <Text style={styles.signUpText}>가입하기</Text>
                </TouchableOpacity>
            </>
        )
    }
    const signUp=async(name,email,pw,pwAgain)=>{
        setUserName(name)
        setUserEmail(email)
        setUserPw(pw)
        setUserPwAgain(pwAgain)
        setOpenToastMessage(openToastMessage+1)
    }
    const userDefaultValue=(name,email,pw,pwAgain)=>{
        console.log(name)
        setUserName(name)
        setUserEmail(email)
        setUserPw(pw)
        setUserPwAgain(pwAgain)
    }
    useEffect(() => {
        if(openToastMessage!==0){
            isName()
        }
    }, [openToastMessage]);
    useEffect(()=>{
        if(uid!==null){
            console.log(uid)
            postSignUp()
        }
    },[uid])
    const validation_nickName=(name)=>{                    //닉네임 유효성 검사
        if(validateNickName(name)){
            return nickToServer(name)
        }
        else{
            return showToast("닉네임은 2~16자 입니다.")
        }
    }
    const nickToServer=(name)=>{
        fetch('http://13.124.80.15/user/nickname-check',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              nickname:name
            })
        })
        .then(res=>{return res.json()})
        .then(data=>{
            console.log(data)
            if(data.success===true){
                showToast('중복 확인 완료')
                setUserName(name)
                setNameCheck(true)
            }else{
                showToast('이미 존재하는 닉네임 입니다.')
            }
        })
        .catch(error=>console.log('ERROR'))
    }
    const isName=()=>{
        if(nameCheke===false){
            showToast('닉네임 중복확인을 해주세요')
        }else{
            console.log(userName)
            return validation_email()
        }
    }
    const validation_email=()=>{                       //이메일 유효성 검사
        if(validateEmail(userEmail)){
            return validation_pw()
        }
        else{
            return showToast("이메일 형식이 맞지 않습니다.")
        }
    }
    const validation_pw=()=>{                           //비밀번호 유효성 검사
        if(validatePw(userPw)){
            return matchPwAndPw2()
        }
        else{
            return showToast("비밀번호는 4자 이상 입니다.")
        }
    }
    const matchPwAndPw2=()=>{                           //비밀번호, 비밀번호 재입력 같은지 검사
        if(userPw===userPwAgain){
           return validation_university()
        }
        else{
            return showToast("비밀번호 불일치")
        }
    }
    const validation_university=()=>{                           //비밀번호 유효성 검사
        if(userUniversity!=='학교찾기'){
            return validation_major()
        }
        else{
            return showToast("학교를 선택해주세요!")
        }
    }
    const validation_major=()=>{                           //비밀번호 유효성 검사
        if(userMajor!=='학과'){
            return setUid(uuid.v4())
        }
        else{
            return showToast("학과를 선택해주세요!")
        }
    }
    const showToast=(message)=>{                        //토스트 메세지
        toast.show(message,{
            type:'custom',
            duration:1500,
            animationType:'zoom-in',
            placement:'top',
        })
    }
    const postSignUp=()=>{
        fetch('http://13.124.80.15/user/add-new-user',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                uid:uid, // 필수
                email:userEmail, // 필수
                password:userPw,
                nickname: userName,
                sex : "M",
                birth: "1999-04-05",
                college: userUniversity,
                major:userMajor
            })
        })
        .then(res=>{return res.json()})
        .then(data=>{
            console.log(data)
            if(data.success===true){
                showToast('회원가입 완료!')
                setSelectedTab('Login')
            }else{
                showToast('회원가입 안됨')
            }
        })
        .catch(error=>console.log('ERROR'))
    }
    const postLogin=(email,pw)=>{
        fetch('http://13.124.80.15/user/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
              email: email,
              password: pw
            })
        })
        .then(res=>{return res.json()})
        .then(data=>{
            console.log(data)
            if(data.success===true){
                navigation.reset({routes:[{name:'Main'}]})
                setModalVisible(false)
            }else{
                showToast('이메일 또는 비밀번호가 틀렸습니다.')
            }
        })
        .catch(error=>console.log('ERROR'))
    }

    const translateY_login = panY_login.interpolate({
        inputRange: [-1, 0, 1],
        outputRange: [0, 0, 1],
    });

    const resetBottomSheet_login = Animated.timing(panY_login, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
    });

    const closeBottomSheet_login = Animated.timing(panY_login, {
        toValue: screenHeight,
        duration: 300,
        useNativeDriver: true,
    });

    const panResponders_login = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => false,
        onPanResponderMove: (event, gestureState) => {
            panY_login.setValue(gestureState.dy);
        },
        onPanResponderRelease: (event, gestureState) => {
            if(gestureState.dy > 0 && gestureState.vy > 0.3) {
                closeModal();
            }
            else {
                resetBottomSheet_login.start();
            }
        }
    })).current;

    useEffect(()=>{
        if(props.modalVisible) {
            resetBottomSheet_login.start();
        }
    }, [props.modalVisible]);

    const closeModal = () => {
        setSelectedTab('Login')
        closeBottomSheet_login.start(()=>{
            setModalVisible(false);
        })
    }
    const userUniversityModalOpen=(name,email,pw,pwAgain)=>{
        userDefaultValue(name,email,pw,pwAgain)
        setUniversityModal(true);
    }
    const userMajorModalOpen=(name,email,pw,pwAgain)=>{
        userDefaultValue(name,email,pw,pwAgain)
        setMajorModal(true);
    }
    return (
        <>
            <Modal
                visible={modalVisible}
                animationType={"fade"}
                transparent
                statusBarTranslucent
                onRequestClose={()=>closeModal()}
            >
                <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : 'height'}
                style={{ flex: 1 }}
                keyboardVerticalOffset={-70}
                >
                    <View style={styles.overlay}>
                        <TouchableWithoutFeedback
                            onPress={closeModal}
                        >
                            <View style={styles.background}/>
                        </TouchableWithoutFeedback>
                        <Animated.View
                            style={[{...styles.bottomSheetContainer, transform: [{ translateY: translateY_login }]}]}
                            {...panResponders_login.panHandlers}
                        >
                            <View style={{padding:3}}/>
                            <Image style={{width:100,height:3.5,borderRadius:50}} source={require('../../../imageResource/jobDaHan/modalBar.png')}/>
                            <View style={styles.iconDirection}>
                                <View style={{flex:1}}/>
                                <TouchableOpacity
                                    onPress={()=>setSelectedTab('Login')}
                                    style={styles.iconLocation}>
                                    
                                    <Image source={require('../../../imageResource/icon/ic_login.png')}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={()=>setSelectedTab('SignUp')}
                                    style={styles.iconLocation}>
                                    <Image source={require('../../../imageResource/icon/ic_join.png')}/>
                                </TouchableOpacity>
                                <View style={{flex:1}}/>
                            </View>
                            {loginSignUpSelectedTab()}
                        </Animated.View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
            <SearchUniversity
                universityModal={universityModal}
                setUniversityModal={setUniversityModal}
                setUserUniversity={setUserUniversity}
            />
            <SearchMajor
                majorModal={majorModal}
                setMajorModal={setMajorModal}
                setUserMajor={setUserMajor}
            />
        </>
    )
}

export default BottomSheet_login;