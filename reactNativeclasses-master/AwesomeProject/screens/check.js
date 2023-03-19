import {Button, Text} from 'react-native';

const HomeScreen = ({navigation}) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() => navigation.navigate('Profile', {name: 'Jane'})}
    />
  );
};
const ProfileScreen = ({navigation}) => {
  return <Text>This is 's profile</Text>;
};

export {HomeScreen, ProfileScreen};
