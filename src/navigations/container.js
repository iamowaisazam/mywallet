import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


// Screens
import LoadScreen from '../screens/load'
import HomeScreen from '../screens/home'
import SettingScreen from '../screens/settings'

//Transactions
import IndexTranaction from '../screens/transactions/index'
import CreateTranaction from '../screens/transactions/create'
import EditTranaction from '../screens/transactions/edit'
import SearchTranaction from '../screens/transactions/search'

//Category
import IndexCategory from '../screens/category/index'
import CreateCategory  from '../screens/category/create'
import EditCategory  from '../screens/category/edit'
import SearchCategory  from '../screens/category/search'


const Stack = createNativeStackNavigator();

export default function navigations() {
    return (
    <NavigationContainer  >
      <Stack.Navigator initialRouteName="Load" screenOptions={{headerShown:false}} >

        <Stack.Screen name="Load" component={LoadScreen} />
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="Setting" component={SettingScreen}  />
        <Stack.Screen name="Logout" component={LoadScreen}  />

        <Stack.Screen name="Transctions_search" component={SearchTranaction}  />
        <Stack.Screen name="Transctions_index" component={IndexTranaction}  />
        <Stack.Screen name="Transctions_create" component={CreateTranaction}  />
        <Stack.Screen name="Transctions_edit" component={EditTranaction} initialParams={{ id:"Default" }} />

        <Stack.Screen name="Category_index" component={IndexCategory} />
        <Stack.Screen name="Category_create" component={CreateCategory}  />
        <Stack.Screen name="Category_edit" component={EditCategory} initialParams={{ id:"Default" }}  />
        <Stack.Screen name="Category_search" component={SearchCategory} initialParams={{ id:"Default" }}  />

      </Stack.Navigator> 
    </NavigationContainer>
  )
}