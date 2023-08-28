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


// import React, { useState } from "react";
// import { Text, View } from "react-native";
// import CalendarPicker from '@ngotientan/react-native-calendar-picker'

// const App = () => {

//   const [selectedStartDate, setSelectedStartDate] = useState(null);
//   const [selectedEndDate, setSelectedEndDate] = useState(null);

//   console.log("startdate", selectedStartDate);
//   console.log("endDate", selectedEndDate);

//   const onDateChange = (date, type) => {
//     console.log(type)
//     //function to handle the date change
//     if (type === 'END_DATE') {
//       setSelectedEndDate(date.toString());
//     } else {
//       setSelectedEndDate(null);
//       setSelectedStartDate(date.toString());
//     }
//   };


//   return (
//     <View style={{ flex: 1 }}>
//       <CalendarPicker
//         startFromMonday={true}
//         allowRangeSelection={false}
//         minDate={new Date(2018, 1, 1)}
//         maxDate={new Date(2050, 6, 3)}
//         weekdays={
//           [
//             'Mon',
//             'Tue',
//             'Wed',
//             'Thur',
//             'Fri',
//             'Sat',
//             'Sun'
//           ]}
//         months={[
//           'January',
//           'Febraury',
//           'March',
//           'April',
//           'May',
//           'June',
//           'July',
//           'August',
//           'September',
//           'October',
//           'November',
//           'December',
//         ]}
//         previousTitle="Previous"
//         nextTitle="Next"
//         todayBackgroundColor="#e6ffe6"
//         // selectedDayColor="#66ff33"
//         // selectedDayTextColor="#000000"
//         scaleFactor={375}
//         textStyle={{
//           fontFamily: 'Cochin',
//           color: '#000000',
//         }}
//         onDateChange={onDateChange}
//       />
//     </View>
//   )
// }

// export default App;