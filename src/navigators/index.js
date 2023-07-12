import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthStack from "./Auth";
import AppStack from "./UnAuth";
import { useSelector } from 'react-redux'

const AppContainer = ({

}) => {
    const RootStack = createNativeStackNavigator();
    const { token } = useSelector((state) => state.whiteLists);

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