import React, { useEffect, useRef,useState } from 'react';
import {
    View,
    Text,
    Modal,
    Pressable,
    Image,
    TouchableOpacity
} from 'react-native';
import ChooseSeed from './ChooseSeed';
import InputSeedNameModal from './InputSeedNameModal'
import styles from './style'

const SeedModal=(props)=>{
    const { seedModalVisible, setSeedModalVisible, setSeedName_mainPage,seedColor,setSeedColor} = props;
    const [pressChooseSeedButton,setPressChooseSeedButton] = useState('')
    const [inputNameModalVisible,setInputNameModalVisible]=useState(false)
    closeModal=()=>{
        setSeedModalVisible(false)
    }
    const isChoosenSeed=()=>{
        if(seedColor===''){
            console.log('toast message 씨앗을 선택하지 않았습니다!')
        }
        else{
            setInputNameModalVisible(true)
            setTimeout(function() {  setSeedModalVisible(false) }, 500);
            //
        }
    }

    return(
        <>
            <Modal
                animationType="none"
                transparent={true}
                visible={seedModalVisible}
                onRequestClose={() => {
                setSeedModalVisible(false);
                }}
            >    
                <View style={styles.centeredView}>
                    <View style={[styles.modalView]}>
                        <View style={styles.flexThree}>
                            <Text style={{color:'#000000'}}>씨앗을 선택하세요</Text>
                        </View>
                        <View style={styles.flexSeven}>
                            <ChooseSeed
                                seedColor={seedColor}
                                setSeedColor={setSeedColor}
                            />
                        </View>
                        <View style={styles.flexThree}>
                            <TouchableOpacity
                                onPress={isChoosenSeed}  
                                style={styles.selectSeedButton}>
                                <Text style={styles.selectSeedText}>씨앗 선택하기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            <InputSeedNameModal
                inputNameModalVisible={inputNameModalVisible}
                setInputNameModalVisible={setInputNameModalVisible}
                setSeedName_mainPage={setSeedName_mainPage}
            />
        </>
    )
}
export default SeedModal