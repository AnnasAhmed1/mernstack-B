import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
export default Login2 = () => {
  const [check, setCheck] = useState(false);

  return (
    <>
      <ImageBackground
        style={styles.mainContainer}
        source={{
          uri: 'https://designimages.appypie.com/appbackground/appbackground-22-homedecor-plant.jpg',
        }}>
        <Image
          resizeMode="contain"
          style={{
            width: 120,
            height: 120,
            marginBottom: 30,
            marginTop: '30%',
          }}
          source={require('../assets/user.png')}
        />

        <TextInput
          style={styles.input}
          placeholder="username"
          placeholderTextColor="blue"
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          placeholderTextColor="blue"
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginTop: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              setCheck(!check);
            }}>
            {check ? (
              <Image
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20 / 2,
                  borderWidth: 2,
                  marginRight: 20,
                }}
                source={require('../assets/tick.png')}
              />
            ) : (
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 20 / 2,
                  borderWidth: 2,
                  borderColor: 'white',
                  marginRight: 20,
                }}></View>
            )}
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 15,
              color: 'white',
            }}>
            remember me?
          </Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    alignItems: 'center',
  },
  heading: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  text: {
    fontSize: 23,
    color: '#410BF1',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#93C9F4',
    width: '45%',
    fontSize: 20,
    color: 'white',
    borderRadius: 100,
    padding: 8,
    marginTop: 50,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 100,
    width: '80%',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20,

    shadowColor: 'blue',
    shadowOffset: {
      width: 5,
      height: 6,
    },
    shadowOpacity: 0.8,
    shadowRadius: 100,
    elevation: 20,
  },
});
