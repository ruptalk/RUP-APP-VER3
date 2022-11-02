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
import SearchUniversity from './SearchUniversity.js';
import SearchMajor from './SearchMajor.js'
import styles from './style'

const BottomSheet_login = (props) => {
    const { modalVisible, setModalVisible } = props;
    const screenHeight = Dimensions.get("screen").height;
    const panY_login = useRef(new Animated.Value(screenHeight)).current;
    const [selectedTab, setSelectedTab] = useState('Login');
    const [isNameBlank,setIsNameBlank]=useState('NotBlankName')
    const navigation = useNavigation()
    const [userName,setUsername]=useState('')
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
                        secureTextEntry={true}
                    />
                    <TouchableOpacity
                        onPress={()=>
                            {
                                setModalVisible(false)
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
                    <Text style={styles.passwordPage}>비밀번호를 잊으셨나요</Text>
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
                    <TextInput
                        placeholder='닉네임(2~16자)'
                        style={styles.sectionStyle}
                        onChangeText={name => setName(name)}
                        defaultValue={userName}
                        />
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
                            style={styles.searchUniversity}
                            onPress={()=>userUniversityModalOpen(name,email,pw,pwAgain)}
                        >
                            <View style={{flexDirection:'row'}}>
                                <Text>{userUniversity}</Text>
                                {/* <Image style={{resizeMode:'contain',height:'90%',width:'80%',marginLeft:'20%'}} source={require('../../../imageResource/jobDaHan/search.png')}/> */}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.searchMajor}
                            onPress={()=>userMajorModalOpen(name,email,pw,pwAgain)}
                        >
                            <View style={{flexDirection:'row'}}>   
                                <Text >{userMajor}</Text>
                                {/* <Image style={{resizeMode:'contain',height:'90%',width:'80%'}} source={require('../../../imageResource/jobDaHan/triangle.png')}/> */}
                            </View>
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
        setUsername(name)
        setUserEmail(email)
        setUserPw(pw)
        setUserPwAgain(pwAgain)
        setOpenToastMessage(openToastMessage+1)
    }
    const userDefaultValue=(name,email,pw,pwAgain)=>{
        console.log(name)
        setUsername(name)
        setUserEmail(email)
        setUserPw(pw)
        setUserPwAgain(pwAgain)
    }
    useEffect(() => {
        if(openToastMessage!==0){
            validation_nickName()
        }
    }, [openToastMessage]);
    const validation_nickName=()=>{                    //닉네임 유효성 검사
        if(validateNickName(userName)){
            console.log(userName)
            return validation_email()
        }
        else{
            return showToast("닉네임은 2~16자 입니다")
        }
    }
    const validation_university=()=>{                   //대학 유효성 검사
        if(university===''){                            
            return validation_department()
        }
        else{
            return showToast("대학을 선택해주세요")
        }
    }
    const validation_department=(department)=>{                   //학과 유효성 검사
        if(department===''){                            
            return validation_email()
        }
        else{
            return showToast("학과를 선택해주세요")
        }
    }
    const validation_email=()=>{                       //이메일 유효성 검사
        if(validateEmail(userEmail)){
            return validation_pw()
        }
        else{
            return showToast("이메일 형식이 맞지 않습니다")
        }
    }
    const validation_pw=()=>{                           //비밀번호 유효성 검사
        if(validatePw(userPw)){
            return matchPwAndPw2()
        }
        else{
            return showToast("비밀번호는 4자 이상 입니다")
        }
    }
    const matchPwAndPw2=()=>{                           //비밀번호, 비밀번호 재입력 같은지 검사
        if(userPw===userPwAgain){
           return isUniv()
        }
        else{
            return showToast("비밀번호 불일치")
        }
    }
    const isUniv=()=>{
        if(userUniversity!=='학교찾기'){
            return isMajor()
        }
        else{
            return showToast("대학(교)을 선택 해주세요")
        }
    }
    const isMajor=()=>{
        if(userMajor!=='학과'){
            return showToast('회원가입 완료!'),setSelectedTab('Login')
        }
        else{
            return showToast('학과를 선택 해주세요')
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
        fetch()
    }
    const postLogin=(email,pw)=>{
        // fetch('http://3.36.132.101:8080/login',{
        //     method:'POST',
        //     headers:{'Content-Type':'application/json'},
        //     body:JSON.stringify({
        //       email: email,
        //       password: pw
        //     })
        // })
        // .then(res=>res.text().then(data=>console.log(data)))
        navigation.reset({routes:[{name:'Main'}]})
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