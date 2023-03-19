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
// import {ScrollView} from 'react-native-gesture-handler';
// export default function Signup({navigation}) {
//   // const [name, setName] = useState();
//   // const [email, setEmail] = useState();
//   // const [password, setPassword] = useState();
//   const [check, setCheck] = useState(false);

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
//             // marginTop: 'auto',
//           }}
//           source={require('../assets/user.png')}
//         />

//         <TextInput
//           style={styles.input}
//           placeholder="Full Name"
//           onChangeText={e => {
//             name = e;
//           }}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Email"
//           onChangeText={e => {
//             email = e;
//           }}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Password"
//           onChangeText={e => {
//             password = e;
//           }}
//         />
//         <TouchableOpacity
//           onPress={() => {
//             navigation.navigate('Login');
//           }}>
//           <Text
//             style={{
//               color: 'white',
//               fontSize: 16,
//             }}>
//             Already a member? go to Login
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           onPress={() => {
//             signupUser();
//           }}
//           style={styles.button}>
//           <Text style={styles.text}>Signup</Text>
//         </TouchableOpacity>
//       </ImageBackground>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   mainContainer: {
//     height: '100%',
//     width: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
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
//     marginTop: 50,
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
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default Signup = ({navigation}) => {
  let firstName = '';
  let lastName = '';
  let dateOfBirth = '';
  let email = '';
  let password = '';
  let userUid = '';

  async function writeData(firstName, lastName, dateOfBirth, email, password) {
    // console.log('user data written sucessfully');
    try {
      await firestore()
        .collection('Users')
        .add({
          firstName,
          lastName,
          dateOfBirth,
          email,
        })
        .then(() => {
          console.log('User added!');
          // writeData(firstName, lastName, dateOfBirth, email);
          signupUser(email, password);

          loginUser(email, password);
        })
        .catch(err => {
          console.log('firestore write data error', err);
        });
    } catch (error) {
      console.log('firestore write data error catch', error);
    }
  }

  function signupUser(email, password) {
    try {
      if (email.length == 0 || password.length == 0) {
        console.log('email or password cannot be empty');
        return;
      }
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(res => {
          // self defined func

          console.log(res.user);
        })
        .catch(error => {
          console.log(error.message);
        });
    } catch (error) {
      console.log('sigup user error catch', error);
    }
  }

  function loginUser(email, password) {
    try {
      if (email.length == 0 || password.length == 0) {
        console.log('email or password cannot be empty');
        return;
      }
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          userUid = res.user.uid;
          navigation.navigate('Products', {userUid});
          console.log('signed in successfully', res.user);
          console.log('userUid', userUid);
        })
        .catch(error => {
          console.log(error.message);
        });
    } catch (error) {
      console.log('user login error catch', error);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior="height"
        style={{flex: 1, justifyContent: 'flex-end'}}>
        <>
          <ScrollView>
            <SafeAreaView style={loginStyles.mainContainer}>
              <Text
                style={{
                  backgroundColor: '#F5F5F8',
                  borderRadius: 100,
                  marginBottom: '8%',
                }}>
                <Icon size={170} color={'#E9E9F0'} name={'user-circle-o'} />
              </Text>
              <TextInput
                onChangeText={e => {
                  firstName = e;
                }}
                style={loginStyles.input}
                placeholder="First Name"
              />
              <TextInput
                onChangeText={e => {
                  lastName = e;
                }}
                style={loginStyles.input}
                placeholder="Last Name"
              />
              <TextInput
                onChangeText={e => {
                  dateOfBirth = e;
                }}
                style={loginStyles.input}
                placeholder="Date of Birth"
              />
              <TextInput
                onChangeText={e => {
                  email = e;
                }}
                style={loginStyles.input}
                placeholder="Email"
              />
              <TextInput
                onChangeText={e => {
                  password = e;
                }}
                style={loginStyles.input}
                placeholder="Password"
              />
              <TouchableOpacity
                style={loginStyles.button}
                onPress={() => {
                  if (
                    firstName.length < 1 &&
                    lastName.length < 1 &&
                    dateOfBirth.length < 1 &&
                    email.length < 1 &&
                    password.length < 1
                  ) {
                    console.log('required feilds are missing');
                    return;
                  } else {
                    writeData(
                      firstName,
                      lastName,
                      dateOfBirth,
                      email,
                      password,
                    );
                  }
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 15,
                  }}>
                  Sign up
                </Text>
              </TouchableOpacity>
            </SafeAreaView>
          </ScrollView>
        </>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const loginStyles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    borderColor: 'white',
    borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: '8%',
    paddingTop: '8%',
  },
  mainimage: {
    width: 180,
    height: 180,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: '1%',
    marginBottom: '5%',
  },
  input: {
    backgroundColor: '#FAFAFA',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: '4%',
    color: 'black',
    fontSize: 15,
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
  blueText: {
    color: '#246BFD',
    textAlign: 'center',
    fontSize: 15,
  },
  icon: {
    textAlign: 'center',
    color: 'black',
  },
  line: {
    width: '30%',
    borderWidth: 0.5,
    height: 0,
    borderColor: 'lightgray',
  },
  button: {
    backgroundColor: '#246BFD',
    color: 'white',
    justifyContent: 'center',
    padding: 15,
    // marginVertical: '5%',
    marginBottom: '5%',
    // marginTop: 'auto',
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
  },
});
