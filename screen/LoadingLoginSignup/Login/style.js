import {StyleSheet} from 'react-native'
import {screenHeight,screenWidth} from '../../Main/fullScreenValue'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor:'#f9f8e8',
    },
    
    ////////////////BottomSheet_login style//////////////////////////////
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.2)"
    },
    background: {
        flex: 1,
    },
    bottomSheetContainer: {
        //height: '50%',        //높이 퍼센트로 지정시 keyboardAvoidngView적용안됨
        // justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
    },
    iconDirection:{
        flexDirection:'row',
        marginTop:20,
        marginBottom:15
    },
    iconLocation:{
        flex:1,
        alignItems:'center'
    },
    passwordPage:{
        fontWeight:'bold',
        marginTop:20,
        marginBottom:20,
    },
    sectionStyle: {
        borderWidth: 0.5,
        borderColor: '#777777',
        height: 40,
        borderRadius: 20,
        margin: 7,
        width:'96%',
        marginBottom:4,
        paddingLeft:15,
    },
    sectionStyleBlank: {
        borderWidth: 0.5,
        borderColor: 'red',
        height: 40,
        borderRadius: 20,
        margin: 7,
        width:300,
        marginBottom:4,
        paddingLeft:15,
    },
    signUp: {
        borderWidth: 0.5,
        borderColor: '#777777',
        height: 40,
        borderRadius: 20,
        margin: 10,
        alignItems:'center',
        justifyContent:'center',
        width:300,
        marginTop:10,
        backgroundColor:'#a8cd98',
    },
    signUpText: {
        color:'white',
        fontWeight:'bold',
    },
    imageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center',
    },
    searchUniversity: {
        borderWidth: 0.5,
        borderColor: '#777777',
        height: 40,
        borderRadius: 20,
        marginTop: 7,
        marginBottom: 7,
        width:200,
        marginBottom:4,
        backgroundColor:'white',
        paddingLeft:15,
        justifyContent:'center',
    },
    searchMajor: {
        borderWidth: 0.5,
        borderColor: '#777777',
        height: 40,
        borderRadius: 20,
        marginTop: 7,
        marginBottom: 7,
        width:100,
        marginBottom:4,
        backgroundColor:'white',
        paddingLeft:15,
        justifyContent:'center'
    },
    ////////////////BottomSheet_login style//////////////////////////////
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
    universityModalView: {
        height:screenHeight, 
        width: screenWidth,
        backgroundColor: "white",
    },
    item: {
        marginTop:'4%',
        marginLeft:'5%',
        marginRight:'5%',
        borderBottomColor: '#e9e9e8',
        borderBottomWidth: 0.8,
    },
    major:{
        fontWeight:'bold',
        fontsize:12,
        marginLeft:'7%'
    }
})
export default styles