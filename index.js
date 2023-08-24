/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance, AndroidVisibility } from "@notifee/react-native";

async function onMessageReceive(message) {
    console.log("onMessageReceive", message);

    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
        id: 'babysitters',
        name: "Default Channel",
        vibration: true,
        sound: "default",
        importance: AndroidImportance.HIGH,
        visibility: AndroidVisibility.PRIVATE,
        badge: true
    })

    await notifee.displayNotification({
        title: message?.data?.title,
        body: message?.data?.body,
        android: {
            channelId,
            importance: AndroidImportance.HIGH,
            visibility: AndroidVisibility.PRIVATE,
            sound: "default",
        },
        ios: {
            sound: "default"
        }
    })
}

messaging().onMessage(onMessageReceive);

messaging().setBackgroundMessageHandler(async (message) => {
    console.log('onMessageReceived', message);
})

notifee.onBackgroundEvent(async (notification) => {
    console.log('notification bg', notification);
})

AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));
