import Icon from 'react-native-vector-icons/FontAwesome';
import React, {useRef, useState} from 'react';
import {
  Button,
  DrawerLayoutAndroid,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import Drawer from './drawer';

function AppBar({Screen}) {
  const [what, setWhat] = useState();
  const drawer = useRef(0);
  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition="left"
      renderNavigationView={() => <Drawer />}>
      <View style={styles.drawer}>
        <TouchableOpacity onPress={() => drawer.current.openDrawer()}>
          <Icon name="bars" size={25} color="#ffff" />
        </TouchableOpacity>
        <Text style={styles.heading}>TAX CACULATOR</Text>
      </View>
      {<Screen />}
    </DrawerLayoutAndroid>
  );
}

export default AppBar;

const styles = StyleSheet.create({
  drawer: {
    flexDirection: 'row',
    backgroundColor: '#2D3F61',
    paddingVertical: 5,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    flex: 1,
    justifyContent: 'center',
  },
});
