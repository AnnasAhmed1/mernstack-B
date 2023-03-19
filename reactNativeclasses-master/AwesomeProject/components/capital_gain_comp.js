import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const CapitalGainComp = ({head, input}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.head}>{head}</Text>
      <TextInput placeholder={input} style={styles.input} />
    </View>
  );
};

export default CapitalGainComp;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginBottom: 10,
    width: '48%',
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    // width: '50%',
    // padding: 5,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  head: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 3,
  },
});
