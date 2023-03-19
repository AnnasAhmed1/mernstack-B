// import auth from '@react-native-firebase/auth';
// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ImageBackground,
//   TextInput,
//   Image,
//   TouchableOpacity,
//   KeyboardAvoidingView,
// } from 'react-native';
// export default function Login({navigation}) {
//   const [check, setCheck] = useState(false);
//   let email = '';
//   let password = '';
//   let userUid = '';
//   function loginUser() {
//     if (email.length == 0 || password.length == 0) {
//       console.log('email or password cannot be empty');
//       return;
//     }
//     auth()
//       .signInWithEmailAndPassword(email, password)
//       .then(res => {
//         userUid = res.user.uid;
//         navigation.navigate('Products', {userUid});
//         console.log('signed in successfully', res.user);
//         console.log('userUid', userUid);
//       })
//       .catch(error => {
//         console.log(error.message);
//       });
//   }
//   return (
//     <KeyboardAvoidingView
//       behavior={'height'}
//       style={{
//         flex: 1,
//       }}>
//       <ImageBackground
//         style={styles.mainContainer}
//         source={{
//           uri: 'https://designimages.appypie.com/appbackground/appbackground-22-homedecor-plant.jpg',
//         }}>
//         <Image
//           resizeMode="contain"
//           style={{
//             width: 120,
//             height: 120,
//             marginBottom: 30,
//             marginTop: '30%',
//           }}
//           source={require('../assets/user.png')}
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           placeholderTextColor="blue"
//           onChangeText={e => {
//             email = e;
//           }}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           placeholderTextColor="blue"
//           onChangeText={e => {
//             password = e;
//           }}
//         />
//         <View
//           style={{
//             width: '100%',
//             flexDirection: 'row',
//             justifyContent: 'center',
//             alignItems: 'flex-end',
//             marginTop: 10,
//           }}>
//           <TouchableOpacity
//             onPress={() => {
//               setCheck(!check);
//             }}>
//             {check ? (
//               <Image
//                 style={{
//                   width: 20,
//                   height: 20,
//                   borderRadius: 20 / 2,
//                   borderWidth: 2,
//                   marginRight: 20,
//                 }}
//                 source={require('../assets/tick.png')}
//               />
//             ) : (
//               <View
//                 style={{
//                   width: 20,
//                   height: 20,
//                   borderRadius: 20 / 2,
//                   borderWidth: 2,
//                   borderColor: 'white',
//                   marginRight: 20,
//                 }}></View>
//             )}
//           </TouchableOpacity>
//           <Text
//             style={{
//               fontSize: 15,
//               color: 'white',
//             }}>
//             remember me?
//           </Text>
//         </View>
//         <TouchableOpacity
//           style={{
//             marginTop: 20,
//           }}
//           onPress={() => {
//             navigation.navigate('Signup', {userUid});
//             console.log('userUid', userUid);
//           }}>
//           <Text
//             style={{
//               color: 'white',
//               fontSize: 16,
//             }}>
//             Not a member? go to Signup
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => {
//             loginUser();
//           }}
//           style={styles.button}>
//           <Text style={styles.text}>Login</Text>
//         </TouchableOpacity>
//       </ImageBackground>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     height: '100%',
//     alignItems: 'center',
//   },
//   heading: {
//     fontSize: 40,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 20,
//   },
//   text: {
//     fontSize: 23,
//     color: '#410BF1',
//     textAlign: 'center',
//   },
//   button: {
//     backgroundColor: '#93C9F4',
//     width: '45%',
//     fontSize: 20,
//     color: 'white',
//     borderRadius: 100,
//     padding: 8,
//     marginTop: 30,
//   },
//   input: {
//     backgroundColor: 'white',
//     borderRadius: 100,
//     width: '80%',
//     textAlign: 'center',
//     fontSize: 20,
//     marginBottom: 20,

//     shadowColor: 'blue',
//     shadowOffset: {
//       width: 5,
//       height: 6,
//     },
//     shadowOpacity: 0.8,
//     shadowRadius: 100,
//     elevation: 20,
//   },
// });

import React from 'react';
import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default Home = ({navigation}) => {
  return (
    <View style={homeStyles.mainContainer}>
      <Image
        style={homeStyles.mainimage}
        source={require('../assets/login_logo.png')}
      />
      <Text style={homeStyles.heading}>Let's you in</Text>
      <TouchableOpacity style={homeStyles.container}>
        <Text style={homeStyles.icon}>
          <Icon size={20} name="facebook" />
        </Text>
        <Text style={homeStyles.text}>Continue with Facebook</Text>
      </TouchableOpacity>
      <TouchableOpacity style={homeStyles.container}>
        <Text style={homeStyles.icon}>
          <Icon size={20} name="google" />
        </Text>
        <Text style={homeStyles.text}>Continue with Google</Text>
      </TouchableOpacity>
      <TouchableOpacity style={homeStyles.container}>
        <Text style={homeStyles.icon}>
          <Icon size={20} name="apple" />
        </Text>
        <Text style={homeStyles.text}>Continue with Apple</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: '8%',
        }}>
        <View style={homeStyles.line}></View>
        <Text
          style={{
            marginHorizontal: 20,
            fontSize: 15,
            color: 'black',
          }}>
          or
        </Text>
        <View style={homeStyles.line}></View>
      </View>
      <TouchableOpacity
        style={homeStyles.button}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 15,
          }}>
          Sign in with password
        </Text>
      </TouchableOpacity>

      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontSize: 12,
            marginRight: 5,
          }}>
          Dont have an account?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Products');
          }}>
          <Text
            style={{
              fontSize: 12,
              justifyContent: 'center',
              color: 'blue',
            }}>
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const homeStyles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    borderColor: 'white',
    borderWidth: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: '8%',
    paddingTop: '8%',
  },
  mainimage: {
    width: 180,
    height: 180,
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: '1%',
  },

  container: {
    borderWidth: 2,
    borderColor: '#F1F1F1',
    borderRadius: 15,

    padding: 15,
    width: '100%',
    marginVertical: '1.75%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
  },
  icon: {
    textAlign: 'center',
    color: 'black',
    marginRight: 10,
  },
  line: {
    width: '40%',
    borderWidth: 0.5,
    height: 0,
    borderColor: 'lightgray',
  },
  button: {
    backgroundColor: '#246BFD',
    color: 'white',
    justifyContent: 'center',
    padding: 15,
    marginVertical: '5%',
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
  },
});
