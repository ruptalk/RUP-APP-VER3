import React,{useState} from 'react'
import {
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    KeyboardAvoidingView,
    Modal,
    TouchableWithoutFeedback,
    PermissionsAndroid,
    Platform
} from 'react-native'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv'
import Main from '../Main.js'
import styles from './style'

export const storage = new MMKV()
const ProfileImage=()=>{
    const navigation = useNavigation()
    const jsonUser = storage.getString('user')
    const userObject = JSON.parse(jsonUser)
    const [ modalVisible, setModalVisible ] = useState(false);
    const [profileImage, setProfileImage] = useState(userObject.profileImage);
    const galleryImagePick= async ()=>{                       ///////////////갤러리 이미지픽
        const grantedstorage = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "App Camera Permission",
            message:"App needs access to your camera ",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        )
        if (grantedstorage ===  PermissionsAndroid.RESULTS.GRANTED) {
            setModalVisible(false)
            const result = await launchImageLibrary();
              if (result.didCancel){
                return null;
              } 
              const localUri = result.assets[0].uri;
              const uriPath = localUri.split("//").pop();
              setProfileImage("file://"+uriPath)
              userObject.profileImage="file://"+uriPath
              storage.set('user', JSON.stringify(userObject))
        }
    }
    const photoImagePick= async ()=>{                           /////////////////포토 이미지픽
        const grantedcamera = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: "App Camera Permission",
              message:"App needs access to your camera ",
              buttonNeutral: "Ask Me Later",
              buttonNegative: "Cancel",
              buttonPositive: "OK"
            }
        )
        if (grantedcamera === PermissionsAndroid.RESULTS.GRANTED) {
            setModalVisible(false)
            const result = await launchCamera({
                mediaType : 'photo',
                cameraType : 'back',
            });
            if (result.didCancel){
                return null;
            }
            const localUri = result.assets[0].uri;
            const uriPath = localUri.split("//").pop();
            setProfileImage("file://"+uriPath)
            setPhoto("file://"+uriPath);
        }
    }

    const platFormGalleryImage=()=>{
        return Platform.OS==='android' ?  <AndroidGallery />:<IosGallery />
    }
    const platFormCameraImage=()=>{
        return Platform.OS==='android' ?  <AndroidCamera />:<IosCamera />
    }
    const AndroidGallery=()=>(
        <Image 
            source={require('../../../imageResource/jobDaHan/android_gallery.png')}
            style={{width:40,height:40}}
        />
    )
    const IosGallery=()=>(
        <Image 
            source={require('../../../imageResource/jobDaHan/ios_gallery.png')}
            style={{width:40,height:40}}
        />
    )
    const AndroidCamera=()=>(
        <Image 
            source={require('../../../imageResource/jobDaHan/android_camera.png')}
            style={{width:40,height:40}}
        />
    )
    const IosCamera=()=>(
        <Image 
            source={require('../../../imageResource/jobDaHan/ios_camera.png')}
            style={{width:40,height:40}}
        />
    )
    const closeModal=()=>{
        setModalVisible(false)
    }
    return(
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
        >
                <View style={styles.centeredView}>
                    <TouchableWithoutFeedback
                        onPress={closeModal}
                    >
                        <View />
                    </TouchableWithoutFeedback>
                    <View style={styles.modalView}>
                        <View style={{flex:1,alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                            <TouchableOpacity onPress={galleryImagePick}>
                                {platFormGalleryImage()}
                                <Text>gallery</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{flex:1,alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                            <TouchableOpacity onPress={()=>setModalVisible(false)}>
                                {platFormCameraImage()}
                                <Text>camera</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <View style={{alignItems:'center',marginTop:'9%'}}>
                <View>
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate('ProfileImageFullSize')}
                        style={styles.profileImageContainer}>
                        <Image 
                            source={{uri:profileImage}}
                            style={styles.profileImage}/>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={()=>{setModalVisible(true)}}>
                    <Text style={styles.profilePictureText}>프로필사진 변경</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default ProfileImage