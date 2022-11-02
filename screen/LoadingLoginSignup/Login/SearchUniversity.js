import React, { useState } from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    TextInput
} from 'react-native';
import BigList from "react-native-big-list";
import univ from './Univ.js'
import styles from './style'

const SearchUniversity=(props)=>{
    const masterData = univ
    const [filterData,setFilterData] = useState(univ)
    const { universityModal, setUniversityModal,setUserUniversity } = props;
    
    const renderItem = ({ item}) => (
        <Item univ={item.univ}/>
      );
    const Item = ({ univ }) => (
        <>
            <TouchableOpacity onPress={()=>{selectUniversity(univ)}}>
                <View style={{marginTop:'6%'}}>
                    <Text style={styles.major}>{univ}</Text>
                </View>
            </TouchableOpacity>
            <View style={styles.item}/>
        </>
    );
    const selectUniversity=(univ)=>{
        setUserUniversity(univ)
        setUniversityModal(false)
    }
    const searchUniversity=(text)=>{
        if(text){
            const searchData = masterData.filter((item)=>{
            return item.univ.includes(text)
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
                visible={universityModal}
                onRequestClose={()=>setUniversityModal(false)}
            >     
                <View style={styles.universityModalView}>
                    <View style={{alignItems:'center'}}>
                        <TextInput
                            placeholder='대학(교) 검색'
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