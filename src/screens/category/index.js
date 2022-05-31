import { View, Text,ScrollView,StyleSheet,Pressable } from 'react-native'
import {useEffect,useState} from 'react'
import Layout from '../../components/layout'
import {getAll} from '../../controllers/category'
import {theme} from '../../utils';
import Card from './card'
import { useSelector } from 'react-redux';

export default function App({navigation}) {

  const store = useSelector(store => store);

  const [accounts,Setaccounts] = useState([]);
  useEffect( async () => {
     let response = await getAll();
     Setaccounts(response);    
  },[])

  return (
    <Layout title="All Accounts" >
      <View style={styles.container}>
          <Pressable  onPress={() => { navigation.navigate('Category_create')}} >
                    <Text style={[styles.button,{backgroundColor:store.primary_color}]} >Add New</Text>
          </Pressable> 
          <View style={styles.content} >
                <ScrollView style={styles.scrollView}> 
                    <View style={styles.cardContainer} >
                        {
                            accounts.map((item,key) => { 
                                return <Card key={key} style={styles.card} data={item} />   
                            })
                        }
                    </View>
                </ScrollView>
          </View>
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
  cardContainer:{
    display:'flex',
    flexWrap:'wrap',
    flexDirection:'row',
    justifyContent:'space-evenly',
    alignItems:'center',
  },
  scrollView:{
       flex:1,
  },
  button:{
    marginVertical:10,
    padding:20,
    fontSize:20,
    color:'white',
    width:'100%',
    textAlign:'center',
  },
});