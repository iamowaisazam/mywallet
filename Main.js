import {useState,useEffect} from 'react';
import {useDispatch,useSelector} from 'react-redux';

import Navigation from './src/navigations/container'
import {Global} from './src/controllers/'
import AppLoading from 'expo-app-loading'


function App() {

    const Store = useSelector(store => store);
    const dispatch = useDispatch();

  useEffect( async () => {
       
      let res = await Global.GetSetting();
       dispatch({type:'theme',payload:{
        primary_color:res.primary_color ? res.primary_color : '#ee0290',
      }});
      
        dispatch({type:'loading',payload:{
        loading:false,
        }});    
         
  },[])

  return (<>           
            {Store.loading ? <AppLoading /> :
            <Navigation /> }
        </>);
}

export default App