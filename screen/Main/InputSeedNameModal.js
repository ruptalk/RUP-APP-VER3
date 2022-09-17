import React, { useEffect, useRef,useState } from 'react';
import {
    View,
    Text,
    Modal,
    TextInput,
    TouchableOpacity
} from 'react-native';
import styles from './style'

const InputSeedNameModal=(props)=>{
    const { inputNameModalVisible, setInputNameModalVisible} = props;
    return(
        <>
            <Modal
                animationType="fade"
                transparent={true}
                visible={inputNameModalVisible}
            >    
                <View style={styles.centeredView}>
                    <View style={[styles.modalView]}>
                        <View style={styles.flexThree}>
                            <Text style={{color:'#000000'}}>씨앗의 이름을 지어주세요!</Text>
                        </View>
                        <View style={[styles.flexSeven,{justifyContent:'center',alignItems:'center'}]}>
                            <TextInput
                                placeholder="이름"
                                style={{fontSize:30}}
                            />
                            <View style={{backgroundColor:'red'}}/>
                        </View>
                        <View style={styles.flexThree}>
                            <TouchableOpacity
                                onPress={()=>setInputNameModalVisible(false)}
                                style={styles.selectSeedButton}>
                                <Text style={styles.selectSeedText}>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}
export default InputSeedNameModal