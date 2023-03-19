import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default Login3 = () => {
  return (
    <ImageBackground
      style={styles.mainContainer}
      source={
        {
          // uri: 'https://designimages.appypie.com/appbackground/appbackground-22-homedecor-plant.jpg',
        }
      }>
      {/* <Image resizeMode="contain" source={require('../assets/user.png')} /> */}
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Login</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} />
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} />
        <TouchableOpacity>
          <Text>login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: 'white',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0E3F3',
  },
  innerContainer: {
    width: '80%',
    height: '60%',
    backgroundColor: 'white',
    padding: '8%',
    // fontSize: 10,

    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 8,

    elevation: 15,
  },
  heading: {
    fontSize: 25,
    fontWeight: '700',
  },
  label: {
    fontSize: 15,
    color: 'black',
    marginBottom: 3,
    marginTop: 25,
  },
  button: {},
  input: {
    borderWidth: 1,
    borderColor: '#9FA1A4D5',
    fontSize: 5,
    padding: 4,
  },
});
