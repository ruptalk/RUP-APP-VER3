import React from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView
} from 'react-native'
import BigList from "react-native-big-list";
import {useNavigation} from '@react-navigation/native';
import styles from './style'
function Notice(){
    const navigation = useNavigation()

    const renderItem = ({ item}) => (
        <Item date={item.date} point={item.point}/>
    );
    const Item = ({date,point}) => (
        <View>
            <View style={styles.horizonalLine}/>
            <View style={{marginTop:'3.5%',marginLeft:30,flexDirection:'row',alignItems:'center'}}>
                <Image style={{width:20,height:20}} source={require('../../../imageResource/icon/ic_point_notice.png')}/>
                <Text style={{marginLeft:'5%',fontWeight:'bold',fontSize:15}}>{date} {point}point 적립되었습니다.</Text>
            </View>
        </View>
      );
    return(
        <View style={styles.container}>
            <TouchableOpacity 
                onPress={()=>navigation.goBack()}
                style={{marginTop:'7%',marginLeft:30,width:40}}                
            >
                <Image source={require('../../../imageResource/icon/ic_arrow_left.png')}/>
            </TouchableOpacity>
            <View style={styles.horizonalLine}/>
            <TouchableOpacity
                style={{marginTop:'5%',marginLeft:30,flexDirection:'row',alignItems:'center'}}
            >
                <Image style={{width:20,height:20}} source={require('../../../imageResource/icon/ic_notice_02.png')}/>
                <Text style={{marginLeft:'5%',fontWeight:'bold'}}>[공지사항] v 1.1 업데이트 되었습니다.</Text>
            </TouchableOpacity>
            <SafeAreaView style={{height:'80%'}}>
                <BigList
                    data={Data}
                    renderItem={renderItem}
                />
            </SafeAreaView>
        </View>
    )
}

export default Notice

const Data = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      date: '22.01.01',
      point: '1'
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '2'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '3'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '2'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '4'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '5'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '1'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '1'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '1'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '1'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '1'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '1'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '1'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '1'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '1'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '1'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '1'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '1'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '1'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '1'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '1'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '1'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '1'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '1'
      },
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: '22.01.01',
        point: '1'
      },

    
  ];