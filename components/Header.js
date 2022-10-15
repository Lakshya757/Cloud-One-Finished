import { View, Text } from 'react-native'
import React from 'react'

const Header = (props) => {
  return (
    <View style={{alignItems:'center'}} >
      <Text style={{fontSize:32,fontWeight:'bold'}}>{props.name}</Text>
    </View>
  )
}

export default Header