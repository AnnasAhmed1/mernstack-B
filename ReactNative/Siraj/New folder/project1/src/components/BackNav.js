
import {TouchableOpacity, View, Image } from "react-native";
import { Icon, Header} from "react-native-elements";
import React from 'react';


export default class BackNav extends React.Component {

     constructor(props) {
    super(props);
     }
  render() {
  return (
    <TouchableOpacity
    
      onPress={() => {
       this.props.navigation.goBack()
       // back();
      }}
    >
     <View style={{flex:0, 
            flexDirection: 'row', 
            justifyContent: 'flex-start',
            // borderColor:"black",
            // borderWidth:1,
            width:60
      }}>

<Image source={require('../../assets/images/back.png')} />
    </View>
    </TouchableOpacity>
  );
 }
}