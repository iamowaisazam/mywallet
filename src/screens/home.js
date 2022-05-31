import {useEffect,useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import { StyleSheet,Text,View,Pressable,ScrollView,ImageBackground} from 'react-native';


import {Transactions,Global} from '../controllers'

import Layout from '../components/layout'
import Card from './transactions/card'

export default function App({ navigation }) {
  
  const [posts,Setposts] = useState([]);
  const [balance,Setbalance] = useState(0);
  const store = useSelector(store => store);
  const dispatch = useDispatch();

  useEffect(() => {
  
      getPosts();
  },[])


  const getPosts = async () => {

      let currentdate = new Date();
      currentdate = Global.DateFormat(currentdate);

      let response = await Transactions.findAccount();
      Setbalance(response.balance);
      
      let filterdata = [];
      response.items.forEach(element => {

            let TransactionDate = Global.DateFormat(element.date);
            if (currentdate == TransactionDate) {
            filterdata.push(element);
            }
      });

      Setposts(filterdata);  
  }
  
  return (
    <Layout title="Dashboard" >
       <View style={styles.container}>
            <View style={styles.content} >      
                  <View  style={{backgroundColor:store.primary_color,
                                 paddingVertical:20,
                                 alignItems:'center',
                                 marginVertical:20,
                                 marginHorizontal:10,
                                 flex:0,
                                 flexDirection:'column',
                                }} >
                      <Text style={{fontSize:28,color:'white'}}>{balance}</Text>
                      <Text style={{fontSize:20,color:'white'} }>Curent Balance</Text>
                  </View>

                  <View  style={{borderBottomWidth:1,
                                 paddingVertical:10,
                                 alignItems:'center',
                                 marginVertical:20,
                                 marginHorizontal:10,
                                 flex:0,
                                 flexDirection:'column',
                                 justifyContent:'center',
                                }} >
                      <Text style={{fontSize:28,color:'black'}}>Today's Transactions</Text>
                  </View>

                  <ScrollView style={styles.scrollView}> 
                      <View style={styles.cardContainer} >
                          {
                              posts.length > 0 ? posts.map((item,key) => { 
                                    return <Pressable style={styles.card} key={key} onPress={() => {
                                      navigation.navigate('Transctions_edit',{id:item.id}) }} >
                                      <Card data={item} />
                                    </Pressable>  
                                }) : <Text style={{textAlign:'center'}} >You Have Not Any Transaction</Text>
                            }
                      </View>
                </ScrollView>

            </View>
       </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      borderColor:'black',
    },
    title:{
      textAlign:'center',
      fontSize:30,
      marginVertical:10,
    },
    content:{
      flex:1,
      flexGrow:1, 
    },
    scrollView:{
    flex:1,
    },
    card:{
      flex:1,
      flexDirection:'column',
    },
});