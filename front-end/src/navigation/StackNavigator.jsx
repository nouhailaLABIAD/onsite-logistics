// src/navigation/StackNavigator.jsx

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DriverDashboard from "../screens/driver/DriverDashboard";
import ReceiverDashboard from "../screens/receiver/ReceiverDashboard";
import DrawerNavigator from "./DrawerNavigator";
import ChangePassword from "../screens/common/ChangePassword";
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
  name="ChangePassword" 
  component={ChangePassword} 
/>
      {/* <Stack.Screen name="DriverDashboard" component={DriverDashboard} />
<Stack.Screen name="ReceiverDashboard" component={ReceiverDashboard} /> */}
      <Stack.Screen name="App" component={DrawerNavigator} />

    </Stack.Navigator>
  );
};

export default StackNavigator;