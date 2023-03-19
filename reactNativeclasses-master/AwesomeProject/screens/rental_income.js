import {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import AppBar from '../components/app_bar';
import BottomNote2 from '../components/bottom_note2';
import InputComponent from '../components/inputComponent';

const RentalIncomeScreen = ({navigation}) => {
  const [radioValue, setRadioValue] = useState(true);
  const [radioValue2, setRadioValue2] = useState(true);
  var radio_props = [
    {label: 'Person', value: 'person'},
    {label: 'Company', value: 'company'},
  ];
  var radio_props2 = [
    {label: 'Monthly', value: 'monthly'},
    {label: 'Yearly', value: 'yearly'},
  ];
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <RadioForm
          style={[styles.radioForm, {width: '82%'}]}
          buttonColor={'#2D3F61'}
          selectedButtonColor={'#2D3F61'}
          buttonSize={12}
          labelStyle={{
            fontSize: 18,
          }}
          radio_props={radio_props}
          initial={0}
          formHorizontal={true}
          onPress={value => {
            setRadioValue(!radioValue);
          }}
        />
        <RadioForm
          style={styles.radioForm}
          buttonColor={'#2D3F61'}
          selectedButtonColor={'#2D3F61'}
          buttonSize={12}
          labelStyle={{
            fontSize: 18,
          }}
          radio_props={radio_props2}
          initial={0}
          formHorizontal={true}
          onPress={value => {
            setRadioValue2(!radioValue2);
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
                justifyContent: 'center',
              },
            ]}>
            <Text
              style={{
                color: 'grey',
                fontSize: 18,
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
                justifyContent: 'center',
              },
            ]}>
            <Text
              style={{
                color: 'white',
                fontSize: 18,
                textAlign: 'center',
              }}>
              CALCULATE
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subHeading}>
          Rental Income Tax Calculation Details
        </Text>
        {radioValue2 ? (
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
        {radioValue ? (
          <BottomNote2
            details1={'where the taxable income doesnot exceed Rs. 200000'}
            details2={'0%'}
          />
        ) : (
          <BottomNote2 details1={'In case of company'} details2={'15%'} />
        )}
      </View>
    </ScrollView>
  );
};

export default RentalIncome = () => {
  return <AppBar Screen={RentalIncomeScreen} />;
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
  radioForm: {
    marginBottom: 15,
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
