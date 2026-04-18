import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationService {
  private expo: any;
  private ExpoClass: any;

  async init() {
    const expoModule = await eval('import("expo-server-sdk")');
    this.ExpoClass = expoModule.Expo;
    this.expo = new this.ExpoClass();
  }

  async sendNotification(to: string, title: string, body: string) {
    if (!this.expo || !this.ExpoClass) {
      await this.init();
    }

    if (!this.ExpoClass.isExpoPushToken(to)) {
      console.log("Invalid token");
      return;
    }

    const message = {
      to,
      sound: "default",
      title,
      body,
    };

    try {
      await this.expo.sendPushNotificationsAsync([message]);
      console.log("Notification envoyée ✅");
    } catch (err) {
      console.log("Erreur notif:", err);
    }
  }
}