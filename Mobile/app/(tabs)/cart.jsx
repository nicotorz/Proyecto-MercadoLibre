
import React, { useContext, useEffect } from "react";
import { useNavigation } from "expo-router";
import { AuthContext } from "../../hooks/authContext";
import Login from '@/components/login/Login';
import Cart from '@/components/cart/Cart'
import { AuthProvider } from '@/hooks/authContext';


export default function TabTwoScreen() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigation.setOptions({ title: "Login" });
    } else {
      navigation.setOptions({ title: "Cart" });
    }
  }, [user]);
  
  
  return ( 
    <>
    {!user ? (
      <Login /> 
    ) : (
      <Cart/> 
    )}
  </>
  );

}