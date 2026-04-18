import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const registerForPushNotificationsAsync = async () => {
  let token;

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    console.log("Failed to get push token for push notification!");
    return null;
  }

  try {
    token = (
  await Notifications.getExpoPushTokenAsync({
    projectId: "1b402e8d-c078-4479-b312-b1622165440a", // ✅ ton vrai projectId
  })
).data;
    console.log("Expo Push Token:", token);
  } catch (e) {
    console.log("Error getting push token:", e);
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250], // ✅ ajout
      lightColor: "#FF231F7C",              // ✅ ajout
    });
  }

  return token;
};

export const setupNotificationListeners = (
  notificationListener,
  responseListener
) => {
  notificationListener.current =
    Notifications.addNotificationReceivedListener((notification) => {
      console.log("Notification reçue au premier plan:", notification);
    });

  responseListener.current =
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("Notification cliquée:", response);
    });

  return () => {
    notificationListener.current?.remove();
    responseListener.current?.remove();
  };
};