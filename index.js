/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import messaging from "@react-native-firebase/messaging";
import notifee, { AndroidImportance, AndroidVisibility } from "@notifee/react-native";

// var firebaseConfig = {
//     apiKey: "AIzaSyBK_hl_hsLnvqhd6nUWFtFTeL9ilzSALYA",
//     authDomain: "yonn-6f7a5.yonn.com",
//     databaseURL: "https://babysitter-b86a1-default-rtdb.firebaseio.com",
//     projectId: "yonn-6f7a5",
//     storageBucket: "yonn-6f7a5.appspot.com",
//     messagingSenderId: "507671950234",
//     appId: "1:116420358315:android:e08cd7e463cf22219487ee",
//     measurementId: "1:116420358315:android:e08cd7e463cf22219487ee",
// }

// {
//     Platform.OS == "android" ?
//         firebase.initializeApp(firebaseConfig)
//         : null
// }

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
        title: message?.notification?.title,
        body: message?.notification?.body,
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
