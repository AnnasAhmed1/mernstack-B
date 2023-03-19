import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const BottomNote2 = ({details1, details2}) => {
  return (
    <>
      <View style={styles.headContainer}>
        <Text style={styles.head}>Taxable Income</Text>
        <Text style={styles.head}>Rate of Tax</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.details}>{details1}</Text>
        <Text style={styles.details}>{details2}</Text>
      </View>
    </>
  );
};

export default BottomNote2;

const styles = StyleSheet.create({
  headContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#2D3F61',
    paddingLeft: 15,
    paddingVertical: 10,
    marginTop: 15,
  },
  head: {
    width: '48%',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffff',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#E5E5E5',
    paddingVertical: 5,
    paddingLeft: 15,
  },
  details: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    width: '48%',
  },
});
