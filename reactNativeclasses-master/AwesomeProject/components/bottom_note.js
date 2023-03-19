import React from 'react';
import {StyleSheet, Text} from 'react-native';

const BottomNote = () => {
  return (
    <>
      <Text style={styles.head}>Note</Text>
      <Text style={styles.details}>
        Capital Gain Tax U/S 236 C paid at the time of Sale of Property is
        adjustable against the above liability
      </Text>
    </>
  );
};

export default BottomNote;

const styles = StyleSheet.create({
  head: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#2D3F61',
    color: '#ffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 15,
  },
  details: {
    fontSize: 15,
    backgroundColor: '#E5E5E5',
    color: 'black',
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontWeight: 'bold',
  },
});
