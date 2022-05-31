import { View, Text,StatusBar,StyleSheet,Pressable} from 'react-native'
import {useEffect,useState} from 'react'
import Layout from '../../components/layout'
import {useSelector} from 'react-redux'


export default function App({navigation}){

  const store = useSelector(store => store);

  useEffect( async () => {
      componentDidMount();
 },[])

 const componentDidMount = async () =>{

  
 }

  return (<Layout title="Transactions" >
            <View style={styles.container}>
                <Pressable style={[styles.box]} onPress={() => {navigation.navigate('Transctions_search')}} >
                          <Text style={[styles.button,{backgroundColor:store.primary_color}]} >Search</Text>
                </Pressable> 
                <Pressable style={[styles.box]} onPress={() => {navigation.navigate('Transctions_create')}} >
                          <Text style={[styles.button,{backgroundColor:store.primary_color}]} >Add New</Text>
                </Pressable> 
            </View>
    </Layout>
  )
}


const styles = StyleSheet.create({
  container: {
    margin:10,
    flex: 1,
    backgroundColor: '#fff',
    borderColor:'black',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column',
  },
  box:{
    borderWidth:1,
    marginVertical:10,
    width:'100%',
    textAlign:'center',
  },
  button:{
    padding:20,
    fontSize:20,
    color:'white',
    width:'100%',
    textAlign:'center',
  },
});