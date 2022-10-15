import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React,{ useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const changePassword =()=>{
    firebase.auth().sendPasswordResetEmail(email)
    .then(()=>{
      alert("Password reset email has been sent")
    }).catch((error)=>{
      alert("Enter email above first")
    })
  }

  const loginUser = async(email,password)=>{
    try{
      await firebase.auth().signInWithEmailAndPassword(email,password)
    }catch(error){
      alert(error.message)
    }
  }

  return(
    <View style={styles.container}>
      <Text style={{fontWeight:'bold',fontSize:26}}>Login</Text>
      <View style={{marginTop:40}}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(email)=>setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(password)=>setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        onPress={()=>changePassword()}
        style={{marginTop:20}}
      >
        <Text style={{fontSize:18,color:"#005fff"}}>Forget Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={()=>loginUser(email,password)}
        style={styles.button}
      >
        <Text style={{fontWeight:'bold',fontSize:22}}>Login</Text>
      </TouchableOpacity>


      <Text style={{fontWeight:'bold',fontSize:22, marginTop:35}}>Don't have an account? </Text>
      <TouchableOpacity
        onPress={()=>navigation.navigate("Register")}
        style={{marginTop:20}}
      >
        <Text style={{fontWeight:'bold',fontSize:22}}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  )

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    marginTop:100,

  },
  input:{
    paddingTop:20,
    paddingBottom:10,
    width:400,
    fontSize:20,
    borderBottomWidth:1,
    borderBottomColor:'#000',
    marginBottom:10,
    textAlign:'center'
  },
  button:{
    marginTop:50,
    height:70,
    width:250,
    backgroundColor:'#444241 ',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50,
  }
})

export default LoginScreen