import AsyncStorage from '@react-native-async-storage/async-storage';


export const DateFormat = (data) => {
  
   let date = new Date(data);
//    let format = date.toLocaleString();
   let format = date.toISOString().slice(0, 10);
   return format;
}

export const getDaysArray = async function(start, end) {
    for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
       
        arr.push(new Date(dt).toISOString().slice(0, 10));
    }
    return arr;
};

export const ClearData = async function() {
    
    try {

        await AsyncStorage.removeItem('accounts')
        await AsyncStorage.removeItem('transactions');
        return true;

    } catch (error){
        return false;
    }
 
};


export const SaveSetting = async function(date) {

          const data = date;
        // try {
            await AsyncStorage.setItem('primary_color',data.primary_color ? data.primary_color : '#ee0290');
            return true;
        // } catch(e) {
        //    return false;
        // }
}

export const GetSetting = async function() {

    // try {

       let primary_color = await AsyncStorage.getItem('primary_color');
       return {primary_color};

    // } catch(e) {
    //    return false;
    // }
}


export default { DateFormat,
                 getDaysArray,
                 GetSetting,
                 SaveSetting,
                 ClearData
              };