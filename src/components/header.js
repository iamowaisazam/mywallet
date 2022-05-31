import { View, Text,StyleSheet,} from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import {theme} from '../utils/'
import {useSelector} from 'react-redux'


export default function header(Props) {
  
  const store = useSelector(store => store);
  const {title} = Props;

  return (
       <View style={[styles.container,{backgroundColor:store.primary_color}]}>
            <View style={styles.column1}> 
                <Text style={styles.title}>{title}</Text>
            </View>
            {/* <View style={styles.column2} > 
                <Ionicons name="home" size={25} color="white" />   
            </View> */}
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    height:'100%',
  },
  column1:{
    flexGrow:1,
    // paddingLeft:10,
  },
  title:{
    textAlign:'center',
    color:theme.contrast,
    fontSize:25,
    fontWeight:'600',
  },
  // column2:{
  //   marginRight:13,
  // },
});