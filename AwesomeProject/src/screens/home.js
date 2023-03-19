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
