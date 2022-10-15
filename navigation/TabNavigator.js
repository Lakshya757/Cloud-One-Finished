import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import Header from '../components/Header';

const Tab = createMaterialBottomTabNavigator();

import AddNotes from '../screens/AddNotes';
import Notes from '../screens/Notes';
import Profile from '../screens/Profile';


export default function TabNavigator(){
  return(
    <Tab.Navigator
    barStyle={{ backgroundColor: '#444241' }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "Add Notes") {
          iconName = focused ? "create" : "create-outline";
        } else if (route.name === "Notes") {
          iconName = focused ? "copy" : "copy-outline";
        }else if(route.name == "Profile"){
          iconName= focused ? "person-circle" : "person-circle-outline"
        }
        return (
          <Ionicons
            name={iconName}
            size={25}
            color={color}
          />
        );
      }
    })}
    >
    <Tab.Screen name="Add Notes" component={AddNotes} 
      options={{
        headerStyle: ()=><Header name="Add Notes" />,
          borderBottomLeftRadius:50,
          borderBottomRightRadius:50,
          backgroundColor:'#444241',
          shadowColor:'#000',
          elevation:25,
          height:150
        }
      }

    />
    <Tab.Screen name="Notes" component={Notes} />
    <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}