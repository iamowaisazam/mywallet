import {useEffect,useState} from 'react'
import { View,StyleSheet,ImageBackground,Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontawesome from '@expo/vector-icons/FontAwesome';
import { useNavigation,useRoute } from '@react-navigation/native';
import {useSelector} from 'react-redux'

export default function footer(Props) {

  const store = useSelector(store => store);

  const navigation = useNavigation();
  const route = useRoute();
  const [current,Setcurrent] = useState(null);

  const linkColor ='#e0e0e0';
  const active = store.contrast_color;

  return (
     <View style={[styles.container,{backgroundColor:store.primary_color}]}>
       <Pressable style={styles.item}>
         <Fontawesome onPress={() => {navigation.replace('Home')}} style={styles.icon} name="bar-chart-o" color={route.name =='Home'? active:linkColor} /></Pressable>

       <Pressable style={styles.item} onPress={() => {navigation.replace('Transctions_index')}}>
         <Fontawesome style={styles.icon} name="money" color={route.name =='Transctions_index'?active:linkColor}/></Pressable>
       
       <Pressable style={styles.item} onPress={() => {navigation.replace('Category_index')}}>
         <Fontawesome style={styles.icon} name="th-list" color={linkColor}  /></Pressable>
       
        <Pressable style={styles.item} onPress={() => {navigation.replace('Setting')}} >
         <Ionicons style={styles.icon} name="settings" color={route.name =='Setting'?active:linkColor}/></Pressable>
        
         {/* <Pressable style={styles.item} onPress={() => {navigation.replace('Setting')}} >
         <Fontawesome style={styles.icon} name="setting" color={route.name =='Setting'?active:linkColor}/></Pressable> */}
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
  },
  item:{
    flex:1,
    alignItems:'center',    
  },
  icon:{
    fontSize:25,
  },
});