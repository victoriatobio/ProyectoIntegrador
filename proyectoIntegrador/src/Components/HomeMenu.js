import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import PostComments from "../screens/PostComments";


const Tab = createBottomTabNavigator();


function HomeMenu() {
    return(
 
        <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false}} >
            
            <Tab.Screen name="Home" component={Home} 
                options={{ tabBarIcon: () => <FontAwesome5 name="home" size={24} color="black" />  }} />

            <Tab.Screen name="PostComments" component={PostComments}
                options={{ tabBarIcon: () => <Ionicons name="add-circle" size={24} color="black" /> }}  />   

            <Tab.Screen name="Profile" component={Profile}
                options={{ tabBarIcon: () => <Ionicons name="people" size={24} color="black" /> }}  />

        </Tab.Navigator>

    )}
  



  export default HomeMenu;