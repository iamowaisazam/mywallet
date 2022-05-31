import { View, Text,TextInput,StyleSheet,SafeAreaView,Pressable } from 'react-native'
import {useEffect,useState} from 'react'
import Layout from '../../components/layout'
import {theme} from '../../utils'
import {get,remove,edit} from '../../controllers/category'
import {findAccount} from '../../controllers/transactions'
import { useSelector } from 'react-redux'

export default function App({route,navigation}) {

  const {id} = route.params;
  const [loading,setLoading] = useState(true);
  const [account_id,set_account_id] = useState('');
  const [account_name,set_account_name] = useState('');
  const store = useSelector(store => store);


  const [tr,set_tr] = useState();

  useEffect( async () => {

        let res = await get(id);
        let findtransaction = await findAccount(id);

        set_tr(findtransaction);
      
        if(res){
          set_account_name(res.account_name);
          set_account_id(res.id);
          setLoading(false);
          
        }
  },[]);


const handle = async () => {

    const formData = {
      account_name,
      id:account_id
    };
  
    let res = await edit(formData);
  
    if(res){
      alert('Account Update');
    }else{
      alert('Failed');
    }
}


const del = async () => {
       
    let count = await findAccount(account_id);
    if(count.items.length > 0){
       alert('Cannot Delete Accounts When You Have Transactions');
       return false;
    }
  
    let res = await remove(account_id);
    if(res){
      navigation.navigate('Category_index')
    }
}

return (
    <Layout title="Edit Account" >
      { loading ? <Text style={styles.loading} >Loading</Text> : <View style={styles.container}>          
          <View style={styles.item}> 
              <TextInput
                name="accountname"
                style={styles.input}
                onChangeText={(text) => set_account_name(text)} 
                placeholder="Account Name"
                value={account_name?account_name:''}
              />
         </View>

         
          <View style={styles.item}> 
            <Pressable style={styles.buttonContainer}  onPress={handle}>
                <Text style={[styles.button,{backgroundColor:store.primary_color}]}>Update</Text> 
            </Pressable> 
          </View>

          <View style={styles.item}> 
            <Pressable style={styles.buttonContainer}  onPress={del}>
                <Text style={[styles.button,{backgroundColor:store.primary_color}]}>Delete</Text> 
            </Pressable> 
          </View>

      </View> }
    </Layout>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal:10,
  },
  item: {
    marginVertical:10,
  },
  input: {
    borderWidth: 1,
    borderColor:'gray',    
    paddingVertical: 10,
  },
  select: {
    borderWidth: 1,
    borderColor:'gray',
    marginVertical:10,
  },
  buttonContainer:{
    textAlign:'center'
  },
  button:{
    padding:10,
    width:'100%',
    textAlign:'center',
    borderRadius:3,
    color:'white',
    fontSize:17,
  },
  loading:{
    textAlign:'center'
  }
});