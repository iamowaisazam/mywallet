import {useEffect,useState} from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Text,View,Pressable,ScrollView,Dimensions} from 'react-native';

//Componente
import Header from './header'
import Footer from './footer'
export default function layout(Props) {

    const {children,title} = Props;

  return (
    <View style={styles.container} >
        <View style={styles.header} >
            <Header title={title} />
        </View>
        <View style={styles.content} >
            {children}
        </View>
        <View style={styles.footer} >
            <Footer/>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    header:{
        borderWidth:1,
        height:100,
    },
    content:{
        flexGrow:1,
    },
    footer:{
        height:60,
        borderWidth:1,
        // bottom:0,
        // position:'absolute'
    }
});
