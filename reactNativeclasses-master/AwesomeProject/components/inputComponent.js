import {StyleSheet, Text, TextInput, View} from 'react-native';

export default InputComponent = ({label}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{label}</Text>
      <TextInput style={styles.input} placeholder="0" />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    width: '47%',
    padding: 6,
    paddingHorizontal: 10,
    fontSize: 15,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
});
