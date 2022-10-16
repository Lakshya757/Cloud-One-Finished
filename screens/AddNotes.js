import { Text, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native'
import React,{ useState, useEffect } from 'react'
import { firebase } from '../config'

const AddNotes=()=>{

    const [title,setTitle] = useState('');
    const [body, setBody] = useState('')

    const addNote=()=>{
        firebase.firestore().collection(firebase.auth().currentUser.uid).doc(title).set({
            title:title,
            body:body
        })
        setTitle('')
        setBody('')
    }

    


    return(
        <View>
            <View style={styles.container}>
                <TextInput 
                    onChangeText={(x)=>{setTitle(x)}}
                    value={title}
                    multiline={true}
                    placeholder='Title'
                    style={styles.input}
                    placeholderTextColor="#54636A"
                    returnKeyType="search"
                    autoFocus={true}
                    editable={true}
                    pointerEvents="auto"
                    blurOnSubmit
                />
                <TextInput 
                    placeholder='Take a Note...'
                    onChangeText={(x)=>{setBody(x)}}
                    value={body}
                    multiline={true}
                    style={styles.input}
                />
                <TouchableOpacity
                    onPress={()=>{addNote()}}
                    style={styles.button}
                >
                    <Text style={{color:'white',fontSize:25}}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
    //   flex:1,
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
      textAlign:'center',
      marginTop:25,
      color: '#36404a',
    },
    button:{
      marginTop:50,
      height:70,
      width:250,
      backgroundColor:'#444241',
      alignItems:'center',
      justifyContent:'center',
      borderRadius:50,
    }
  })





export default AddNotes