import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    TextInput
} from 'react-native';
import BigList from "react-native-big-list";
import major from './Major.js'
import styles from './style'

const SearchUniversity=(props)=>{
    const masterData = major
    const [filterData,setFilterData] = useState(major)
    const { majorModal, setMajorModal,setUserMajor } = props;
    
    const renderItem = ({ item}) => (
        <Item major={item.major}/>
      );
    const Item = ({ major }) => (
        <>
            <TouchableOpacity onPress={()=>{selectMajor(major)}}>
                <View style={{marginTop:'6%'}}>
                    <Text style={styles.major}>{major}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.item}/>
        </>
    );
    const selectMajor=(major)=>{
        setUserMajor(major)
        setMajorModal(false)
    }
    const searchUniversity=(text)=>{
        if(text){
            const searchData = masterData.filter((item)=>{
            return item.major.includes(text)
            })
            setFilterData(searchData)
        }
        else{
            setFilterData(masterData)
        }
    }
    return(
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={majorModal}
                onRequestClose={()=>setMajorModal(false)}
            >     
                <View style={styles.universityModalView}>
                    <View style={{alignItems:'center'}}>
                        <TextInput
                            placeholder='학과 검색'
                            style={styles.sectionStyle}
                            onChangeText={text => searchUniversity(text)}
                        />
                    </View>
                    <BigList
                        data={filterData}
                        renderItem={renderItem}
                    />
                </View>
            </Modal>
        </>
    )
}
export default SearchUniversity