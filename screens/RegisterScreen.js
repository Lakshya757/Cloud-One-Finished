import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React,{ useState } from 'react'
import { firebase } from '../config'

const RegisterScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')

  const registerUser = async(email,password, firstName, lastName)=>{
    await firebase.auth().createUserWithEmailAndPassword(email,password)
    .then(()=>{
      firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp:true,
        url:'https://cloud-one-51e62.firebaseapp.com',
      })
      .then(()=>{
        alert('Verification email has been sent')
      }).catch(error=>{alert(error.message)})
      .then(()=>{
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({firstName,lastName,email})
      })
      .catch(error=>{alert(error.message)})
    })
  }

  return(
    <View style={styles.container}>
      <Text style={{fontWeight:'bold',fontSize:23}}>Register</Text>
      <View style={{marginTop:40}}>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={(firstName)=>setFirstName(firstName)}
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Last Name"
          onChangeText={(lastName)=>setLastName(lastName)}
          autoCorrect={false}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(email)=>setEmail(email)}
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType='email-address'
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(password)=>setPassword(password)}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
        />

      </View>

      <TouchableOpacity
        onPress={()=>registerUser(email,password,firstName,lastName)}
        style={styles.button}
      >

        <Text style={{fontWeight:'bold',fontSize:22}}>Register</Text>

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
    backgroundColor:'#026efd',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:50,
  }
})

export default RegisterScreen