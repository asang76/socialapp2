import axios from "axios"
import * as SecureStore from 'expo-secure-store';
export const getTokenApi = async (url) => {
    const token = SecureStore.getItem('x-access-token')
    const response = await axios.get(url, {
        headers: {
            'x-access-token': token
        }
    })
    return response;

}
export const postTokenApi = async (url, body) => {
   
        console.log('Request body:', body);
        const token =  SecureStore.getItem('x-access-token');
        console.log('Token:', token);

        const response = await axios.post(url, body, {
            headers: {
                'x-access-token': token
            }
        });

        console.log('Response:', response.data);
        return response;
    
};
export const postdataTokenApi = async (url, body) => {
   
    console.log('Request body:', body);
    const token =  SecureStore.getItem('x-access-token');
    console.log('Token:', token);
    console.log(url,"URKKKK")
    const response = await axios.post(url, body, {
        headers: {
            'x-access-token': token,
            }

    });

    console.log('Response:', response.data);
    return response;

};