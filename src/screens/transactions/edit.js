import { View, Text,TextInput,StyleSheet,SafeAreaView,Pressable,Button  } from 'react-native'
import {useEffect,useState} from 'react'
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import Layout from '../../components/layout'
import {theme} from '../../utils'
import {getAll} from '../../controllers/category'
import {get,edit,remove} from '../../controllers/transactions'
import {Global} from '../../controllers'
import { useSelector } from 'react-redux';


export default function App({route,navigation}) {

  const {id} = route.params;
  const [loading,setLoading] = useState(true);
  const [accountList,set_accountList] = useState([]);
  const [account,set_account] = useState('');
  const [amount,set_amount] = useState(0);
  const [type,set_type] = useState('');

  const [date,set_date] = useState(new Date(1598051730000));
  const [detail,set_detail] = useState('');
  const [show, setShow] = useState(false);
  const store = useSelector(store => store);


  useEffect( async () => {     
       
       let getallaccounts = await getAll(); 
       set_accountList(getallaccounts);

       let res = await get(id) 
       if(res){

        set_account(res.account_id);
        set_type(res.type);
        set_amount(res.amount);
        set_detail(res.detail);
        set_date(res.date);
        setLoading(false);
       
    }
  },[]);


const handle = async () => {
  
     if(account == ''){
      alert('Please Select Account');
      return false;
     }

     if(type == ''){
      alert('Please Select Type');
      return false;
     }

     if(amount == ''){
      alert('Enter Amount');
      return false;
     }

    const formData = {
      id:id,
      account_id:account,
      type:type,
      amount:amount,
      detail:detail,
      date:date
    };

    let res = await edit(formData);
    if(res){
      alert('Transactions Update');
    }else{
      alert('Failed');
    }

}

const del = async () => {
    let res = remove(id);
    if(res){
      navigation.replace('Transctions_index')
    }
}

return (<Layout title="Edit New Transaction" >
      { loading ? <Text style={styles.loading} >Loading</Text> : <View style={styles.container}>          
            <View style={styles.select} >  
                <Picker selectedValue={account} onValueChange={(itemValue, itemIndex) => set_account(itemValue)}>
                <Picker.Item  label='Select Account' value='' />
                  {
                    accountList.map((item,key) => { 
                        return<Picker.Item key={key} label={item.account_name} value={item.id} />
                    })
                  }
              </Picker>
           </View>

           <View style={styles.select} >
                <Picker selectedValue={type}
                  onValueChange={(itemValue, itemIndex) =>
                    set_type(itemValue)
                  }>
                  <Picker.Item label="Select Type" value="" />
                  <Picker.Item label="Debit" value="debit" />
                  <Picker.Item label="Credit" value="credit" />
              </Picker>
           </View>
          
           <View style={styles.item}> 
              <TextInput style={styles.input} onChangeText={(text) => set_amount(text)}  placeholder="amount"
                value={amount?amount:''} keyboardType='numeric' />
           </View>

           <View style={styles.item}> 
             <View style={styles.input} >
               <Text onPress={() => setShow(true) }>{Global.DateFormat(date)}</Text>
            </View>

            {show && ( <DateTimePicker placeholder="select date"
              format="DD/MM/YYYY" testID="dateTimePicker" value={new Date(date)} mode='date' is24Hour={true}
                    onChange={async (event, selectedDate)   =>{ 
                      const currentDate = selectedDate;
                      setShow(false); 
                      set_date(currentDate.toString());
                    }} />
             )}
         </View>

          <View style={styles.item}> 
              <TextInput style={styles.input} onChangeText={(text) => set_detail(text)}  placeholder="Description"
                value={detail?detail:''} />
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
    backgroundColor:theme.primary,
    textAlign:'center',
    borderRadius:3,
    color:'white',
    fontSize:17,
  },
  loading:{
    textAlign:'center'
  }
});