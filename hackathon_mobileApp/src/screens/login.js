import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import {address} from '../routes/route';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginFun = (email, password) => {
    axios
      .post(`${address}/login`, {
        email,
        password,
      })
      .then(function (response) {
        console.log(response, 'response login');
      })
      .catch(function (error) {
        console.log(error, 'error login');
      });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
        <View style={loginStyles.mainContainer}>
          <Image
            style={loginStyles.mainimage}
            source={require('../assets/login_img.png')}
          />
          <Text style={loginStyles.heading}>Login to You Account</Text>
          <TextInput
            onChangeText={e => {
              setEmail(e);
            }}
            placeholderTextColor={'black'}
            style={loginStyles.input}
            placeholder="Email"
          />
          <TextInput
            onChangeText={e => {
              setPassword(e);
            }}
            placeholderTextColor={'black'}
            style={loginStyles.input}
            placeholder="Password"
          />
          <Text style={loginStyles.text}>Remember me</Text>
          <TouchableOpacity
            onPress={() => {
              loginFun(email, password);
            }}
            style={loginStyles.button}>
            <Text
              style={{
                color: 'white',
                fontSize: 15,
              }}>
              Sign in
            </Text>
          </TouchableOpacity>
          <Text style={loginStyles.blueText}>Forgot the password?</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: '5%',
            }}>
            <View style={loginStyles.line}></View>
            <Text
              style={{
                marginHorizontal: 20,
                fontSize: 15,
                color: 'black',
              }}>
              or continue with
            </Text>
            <View style={loginStyles.line}></View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: '3%',
            }}>
            <Text style={loginStyles.icon}>
              <Icon size={20} name="facebook" />
            </Text>
            <Text style={loginStyles.icon}>
              <Icon size={20} name="google" />
            </Text>
            <Text style={loginStyles.icon}>
              <Icon size={20} name="apple" />
            </Text>
          </View>
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
                navigation.navigate('Signup');
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Login;

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

    borderRadius: 8,
    marginBottom: '3%',
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
    marginRight: 15,
    paddingVertical: 10,
    borderRadius: 8,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'lightgray',
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
    marginVertical: '5%',
    borderRadius: 50,
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
  },
});
