import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React,{ useState, useEffect } from 'react'
import { firebase } from '../config'
import { useNavigation } from '@react-navigation/native'

function Edit(props){

    const navigation = useNavigation()
    const [preText,setPreText] = useState(props.route.params.body);

    const docRef = firebase.firestore().collection(firebase.auth().currentUser.uid).doc(props.route.params.title)

    const editHandler=async()=>{
        docRef.update({
            body:preText
        })
        navigation.goBack()
    }

    return(
        <View style={styles.container}>
            <TextInput
                value={preText}
                onChangeText={(x)=>setPreText(x)}
                style={styles.input}
                multiline={true}
            />
            <TouchableOpacity
                onPress={()=>editHandler()}
                style={styles.button}
            >
                <Text style={{color:'white',fontSize:25}}>Submit</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        // flex:1,
        alignItems:'center',
        marginTop:100,  
    },
    input:{
        paddingTop:20,
        paddingBottom:10,
        width:350,
        fontSize:20,
        borderBottomWidth:1,
        borderBottomColor:'#000',
        marginBottom:10,
        textAlign:'center',
        marginTop:25,
        height:250
        
    },
    inputTitle:{
        paddingTop:20,
        paddingBottom:10,
        width:350,
        fontSize:20,
        borderBottomWidth:1,
        borderBottomColor:'#000',
        marginBottom:10,
        textAlign:'center',
        marginTop:25,
        height:75
        
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

export default Edit