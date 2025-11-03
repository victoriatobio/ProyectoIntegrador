import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import Home from "../Screens/Home";
import Profile from "../Screens/Profile";
import Comments from "../Screens/Comments";


const Tab = createBottomTabNavigator();


function HomeMenu() {
    return(
 
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false}} >
            
            <Tab.Screen name="Home" component={Home} 
                options={{ tabBarIcon: () => <FontAwesome5 name="home" size={24} color="black" />  }} />

            <Tab.Screen name="Profile" component={Profile}
                options={{ tabBarIcon: () => <Fontisto name="comments" size={24} color="black" /> }}  />

             <Tab.Screen name="Comments" component={Comments}
                options={{ tabBarIcon: () => <AntDesign name="comment" size={24} color="black" /> }}  />   

        </Tab.Navigator>

    )}
  



  export default HomeMenu;