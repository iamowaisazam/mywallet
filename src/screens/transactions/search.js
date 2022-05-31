import { View, Text,StatusBar,StyleSheet,Pressable,ScrollView } from 'react-native'
import {useEffect,useState} from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';

import Layout from '../../components/layout'
import {getAll} from '../../controllers/transactions'
import {Global} from '../../controllers'

import Card from './card';
import {theme} from '../../utils';

export default function App({navigation}){

  const [transactions,Settransactions] = useState([]);

  const [startdate,set_startdate] = useState(new Date());
  const [startshow, setstartShow] = useState(false);

  const [enddate,set_enddate] = useState(new Date());
  const [endshow, setendShow] = useState(false);
  
  useEffect( async () => {
      componentDidMount();
 },[startdate,enddate])


 const componentDidMount = async () =>{
  
    let days = await Global.getDaysArray(startdate,enddate);
    let response = await getAll();
    let filterdata = [];
    response.forEach(element => {
         
          let TransactionDate = Global.DateFormat(element.date);
          if ( days.includes(TransactionDate)) {
           filterdata.push(element);
          }
    });

     Settransactions(filterdata);  
 }

  return (<Layout title="Search Transactions" >
      
    <View style={styles.container}>
      <View>
          <View style={styles.inputDate} >
               <Text onPress={() => setstartShow(true) } >Start Date - { Global.DateFormat(startdate)}</Text>
          </View>
          {startshow && ( <DateTimePicker placeholder="select date"
            format="DD/MM/YYYY" testID="dateTimePicker" value={new Date(startdate)} mode='date' is24Hour={true}
                onChange={async (event, selectedDate)   =>{ 
                  const currentDate = selectedDate;
                  setstartShow(false); 
                  set_startdate(currentDate.toString());
                
                }} />
             )}
      </View> 

      <View>
          <View style={styles.inputDate} >
               <Text onPress={() => setendShow(true) } >End Date - { Global.DateFormat(enddate)}</Text>
          </View>
          {endshow && ( <DateTimePicker placeholder="select date"
            format="DD/MM/YYYY" testID="dateTimePicker" value={new Date(enddate)} mode='date' is24Hour={true}
                onChange={async (event, selectedDate)   =>{ 
                  const currentDate = selectedDate;
                  setendShow(false); 
                  set_enddate(currentDate.toString());
                }} />
             )}
      </View> 

      {/* <Pressable  onPress={() => { componentDidMount()}} >
            <Text style={styles.button} >Search</Text>
      </Pressable>  */}

      <ScrollView style={styles.scrollView}> 
               {
                  transactions.map((item,key) => { 
                      return <Pressable style={styles.card} key={key} onPress={() => {
                        navigation.navigate('Transctions_edit',{id:item.id}) }} >
                          <Card data={item} />
                      </Pressable>  
                  })
              }
     </ScrollView>
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
  },
  content:{
    flexGrow:1, 
    justifyContent:'center',
  },
   scrollView:{
       
   },
  inputDate:{
    marginVertical:10,
    borderWidth: 1,
    borderColor:'gray',    
    paddingVertical: 10,
  },

});