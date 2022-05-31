import { View, Text,StyleSheet,Pressable,ScrollView } from 'react-native'
import React from 'react'
import {Categories} from '../utils/data'
import Ionicons from '@expo/vector-icons/Ionicons';


export default function Card({navigation}) {
  return (
     
     <ScrollView style={styles.scrollView}> 
            <View style={styles.cardContainer} >
            {
              

                Categories.map((item,key) => {  
                    return <Pressable style={styles.card} key={key}  >
                            <Text style={styles.cardTitle} >{item.title}</Text>
                            <Ionicons style={styles.cardIcon} name={item.icon} size={25} color="black" />   
                        </Pressable>  
                    })
            
            }
        </View>
    </ScrollView>

  )
}


const styles = StyleSheet.create({
      cardContainer:{
        display:'flex',
        flexWrap:'wrap',
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
      },
      card:{
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        width:'43%',
        borderWidth:2,
        borderRadius:7,
        marginVertical:10,
        padding:7,
        backgroundColor:'#fd79a8',
        borderColor:'#ff7675',
        // backgroundColor:'green'
        elevation: 2
      },
      cardTitle:{
        color:'white'
      },
      cardIcon:{
       marginBottom:0,
       fontSize:50, 
       color:'white',
      },
      carddes:{
        marginBottom:5,
        fontSize:12, 
       }
});