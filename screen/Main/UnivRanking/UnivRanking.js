import React ,{useState,useRef, useEffect}from 'react'
import {
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Image,
    View,
    KeyboardAvoidingView,
    FlatList
} from 'react-native'
import { MMKV } from 'react-native-mmkv'
import { useNavigation } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import KakaoSDK from '@actbase/react-kakaosdk'
import ReactNativeAnimatedSearchbox from 'react-native-animated-searchbox';
import styles from './style.js'
import {screenHeight,screenWidth} from '../../Main/fullScreenValue'


const UnivRanking=()=>{
    const refSearchBox=useRef()
    const [searchUnivText,setSearchUnivText] = useState(true)
    const [searchUnivBox,setSearchUnivBox] = useState(false)
    const [filterData,setFilterData] = useState(arr)
    const navigation = useNavigation()
    const renderItem=({item})=>{
        return (<Item item={item} backgroundColor={'#a8ce9e'} />)      
    }

    const Item=({item})=>{
        return(
            <TouchableOpacity 
                style={dystyle().rank}
                onPress={()=>navigation.navigate('PersonalRanking',{univ : item.univ})}>
                <View style={styles.univLogoContainer}>
                    <Image 
                        source={require('../../../imageResource/jobDaHan/donga.png')}
                        style={styles.univLogo}
                    />
                </View>
                <View style={styles.itemRank}>
                    <Text style={styles.itemFont}>{item.rank}등</Text>
                </View>
                <View style={styles.itemUniv}>
                    <Text style={styles.itemFont}>{item.univ}</Text>
                </View>
                <View style={styles.itemPoint}>
                    <Text style={styles.itemFont}>{item.point} p</Text>
                </View>
            </TouchableOpacity>
        )
    }
    const searchUniversity=(text)=>{
        if(text){
            const searchData = arr.filter((item)=>{
                return item.univ.includes(text)
            })
            setFilterData(searchData)
        }
        else{
            setFilterData(arr)
        }
    }
    console.log(screenHeight)
    console.log(screenWidth)
    //Call for the open  
    openSearchBox = () => refSearchBox.current.open();  

    //Call for the close  
    closeSearchBox = () => refSearchBox.current.close();
    useEffect(()=>{
        console.log('hi')
    },[refSearchBox.current]) 
    return(
        <View style={styles.container}>
            <View style={styles.topLine}>
                <TouchableOpacity 
                    onPress={()=>navigation.goBack()}
                >
                    <Image 
                        source={require('../../../imageResource/jobDaHan/arrow_left.png')}
                        style={styles.backButton}
                    />
                </TouchableOpacity>
                <Text style={styles.font}>랭킹 페이지</Text>
            </View>
            {searchUnivText && 
            <TouchableOpacity
                onPress={()=>{setSearchUnivText(false),setSearchUnivBox(true)}}  
                style={styles.searchUnivTextContainer}  
            >
                <Text style={styles.searchUnivText}>우리학교 찾기</Text>
                <Image 
                    source={require('../../../imageResource/jobDaHan/search_univ.png')}
                    style={styles.searchUnivImage}
                />
            </TouchableOpacity>}
            {searchUnivBox && <ReactNativeAnimatedSearchbox 
                ref={refSearchBox} 
                placeholder={"학교"}
                searchUniversity={searchUniversity}
                searchUnivBox={searchUnivBox}
                focusAfterOpened={true} 
            />}
            <View style={{marginBottom:screenHeight*0.0177725}}/>
            <Text style={{marginLeft:screenWidth*0.0538461,fontSize:24,marginBottom:screenHeight*0.023696682,color:'black',fontWeight:'600'}}>학교순위</Text>
            <View>
                <FlatList
                    data={filterData}
                    renderItem={renderItem}    
                    keyExtractor={(item)=>item.rank}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

export default UnivRanking

const dystyle=()=>StyleSheet.create({
    rank:{
        marginLeft:5,
        marginRight:5,
        height:screenHeight*0.096113744,
        marginBottom:20,
        borderRadius:10,
        flexDirection:'row',
        backgroundColor:'white',
        alignItems:'center',
    },
})

const arr = [
    {
        rank:1,
        univ:'동아대',
        point:0
    },
    {
        rank:2,
        univ:'부산대',
        point:0
    },
    {
        rank:3,
        univ:'부경대',
        point:0
    },
    {
        rank:4,
        univ:'해양대',
        point:0
    },
    {
        rank:5,
        univ:'경희대',
        point:0
    },
    {
        rank:6,
        univ:'서울시립대',
        point:0
    },
    {
        rank:7,
        univ:'중앙대',
        point:0
    },
    {
        rank:8,
        univ:'서강대',
        point:0
    },
    {
        rank:9,
        univ:'성균관대',
        point:0
    },
    {
        rank:10,
        univ:'서울대',
        point:0
    },
    {
        rank:11,
        univ:'한양대',
        point:0
    },
]
/* 화살표 1 */