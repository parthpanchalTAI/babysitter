import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs";
import Conversations from "../screens/AppModules/Conversations/Conversations";
import Search from "../screens/AppModules/Search/Search";

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
        </RootStack.Navigator>
    )
}

export default AppStack;