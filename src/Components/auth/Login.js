import  axios  from 'axios'
import React, { useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { base_url } from '../../utilis/api'
import * as SecureStore from 'expo-secure-store';


const Login = ({navigation}) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState();

  const handlelogin = async() =>{
    try {
      const response = await axios.post(`${base_url}users/login`,{
        email:email,
        password:password
      })
      if (response.status == 200) {
        SecureStore.setItem(
          'x-access-token',response.headers['x-access-token'] 
          ),
          console.log("navigation",navigation)
          navigation.navigate('BottomTabNavigator');
     
     
      }
    } catch (error) {
      console.log(error)
      Alert.alert("something went wrong")
    }
  }


  return (
   <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
    <Text style={{ fontSize: 40, fontWeight: '300', textAlign: 'center', color: '#e86d0e' }}>Login</Text>
    <View style={{ flexDirection: 'column', gap: 5, alignItems: 'center', marginTop: 50 }}>
            <Text style={{ fontSize: 18, fontWeight: '400', textAlign: 'center', color: '#e86d0e' }}>Email</Text>
            <TextInput
              style={{ borderWidth: 2, padding: 4, width: 260, borderColor: '#e86d0e', borderRadius: 5 }}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
             
            />
            {/* {nameError !== '' && <Text style={{ color: 'red' }}>{nameError}</Text>} */}
          </View>
          <View style={{ flexDirection: 'column', gap: 5, alignItems: 'center', marginTop: 50 }}>
            <Text style={{ fontSize: 18, fontWeight: '400', textAlign: 'center', color: '#e86d0e' }}>Passsword</Text>
            <TextInput
              style={{ borderWidth: 2, padding: 4, width: 260, borderColor: '#e86d0e', borderRadius: 5 }}
              placeholder="Enter your Name"
             value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
              
            />
            {/* {nameError !== '' && <Text style={{ color: 'red' }}>{nameError}</Text>} */}
          </View>
          <View style={{width:200, display:'flex',justifyContent:"center" ,alignSelf:"center", marginTop:40}}>
          <TouchableOpacity style={Styles.button1} onPress={()=>{handlelogin()}}>
         <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "500", color: "white" }}>Get Me In</Text>   
        </TouchableOpacity>
          </View>
        
   </SafeAreaView>
  )
}
const Styles = StyleSheet.create({
  button1: {
    backgroundColor: '#e86d0e',
    marginHorizontal: 5,
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    textAlign: 'center',
  },
});
export default Login