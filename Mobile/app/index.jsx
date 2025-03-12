import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { AuthContext } from '../hooks/authContext'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../services/api'
import Loading from '../components/loading/Loading'

const Index = () => {
  const { setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const checkToken = async () => {
        try {
        const token = await AsyncStorage.getItem('token')
        setLoading(true);
        if (!!token) {
            const userData = await Api.getUser() 
            setUser(userData ); 
        } 
        } catch (error) {
            console.log(error)
        } finally {
        setLoading(false);
        }
    };

  checkToken();
}, []);

if(loading){
    return (
        <Loading/>
    );
}


return(
    <Redirect href="/home"/>   
)

}
export default Index;