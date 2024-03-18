import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker for handling image selection
import  axios  from 'axios';
import * as SecureStore from 'expo-secure-store';

const Signup = () => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [nameError, setNameError] = useState('');
  
  const [emailError, setEmailError] = useState('');
  const [image, setImage] = useState(null); // State to manage the selected image
  const navigation = useNavigation();

  const handleValidation = () => {
    let isValid = true;
    // Validate name, mobile, and email
    if (name.trim() === '') {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (mobile.trim() === '') {
      setMobileError('Mobile is required');
      isValid = false;
    } else if (mobile.trim().length !== 10) {
      setMobileError('Mobile number should be 10 digits');
      isValid = false;
    } else {
      setMobileError('');
    }

    if (email.trim() === '') {
      setEmailError('Email is required');
      isValid = false;
    } else {
      setEmailError('');
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (handleValidation()) {
      try {
        const formData = new FormData();
        formData.append('image', image); // Assuming image is already converted to a file object
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password); // Replace 'yourPassword' with the actual password
        console.log(image,"ImageImage")
        console.log(formData)
        const response = await axios.post('https://socialmediabackend-production-fa9a.up.railway.app/users/createUsers', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (response.status == 201) {
          SecureStore.setItem(
            'x-access-token',response.headers['x-access-token'] 
            ),
       
          navigation.navigate('BottomTabNavigator');
       
        } else {
          // Handle error
          Alert.alert('Error', 'Failed to create user. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
      }
    } else {
      Alert.alert('Error', 'Please fill all required fields correctly');
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
      console.log(result,"imageimageimageimageimage")
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
    }
  };
console.log(image,"imageimageimageimage")
  return (
    <ScrollView>
      <SafeAreaView style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
        <Text style={{ fontSize: 30, fontWeight: '300', textAlign: 'center', color: '#e86d0e' }}>Create Account</Text>
        <Text style={{ fontSize: 20, fontWeight: '300', textAlign: 'center', color: '#e86d0e' }}>Add your Details</Text>
        <View style={{ flexDirection: 'column', gap: 5, alignItems: 'center', marginTop: 20 }}>
  <TouchableOpacity onPress={pickImage}>
    <Text style={{ fontSize: 18, fontWeight: '400', textAlign: 'center', color: '#e86d0e' }}>Profile Image</Text>
  </TouchableOpacity>
  {image && (
    <View>
      {/* <Text style={{ fontSize: 18, fontWeight: '400', textAlign: 'center', color: '#e86d0e' }}>Profile Image:</Text> */}
      <Image source={{ uri: image }} style={{ width: 100, height: 100, marginTop: 10 ,borderRadius:30}} />
    </View>
  )}
</View>
        <View>
          <View style={{ flexDirection: 'column', gap: 5, alignItems: 'center', marginTop: 50 }}>
            <Text style={{ fontSize: 18, fontWeight: '400', textAlign: 'center', color: '#e86d0e' }}>Name</Text>
            <TextInput
              style={{ borderWidth: 2, padding: 4, width: 260, borderColor: '#e86d0e', borderRadius: 5 }}
              placeholder="Enter your Name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
            {nameError !== '' && <Text style={{ color: 'red' }}>{nameError}</Text>}
          </View>
          <View style={{ flexDirection: 'column', gap: 5, alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '400', textAlign: 'center', color: '#e86d0e' }}>Mobile</Text>
            <TextInput
              style={{ borderWidth: 2, padding: 4, width: 260, borderColor: '#e86d0e', borderRadius: 5 }}
              placeholder="Enter your Number"
              value={mobile}
              maxLength={10}
              onChangeText={(number) => {
                const numericValue = number.replace(/[^0-9]/g, '');
                setMobile(numericValue);
              }}
              keyboardType="numeric"
            />
            {mobileError !== '' && <Text style={{ color: 'red' }}>{mobileError}</Text>}
          </View>
          <View style={{ flexDirection: 'column', gap: 5, alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '400', textAlign: 'center', color: '#e86d0e' }}>Email</Text>
            <TextInput
              style={{ borderWidth: 2, padding: 4, width: 260, borderColor: '#e86d0e', borderRadius: 5 }}
              placeholder="Enter your Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
            />
            {emailError !== '' && <Text style={{ color: 'red' }}>{emailError}</Text>}
          </View>
          <View style={{ flexDirection: 'column', gap: 5, alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: '400', textAlign: 'center', color: '#e86d0e' }}>Password</Text>
            <TextInput
              style={{ borderWidth: 2, padding: 4, width: 260, borderColor: '#e86d0e', borderRadius: 5 }}
              placeholder="Enter your Email"
              value={password}
              onChangeText={(text) => setPassword(text)}
              keyboardType="text"
              secureTextEntry={true}
            />
            {emailError !== '' && <Text style={{ color: 'red' }}>{emailError}</Text>}
          </View>
         
        </View>
        <View style={{ marginTop: 50, width: '50%' }}>
          <TouchableOpacity style={Styles.button1} onPress={handleSubmit}>
            <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500', color: 'white' }}>Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

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

export default Signup;
