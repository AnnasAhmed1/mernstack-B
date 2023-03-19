import {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import PropTypes from 'prop-types'

export default class ControlPanel extends React.Component {
  static propTypes = {
    closeDrawer: PropTypes.func.isRequired
  };



  render() {
    let {closeDrawer} = this.props
    return (
      <View style={{borderColor:"black",
      borderWidth:1, position:"relative", left:-200, top:-100}}>
        {/* <Text style={styles.controlText}>Control Panel</Text> */}
        <TouchableOpacity style={styles.button} onPress={closeDrawer} >
          <Text>Close Drawer</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:100,
    padding: 20,
    backgroundColor: 'black',
    zIndex: 1
  },
  controlText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    zIndex: 1
  }
})