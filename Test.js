import React,{useEffect,useState}  from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Pressable,
    Modal,
    Button
} from 'react-native'
import axios from 'axios'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
function Test(){
    const ff=()=>{
        const frm = new FormData()
        frm.append('profilePhoto',
        {
            uri:"file:///data/user/0/com.joljakprojecttest/cache/rn_image_picker_lib_temp_e19a993b-49eb-435a-a09a-c5f1fe557b9b.jpg",
            name:'userProfile.jpg',
            type:'image/jpg'
        })
        frm.append('userInfo',{
            uid: "2f3293a2-b0ba-4d35-b2a5-4241241901c5",
            email: "pthdud@naver.com",
            password: "11111",
            nickname: "fefwef",
            sex: "W",
            birth: "1999-04-05",
            college: "가톨릭관동대학교",
            major: "3D제품디자인과"
        })
        axios.post('http://13.124.80.15/user/update-user-info', frm,{
            headers: { "Content-Type": 'application/json'}
            })
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error)
        })
    }
    
    return(
        <View>
            <Button title='dd' onPress={()=>ff()} />
            <Image 
                source={{uri:"file:///data/user/0/com.joljakprojecttest/cache/rn_image_picker_lib_temp_e19a993b-49eb-435a-a09a-c5f1fe557b9b.jpg"}}
                style={{width:400,height:400}}
            />
        </View>
    )
}

export default Test
