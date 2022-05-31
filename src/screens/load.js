import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Button ,Text, View,ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {useSelector} from 'react-redux'



export default function App({ navigation }) {

  // const image = require('../assets/bg-2.png');

  const store = useSelector(store => store);
 
  return (
    <View style={[styles.container,{backgroundColor:store.primary_color}]}>
      {/* <LinearGradient  colors={['#020024','#090979','#00d4ff']} start={[3, 1]}  >  */}
          <View style={styles.content} >
            <Text style={styles.text1}>Welcome</Text>
            <Text style={styles.text2} >Hi Friends This Wallet Manage Application.You Can Manage Your Personal Expense Cash Easily</Text>
            <View style={styles.button}><Button onPress={() => navigation.replace('Home')} title="Lets Start" color="#825BEB"/></View>
          </View>
          <StatusBar style="auto" />
        {/* </LinearGradient> */}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems:'center',
      justifyContent:'center',
      borderWidth:1,
      borderColor:'black',
    },
    content:{
      flex:1,
      justifyContent:'center',
      marginHorizontal:30,
    },
    text1:{
      textAlign:'center',
      paddingVertical:10,
      fontSize:40,
      color:'white',
    },
    text2:{
      textAlign:'center',
      paddingVertical:10,
      fontSize:15,
    },
    button:{
      alignSelf:'center',
      borderWidth:1,
      textAlign:'center',
      width:200,
      margin:'auto',
    },
    image:{
      flex: 1,
      width:'100%',
      justifyContent: "center"
    }
});