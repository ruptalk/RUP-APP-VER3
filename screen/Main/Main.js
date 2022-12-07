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
import flower from './flower'
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

function Main(props){
  const isFocused = useIsFocused();
  const navigation = useNavigation()
  const jsonUser = storage.getString('user') // { 'userName': '박재연', 'point': 0 }
  const userObject = JSON.parse(jsonUser)
  const [point,setPoint]=useState(userObject.point)
  const [seedName_mainPage,setSeedName_mainPage]=useState('')
  const [seedColor,setSeedColor]=useState('')
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
  useEffect(()=>{
    if(modalVisible===true){
      setTimeout(()=>{setPoint(point+1)},3000)
    }
  },[modalVisible])
  // const [flowerUri, setFloweruri]=useState(require('../../imageResource/flower/flowerA/flowerA_1.gif'))
  // const [flowerUri2, setFloweruri2]=useState(require('../../imageResource/icon/ic_point.png'))
  // const [bool, setbool]=useState(true)

  // useEffect(()=>{
  //       setFloweruri(require(flowerUri))
  // },[flowerUri])  

  const FlowerGIF =()=>{
    console.log(seedColor,"좋아요")
    var tmp = ''
    switch(seedColor){
        case 'Pink':
          tmp = flower[0].uri1
          break;
        case 'Brown':
          tmp = flower[1].uri1
          break;
        case 'Lavender':
          tmp = flower[2].uri1
          break; 
        case 'Green':
          tmp = flower[3].uri1
          break;
        case 'Purple':
          tmp = flower[4].uri1
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
                          <TouchableOpacity onPress={()=>navigation.navigate('UnivRanking')}>
                              <Image 
                                source={require('../../imageResource/jobDaHan/rank.png')}
                                style={{width:25,height:25}}
                              />
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
                      <FlowerGIF/>
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