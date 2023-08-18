import React from "react";
import { LogBox } from "react-native";
import persistStore from 'redux-persist/es/persistStore';
import { Host } from 'react-native-portalize'
import { SafeAreaProvider } from "react-native-safe-area-context";
import SplashScreen from 'react-native-splash-screen';
import { store } from "./src/store";
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./src/utils/navigationHandler";
import { MenuProvider } from 'react-native-popup-menu'
import StatusBarUtil from "./src/components/StatusbarItem";
import AppContainer from "./src/navigators";

const App = () => {
  LogBox.ignoreAllLogs(true);
  let persistor = persistStore(store);

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer
            onReady={() => {
              SplashScreen.hide()
            }}
            ref={navigationRef}
          >
            <Host>
              <StatusBarUtil />
              <MenuProvider>
                <AppContainer />
              </MenuProvider>
            </Host>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}

export default App;
