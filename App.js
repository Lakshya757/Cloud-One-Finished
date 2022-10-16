import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React,{ useState, useEffect } from 'react';
import { firebase } from './config';
import Card from "./screens/Card";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Header from "./components/Header";
import TabNavigator from "./navigation/TabNavigator";
import Notes from "./screens/Notes";
import Edit from "./screens/Edit";

const Stack = createNativeStackNavigator();

function App(){
  const [init, setinit] = useState(true)
  const [user, setuser] = useState()

  //handle user state change
  function onAuthStateChanged(user){
    setuser(user);
    if(init) setinit(false)
  }

  useEffect(()=>{
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  },[])

  if(init) return null;

  if(!user){
    return (
      <Stack.Navigator>
        
        <Stack.Screen name="Login" component={LoginScreen} 
          options={{
            headerTitle:()=>()=><Header name="Login" />,
            headerTitleStyle:{
              color:'white',
              fontSize:26,
              padding:15
            },
              // headerShown:false,
              headerStyle: {
              height:100,
              borderBottomLeftRadius:50,
              borderBottomRightRadius:50,
              backgroundColor:'#444241',
              shadowColor:'#000',
              elevation:25

            }
          }}
        />

        <Stack.Screen name="Register" component={RegisterScreen} 
          options={{
            headerTitle:()=>()=><Header name="Login" />,
            headerTitleStyle:{
              color:'white',
              fontSize:26,
              padding:15
            },
              // headerShown:false,
              headerStyle: {
              height:100,
              borderBottomLeftRadius:50,
              borderBottomRightRadius:50,
              backgroundColor:'#444241',
              shadowColor:'#000',
              elevation:25

            }
          }}
        />
      </Stack.Navigator>
    )
  }

  return(
    <Stack.Navigator
    >
      <Stack.Screen name="Cloud One" component={TabNavigator} 
          options={{
            headerTitleStyle:{
              color:'white',
              fontSize:26,
              padding:15
            },
              // headerShown:false,
              headerStyle: {
              height:100,
              borderBottomLeftRadius:50,
              borderBottomRightRadius:50,
              backgroundColor:'#444241',
              shadowColor:'#000',
              elevation:25

            }
          }}
        />

        <Stack.Screen name="Card" component={Card}
          options={{
            headerTitleStyle:{
              color:'white',
              fontSize:26,
              padding:15
            },
              // headerShown:false,
              headerStyle: {
              height:100,
              borderBottomLeftRadius:50,
              borderBottomRightRadius:50,
              backgroundColor:'#444241',
              shadowColor:'#000',
              elevation:25

            }
          }}
          

        />

        <Stack.Screen name="Notes" component={Notes}
          options={{
            headerTitleStyle:{
              color:'white',
              fontSize:26,
              padding:15
            },
              // headerShown:false,
              headerStyle: {
              height:100,
              borderBottomLeftRadius:50,
              borderBottomRightRadius:50,
              backgroundColor:'#444241',
              shadowColor:'#000',
              elevation:25

            }
          }}
        />

        <Stack.Screen name="Edit" component={Edit}
          options={{
            headerTitleStyle:{
              color:'white',
              fontSize:26,
              padding:15
            },
              // headerShown:false,
              headerStyle: {
              height:100,
              borderBottomLeftRadius:50,
              borderBottomRightRadius:50,
              backgroundColor:'#444241',
              shadowColor:'#000',
              elevation:25

            }
          }}
          

        />

        
    </Stack.Navigator>
  )
}

export default ()=>{
  return(
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}