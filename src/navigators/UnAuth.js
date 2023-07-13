import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Conversations from "../screens/AppModules/Conversations/Conversations";
import Search from "../screens/AppModules/Search/Search";
import JobRequestDetails from "../screens/AppModules/JobRequestDetails/JobRequestDetails";
import ActiveHistoryDetails from "../screens/AppModules/ActiveHistoryDetails/ActiveHistoryDetails";
import TermsAndConditions from "../screens/AppModules/TermsAndConditions/TermsAndConditions";
import ContactUs from "../screens/AppModules/ContactUs/ContactUs";
import ChangePassword from "../screens/AppModules/ChangePassword/ChangePassword";
import Availability from "../screens/AppModules/Availability/Availability";

const RootStack = createNativeStackNavigator();

const AppStack = ({

}) => {
    return (
        <RootStack.Navigator>
            <RootStack.Screen
                name="Tabs"
                component={Tabs}
                options={{
                    headerShown: false,
                    headerShadowVisible: false,
                    headerTitle: ''
                }}
            />

            <RootStack.Screen
                name="Search"
                component={Search}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <RootStack.Screen
                name="Conversations"
                component={Conversations}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <RootStack.Screen
                name="JobRequestDetails"
                component={JobRequestDetails}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <RootStack.Screen
                name="ActiveHistoryDetails"
                component={ActiveHistoryDetails}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <RootStack.Screen
                name="TermsAndConditions"
                component={TermsAndConditions}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <RootStack.Screen
                name="ContactUs"
                component={ContactUs}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <RootStack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <RootStack.Screen
                name="Availability"
                component={Availability}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />
        </RootStack.Navigator>
    )
}

export default AppStack;