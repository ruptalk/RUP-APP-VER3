import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { ToastProvider } from 'react-native-toast-notifications'
import Loading from './screen/LoadingLoginSignup/Loading/Loading.js'
import Login from './screen/LoadingLoginSignup/Login/Login.js'
import FindPassword from './screen/LoadingLoginSignup/FindPassword/FindPassword.js';
import Main from './screen/Main/Main.js'
import Profile from './screen/Main/Profile/Profile.js'
import Notice from './screen/Main/Notice/Notice.js'
import ProfileImageFullSize from './screen/Main/Profile/ProfileImageFullSize.js'
import InFullBloom from './screen/Main/InFullBloom/InFullBloom.js';

const Stack = createStackNavigator();
function App(){
  return(
    <ToastProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown:false}}>
          <Stack.Screen name = 'Loading' component = {Loading}/>
          <Stack.Screen name = 'Login' component = {Login} />
          <Stack.Screen name = 'FindPassword' component = {FindPassword}/>
          <Stack.Screen name = 'Main' component = {Main}/>
          <Stack.Screen name = 'InFullBloom' component = {InFullBloom}/>
          <Stack.Screen name = 'Profile' component={Profile}/>
          <Stack.Screen name = 'Notice' component={Notice}/>
          <Stack.Screen name = 'ProfileImageFullSize' component={ProfileImageFullSize}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  )
}
export default App
//        <Stack.Screen name = 'Profile' component={Profile}/>

// <Stack.Screen name = 'Profile' component={Profile}/>
// <Stack.Screen name = 'Notice' component={Notice}/>
//fork_test
//pull_test

//dds