import { View, Text,StyleSheet } from 'react-native'
import {useEffect,useState} from 'react'
import {get} from '../../controllers/category'
import {Global} from '../../controllers'

const App = (Props) => {
     
  const {data} = Props;
  const [account,SetAccount] = useState(false);
  
  useEffect( async () => {

    const res = await get(data.account_id);
    SetAccount(res.account_name);

  },[])

  return (
    <View style={styles.card} >
       <Text style={styles.date}>Date:  {data.date ? Global.DateFormat(data.date) : '' }</Text> 
       <Text style={styles.account} >Account: {account ? account : 'Loading' }</Text>   
       <Text style={styles.type} >Type:{data.type}</Text> 
       <Text style={styles.amount} >Amount: {data.amount} </Text>
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
         
  
     }
  
  });

export default App