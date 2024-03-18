import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView,Modal, FlatList, View, Text, Dimensions, TouchableOpacity, Alert, StyleSheet, Pressable, TextInput, ScrollView, useFocusEffect } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'; // You'll need to install this library
import data from '../data.json';
import userimg from '../../assets/userimage.jpg';
import like from '../../assets/Like.png';
import liked from '../../assets/liked.png';
import Comment from '../../assets/Comment.png'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { base_url } from '../utilis/api';
import { getTokenApi, postTokenApi, postdataTokenApi } from '../utilis/apicalls';
// import Modal from "react-native-modal";
const FeedsPage = () => {
  const [postData, setPostData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedpost, setSelectedPost] = useState(-1)
  const [newComment,setNewComment] = useState()

  const feedData = async () => {
    try {
      const response = await getTokenApi(`${base_url}posts/getFeed`)
      setPostData(response?.data?.data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  const addComment = async () => {
    try {
      const response = await postTokenApi(`${base_url}posts/addComment`, {
        post: postData[selectedpost].id,
        comment: newComment
      });
      if(response.status == 200){
        const addComment ={
          comment:newComment,
          name:'You'
        }
        console.log(postData[selectedpost].comments.push(addComment))
        

         
      }
      setModalVisible(false);
      setNewComment('');
    } catch (error) {
      console.error("Error adding comment:", error);
      Alert.alert("Error", "Failed to add comment. Please try again later.");
    }
  };

const handlelike = async(id) => {
  try {
    const res = await postTokenApi(`${base_url}posts/likeUnlikePost`,{
      post:id
    })
    if(res.status == 200){
      setPostData(prevPost => prevPost.map(Post => {
        if (id === Post.id) {
            return { ...Post, liked: !Post.liked };
        }
        return Post;
    }));
    }
    console.log(res.status,"asdcasdf")
  } catch (error) {
  
    Alert.alert("something went wrong")
  }
}
const navigation = useNavigation();

useEffect(() => {
  feedData();

  // Listener for focus event
  const focusListener = navigation.addListener('focus', () => {
    feedData();
  });

  // Cleanup function
  return () => {
    focusListener();
  };
}, []);

  
  
//  console.log(postData[3].comments[0],"handlelikehandlelikehandlelikehandlelike")

  const renderPostItem = ({ item,index }) => (
    <View style={{}}>
      <View style={{}}>
        <View style={{ paddingHorizontal: 10, height: "5%", backgroundColor: "#fad9ca", }}>
          <Text style={{ fontWeight: '600', letterSpacing: 1, textAlign: "center", paddingTop: 8 }}>{item?.name}</Text>
        </View>
        <View style={{ width: "100%", height: 500, resizeMode: "cover" }}>
          <Image source={{ uri: item.images[0] }} style={{ width: "100%", height: "100%", resizeMode: "cover" }} />
        </View>
        <View style={{ paddingHorizontal: 10, paddingVertical: 8, backgroundColor: "#fad9ca" }}>
          <View style={{ display: "flex", flexDirection: "row", gap: 10, alignItems: 'center' }} >
            {item.liked == true ?  <TouchableOpacity  onPress={() => {handlelike(item.id)}}>
            <Image  source={liked} />
            </TouchableOpacity> :  <TouchableOpacity  onPress={() => {handlelike(item.id)}}>
            <Image  source={like} />
            </TouchableOpacity> }
          
            {/* <Text>{item?.likedby?.length}</Text> */}
            <TouchableOpacity onPress={() => {setModalVisible(true); setSelectedPost(index);console.log(postData[index],"index")}}>
            <Image source={Comment} />

            </TouchableOpacity>
          </View>
          <View>
          </View>
        </View>
       
        <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <Text style={{ padding: 10 }} > <Text style={{ marginLeft: 5, fontWeight: "600", letterSpacing: 1 ,marginHorizontal:10}}>{item?.comments.length >0 ?item.comments[0].name:""}</Text>{item?.comments.length >0 ?item.comments[0].comment:"NO Comments"} </Text>
        </View>
      </View>
    
      <Modal
  animationType="slide"
  transparent={true}
  visible={modalVisible}
  onRequestClose={() => {
    Alert.alert('Modal has been closed.');
    setModalVisible(!modalVisible);
  }}>
      <ScrollView>
  <View style={styles.modalView}>
    <Pressable
      style={[styles.button, styles.buttonClose]}
      onPress={() => setModalVisible(!modalVisible)}>
      <Text>Hide</Text>
    </Pressable>
    
    <Text>Comments</Text>
    <View style={{ flex: 1 }}>
      {postData[selectedpost]?.comments?.map((comment, index) => (
        <Text style={{}} key={index}>
          <Text style={{ fontWeight: "700", marginRight: 10 }}>{comment.name}</Text>
          {comment.comment}
        </Text>
      ))}
    </View>
    <View style={{ flexDirection: 'column-reverse' }}>
      <View style={{display:"flex",flexDirection:"row",alignItems:"center",gap:6}}>
      <TextInput placeholder='Add your comment here'  value={newComment}
                  onChangeText={text => setNewComment(text)} />
        <TouchableOpacity onPress={addComment}>
          <Text style={{backgroundColor:"#F194FF",paddingHorizontal:10,paddingVertical:5}}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</ScrollView>
</Modal>

    </View>
  );

  return (
    <SafeAreaView  >
      <View >
      <FlatList
        data={postData}
        renderItem={renderPostItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 290 }}
      />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  profileView:{
    marginLeft:10,
    marginTop:20,
    display:'flex',
    flexDirection:"row",
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
    height:800,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1000,
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

export default FeedsPage;
