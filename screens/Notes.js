import { Text, StyleSheet, TouchableOpacity, View, FlatList, TextInput, ActivityIndicator } from 'react-native'
import React,{ useState, useEffect } from 'react';
import {Card} from './Card';
import { useNavigation } from '@react-navigation/native'
import { firebase } from '../config'


export default function Notes(){

    // const noteRef = firebase.firestore().collection(firebase.auth().currentUser.uid)

        const navigation = useNavigation();
        const [loading, setLoading] = useState(true); // Set loading to true on component mount
        const [users, setUsers] = useState([]); // Initial empty array of users


        const clickHandler=(cTitle,cBody)=>{
          navigation.navigate("Card", {title:cTitle,body:cBody})
        }


        useEffect(() => {
          const subscriber = firebase.firestore()
            .collection(firebase.auth().currentUser.uid)
            .onSnapshot(querySnapshot => {
              const users = [];
        
              querySnapshot.forEach(documentSnapshot => {
                users.push({
                  ...documentSnapshot.data(),
                  key: documentSnapshot.id,
                });
              });
        
              setUsers(users);
              setLoading(false);
            });
        
          // Unsubscribe from events when no longer in use
          return () => subscriber();
        }, []);
      
        if (loading) {
          return <ActivityIndicator />;
        }

        return (
            <FlatList
              data={users}
              renderItem={({ item }) => (
                <View style={{ height: 50, flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <TouchableOpacity
                    onPress={()=>clickHandler(item.title,item.body)}
                  >
                    <View style={styles.card}>
                        <Text style={{color:'white',fontSize:20,fontWeight:'bold',marginBottom:10}}>{item.title}</Text>
                        <Text style={{color:'white',fontSize:18}}>{item.body}</Text>
                        </View>
                  </TouchableOpacity>
                </View>
              )}
            />
          );

}

const styles = StyleSheet.create({
    card:{
      backgroundColor:'#444241',
      margin:25,
      padding:25,
      borderRadius:20,
      width:300
    }
})