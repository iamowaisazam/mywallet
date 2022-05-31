import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';


export const create = async (data) => {
    try {
            let oldata = await AsyncStorage.getItem('transactions');
            oldata = JSON.parse(oldata);
            oldata = oldata ? oldata : [];            
            data.id = uuid.v4();
            oldata.push(data);  
            const jsonData = JSON.stringify(oldata)
            let saveData = await AsyncStorage.setItem('transactions',jsonData);
            return true;

      } catch(e) {
           return false;
      }

}



export const getAll = async (id) => {

    try {
            let oldata = await AsyncStorage.getItem('transactions');
            oldata = JSON.parse(oldata);
            oldata = oldata ? oldata : [];

            return oldata;

      } catch(e) {
           return false;
      }

}



export const edit = async (data) => {
    try {
           let oldata = await AsyncStorage.getItem('transactions');
           oldata = JSON.parse(oldata);
           oldata = oldata ? oldata : [];
           let objIndex = oldata.findIndex((obj => obj.id == data.id)); 
           oldata[objIndex].account_id = data.account_id;
           oldata[objIndex].type = data.type;
           oldata[objIndex].date = data.date;
           oldata[objIndex].detail = data.detail;
           oldata[objIndex].amount = data.amount;
            
           let JsonData = JSON.stringify(oldata);
           let saveData = await AsyncStorage.setItem('transactions',JsonData);
           return true;

      } catch(e) {
           return false;
      }
}



export const get = async (id) => {

    try {
            let oldata = await AsyncStorage.getItem('transactions');
            oldata = JSON.parse(oldata);
            oldata = oldata ? oldata : [];
            let resdata = oldata.find(item => item.id === id);
            return resdata;

      } catch(e) {
           return false;
      }

}



export const remove = async (id) => {

    try {
            let oldata = await AsyncStorage.getItem('transactions');
            oldata = JSON.parse(oldata);
            oldata = oldata ? oldata : [];
           let newdata = oldata.filter(item => item.id != id);
            let JsonData =JSON.stringify(newdata);
            let saveData = await AsyncStorage.setItem('transactions',JsonData);
            return true;

      } catch(e) {
           return false;
      }

}


export const findAccount = async (account_id = 0) => {

    try {
            let oldata = await AsyncStorage.getItem('transactions');
            oldata = JSON.parse(oldata);
            oldata = oldata ? oldata : [];
            
            let sendata = {
                items:[],
                balance:0,
            };
            let totalbalance = 0;
            oldata.forEach((item) => {
                if(account_id == 0 | item.account_id == account_id){
                   if(item.type == 'credit'){
                    totalbalance += parseFloat(item.amount); 
                   }else{ totalbalance -= parseFloat(item.amount); }
                    sendata.items.push(item);
                }
            });

            sendata.balance = totalbalance;
            return sendata;

    } catch(e) {
        return false;
    }

}


export default {findAccount,getAll};