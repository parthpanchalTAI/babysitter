import React, { useEffect } from "react";
import notifee, { EventType } from "@notifee/react-native"
import messaging from '@react-native-firebase/messaging'
import * as Globals from "../utils/globals";
import { navigate } from "../utils/navigationHandler";

const useNotificationHook = () => {

    useEffect(() => {
        requestSitterPermission();
    }, []);

    async function requestSitterPermission() {
        const settings = await notifee.requestPermission();
        console.log("settings ->", settings);

        const authStatus = await messaging().requestPermission();
        const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || authStatus === messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
            registerFcmToken();
        }
    }

    async function registerFcmToken() {
        const fcmToken = await messaging().getToken();
        console.log('fcmToken --->', fcmToken);
        Globals.fcmToken = fcmToken || '';
    }

    const navigateToRoute = (data) => {
        console.log("notification data ==>", data);
        if (data?.type == 'Chat') {
            navigate('Chat');
            return;
        } else if (data == {}) {
            navigate('Chat');
            return;
        }
    }

    useEffect(() => {
        return notifee.onForegroundEvent(({ type, detail }) => {
            switch (type) {
                case EventType.PRESS:
                    console.log('user pressed notification', detail);
                    navigateToRoute(detail.notification.data);
                    break;
            }
        })
    }, []);

    useEffect(() => {
        return notifee.onBackgroundEvent(({ type, detail }) => {
            switch (type) {
                case EventType.PRESS:
                    console.log('User pressed notification =>', detail);
                    navigateToRoute(detail?.notification?.data);
                    break;
            }
        });
    }, []);

    useEffect(() => {
        messaging().onNotificationOpenedApp((message) => {
            console.log('onNotificationOpenedApp====>', message);
            navigateToRoute(message.data);
        })
    }, []);

    useEffect(() => {
        getInitialNotification();
    }, []);

    const getInitialNotification = async () => {
        const initialNotification = await messaging().getInitialNotification();
        console.log('initialNotification', initialNotification);

        if (initialNotification) {
            console.log('Notification caused application to open', initialNotification.notification);
            setTimeout(() => {
                navigateToRoute(initialNotification.data);
            }, 1000);
        }
    }
}

export default useNotificationHook;