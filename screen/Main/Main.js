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
import Lottie from 'lottie-react-native';


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
  const [seedColor,setSeedColor]=useState('')
  const [currentTime,setCurrentTime]=useState(new Date())
  const [seedTime,setSeedTime]=useState(new Date())
  const [flowerDate,setFlowerDate]=useState('')
  const [modalVisible,setModalVisible]=useState(false)
  useEffect(() => {}, [isFocused]);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [seedModalVisible,setSeedModalVisible] = useState(true)
  const animationRef = useRef(null)

  const kaka=async()=>{
    const ee = await KakaoSDK.getProfile()
    console.log(ee)
  }

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
    let date = currentTime.getTime() - seedTime.getTime()
    setFlowerDate(Math.floor(date/(1000*60*60*24)))
    console.log(date)
  },[currentTime])
  // const [flowerUri, setFloweruri]=useState(require('../../imageResource/flower/flowerA/flowerA_1.gif'))
  // const [flowerUri2, setFloweruri2]=useState(require('../../imageResource/icon/ic_point.png'))
  // const [bool, setbool]=useState(true)

  // useEffect(()=>{
  //       setFloweruri(require(flowerUri))
  // },[flowerUri])  
  
  const flower = [
    {
        flowername: 'flowerA',
        uri1: require('../../imageResource/flower/flowerA/flowerA_1.gif'),
        uri2: require('../../imageResource/flower/flowerA/flowerA_2.gif'),
        uri3: require('../../imageResource/flower/flowerA/flowerA_3.gif'),
        uri4: require('../../imageResource/flower/flowerA/flowerA_4.gif'),
        uri5: require('../../imageResource/flower/flowerA/flowerA_5.gif')
    },
]
useEffect(()=>{
  animationRef.current?.play(5, 8);
},[])
const FlowerGIF =()=>{
  console.log(seedColor,"좋아요")
  switch(seedColor){
     
      case 'Pink':
        var tmp = flower[0].uri2
          
      case 'Brown':
          
      case 'Lavender':
          
      case 'Green':
          
      case 'Purple':
         
      case 'Yellow':
      
      defalut:
        return (
          <Image 
            source={tmp} 
            style={{width:300, height:400, marginLeft:5}}
          />
      )
  }
}

  
  
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
                          <TouchableOpacity onPress={()=>navigation.navigate('UnivRanking')}>
                              <Image source={require('../../imageResource/icon/ic_calendar.png')}/>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={()=>setCalendarModalVisible(true)} style={{marginLeft:'10%'}}>
                              <Image source={require('../../imageResource/icon/ic_calendar.png')}/>
                          </TouchableOpacity>
                          <TouchableOpacity onPress={()=>navigation.navigate('Notice')} style={{marginLeft:'10%',marginRight:'10%'}}>  
                              <Image source={require('../../imageResource/icon/ic_notice.png')}/>
                          </TouchableOpacity>  
                      </View>
                  </View>
                  <View style={{height:'10%'}}/>
                  <View style={{alignItems:'center',height:'55%'}}>
                      {isSeedName()}
                      <Lottie 
                          source={require('../../imageResource/flower/식물_01_v5_lottie.json')} 
                          autoPlay
                          loop
                          speed={4} 
                          ref={animationRef}/>
                  </View>
                  <View style={{alignItems:'center',height:'20%',justifyContent:'center'}}>
                      <TouchableOpacity onPress={()=>setModalVisible(true)}>  
                        <View style={{height:'45%'}}/>
                        <Image style={{width:70,height:70}} source={require('../../imageResource/icon/qrcode.png')}/>
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
                  seedColor={seedColor}
                  setSeedColor={setSeedColor}
              />
          </ImageBackground>
      </View>
    </>
)
}
//for merge
export default Main