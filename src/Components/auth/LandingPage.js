import React from 'react'
import { Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import logoimage from '../../../assets/unnamed.png'
export default function LandingPage({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: "center", backgroundColor: "white" }}>
      <Text style={{ fontSize: 30, fontWeight: '300', display: "flex", textAlign: "center", color: "#e86d0e" }}>Hello Welcome to the app</Text>

      <Image source={logoimage} style={{ width: 400, height: 300, marginVertical: 40 }} />
      <View style={{ marginTop: 20, width: "50%" }}>
        <TouchableOpacity style={Styles.button1}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "500", color: "white" }}>SIGN UP</Text>
        </TouchableOpacity>


        <TouchableOpacity
          style={Styles.button1}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={{ textAlign: "center", fontSize: 20, fontWeight: "500", color: "white" }}> LOGIN</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>

  )
}
const Styles = StyleSheet.create({
  button1: {
    backgroundColor: "#e86d0e",
    marginHorizontal: 5,
    marginVertical: 5,
    paddingHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 10,
    textAlign: "center"
  },

})
