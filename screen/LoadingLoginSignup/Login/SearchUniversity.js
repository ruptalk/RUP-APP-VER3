import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    Modal,
    Pressable,
    Image
} from 'react-native';
import styles from './style'

const SearchUniversity=(props)=>{
    const { universityModal, setUniversityModal,text} = props;
    return(
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={universityModal}
                onRequestClose={() => {
                    setUniversityModal(false);
                }}
            >     
                <Pressable 
                    style={styles.centeredView}
                    onPress={()=>setUniversityModal(false)}
                >

                    <View style={styles.universityModalView}>
                        
                    </View>
                </Pressable>
            </Modal>
        </>
    )
}
export default SearchUniversity