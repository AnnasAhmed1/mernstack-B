import React from 'react';
import {OpenRequest } from '../components/index';
import {StyleSheet,View,StatusBar, Text, TouchableWithoutFeedback} from 'react-native';
import * as firebase from 'firebase'
import StepIndicator from 'react-native-step-indicator';
import { Icon, Button, Header, Input } from 'react-native-elements'
import { colors } from '../common/theme';



 

export default class OpenRequestPage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            currentPosition: 0,
               
        }
    }

    //register button click after all validation
    async clickRegister(fname, lname, mobile, email) {
        // set data set for update user 
        let regData = {
            firstName:fname,
            lastName:lname,
            mobile:mobile,
            email:email,
        }

        let curuser = firebase.auth().currentUser.uid;
        firebase.database().ref('users/'+curuser).update(regData).then(()=>{
          this.props.navigation.pop();
        })
        
    }

  render() {
    const { onPressBack }=this.props
    return (
        <View style={styles.containerView}>
            <OpenRequest  onPressBack={()=>{this.props.navigation.goBack()}} navigation = {this.props.navigation}></OpenRequest>
            {/* <Header 
                    backgroundColor={colors.TRANSPARENT}
                    leftComponent={{icon:'md-close', type:'ionicon', color:colors.BLACK, size: 35, component: TouchableWithoutFeedback,onPress: onPressBack }}
                    containerStyle={styles.headerContainerStyle}
                    innerContainerStyles={styles.headerInnerContainer}
                />
                <StepIndicator
         customStyles={customStyles}
         currentPosition={this.state.currentPosition}
         labels={labels}
    /> */}

          
         
        </View>
    );
  }

  onPageChange(position){
    this.setState({currentPosition: position});
}
}
const styles = StyleSheet.create({
    containerView:{ 
        flex:1
        //marginTop: StatusBar.currentHeight 
    },
    containerView2:{ 
        height:'100%'
        //marginTop: StatusBar.currentHeight 
    },
    textContainer:{textAlign:"center"},
});