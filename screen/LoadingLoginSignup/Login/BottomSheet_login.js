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


    const isBlank=()=>{
        let cnt = 0
        if(userName===''){
            setIsNameBlank('BlankName')
            cnt++
        }
        // if(userEmail===''){}
        // if(userPw===''){}
        // if(userPwAgain===''){}
        if(cnt>0)return
        else setSelectedTab('Login')
    }

    const loginSignUpSelectedTab = () => {    
        switch(selectedTab){
            case 'Login':
                return <Login />
            case 'SignUp':
                return <SignUp />
        }
    }
    const name = () => {    
        switch(isNameBlank){
            case 'BlankName':
                return <BlankName />
            case 'NotBlankName':
                return <NotBlankName />
        }
    }
    const BlankName=()=>(
        <TextInput
            placeholder='이름을 입력해 주세요.'
            style={styles.sectionStyleBlank}
            onChangeText={name => setUsername(name)}
            />
    )
    const NotBlankName=()=>(
        <TextInput
            placeholder='이름을 입력해 주세요.'
            style={styles.sectionStyle}
            onChangeText={name => setUsername(name)}
            />
    )

    console.log(screenHeight)
    const Login=()=>(       //Login 아이콘 클릭시 띄울 화면
        <>
            <ScrollView>
                <TextInput
                placeholder='카톡 1초 로그인'/>
                <TextInput
                placeholder='카톡 2초 로그인'/>
                <TextInput
                placeholder='카톡 3초 로그인'/>
                <TextInput
                placeholder='카톡 4초 로그인'/>
                <TextInput
                placeholder='카톡 5초 로그인'/>
                <TextInput
                placeholder='카톡 6초 로그인'/>
                <TextInput
                placeholder='카톡 6초 로그인'/>
            </ScrollView>
            <TouchableOpacity 
                onPress={()=>
                {
                    setModalVisible(false)
                    navigation.reset({routes:[{name:'Main'}]})
                }}>
                <Text style={styles.passwordPage}>로그인</Text>
            </TouchableOpacity>
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

    const SignUp=()=>(    //SignUp 아이콘 클릭시 띄울 화면
    <>
        <ScrollView>
            {name()}
            <TextInput
                placeholder='이메일을 입력해 주세요.'
                style={styles.sectionStyle}
                onChangeText={email => setUserEmail(email)}
                />
            <TextInput
                placeholder='비밀번호를 입력해 주세요.'
                style={styles.sectionStyle}
                onChangeText={pw => setUserPw(pw)}
                />
            <TextInput
                placeholder='비밀번호를 한번 더 입력해주세요.'
                style={styles.sectionStyle}
                onChangeText={pw => setUserPwAgain(pw)}
                />
            <TextInput
                placeholder='비밀번호를 한번 더 입력해주세요2.'
                style={styles.sectionStyle}
                onChangeText={pw => setUserPwAgain(pw)}
                />
            <TextInput
                placeholder='비밀번호를 한번 더 입력해주세요3.'
                style={styles.sectionStyle}
                onChangeText={pw => setUserPwAgain(pw)}
                />
            <TextInput
                placeholder='비밀번호를 한번 더 입력해주세요4.'
                style={styles.sectionStyle}
                onChangeText={pw => setUserPwAgain(pw)}
                />
        </ScrollView>
        <TouchableOpacity
            onPress={()=>isBlank()}
            style={styles.signUp}
        >
            <Text style={styles.signUpText}>가입하기</Text>
        </TouchableOpacity>
    </>
    )
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
    console
    return (
        
        <Modal
            visible={modalVisible}
            animationType={"fade"}
            transparent
            statusBarTranslucent
        >
            <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : 'height'}
            style={{ flex: 1 }}
            keyboardVerticalOffset={-120}
            >
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback
                        onPress={closeModal}
                    >
                        <View style={styles.background}/>
                    </TouchableWithoutFeedback>
                    <Animated.View
                        style={[{...styles.bottomSheetContainer,height:screenHeight/2, transform: [{ translateY: translateY_login }]}]}
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
    )
}

export default BottomSheet_login;