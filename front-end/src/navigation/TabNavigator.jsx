import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import DriverDashboard from "../screens/driver/DriverDashboard";
import ReceiverDashboard from "../screens/receiver/ReceiverDashboard";
import Profile from "../screens/common/Profile";
import Settings from "../screens/common/Settings";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const user = useSelector((state) => state.auth.user);

  if (!user) return null;

  const role = user.role;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") iconName = "home";
          else if (route.name === "Profile") iconName = "person";
          else if (route.name === "Settings") iconName = "settings";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6C63FF",
      })}
    >
      {/* 🔥 DASHBOARD SELON ROLE */}
      <Tab.Screen
        name="Home"
        component={role === "driver" ? DriverDashboard : ReceiverDashboard}
      />

      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

export default TabNavigator;