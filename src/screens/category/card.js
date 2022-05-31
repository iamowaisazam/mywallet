import { View, Text,StyleSheet,Pressable } from 'react-native'
import {useEffect,useState} from 'react'
import {Global,Transactions} from '../../controllers'
import Fontawesome from '@expo/vector-icons/FontAwesome';
import { useNavigation,useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const App = (Props) => {
     
  const {data} = Props;  
  const [Loading,SetLoading] = useState(true);
  const [Balance,SetBalance] = useState(0);

  const navigation = useNavigation();
  const route = useRoute();
  const store = useSelector(store => store);

  useEffect( async () => {

      const res = await Transactions.findAccount(data.id);
      SetBalance(res.balance);
      SetLoading(false);
  },[])

  return (
    <View style={styles.card} >
      {Loading ? <Text style={styles.account} >Loading</Text>: 
      <>
        <View style={{width:'100%'}} >
              <Text style={styles.account} >Account: {data.account_name}</Text>    
              <Text style={styles.amount} >Balance: {Balance}</Text>
        </View>
        <View style={{ justifyContent:'center', display:'flex',flexDirection:'row',width:'100%'}} >
            <Pressable style={styles.item} onPress={() => {navigation.navigate('Category_edit',{id:data.id})}}>
              <Fontawesome style={[styles.icon,{color:store.primary_color}]}   name="edit" color={'red'} /></Pressable>
            <Pressable onPress={() => {navigation.navigate('Category_search',{id:data.id})}} >
              <Fontawesome style={[styles.icon,{color:store.primary_color}]} name="money" color={'red'} /></Pressable>
        </View>
       </>
     }
    </View>
  )
}

const styles = StyleSheet.create({
    card:{
      display:'flex',
      flexDirection:'row',
      alignItems:'center',
      borderWidth:2,
      borderRadius:7,
      marginVertical:10,
      padding:7,
      backgroundColor:'white',
      borderColor:'#f2eaea',
      elevation: 2,
      marginHorizontal:1,
      flexWrap:'wrap'
    },
    account:{
      color:'#545454',
      fontSize:15,
      textAlign:'center',
      width:'100%',
      color:'black',
    },
    amount:{
      width:'100%',
      marginBottom:5,
      fontSize:15, 
      color:'black',
      textAlign:'center'
     },
     date:{
        width:'100%',
        textAlign:'center',
        marginBottom:5,
        fontSize:15, 
        color:'#545454',
        color:'black',
       },
    type:{
        width:'100%',
        textAlign:'center',
       marginBottom:5,
       fontSize:15, 
       color:'#545454',
       color:'black',
     },
     scrollView:{
         
     },
     icon:{
      fontSize:30,
      marginVertical:1,
      marginHorizontal:5,
     }
  
  });

export default App