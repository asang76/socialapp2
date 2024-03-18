







import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getTokenApi, postTokenApi } from '../utilis/apicalls';
import { base_url } from '../utilis/api';
import  axios  from 'axios';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';


const PostCreate = () => {
  const [postText, setPostText] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);
  const [users, setUsers] = useState([]);
  const [image, setImage] = useState(null); // State to manage the selected image
  const navigation = useNavigation()

  

  const userData = async () => {
    try {
      const response = await getTokenApi(`${base_url}users/getPeopleNotFollowDetails`);
      setUsers(response?.data?.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    userData();
  }, []);
  const handlepicker = async() =>{
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
      // console.log(result,"imageimageimageimageimage")
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  }
  const handlepost = async () => {
    const token = await SecureStore.getItem('x-access-token');
    if (image) {
      // Perform the form submission only if image is set
      try {
        const formData = new FormData();
        formData.append('images', { uri: image, name: 'image.jpg', type: 'image/jpeg' });
  
        const response = await axios.post(`${base_url}posts/createPost`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token':  token
          }
        });
       
        Alert.alert("Your post has been successfully posted")
        setImage(null)
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      console.log('Form submission blocked: Image not selected');
    }
  }


  const renderPreview = () => {
    return (
      <View style={styles.previewContainer}>
        <Text style={styles.previewText}>{postText}</Text>
        {/* <View style={styles.previewMediaContainer}>{renderMediaFiles()}</View> */}
      </View>
    );
  };

  const handleFollow = async (id) => {
    try {
      const res = await postTokenApi(`${base_url}users/followUnfollow`, { id });
      if (res.status === 200) {
        setUsers(prevUsers =>
          prevUsers.map(user => {
            if (user.id === id) {
              return { ...user, isfollowing: !user.isfollowing };
            }
            return user;
          })
        );
      }
    } catch (error) {
      console.log("error", error?.response?.data);
    }
  };

  const renderPeopleYouMayKnow = () => {
    return users?.map((user) => (
      <View key={user.id} style={styles.userContainer}>
        <TouchableOpacity onPress={() => {navigation.navigate('setting', { userId: user.id })}}>
        <Image source={{ uri: user?.profile ? user?.profile : "https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png" }} style={{ width: 100, height: 100, padding: 10, margin: 10, borderRadius: 10, }} />
        </TouchableOpacity>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <TouchableOpacity style={styles.followButton} onPress={() => { console.log(user.id); handleFollow(user.id); }}>
          <Text style={styles.followButtonText}>{user.isfollowing ? "Unfollow" : "Follow"}</Text>
        </TouchableOpacity>
      </View>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <TextInput
        style={styles.input}
        placeholder="Share your post here..."
        multiline
        value={postText}
        onChangeText={setPostText}
      /> */}
      {/* <View style={styles.mediaContainer}>
        {renderMediaFiles()}
      </View> */}
      {/* {renderPreview()}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handlepicker}>
          <Text style={styles.buttonText}>Select Media</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton} onPress={handlepost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View> */}
       <TouchableOpacity onPress={handlepicker}>
    <Text style={{ fontSize: 18, fontWeight: '400', textAlign: 'center', color: '#e86d0e' }}>Choose Image</Text>
  </TouchableOpacity>
  {image && (
    <View>
      <Image source={{ uri: image }} style={{ width: 100, height: 100, marginTop: 10 ,borderRadius:30}} />
    </View>
  )}
  <TouchableOpacity style={styles.postButton} onPress={handlepost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      <View>
        <Text style={styles.peopleTitle}>People You May Know</Text>
        <ScrollView horizontal={true} style={styles.peopleContainer}>
          {renderPeopleYouMayKnow()}
        </ScrollView>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: "20%",
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  input: {
    width: '100%',
    height: 150,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  mediaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  media: {
    width: 100,
    height: 100,
    marginRight: 10,
    marginBottom: 10,
  },
  previewContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  previewText: {
    marginBottom: 10,
  },
  previewMediaContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  postButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  postButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  peopleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  peopleContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  userContainer: {
    marginRight: 20,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmail: {
    color: '#888',
    marginBottom: 10,
  },
  followButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    textAlign: 'center',
  },
  followButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PostCreate;
