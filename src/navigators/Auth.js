import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { fonts } from "../assets/Fonts/fonts";
import { useSelector } from "react-redux";
import AppIntro from "../screens/AuthModules/AppIntro/AppIntro";
import LoginOptions from "../screens/AuthModules/LoginOptions/LoginOptions";
import SignUp from "../screens/AuthModules/SignUp/SignUp";
import EmailVerify from "../screens/AuthModules/EmailVerify/EmailVerify";
import SetLocation from "../screens/AuthModules/SetLocation/SetLocation";
import AddLocation from "../screens/AuthModules/AddLocation/AddLocation";
import SignIn from "../screens/AuthModules/SignIn/SignIn";
import ForgotPassword from "../screens/AuthModules/ForgotPassword/ForgotPassword";
import ResetPassword from "../screens/AuthModules/ResetPassword/ResetPassword";
import CompleteProfile from "../screens/AuthModules/CompleteProfile/CompleteProfile";
import Availability from "../screens/AuthModules/Availability/Availability";
import HourlyRate from "../screens/AuthModules/HourlyRate/HourlyRate";
import Country from "../screens/AuthModules/Country/Country";

const StackScreen = createNativeStackNavigator();

const AuthStack = () => {

    const { flag } = useSelector((state) => state.whiteLists);

    return (
        <StackScreen.Navigator
            initialRouteName={flag == false ? "SignIn" : "AppIntro"}
            screenOptions={{
                animation: 'slide_from_right',
                headerBackTitleVisible: false,
                headerShown: false,
                headerShadowVisible: false,
                headerTitleStyle: {
                    fontFamily: fonts.regular
                },
                contentStyle: {
                    backgroundColor: 'white'
                }
            }}
        >

            <StackScreen.Screen
                name="AppIntro"
                component={AppIntro}
                options={{ headerShown: false }}
            />

            <StackScreen.Screen
                name="LoginOptions"
                component={LoginOptions}
                options={{ headerShown: false }}
            />

            <StackScreen.Screen
                name="SignUp"
                component={SignUp}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <StackScreen.Screen
                name="EmailVerify"
                component={EmailVerify}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <StackScreen.Screen
                name="SetLocation"
                component={SetLocation}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <StackScreen.Screen
                name="AddLocation"
                component={AddLocation}
                options={{
                    headerShown: false,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <StackScreen.Screen
                name="CompleteProfile"
                component={CompleteProfile}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <StackScreen.Screen
                name="Availability"
                component={Availability}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <StackScreen.Screen
                name="HourlyRate"
                component={HourlyRate}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <StackScreen.Screen
                name="SignIn"
                component={SignIn}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <StackScreen.Screen
                name="ForgotPassword"
                component={ForgotPassword}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <StackScreen.Screen
                name="ResetPassword"
                component={ResetPassword}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <StackScreen.Screen
                name="Country"
                component={Country}
                options={{
                    headerShown: false,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

        </StackScreen.Navigator>
    )
}

export default AuthStack;