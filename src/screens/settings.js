import { View, Text,TextInput,StyleSheet,Pressable} from 'react-native'
import {useEffect,useState} from 'react'
import Layout from '../components/layout'
import {Global} from '../controllers/'
import {useSelector,useDispatch} from 'react-redux'
import {Picker} from '@react-native-picker/picker';


export default function App({route,navigation}) {

  const [loading,setLoading] = useState(true);
  const [primary_color,set_primary_color] = useState('');

  const Store = useSelector(store => store);
  const dispatch = useDispatch();

  useEffect( async () => {     
       
        let Settings = await Global.GetSetting(); 
        if(Settings){
          set_primary_color(Store.primary_color);
        }
        setLoading(false);
  },[]);

const OnClear = async () => {
  
  let res = await Global.ClearData();
  if(res){
    alert('All Cleared');
  }else{
    alert('Failed Clear Data');
  }  
  
}


const handle = async () => {

    const formData = {
      primary_color,
   };

   let res = await Global.SaveSetting(formData);  
   if(res){
     
      alert('Settings Save');
      dispatch({type:'theme',payload:{
        primary_color:formData.primary_color
      }});

    }else{
      alert('Failed');
    }
}


return (<Layout title="Settings" >
      { loading ? <Text style={styles.loading} >Loading</Text> : <View style={styles.container}>          
             
          <View style={styles.select}> 
                <Picker selectedValue={primary_color}
                  onValueChange={(itemValue, itemIndex) =>
                    set_primary_color(itemValue)
                  }>
                  <Picker.Item label="Default Theme" value="#ee0290" />
                  <Picker.Item label="Theme 1" value="red" />
                  <Picker.Item label="Theme 2" value="blue" />
                  <Picker.Item label="Theme 3" value="green" />
              </Picker>
         </View>

          <View style={styles.item}> 
            <Pressable style={styles.buttonContainer}  onPress={handle}>
                <Text style={[styles.button,{backgroundColor:Store.primary_color}]}>Update</Text> 
            </Pressable> 
          </View>

          <View style={styles.item}> 
            <Pressable style={styles.buttonContainer} onPress={OnClear}>
                <Text style={[styles.button,{backgroundColor:Store.primary_color}]}>Clear Data</Text> 
            </Pressable> 
          </View>

          <View style={styles.item}> 
            <Pressable style={styles.buttonContainer} onPress={() => navigation.replace('Load') }>
                <Text style={[styles.button,{backgroundColor:Store.primary_color}]}>Logout</Text> 
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
  select: {
    borderWidth: 1,
    borderColor:'gray',
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