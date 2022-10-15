import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView } from 'react-native'
import React,{ useEffect, useState } from 'react'
import { firebase } from '../config'

const Profile = () => {
  const [name, setName] = useState('')

  const changePassword =()=>{
    firebase.auth().sendPasswordResetEmail(firebase.auth().currentUser.email)
    .then(()=>{
      alert("Password reset email has been sent")
    }).catch((error)=>{
      alert(error)
    })
  }

  useEffect(()=>{
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
    .then((snapshot)=>{
      if(snapshot.exists){
        setName(snapshot.data())
      }else{
        console.log('User does not exist')
      }
    })
  },[])

  return(
    <SafeAreaView style={styles.container}>
      <Text style={{fontSize:20,fontWeight:'bold'}}>
        Hello, {name.firstName}
      </Text>

      <TouchableOpacity
        onPress={()=> {firebase.auth().signOut()}}
        style={styles.button}
      >
        <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Sign Out</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={()=>changePassword()}
        style={styles.button}
      >
        <Text style={{fontSize:20,fontWeight:'bold',color:'white'}}>Change Password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    marginTop:100,

  },
  button:{
    marginTop:50,
    height:70,
    width:250,
    backgroundColor:'#444241',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50,
  },
})


export default Profile