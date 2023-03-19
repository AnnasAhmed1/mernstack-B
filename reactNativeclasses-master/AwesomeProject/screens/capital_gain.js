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
import BottomNote from '../components/bottom_note';
import InputComponent from '../components/inputComponent';
import CapitalGainComp from '../components/capital_gain_comp';
import AppBar from '../components/app_bar';

const CapitalGainScreen = () => {
  const [radioValue, setRadioValue] = useState(true);
  var radio_props = [
    {label: 'Plot', value: 'plot'},
    {label: 'Constructed', value: 'constructed'},
  ];
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <RadioForm
          style={{
            marginBottom: 15,
            width: '86%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          buttonColor={'#2D3F61'}
          selectedButtonColor={'#2D3F61'}
          buttonSize={12}
          labelStyle={{
            fontSize: 18,
          }}
          radio_props={radio_props}
          initial={0}
          formHorizontal={true}
          onPress={value => {}}
        />

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginBottom: -10,
          }}>
          <CapitalGainComp head="Date of Purchase:" input="Date of Purchase" />
          <CapitalGainComp head="Value:" input="Enter Purchase Value" />
          <CapitalGainComp head="Date of Sale:" input="Date of Sale" />
          <CapitalGainComp head="Value:" input="Enter Sales Value" />
        </View>

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
          Capital Gain Tax on Sale of Property
        </Text>

        <View>
          <InputComponent label="Total Gain" />
          <InputComponent label="Taxable Gain" />
          <InputComponent label="Tax on Capital Gain" />
          <InputComponent label="Capital Gain (After Tax" />
        </View>
        <BottomNote />
      </View>
    </ScrollView>
  );
};

export default CapitalGain = () => {
  return <AppBar Screen={CapitalGainScreen} />;
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 20,
    marginVertical: 20,
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
