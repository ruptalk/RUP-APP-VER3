import React, { useEffect, useRef, useState } from 'react';
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
    const { seedModalVisible, setSeedModalVisible, setSeedName_mainPage,seedColor,setSeedColor,setFloweruri} = props;
    const [pressChooseSeedButton,setPressChooseSeedButton] = useState('')
    const [inputNameModalVisible,setInputNameModalVisible]= useState(false)
   
    
    // closeModal=()=>{
    //     setSeedModalVisible(false)
    // }

     
    // useEffect(()=>{
    //     console.log(flowerUri)
    // },[flowerUri])  

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

    const flower = [
        {
            flowername: 'flowerA',
            uri1: '../../imageResource/flower/flowerA/flowerA_1.gif',
            uri2: '../../imageResource/flower/flowerA/flowerA_2.gif',
            uri3: '../../imageResource/flower/flowerA/flowerA_3.gif',
            uri4: '../../imageResource/flower/flowerA/flowerA_4.gif',
            uri5: '../../imageResource/flower/flowerA/flowerA_5.gif'
        },
        
        {
            flowername: 'flowerB',
            uri1: '../../imageResource/flower/flowerB/flowerB_1.gif',
            uri2: '../../imageResource/flower/flowerB/flowerB_2.gif',
            uri3: '../../imageResource/flower/flowerB/flowerB_3.gif',
            uri4: '../../imageResource/flower/flowerB/flowerB_4.gif',
            uri5: '../../imageResource/flower/flowerB/flowerB_5.gif'
        },
        
        {
            flowername: 'flowerC',
            uri1: '../../imageResource/flower/flowerC/flowerC_1.gif',
            uri2: '../../imageResource/flower/flowerC/flowerC_2.gif',
            uri3: '../../imageResource/flower/flowerC/flowerC_3.gif',
            uri4: '../../imageResource/flower/flowerC/flowerC_4.gif',
            uri5: '../../imageResource/flower/flowerC/flowerC_5.gif'
        },
        
        {
            flowername: 'flowerD',
            uri1: '../../imageResource/flower/flowerD/flowerD_1.gif',
            uri2: '../../imageResource/flower/flowerD/flowerD_2.gif',
            uri3: '../../imageResource/flower/flowerD/flowerD_3.gif',
            uri4: '../../imageResource/flower/flowerD/flowerD_4.gif',
            uri5: '../../imageResource/flower/flowerD/flowerD_5.gif'
        },
        
        {
            flowername: 'flowerE',
            uri1: '../../imageResource/flower/flowerE/flowerE_1.gif',
            uri2: '../../imageResource/flower/flowerE/flowerE_2.gif',
            uri3: '../../imageResource/flower/flowerE/flowerE_3.gif',
            uri4: '../../imageResource/flower/flowerE/flowerE_4.gif',
            uri5: '../../imageResource/flower/flowerE/flowerE_5.gif'
        },
        
        {
            flowername: 'flowerF',
            uri1: '../../imageResource/flower/flowerF/flowerF_1.gif',
            uri2: '../../imageResource/flower/flowerF/flowerF_2.gif',
            uri3: '../../imageResource/flower/flowerF/flowerF_3.gif',
            uri4: '../../imageResource/flower/flowerF/flowerF_4.gif',
            uri5: '../../imageResource/flower/flowerF/flowerF_5.gif'
        },
        
        {
            flowername: 'flowerG',
            uri1: '../../imageResource/flower/flowerG/flowerG_1.gif',
            uri2: '../../imageResource/flower/flowerG/flowerG_2.gif',
            uri3: '../../imageResource/flower/flowerG/flowerG_3.gif',
            uri4: '../../imageResource/flower/flowerG/flowerG_4.gif',
            uri5: '../../imageResource/flower/flowerG/flowerG_5.gif'
        },
        
        {
            flowername: 'flowerH',
            uri1: '../../imageResource/flower/flowerH/flowerH_1.gif',
            uri2: '../../imageResource/flower/flowerH/flowerH_2.gif',
            uri3: '../../imageResource/flower/flowerH/flowerH_3.gif',
            uri4: '../../imageResource/flower/flowerH/flowerH_4.gif',
            uri5: '../../imageResource/flower/flowerH/flowerH_5.gif'
        },
        
        {
            flowername: 'flowerI',
            uri1: '../../imageResource/flower/flowerI/flowerI_1.gif',
            uri2: '../../imageResource/flower/flowerI/flowerI_2.gif',
            uri3: '../../imageResource/flower/flowerI/flowerI_3.gif',
            uri4: '../../imageResource/flower/flowerI/flowerI_4.gif',
            uri5: '../../imageResource/flower/flowerI/flowerI_5.gif'
        },
        {
            flowername: 'flowerJ',
            uri1: '../../imageResource/flower/flowerJ/flowerJ_1.gif',
            uri2: '../../imageResource/flower/flowerJ/flowerJ_2.gif',
            uri3: '../../imageResource/flower/flowerJ/flowerJ_3.gif',
            uri4: '../../imageResource/flower/flowerJ/flowerJ_4.gif',
            uri5: '../../imageResource/flower/flowerJ/flowerJ_5.gif'
        }
      ]
     
    
      const FlowerGIF =()=>{
        console.log(seedColor,"좋아요")
        //if(scount<10) 
        switch(seedColor){
            
            case 'Pink':
                setFloweruri("require('"+flower[1].uri1+"')")
               
                
               
                return 
                    
                    
                
              
            case 'Brown':
                return 
            case 'Lavender':
                return 
            case 'Green':
                return 
            case 'Purple':
                return 
            case 'Yellow':
                
        }
      }

      const combinedfunction = ()=>{
        isChoosenSeed();
        FlowerGIF();
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
                                onPress={combinedfunction}  
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