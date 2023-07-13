import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../assets/Colors/colors";
import { fonts } from "../assets/Fonts/fonts";
import { fs } from "../utils/styleUtils";
import { Platform } from "react-native";
import { images } from "../assets/Images";
import { getStatusBarHeight } from "../utils/globals";
import Img from "../components/Img";
import Dashboard from "../screens/AppModules/Dashboard/Dashboard";
import History from "../screens/AppModules/History/History";
import Chat from "../screens/AppModules/Chat/Chat";
import Notifications from "../screens/AppModules/Notifications/Notifications";
import Account from "../screens/AppModules/Account/Account";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: colors.Footer_Active_tab,
            tabBarInactiveTintColor: colors.Footer_Gray_tab,
            headerStatusBarHeight: getStatusBarHeight(),
            headerShadowVisible: false,
            tabBarShowLabel: true,
            headerTitleStyle: {
                color: colors.Black,
                fontSize: fs(18),
                fontFamily: fonts.semiBold,
            },
            headerTintColor: colors.Black,
            ...Platform.OS == 'android' && {
                tabBarLabelStyle: {
                    bottom: 10,
                    fontSize: 10
                },
                tabBarStyle: {
                    height: 68,
                    paddingHorizontal: 10
                }
            }
        }}>
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={({ navigation }) => ({
                    tabBarIcon: ({ color, focused }) => {
                        if (!focused) {
                            return <Img
                                imgSrc={images.footer.home_active}
                                width={22}
                                height={22}
                                imgStyle={{ resizeMode: 'contain' }}
                            />
                        } else {
                            return <Img
                                imgSrc={images.footer.home_inactive}
                                width={32}
                                height={32}
                                imgStyle={{ resizeMode: 'contain' }}
                            />
                        }
                    },
                    headerShown: true,
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: 'white'
                    },
                    headerShadowVisible: false,
                    tabBarLabel: 'Home'
                })}
            />

            <Tab.Screen
                name="History"
                component={History}
                options={({ navigation }) => ({
                    tabBarIcon: ({ color, focused }) => {
                        if (!focused) {
                            return <Img
                                imgSrc={images.footer.history_active}
                                width={22}
                                height={22}
                                imgStyle={{ resizeMode: 'contain' }}
                            />
                        } else {
                            return <Img
                                imgSrc={images.footer.history_inactive}
                                width={32}
                                height={32}
                                imgStyle={{ resizeMode: 'contain' }}
                            />
                        }
                    },
                    headerShown: true,
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: 'white'
                    },
                    headerShadowVisible: false,
                    tabBarLabel: 'History'
                })}
            />

            <Tab.Screen
                name="Chat"
                component={Chat}
                options={({ navigation }) => ({
                    tabBarIcon: ({ color, focused }) => {
                        if (!focused) {
                            return <Img
                                imgSrc={images.footer.chat_inactive}
                                width={22}
                                height={22}
                                imgStyle={{ resizeMode: 'contain' }}
                            />
                        } else {
                            return <Img
                                imgSrc={images.footer.chat_active}
                                width={32}
                                height={32}
                                imgStyle={{ resizeMode: 'contain' }}
                            />
                        }
                    },
                    headerShown: true,
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: 'white'
                    },
                    headerShadowVisible: false,
                    tabBarLabel: 'Chat'
                })}
            />

            <Tab.Screen
                name="Notifications"
                component={Notifications}
                options={({ navigation }) => ({
                    tabBarIcon: ({ color, focused }) => {
                        if (!focused) {
                            return <Img
                                imgSrc={images.footer.notification_active}
                                width={22}
                                height={22}
                                imgStyle={{ resizeMode: 'contain' }}
                            />
                        } else {
                            return <Img
                                imgSrc={images.footer.notification_inactive}
                                width={32}
                                height={32}
                                imgStyle={{ resizeMode: 'contain' }}
                            />
                        }
                    },
                    headerShown: true,
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: 'white'
                    },
                    headerShadowVisible: false,
                    tabBarLabel: 'Notifications'
                })}
            />

            <Tab.Screen
                name="Account"
                component={Account}
                options={({ navigation }) => ({
                    tabBarIcon: ({ color, focused }) => {
                        if (!focused) {
                            return <Img
                                imgSrc={images.footer.account_inactive}
                                width={22}
                                height={22}
                                imgStyle={{ resizeMode: 'contain' }}
                            />
                        } else {
                            return <Img
                                imgSrc={images.footer.account_active}
                                width={32}
                                height={32}
                                imgStyle={{ resizeMode: 'contain' }}
                            />
                        }
                    },
                    headerShown: true,
                    headerTitle: '',
                    headerStyle: {
                        backgroundColor: 'white'
                    },
                    headerShadowVisible: false,
                    tabBarLabel: 'Account'
                })}
            />
        </Tab.Navigator>
    )
}

export default Tabs;