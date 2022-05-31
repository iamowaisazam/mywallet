import { View, Text,TextInput,StyleSheet,SafeAreaView,Pressable } from 'react-native'
import {useEffect,useState} from 'react'
import Layout from '../../components/layout'
import {create} from '../../controllers/category'
import { useSelector } from 'react-redux'

export default function App({navigation}) {

const [account_name,set_account_name] = useState('');
const store = useSelector(store => store);

const handle = async () => {

    const formData = {
      account_name,
    };

    let res = await create(formData);
    if(res){
      set_account_name('');
    }else{
      alert('Failed');
    }

}

  return (
    <Layout title="Add New Account">
      <View style={styles.container}>
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
                <Text style={[styles.button,{backgroundColor:store.primary_color}]}>Submit</Text> 
            </Pressable> 
          </View>
      </View>
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
  }
});