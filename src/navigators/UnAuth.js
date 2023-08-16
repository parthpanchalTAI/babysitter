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
import EditProfile from "../screens/AppModules/EditProfile/EditProfile";
import EditLocation from "../screens/AppModules/EditLocation/EditLocation";
import MyWallet from "../screens/AppModules/MyWallet/MyWallet";
import Withdraw from "../screens/AppModules/Withdraw/Withdraw";
import HourlyRate from "../screens/AppModules/HourlyRate/HourlyRate";
import Featured from "../screens/AppModules/Featured/Featured";
import PaymentMethod from "../screens/AppModules/PaymentMethod/PaymentMethod";
import MySubscriptions from "../screens/AppModules/MySubscriptions/MySubscriptions";

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

            <RootStack.Screen
                name="EditProfile"
                component={EditProfile}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <RootStack.Screen
                name="EditLocation"
                component={EditLocation}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <RootStack.Screen
                name="MyWallet"
                component={MyWallet}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <RootStack.Screen
                name="Withdraw"
                component={Withdraw}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <RootStack.Screen
                name="HourlyRate"
                component={HourlyRate}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <RootStack.Screen
                name="Featured"
                component={Featured}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <RootStack.Screen
                name="PaymentMethod"
                component={PaymentMethod}
                options={{
                    headerShown: true,
                    headerShadowVisible: false,
                    headerTitle: '',
                }}
            />

            <RootStack.Screen
                name="MySubscriptions"
                component={MySubscriptions}
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