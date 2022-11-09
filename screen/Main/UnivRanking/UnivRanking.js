import React ,{useState}from 'react'
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
import styles from './style.js'
import {screenHeight,screenWidth} from '../../Main/fullScreenValue'

const UnivRanking=()=>{
    const [filterData,setFilterData] = useState(arr)
    const navigation = useNavigation()
    const renderItem=({item})=>{
        if(item.rank===1){
            return (<Item item={item} backgroundColor={'#a8ce9e'} />)
        }else if(item.rank==2){
            return (<Item item={item} backgroundColor={'#9cc3e6'} />)
        }else if(item.rank==3){
            return (<Item item={item} backgroundColor={'#f4b184'} />)
        }else{
            return (<Item item={item} backgroundColor={'#d9d9d9'} />)
        }        
    }
    const Item=({item,backgroundColor})=>{
        return(
            <TouchableOpacity style={dystyle(backgroundColor).rank}>
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
    return(
        <View style={styles.container}>
            <View style={styles.topLine}>
                <TouchableOpacity 
                    onPress={()=>navigation.goBack()}
                    style={styles.backButtonPosition}
                >
                    <Image source={require('../../../imageResource/icon/ic_arrow_left.png')}/>
                </TouchableOpacity>
                <Text style={styles.font}>랭킹 페이지</Text>
            </View>
            <View style={{marginTop:30}}/>
            <TextInput 
                style={styles.univSearch}
                onChangeText={(text)=>searchUniversity(text)}
                placeholder="우리 학교 찾기"
            />
            <View style={{marginBottom:20}}/>
            <View>
                <FlatList
                    data={filterData}
                    renderItem={renderItem}    
                    keyExtractor={(item)=>item.rank}
                />
            </View>
        </View>
    )
}

export default UnivRanking

const dystyle=(backColor)=>StyleSheet.create({
    rank:{
        marginLeft:10,
        marginRight:10,
        height:screenHeight*0.065,
        marginBottom:20,
        borderWidth:3,
        borderColor:'#a8ce9e',
        borderRadius:10,
        flexDirection:'row',
        backgroundColor:backColor
        //alignItems:'center',
    },
})

const arr = [
    {
        rank:1,
        univ:'동아대',
        point:1003
    },
    {
        rank:2,
        univ:'부산대',
        point:1003
    },
    {
        rank:3,
        univ:'부경대',
        point:1003
    },
    {
        rank:4,
        univ:'해양대',
        point:1003
    },
    {
        rank:5,
        univ:'경희대',
        point:1003
    },
    {
        rank:6,
        univ:'서울시립대',
        point:1003
    },
    {
        rank:7,
        univ:'중앙대',
        point:1003
    },
    {
        rank:8,
        univ:'서강대',
        point:1003
    },
    {
        rank:9,
        univ:'성균관대',
        point:1003
    },
    {
        rank:10,
        univ:'서울대',
        point:1003
    },
    {
        rank:11,
        univ:'한양대',
        point:1003
    },
]