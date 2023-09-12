import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./Auth";
import AppStack from "./UnAuth";
import { useSelector } from 'react-redux'
import notifee, { EventType } from "@notifee/react-native"
import messaging from '@react-native-firebase/messaging'
import * as Globals from "../utils/globals";
import { navigate } from "../utils/navigationHandler";

const AppContainer = ({

}) => {

    const RootStack = createNativeStackNavigator();
    const { token } = useSelector((state) => state.whiteLists);

    // useNotificationHook();

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
        console.log("notification data ==>", data?.type);
        if (data?.type == 'Chat') {
            navigate('Chat');
            return;
        } else if (data?.type == undefined) {
            navigate('Chat');
            return;
        } else {
            console.log("something wrong");
        }
    }

    useEffect(() => {
        return notifee.onForegroundEvent(({ type, detail }) => {
            switch (type) {
                case EventType.PRESS:
                    console.log('user pressed notification', detail?.notification?.data);
                    navigateToRoute(detail.notification.data);
                    break;
            }
        })
    }, []);

    useEffect(() => {
        return notifee.onBackgroundEvent(({ type, detail }) => {
            switch (type) {
                case EventType.PRESS:
                    console.log('User pressed notification =>', detail?.notification?.data);
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
   
    return (
        <RootStack.Navigator
            screenOptions={{ headerShown: false, animation: 'none' }}
            initialRouteName={token != '' ? "AppStack" : "AuthStack"}
        >
            <RootStack.Screen
                name="AuthStack"
                component={AuthStack}
            />
            <RootStack.Screen
                name="AppStack"
                component={AppStack}
            />
        </RootStack.Navigator>
    )
}

export default AppContainer;