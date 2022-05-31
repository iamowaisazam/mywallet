import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';


export const create = async (data) => {

    try {
            let oldata = await AsyncStorage.getItem('accounts');
            oldata = JSON.parse(oldata);
            oldata = oldata ? oldata : [];
            
            data.id = uuid.v4();
            oldata.push(data);  
            const jsonData = JSON.stringify(oldata)
            let saveData = await AsyncStorage.setItem('accounts',jsonData);
            return true;

      } catch(e) {
           return false;
      }

}

export const getAll = async (id) => {

    try {
            let oldata = await AsyncStorage.getItem('accounts');
            oldata = JSON.parse(oldata);
            oldata = oldata ? oldata : [];
            return oldata;

      } catch(e) {
           return false;
      }

}

export const get = async (id) => {

    try {
            let oldata = await AsyncStorage.getItem('accounts');
            oldata = JSON.parse(oldata);
            oldata = oldata ? oldata : [];
            let resdata = oldata.find(item => item.id === id);

            return resdata;

      } catch(e) {
           return false;
      }

}

export const edit = async (data) => {

    try {
           let oldata = await AsyncStorage.getItem('accounts');
           oldata = JSON.parse(oldata);
           oldata = oldata ? oldata : [];
           let objIndex = oldata.findIndex((obj => obj.id == data.id)); 
           oldata[objIndex].account_name = data.account_name;
           oldata[objIndex].account_date = data.account_date;
           oldata[objIndex].account_status = data.account_status;
            
           let JsonData = JSON.stringify(oldata);
           let saveData = await AsyncStorage.setItem('accounts',JsonData);
           return true;

      } catch(e) {
           return false;
      }

}

export const remove = async (id) => {

    try {
            let oldata = await AsyncStorage.getItem('accounts');
            oldata = JSON.parse(oldata);
            oldata = oldata ? oldata : [];
           let newdata = oldata.filter(item => item.id != id);
            let JsonData =JSON.stringify(newdata);
            let saveData = await AsyncStorage.setItem('accounts',JsonData);
            return true;

      } catch(e) {
           return false;
      }

}


export default {create,getAll,get,remove};