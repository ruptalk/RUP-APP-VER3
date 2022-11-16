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
  const timeGif=[2,4,6,8,10]
    
  useEffect(() => {
    animationRef.current?.play()
    animationRef.current?.play(1, timeGif[4]);
  }, [])
 
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
  
  const flower = [
    {
        flowername: 'flowerA',
        uri1: require('../../imageResource/flower/flowerA/flowerA_1.gif'),
        uri2: require('../../imageResource/flower/flowerA/flowerA_2.gif'),
        uri3: require('../../imageResource/flower/flowerA/flowerA_3.gif'),
        uri4: require('../../imageResource/flower/flowerA/flowerA_4.gif'),
        uri5: require('../../imageResource/flower/flowerA/flowerA_5.gif')
    },
    
    {
        flowername: 'flowerB',
        uri1: require('../../imageResource/flower/flowerB/flowerB_1.gif'),
        uri2: require('../../imageResource/flower/flowerB/flowerB_2.gif'),
        uri3: require('../../imageResource/flower/flowerB/flowerB_3.gif'),
        uri4: require('../../imageResource/flower/flowerB/flowerB_4.gif'),
        uri5: require('../../imageResource/flower/flowerB/flowerB_5.gif')
    },
    
    {
        flowername: 'flowerC',
        uri1: require('../../imageResource/flower/flowerC/flowerC_1.gif'),
        uri2: require('../../imageResource/flower/flowerC/flowerC_2.gif'),
        uri3: require('../../imageResource/flower/flowerC/flowerC_3.gif'),
        uri4: require('../../imageResource/flower/flowerC/flowerC_4.gif'),
        uri5: require('../../imageResource/flower/flowerC/flowerC_5.gif')
    },
    
    {
        flowername: 'flowerD',
        uri1: require('../../imageResource/flower/flowerD/flowerD_1.gif'),
        uri2: require('../../imageResource/flower/flowerD/flowerD_2.gif'),
        uri3: require('../../imageResource/flower/flowerD/flowerD_3.gif'),
        uri4: require('../../imageResource/flower/flowerD/flowerD_4.gif'),
        uri5: require('../../imageResource/flower/flowerD/flowerD_5.gif')
    },
    
    {
        flowername: 'flowerE',
        uri1: require('../../imageResource/flower/flowerE/flowerE_1.gif'),
        uri2: require('../../imageResource/flower/flowerE/flowerE_2.gif'),
        uri3: require('../../imageResource/flower/flowerE/flowerE_3.gif'),
        uri4: require('../../imageResource/flower/flowerE/flowerE_4.gif'),
        uri5: require('../../imageResource/flower/flowerE/flowerE_5.gif')
    },
    
    {
        flowername: 'flowerF',
        uri1: require('../../imageResource/flower/flowerF/flowerF_1.gif'),
        uri2: require('../../imageResource/flower/flowerF/flowerF_2.gif'),
        uri3: require('../../imageResource/flower/flowerF/flowerF_3.gif'),
        uri4: require('../../imageResource/flower/flowerF/flowerF_4.gif'),
        uri5: require('../../imageResource/flower/flowerF/flowerF_5.gif')
    },
    
    {
        flowername: 'flowerG',
        uri1: require('../../imageResource/flower/flowerG/flowerG_1.gif'),
        uri2: require('../../imageResource/flower/flowerG/flowerG_2.gif'),
        uri3: require('../../imageResource/flower/flowerG/flowerG_3.gif'),
        uri4: require('../../imageResource/flower/flowerG/flowerG_4.gif'),
        uri5: require('../../imageResource/flower/flowerG/flowerG_5.gif')
    },
    
    {
        flowername: 'flowerH',
        uri1: require('../../imageResource/flower/flowerH/flowerH_1.gif'),
        uri2: require('../../imageResource/flower/flowerH/flowerH_2.gif'),
        uri3: require('../../imageResource/flower/flowerH/flowerH_3.gif'),
        uri4: require('../../imageResource/flower/flowerH/flowerH_4.gif'),
        uri5: require('../../imageResource/flower/flowerH/flowerH_5.gif')
    },
    
    {
        flowername: 'flowerI',
        uri1: require('../../imageResource/flower/flowerI/flowerI_1.gif'),
        uri2: require('../../imageResource/flower/flowerI/flowerI_2.gif'),
        uri3: require('../../imageResource/flower/flowerI/flowerI_3.gif'),
        uri4: require('../../imageResource/flower/flowerI/flowerI_4.gif'),
        uri5: require('../../imageResource/flower/flowerI/flowerI_5.gif')
    },
    {
        flowername: 'flowerJ',
        uri1: require('../../imageResource/flower/flowerJ/flowerJ_1.gif'),
        uri2: require('../../imageResource/flower/flowerJ/flowerJ_2.gif'),
        uri3: require('../../imageResource/flower/flowerJ/flowerJ_3.gif'),
        uri4: require('../../imageResource/flower/flowerJ/flowerJ_4.gif'),
        uri5: require('../../imageResource/flower/flowerJ/flowerJ_5.gif')
    }
  ]

const FlowerGIF =()=>{
  console.log(seedColor,"좋아요")
  var tmp = ''
  switch(seedColor){
      case 'Pink':
        tmp = flower[0].uri1
        break;
      case 'Brown':
        break;
      case 'Lavender':
        break; 
      case 'Green':
        break;
      case 'Purple':
         break;
      case 'Yellow':
        tmp = flower[Math.floor(Math.random()*5)+5].uri1
        break;
  }
  return (
    <Image 
      source={tmp} 
      style={{width:300, height:400, marginLeft:5}}
    />
  )

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
                      {/* <View style={{height:'45%'}}/>  */}
                      {/* <FlowerGIF/> */}
                      
                      <Lottie 
                        ref = {animationRef}
                        source={require('../../imageResource/flower/flower2.json')} 
                        autoPlay loop 
                        speed={0.6}
                        style={{marginTop:20,height:380}} 
                        />

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

export default Main