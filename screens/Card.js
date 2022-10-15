import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { firebase } from '../config'


function Card(props){
    
    const navigation = useNavigation();

    

    const deleteHandler=async()=>{
        firebase.firestore().collection(firebase.auth().currentUser.uid).doc(props.route.params.title).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });

        navigation.goBack()
    }

    const editHandler=async()=>{
        navigation.navigate('Edit', {title:props.route.params.title,body:props.route.params.body})
    }
  
    return (
    <View>
        <View>
            <TouchableOpacity
                onPress={()=>deleteHandler()}
            >
                <Ionicons
                    name='trash'
                    size={24}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>editHandler()}
            >
                <Ionicons
                    name='pencil'
                    size={24}
                />
            </TouchableOpacity>
        </View>
        <View style={{alignItems:'center',flexDirection:'column'}} >
        <Text style={{fontSize:32,fontWeight:'bold'}}>{props.route.params.title}</Text>
        <Text style={styles.body}>{props.route.params.body}</Text>
        </View> 
    </View>
  )
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        flexWrap:'wrap',
        fontSize:24,
        padding:15
    }
})


export default Card