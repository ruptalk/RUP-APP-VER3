import React,{useEffect,useState,useRef} from 'react'
import {
    View,
    Image,
    Dimensions,
    Modal,
    Pressable,
    Text,
    ImageBackground,
    TouchableOpacity,
    Button
} from 'react-native'
import { useNavigation,useIsFocused } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv'
import BottomSheet_Main from './BottomSheet_Main';
import CalendarModal from './CalenderModal'
import SeedModal from './SeedModal'
import styles from './style';
import KakaoSDK from '@actbase/react-kakaosdk'

export const storage = new MMKV()

function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

function Main(){
  if(storage.getString('user')===undefined){  //user정보 캐싱되지 않았다면 서버 통해서 user정보 return,캐싱
      const user = {
          userName: '박재연',
          email: 'jaeyeon7531@gmail.com',
          phoneNumber: '010-7151-1918',
          pw:'123456',
          profileImage:'https://image.fnnews.com/resource/media/image/2022/07/16/202207160834208420_l.jpg',
          point:0,
          recycle:0,
          //
          }      
      storage.set('user', JSON.stringify(user))
  }
  const isFocused = useIsFocused();
  const screenHeight = Dimensions.get("screen").height;   //phone 높이,폭 px
  const screenWidth = Dimensions.get("screen").width;
  const navigation = useNavigation()
  const jsonUser = storage.getString('user') // { 'userName': '박재연', 'point': 0 }
  const userObject = JSON.parse(jsonUser)
  const [seedName_mainPage,setSeedName_mainPage]=useState('')
  const [currentTime,setCurrentTime]=useState(new Date())
  const [seedTime,setSeedTime]=useState(new Date())
  const [flowerDate,setFlowerDate]=useState('')
  const [modalVisible,setModalVisible]=useState(false)
  useEffect(() => {}, [isFocused]);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [seedModalVisible,setSeedModalVisible] = useState(true)
  const kaka=async()=>{
    const ee = await KakaoSDK.getProfile()
    console.log(ee)
  }
  const success =[
    "2022-08-01", "2022-08-14"
  ];
  const isSeedName=()=>{
    if(seedName_mainPage!=='')
        return <Text style={styles.tulipText}>{seedName_mainPage}와 함께 {flowerDate}일째</Text>
    else
        return 
  }
  useInterval(()=>{
    setCurrentTime(new Date())
  },60000)
  useEffect(()=>{
    let date = Math.floor(currentTime.getTime()/1000) - Math.floor(seedTime.getTime()/1000)
    setFlowerDate(date)
    console.log(date)
    //console.log(date2/1000)
  },[currentTime])

    return(
      <>
        <View style={{flex:1}}>
            <ImageBackground 
                style={{
                    height: '100%',
                    width: '100%',
                }}
                source={require('../../imageResource/background/bg_04.png')}>
                <View >
                    <View style={styles.topLineContainer}>
                        <View style={styles.topLineLeft}>
                            <View style={styles.flexDirectionRow}>
                                <TouchableOpacity 
                                    onPress={()=>navigation.navigate('InFullBloom')}
                                    style={styles.profileImageContainer}>
                                    <Image 
                                        source={{uri:userObject.profileImage}}
                                        style={styles.profileImage}/>
                                </TouchableOpacity>
                                <Button onPress={kaka} title='dd'></Button>
                                <View style={{justifyContent:'center',marginLeft:'5%',flexDirection:'column'}}>
                                    <Text style={styles.name}>{userObject.userName}</Text>
                                    <View style={styles.flexDirectionRow}>
                                        <Image source={require('../../imageResource/icon/ic_point.png')}/>
                                        <Text style={{marginLeft:'8%'}}>{userObject.point}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={styles.calenderAndNoticeBoxContainer}>
                            <View style={styles.calenderAndNoticeBox}>
                                <TouchableOpacity
                                    onPress={()=>setCalendarModalVisible(true)}
                                >
                                    <Image 
                                        style={{marginRight:'15%'}}
                                        source={require('../../imageResource/icon/ic_calendar.png')}
                                    />
                                    
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>navigation.navigate('Notice')}>  
                                    <Image source={require('../../imageResource/icon/ic_notice.png')}/>
                                </TouchableOpacity>  
                            </View>
                        </View>
                    </View>
                    <View style={{height:'10%'}}/>
                    <View style={{alignItems:'center',height:'55%'}}>
                        {isSeedName()}
                    </View>
                    <View style={{alignItems:'center',height:'20%',justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=>setModalVisible(true)}>
                            <Text style={styles.QrText}>QR코드</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <BottomSheet_Main
                  modalVisible={modalVisible}
                  setModalVisible={setModalVisible}
                />
                <CalendarModal
                  calendarModalVisible={calendarModalVisible}
                  setCalendarModalVisible={setCalendarModalVisible}
                />
                <SeedModal
                  seedModalVisible={seedModalVisible}
                  setSeedModalVisible={setSeedModalVisible}
                  setSeedName_mainPage={setSeedName_mainPage}
                />
            </ImageBackground>
        </View>
      </>
  )
}

export default Main