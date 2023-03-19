import React, {useState} from 'react';
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
import axios from 'axios';

import {address} from 'C:AnnasEDUCATIONMERNSTACK_Module_BFYPmobileAppsrc\routes\route.js';
export default Signup = ({navigation}) => {
  const [contactNumber, setContactNumber] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const signupFun = (firstName, lastName, contactNumber, email, password) => {
    axios
      .post(`${address}/signup`, {
        firstName,
        lastName,
        contactNumber,
        email,
        password,
      })
      .then(function (response) {
        console.log(response, 'response signup');
      })
      .catch(function (error) {
        console.log(error, 'error signup');
      });
  };

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
                  setFirstName(e);
                }}
                style={loginStyles.input}
                placeholder="First Name"
              />
              <TextInput
                onChangeText={e => {
                  setLastName(e);
                }}
                style={loginStyles.input}
                placeholder="Last Name"
              />
              <TextInput
                onChangeText={e => {
                  setContactNumber(e);
                }}
                style={loginStyles.input}
                placeholder="Contact Number"
              />
              <TextInput
                onChangeText={e => {
                  setEmail(e);
                }}
                style={loginStyles.input}
                placeholder="Email"
              />
              <TextInput
                onChangeText={e => {
                  setPassword(e);
                }}
                style={loginStyles.input}
                placeholder="Password"
              />
              <TouchableOpacity
                style={loginStyles.button}
                onPress={() => {
                  signupFun(
                    firstName,
                    lastName,
                    contactNumber,
                    email,
                    password,
                  );
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
