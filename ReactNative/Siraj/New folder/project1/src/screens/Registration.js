import React from "react";
import { Registration } from "../components";
import { StyleSheet, View, Image } from "react-native";
import * as firebase from "firebase";
import languageJSON from "../common/language";
import { Modal } from "react-native";
import carImageIcon from '../../assets/images/ber.png';
import GetPushToken from '../common/GetPushToken';
import { NetworkInfo } from 'react-native-network-info'
//import {Analytics} from '@react-native-firebase/analytics';
//import Analytics from "@react-native-firebase/analytics";
//import * as Analytics from 'expo-firebase-analytics';

export default class RegistrationPage extends React.Component {
  login;
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      allRegData: "",
       modal: false,
    };
    this.login = false;
    //firebase.auth().signOut();
  }

 async componentDidMount(){
    //     let date1 = new Date();
   // var oiph =  await  NetworkInfo.getIPAddress()
  ///  alert(oiph)
  //  firebase.database().ref('screen_clicks_history'+ '/' +"anonymous" ).push({
   //           screen:"Registration",
   //           clickedDate:date1.toLocaleString(),
     //       }).then().catch(function(error) {
    // alert("Data could not be saved." + error);
    // });

  }

  async clickRegister(
    fname,
    lname,
    email,
    mobile,
    password,
    viaRef,
    referralVia,
    extension
  ) {
    try{
 // throw new Exception('Exception message');
         let date1 = new Date();
 
   firebase.database().ref('screen_clicks_history'+ '/' +"anonymous" ).push({
             screen:"Registration",
             clickedDate:date1.toLocaleString(),
             email:email
           }).then().catch(function(error) {
    alert("Data could not be saved." + error);
    });

    // await Promise.all([
    //       analytics().setUserId(id),
    //       analytics().setUserProperty('email', email),  // <--- DON'T DO THIS !!!
    //       analytics().setUserProperty('created_at', new Date()),
    //       analytics().logEvent(eventName, propertyObject);("sign_up")
    //     ]);

    this.setState({ loading: true });
    var regData = {
      firstName: fname,
      lastName: lname,
      mobile: mobile,
      email: email,
      usertype: "rider",
      signupViaReferral: viaRef,
      referarDetails: referralVia,
      createdAt: new Date().toISOString(),
      queue: false,
      driverActiveStatus: true,
      extension,
    };
    //console.log(firebase.auth().currentUser)
    // console.log("registration data===>",regData)
    //  Registration part
    if (firebase.auth().currentUser) {
     // alert(firebase.auth().currentUser)
      //console.log(firebase.auth().currentUser)
      var credential = firebase.auth.EmailAuthProvider.credential(
        email,
        password
      );
      firebase
        .auth()
        .currentUser.linkWithCredential(credential)
        .then((usercred) => {
          var user = usercred.user;
          if (user) {
            firebase
              .auth()
              .currentUser.updateProfile({
                displayName: regData.firstName + " " + regData.lastName,
              })
              .then(() => {
                firebase
                  .database()
                  .ref("users/")
                  .child(firebase.auth().currentUser.uid)
                  .set(regData)
                  .then(() => {
                    firebase
                      .auth()
                      .signInWithEmailAndPassword(email, password)
                      .then((res) => {
                        this.props.navigation.navigate("Root");
                          GetPushToken();
                      })
                      .catch((res) => {
                        alert(res.message);
                      });
                  });
              });
          }
        })
        .catch((error) => {
          alert(languageJSON.Account_linking_error, error);
        });
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((newUser) => {
          
          if (newUser) {
           //  Analytics.logEvent('sign_up');
           // analytics().logEvent("sign_up")
            firebase
              .auth()
              .currentUser.updateProfile({
                displayName: regData.firstName + " " + regData.lastName,
              })
              .then(() => {
                firebase
                  .database()
                  .ref("users/")
                  .child(firebase.auth().currentUser.uid)
                  .set(regData)
                  .then(() => {
                    firebase
                      .auth()
                      .signInWithEmailAndPassword(email, password)
                      .then((res) => {
                        console.log(firebase.auth().currentUser);
                         //   alert("succes2")

                        global.newUser = true;
                        this.props.navigation.navigate("Root");
                          GetPushToken();
                      })
                      .catch((res) => {
                        alert(res.message);
                      });
                  });
              });
          }
        })
        .catch((error) => {
          var errorMessage = error.message;
          console.log(errorMessage);
          this.setState({ loading: false }, () => {
            alert(errorMessage);
          });
        });
    }
    }
    catch(error){
       let date1 = new Date();
         firebase.database().ref('bugs'+ '/'  ).push({
             error:error,
             clickedDate:date1.toLocaleString(),
           }).then().catch(function(error) {
   // alert("Data could not be saved." + error);
    });
    }
  }

  render() {
    const registrationData = this.props.navigation.getParam("requireData");
    // console.log(registrationData);
    return (
      <View style={styles.containerView}>
        
        <Registration
          reqData={registrationData ? registrationData : ""}
          complexity={"any"}
          navigation={this.props.navigation}
          onPressRegister={(
            fname,
            lname,
            email,
            mobile,
            password,
            viaRef,
            referralVia,
            extension
          ) =>
            this.clickRegister(
              fname,
              lname,
              email,
              mobile,
              password,
              viaRef,
              referralVia,
              extension
            )
          }
          onPress={() => {
            this.clickRegister();
          }}
          onPressBack={() => {
            this.props.navigation.goBack();
          }}
          loading={this.state.loading}
        ></Registration>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  containerView: { flex: 1 },
  textContainer: { textAlign: "center" },
});