import { Tabs, useSegments } from 'expo-router';
import React from 'react';
import Home from "../../assets/icons/home.svg";
import Search from "../../assets/icons/search.svg";
import Categories from "../../assets/icons/category.svg";
import Cart from "../../assets/icons/cart.svg";
import User from "../../assets/icons/user.svg";
import SelectCategories from "../../assets/icons/selectCategory.svg";
import SelectCart from "../../assets/icons/selectCart.svg";
import SelectHome from "../../assets/icons/selectHome.svg";
import SelectSearch from "../../assets/icons/selectSearch.svg";
import SelectUser from "../../assets/icons/selectUser.svg";
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {

  const colorScheme = useColorScheme();
  const segment = useSegments();
  return (
    
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: { backgroundColor: '#f0f0f0' }}}>

      <Tabs.Screen name="home" options={{title: 'Home', tabBarIcon: ({ focused }) => (
            focused ? <SelectHome/> : <Home />
          )}}/>
      
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          tabBarIcon: ({ focused }) => (
            focused ? <SelectCategories/> : <Categories />
          ),  
          tabBarStyle:{  display: segment.length === 3? "none": "flex", backgroundColor: '#f0f0f0' }    
        }}
      />
      <Tabs.Screen name="search" options={{title: 'Search', tabBarIcon: ({ focused }) => (
            focused ? <SelectSearch/> : <Search />
          )
        }}/>
      <Tabs.Screen name="cart" options={{title: 'Cart', tabBarIcon: ({ focused }) => (
            focused ? <SelectCart/> : <Cart />
          )
        }}/>
      <Tabs.Screen name='user' options={{title: 'User', tabBarIcon: ({ focused }) => (
            focused ? <SelectUser/> : <User />
          ),
          tabBarStyle:{  display: segment[2] === "[id]" ? "none": "flex", backgroundColor: '#f0f0f0' }   
        }}/>
    </Tabs>
   
  );
}