import React,{useEffect,useState} from 'react'
import {
    View,
    Image,
    Dimensions,
    Modal,
    Pressable,
    Text,
    ImageBackground,
    TouchableOpacity
} from 'react-native'
import { useNavigation,useIsFocused } from '@react-navigation/native';
import { MMKV } from 'react-native-mmkv'
import BottomSheet_Main from './BottomSheet_Main';
import CalendarModal from './CalenderModal'
import SeedModal from './SeedModal'
import styles from './style';

export const storage = new MMKV()

function Main(){
    if(storage.getString('user')===undefined){  //user정보 캐싱되지 않았다면 서버 통해서 user정보 return,캐싱
        const user = {
            userName: '박재연',
            email: 'jaeyeon7531@gmail.com',
            phoneNumber: '010-7151-1918',
            pw:'123456',
            profileImage:'https://image.fnnews.com/resource/media/image/2022/07/16/202207160834208420_l.jpg',
            point:0,
            recycle:0
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
    const [modalVisible,setModalVisible]=useState(false)
    console.log(userObject)
    console.log(jsonUser)
    useEffect(() => {}, [isFocused]);
    const [calendarsmodalVisible, setcalendarModalVisible] = useState(false);
    const success =[
      "2022-08-01", "2022-08-14"
    ];   
      return(
        <>
        <Modal
        animationType="slide"
        transparent={true}
        visible={calendarsmodalVisible}
        onRequestClose={() => {
          setcalendarModalVisible(false);
        }}
      > 
      <Pressable style={styles.centeredView}
      onPress={() => setcalendarModalVisible(false)}
      >
        <View style={styles.modalView}>           
            <Image 
              style={styles.exitlogo}
              source={require('../../imageResource/icon/ic_close.png')}
            />
            <Calendar
                style={styles.calendar}
                  theme={{
                  monthTextColor: 'black',
                  arrowColor: '#d1e5cd',
                  textDayFontSize: 16,
                  textMonthFontSize: 30,
                  textDayHeaderFontSize: 0
              }}

              dayComponent={({date, state}) => {
                
                if (success.includes(date.dateString)){
                  var dateimg = date.dateString.replace(/\-/g,"")
                  if((dateimg*1)%2==0){
                    return(
                      <Image
                        style={styles.facelogo}
                        source={require('../../imageResource/icon/ic_face_01.png')}
                      />
                    )
                  }
                  else{
                    return(
                      <Image 
                        style={styles.facelogo}
                        source={require('../../imageResource/icon/ic_face_02.png')}
                      />
                    )
                  }
                }
                else{
                  return(
                    <View>
                      <Text style={{textAlign: 'center', color: state === 'disabled' ? 'white' : 'black'}}>
                        {date.day}
                      </Text>
                    </View>
                  )
                }
              }}
            /> 
        </View>
      </Pressable>
    </Modal>
    
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
                        <Text style={styles.tulipText}>튤리비와 함께 N일째</Text>
                    </View>
                    <View style={{alignItems:'center',height:'20%',justifyContent:'center'}}>
                        <TouchableOpacity onPress={()=>setModalVisible(true)}>
                        <Image style={{width:40,height:40}} source={require('../../imageResource/icon/qrcode.png')}/>
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
                />
            </ImageBackground>
        </View>
      </>
  )
}

export default Main
