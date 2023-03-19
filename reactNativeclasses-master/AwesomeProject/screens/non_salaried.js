import {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import AppBar from '../components/app_bar';
import InputComponent from '../components/inputComponent';

const NonSalariedScreen = () => {
  const [radioValue, setRadioValue] = useState(true);
  var radio_props = [
    {label: 'Monthly', value: 'monthly'},
    {label: 'Yearly', value: 'yearly'},
  ];
  return (
    <View style={styles.mainContainer}>
      <RadioForm
        style={{
          marginBottom: 15,
          width: '75%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        buttonColor={'#2D3F61'}
        selectedButtonColor={'#2D3F61'}
        buttonSize={12}
        labelStyle={{
          fontSize: 18,
          fontWeight: 'bold',
        }}
        radio_props={radio_props}
        initial={0}
        formHorizontal={true}
        onPress={value => {
          setRadioValue(!radioValue);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Monthly Income (pre tax)"
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: 'lightgrey',
              borderColor: 'grey',
              marginRight: 10,
            },
          ]}>
          <Text
            style={{
              color: 'grey',
              fontSize: 20,
              textAlign: 'center',
            }}>
            RESET
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: '#2D3F61',
              borderColor: '#00008B',
            },
          ]}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              textAlign: 'center',
            }}>
            CALCULATE
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.subHeading}>
        Salaried Income Tax Calculation Details
      </Text>
      {radioValue ? (
        <View>
          <InputComponent label="Monthly Income Tax" />
          <InputComponent label="Monthly Income (after Tax)" />
          <InputComponent label="Yearly Income" />
          <InputComponent label="Yearly Income Tax" />
          <InputComponent label="Yearly Income (after Tax)" />
        </View>
      ) : (
        <View>
          <InputComponent label="Yearly Income" />
          <InputComponent label="Yearly Income Tax" />
          <InputComponent label="Yearly Income (after Tax)" />
        </View>
      )}
    </View>
  );
};

export default NonSalaried = () => {
  return <AppBar Screen={NonSalariedScreen} />;
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    paddingHorizontal: 10,
  },
  subHeading: {
    fontSize: 25,
    color: 'black',
    marginBottom: 10,
    marginTop: 10,
  },
  button: {
    borderWidth: 1,
    flex: 1,
    paddingVertical: 5,
  },
});
