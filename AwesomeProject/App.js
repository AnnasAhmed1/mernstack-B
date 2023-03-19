// import React, { useState } from "react";
// import { View, Text, StyleSheet, Image, ImageBackground, TextInput, Button, TouchableOpacity } from "react-native";
// import icon from './assets/icon.jpg'

// function App() {
//   const [email, setEmail] = useState()
//   const [password, setPassword] = useState()

//   let login = () => {
//     let obj = {
//       email,
//       password
//     }
//     console.log(obj)
//   }

//   return <>
//     <ImageBackground style={styles.mainContainer} source={{ uri: 'https://media.istockphoto.com/vectors/white-colored-celebration-card-background-vector-id1334554610?b=1&k=20&m=1334554610&s=170667a&w=0&h=ncjEEGoYokNYcO7COy_p5cJvANLiSVRwTABPeQr8b2U=' }}>
//       <View style={{ width: '100%', padding: 10 }}>
//         <View style={{ alignItems: 'center', padding: 20 }}>
//           <Image resizeMode="contain" style={{ width: 200, height: 200 }} source={icon} />
//         </View>
//         <Text style={[styles.mainHeading, { margin: 10 }]}>Sign Up</Text>
//         <View style={{ padding: 10, alignItems: 'center' }}>
//           <TextInput onChangeText={(e) => setEmail(e)} style={[styles.inp, styles.shadow]} placeholder="User Name" />
//         </View>
//         <View style={{ padding: 10, alignItems: 'center' }}>
//           <TextInput keyboardType="numeric" onChangeText={(e) => setEmail(e)} style={[styles.inp, styles.shadow]} placeholder="Contact No#" />
//         </View>
//         <View style={{ padding: 10, alignItems: 'center' }}>
//           <TextInput keyboardType="email-address" onChangeText={(e) => setEmail(e)} style={[styles.inp, styles.shadow]} placeholder="Email" />
//         </View>
//         <View style={{ padding: 10, alignItems: 'center' }}>
//           <TextInput secureTextEntry={true} onChangeText={(e) => setPassword(e)} style={[styles.inp, styles.shadow]} placeholder="Password" />
//         </View>
//         <View style={{ padding: 10, alignItems: 'center' }}>
//           <TouchableOpacity onPress={login} style={[styles.customeBtn, styles.shadow]}>
//             <Text style={{ color: 'white', textAlign: 'center', fontSize: 20 }}>Login</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ImageBackground>
//   </>
// }

// export default App

// const styles = StyleSheet.create({
//   mainHeading: {
//     fontSize: 30,
//     color: 'green',
//     textAlign: 'center'
//   },
//   mainContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     height: '100%'
//   },
//   inp: {
//     width: '95%',
//     padding: 10,
//     fontSize: 20,
//     backgroundColor: 'white',
//     borderRadius: 100
//   },
//   customeBtn: {
//     width: '100%',
//     padding: 10,
//     backgroundColor: 'green',
//     borderRadius: 100
//   },
//   shadow: {
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 6,
//     },
//     shadowOpacity: 0.37,
//     shadowRadius: 7.49,
//     elevation: 12,
//   }
// })

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Text} from 'react-native';
import StackNavigation from './src/config/stack_navigation';
// import Login from './src/screens/login';

function App() {
  return <StackNavigation />;
}

export default App;
