// import { NavigationContainer } from '@react-navigation/native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CapitalGain from './screens/capital_gain';
import {HomeScreen, ProfileScreen} from './screens/check';
import RentalIncome from './screens/rental_income';
import Salaried from './screens/salaried';
import NonSalaried from './screens/non_salaried';
import TaxSlabs2021 from './screens/tax_slabs_2021';
import Documents from './screens/documents';
import UsefulLinks from './screens/useful_links';
import Inquiry from './screens/inquiry';
import RateUs from './screens/rate_us';
import ShareApp from './screens/share_app';
import Disclaimer from './screens/disclaimer';

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Salaried"
          component={Salaried}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="NonSalaried"
          component={NonSalaried}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RentalIncome"
          component={RentalIncome}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CapitalGain"
          component={CapitalGain}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TaxSlabs2021"
          component={TaxSlabs2021}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Documents"
          component={Documents}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UsefulLinks"
          component={UsefulLinks}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Inquiry"
          component={Inquiry}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="RateUs"
          component={RateUs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShareApp"
          component={ShareApp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Disclaimer"
          component={Disclaimer}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Home2" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// import * as React from 'react';
// import {Button, View} from 'react-native';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {NavigationContainer} from '@react-navigation/native';

// function HomeScreen({navigation}) {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Button
//         onPress={() => navigation.navigate('Notifications')}
//         title="Go to notifications"
//       />
//     </View>
//   );
// }

// function NotificationsScreen({navigation}) {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <Button onPress={() => navigation.goBack()} title="Go back home" />
//     </View>
//   );
// }

// const Drawer = createDrawerNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="Home" component={HomeScreen} />
//         <Drawer.Screen name="Notifications" component={NotificationsScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }
