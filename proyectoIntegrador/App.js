import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Register from "./src/Screens/Register";
import Login from "./src/Screens/Login";
import HomeMenu from "./src/Components/HomeMenu";


export default function App() {
  return (
  <NavigationContainer>
    <Stack.Navigator>   
      <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
      <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
      <Stack.Screen name="HomeMenu" component={HomeMenu} options={{headerShown: false}}/>  
    </Stack.Navigator>
  </NavigationContainer>
  );
}


const Stack = createNativeStackNavigator();
