import 'react-native-gesture-handler';

import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import {
  registerForPushNotificationsAsync,
  setupNotificationListeners,
} from './src/services/NotificationService';
import StackNavigator from "./src/navigation/StackNavigator";

export default function App() {
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync();

    const cleanup = setupNotificationListeners(
      notificationListener,
      responseListener
    );

    return cleanup;
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
}