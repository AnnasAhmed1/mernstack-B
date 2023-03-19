import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';

import * as firebase from 'firebase'
import * as Notifications from 'expo-notifications';
import GetPushToken from '../common/GetPushToken';
import { Audio } from 'expo-av';
//import Sound from 'react-native-sound';


export class AuthLoadingScreen extends React.Component {
  //sound = new Sound('../../assets/sounds/car_horn.wav');

  constructor(props) {
    super(props);
    this.bootstrapAsync();
    
  }

  // Fetch the token from storage then navigate to our appropriate place
  bootstrapAsync =  () => {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user && user.displayName){
        const userData = firebase.database().ref('users/'+user.uid);
        userData.once('value',userData=>{
          if(userData.val() && userData.val().usertype == 'rider'){
                      this.props.navigation.navigate('Root'); 
                    //  alert(7)
                      GetPushToken();
                     }
                     else{ 
                      this.props.navigation.navigate('Auth');
                     }
        })
      }else{
              this.props.navigation.navigate('Auth');
            }
    })

  };


  componentDidMount(){
    
    //this._notificationSubscription = Notifications.addEventListener(this._handleNotification);
  }

  componentWillMount(){
    this._notificationSubscription = null;
  }

  _handleNotification = async (notification) => {
   
    alert(notification.data.msg);

   //alert(notification.data.channelId)
  //channelId
    const soundObject = new Audio.Sound();
    try {
       console.log("hiiiiiiiiiiii")
      // this.sound.play();
       await soundObject.loadAsync(require('../../assets/sounds/car_horn.wav'));
       await soundObject.playAsync();
    } catch (error) {
      alert(error)
       console.log("biiiiiiiii")
      console.log("Unable to play shound7");
    }
    return false
   };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.IndicatorStyle}>
        <ActivityIndicator  size="large" />
      </View>
    );
  }
}

//Screen Styling
const styles = StyleSheet.create({
  IndicatorStyle:{
    flex:1, 
    justifyContent:"center"
  }
})