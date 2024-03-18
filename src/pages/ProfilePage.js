import React, { useEffect, useState } from 'react'
import { Image, ScrollView,Modal, StyleSheet, Text, TouchableOpacity, View, Pressable, Alert } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import useimage from '../../assets/userimage.jpg'
import  axios  from 'axios'
import { getTokenApi } from '../utilis/apicalls';
import { base_url } from '../utilis/api'
import { useRoute } from '@react-navigation/native';

const ProfilePage = ({navigation}) => {
const [profile , setProfile] = useState()
  const [modalVisible, setModalVisible] = useState(false);


  const getProfile = async () => {
    try {    
        response = await getTokenApi(`${base_url}posts/getProfile`);
      
      setProfile(response?.data);
    } catch (error) {
      Alert.alert("something went wrong");
      console.log(error);
    }
  }  
 
 
  console.log(profile?.postDetails)
  useEffect(() => {
    getProfile()
    // Listener for focus event
    const focusListener = navigation.addListener('focus', () => {
      getProfile()
    });
  
    return () => {
      focusListener();
    }; 
  }, []); 


  return (
    <SafeAreaView >
      <View style={{backgroundColor:"#ffff",height:"100%"}}>
      <View style={{margin:4,padding:5, borderRadius:10 ,backgroundColor:"#fae5d9",    shadowColor: '#000', // For iOS
    shadowOffset: { width: 0, height: 2 }, // For iOS
    shadowOpacity: 0.25, // For iOS
    shadowRadius: 3.84, // For iOS
    elevation: 10,}}>
    <View style={styles.profileView}>
      <Image source={{uri:profile?.userDetails?.profile ||"https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png" }} style={{width:100 ,height:100, padding:10,margin:10,borderRadius:10,}}  />
   <View style={styles.infoview}>
  <View>
    <Text  style={styles.texthead}>Followers</Text>
    <Text  style={styles.textsub}>{profile?.userDetails?.followers_ids.length}</Text>
  </View>
  <View>
    <Text style={styles.texthead}>Post</Text>
    <Text style={styles.textsub}>{profile?.postDetails?.length}</Text>
  </View>
  <View>
    <Text style={styles.texthead}>Following</Text>
    <Text style={styles.textsub}>{profile?.userDetails?.following_ids.length}</Text>
  </View>

   </View>
    </View>
    <View style={{marginLeft:20,}}>
   <Text style={{fontSize:16,fontWeight:500,letterSpacing: 1,}}>{profile?.userDetails?.name}</Text>
   <Text style={{fontSize:15,fontWeight:400,letterSpacing: 1,}}>{profile?.userDetails?.email}</Text>
    </View>   
  </View>
  <Text style={{fontSize:20,fontWeight:500,textAlign:"center",marginVertical:5,backgroundColor:"#ffff",letterSpacing:2}}>Post Shared </Text>
    <View >
  <ScrollView style={styles.post}  contentContainerStyle={styles.postContent}>
    {profile?.postDetails.map((item,ind)=>(
    <TouchableOpacity  onPress={() => setModalVisible(true)}>
      <View  style={{borderWidth:1,padding:1}} >
      <Image source={{uri: item.images[0]}} style={{width:130,height:150}} />
      </View>
    </TouchableOpacity>
    ))}
  

  </ScrollView>
  <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
         <Image source={useimage}  style={{width:400,height:400}}/>
          </View>
        </View>
      </Modal>
    </View>

      </View>
 

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  profileView:{
    marginLeft:10,
    marginTop:20,
    display:'flex',
    flexDirection:"row",
    width:"auto"
    
  },
  infoview:{
    marginTop:30,
    marginLeft:10,
    display:'flex',
    flexDirection:"row",
    gap:25
  },
  textsub:{
    textAlign: 'center',
    fontWeight:"600",
    letterSpacing: 1
    
  },
  texthead:{
    fontSize:16,
    fontWeight:"800",
    letterSpacing: 1
  },
  post:{
   marginTop: 10,
    maxHeight: 550, 
  },
  postContent: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between', // Distribute items evenly along the main axis
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    border:2,
    margin:10
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },

})

export default ProfilePage