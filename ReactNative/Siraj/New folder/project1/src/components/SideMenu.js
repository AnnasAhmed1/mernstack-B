import React from 'react'
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Switch,
  AsyncStorage
} from 'react-native'

import { Icon } from 'react-native-elements'
import { NavigationActions } from 'react-navigation'
import {DrawerActions } from 'react-navigation'

import * as firebase from 'firebase' //Database
import SideMenuHeader from './SideMenuHeader'
import { colors } from '../common/theme'
var { width, height } = Dimensions.get('window')
import languageJSON from '../common/language'
import languageJSONProviding from '../providingParty/common/language'
import MultiToggleSwitch from 'react-native-multi-toggle-switch';
import SwitchButton from 'switch-button-react-native';


///
//(async () => {
  // let user = await AsyncStorage.getItem('firstTime34')
  // if(!user)
  // {
  //    AsyncStorage.setItem('firstTime34', 'true')
   //   global.providingPartyMode = true
       //this.props.navigation.navigate('ServiceScreen');
  // }
  //  else
  //  {
  //    alert(user)
  //  }
    // all of the script.... 

//})();

export default class SideMenu extends React.Component {
  constructor (props) {
    super(props)

    
    this.state = {
      sideMenuList: [],
      profile_image: null,
      providingPartyMode: global.providingPartyMode,
      activeSwitch:1,
      switchDirection: 'rtl'
    }
    // this.state = {
    //     heightIphoneSix: false,
    //     sideMenuList: [
    //         { key: 1, name: languageJSON.open_request, navigationName: 'Map', icon: require('../../assets/images/stop.png'), type: 'font-awesome', child: 'firstChild' },

    //         { key: 2, name: languageJSON.profile_setting_menu, navigationName: 'Profile', icon: require('../../assets/images/edit.png'), type: 'ionicon', child: 'secondChild' },
    //         { key: 3, name: languageJSON.my_wallet_menu, icon: require('../../assets/images/IconCard.png'), navigationName: 'wallet', type: 'MaterialIcons', child: 'thirdChild' },
    //   { key: 4, name: languageJSON.my_requests_menu, navigationName: 'RideList', icon: require('../../assets/images/terms.png'), type: 'material-community', child: 'fourthChild' },
    //         { key: 5,  name: languageJSON.logout,icon: require('../../assets/images/iconLogout7.png'), type: 'MaterialIcons', child: 'lastChild' },
    //         { key: 6, name: languageJSON.about_us_menu, navigationName: 'About', icon: require('../../assets/images/question.png'), type: 'entypo', child: 'fifthChild' }

    //     ],
    //     profile_image: null,

    // }

    //   this.state = {
    //     heightIphoneSix: true,
    //     heightIphoneFive: true,
    //     heightIphoneX: true,
    //     heightIphoneXsMax: true,
    //     sideMenuList: [
    //         { key: 1, name: languageJSONProviding.booking_request, navigationName: 'DriverTripAccept', icon: require('../../assets/images/help.png'), type: 'font-awesome', child: 'firstChild' },
    //         { key: 2, name: languageJSONProviding.profile_settings, navigationName: 'Profile', icon: require('../../assets/images/edit.png'), type: 'ionicon', child: 'secondChild' },
    //         { key: 4, name: languageJSONProviding.incomeText, navigationName: 'MyEarning', icon: require('../../assets/images/IconCard.png'), type: 'SimpleLineIcons', child: 'ninethChild' },
    //         { key: 3, name: languageJSONProviding.my_bookings, navigationName: 'RideList', icon: require('../../assets/images/terms.png'), type: 'material-community', child: 'thirdChild' },
    //         { key: 10, name: languageJSONProviding.about_us, navigationName: 'About', icon: require('../../assets/images/question.png'), type: 'entypo', child: 'ninethChild' },
    //         { key: 9, name: languageJSONProviding.sign_out, icon: require('../../assets/images/iconLogout7.png'), type: 'font-awesome', child: 'lastChild' }
    //     ],
    //     profile_image: null
    // }
  }

  loadMenu (providingPartyMode) {
    if (providingPartyMode) {
      this.setState({
        sideMenuList: [
          
          {
            key: 1,
            name: languageJSONProviding.booking_request,
            navigationName: 'DriverTripAccept',
            icon: require('../../assets/images/help.png'),
            type: 'font-awesome',
            child: 'firstChild'
          },
          {
            key: 3,
            name: languageJSONProviding.my_bookings,
            navigationName: 'SellerRideList',
            icon: require('../../assets/images/terms.png'),
            type: 'material-community',
            child: 'thirdChild'
          },
          // {
          //   key: 11,
          //   name: "Messages(8)",
          //  // navigationName: 'ServiceScreen',
          //   icon: require('../../assets/images/chat.png'),
          //   type: 'ionicon',
          //   child: 'secondChild'
          // },
          {
            key: 2,
            name: languageJSONProviding.my_service,
            navigationName: 'ServiceScreen',
            icon: require('../../assets/images/edit.png'),
            type: 'ionicon',
            child: 'secondChild'
          },
           {
            key: 10,
            name: languageJSONProviding.profile_settings,
            navigationName: 'SellerProfile',
            icon: require('../../assets/images/edit.png'),
            type: 'ionicon',
            child: 'secondChild'
          },
          {
            key: 4,
            name: languageJSONProviding.incomeText,
            navigationName: 'MyEarning',
            icon: require('../../assets/images/IconCard.png'),
            type: 'SimpleLineIcons',
            child: 'ninethChild'
          },
          {
            key: 10,
            name: languageJSONProviding.logout,
           
            icon: require('../../assets/images/iconLogout7.png') ,
            type: 'entypo',
            child: 'ninethChild'
          },
          {
            key: 9,
            name: languageJSONProviding.about_us,
            icon: require('../../assets/images/question.png'),
            navigationName: 'About',
            type: 'font-awesome',
            child: 'lastChild'
          }
        ]
      })

     // this.props.navigation.navigate('DriverRoot');
//AsyncStorage.getItem('isFirstTime').then((value) => {
  
  
//if(value == null)
//{ 

 //  this.props.navigation.navigate('ServiceScreen');
 //  AsyncStorage.setItem('isFirstTime', 'true')
//}
//else
//{
 // if(!value)
  //alert(value)
//   this.props.navigation.navigate('DriverRoot');
//}
      
     // this.props.navigation.openDrawer();
//})


     
    } else {
      this.setState({
        sideMenuList: [
        
          {
            key: 1,
            name: languageJSON.open_request,
            navigationName: 'Map',
            icon: require('../../assets/images/stop.png'),
            type: 'font-awesome',
            child: 'firstChild'
          },
          {
            key: 4,
            name: languageJSON.my_requests_menu,
            navigationName: 'RideList',
            icon: require('../../assets/images/terms.png'),
            type: 'material-community',
            child: 'fourthChild'
          },
          //  {
          //   key: 11,
          //   name: "Messages(8)",
          //  // navigationName: 'ServiceScreen',
          //   icon: require('../../assets/images/chat.png'),
          //   type: 'ionicon',
          //   child: 'secondChild'
          // },
          {
            key: 2,
            name: languageJSON.profile_setting_menu,
            navigationName: 'Profile',
            icon: require('../../assets/images/edit.png'),
            type: 'ionicon',
            child: 'secondChild'
          },
          {
            key: 3,
            name: languageJSON.my_wallet_menu,
            icon: require('../../assets/images/IconCard.png'),
            navigationName: 'wallet',
            type: 'MaterialIcons',
            child: 'thirdChild'
          },
          {
            key: 5,
            name: languageJSON.logout,
            icon: require('../../assets/images/iconLogout7.png'),
            type: 'MaterialIcons',
            child: 'lastChild'
          },
          {
            key: 6,
            name: languageJSON.about_us_menu,
            navigationName: 'About',
            icon: require('../../assets/images/question.png'),
            type: 'entypo',
            child: 'fifthChild'
          }
        ]
      })
      this.props.navigation.navigate('Root');
   //  this.props.navigation.openDrawer();
    }
  }

  componentDidMount () {
  
    this.heightReponsive()
    var curuser = firebase.auth().currentUser.uid
    const userRoot = firebase.database().ref('users/' + curuser)
    userRoot.on('value', userData => {
      if (userData.val()) {
        this.setState(userData.val())
      }
    })
    
    if(! global.providingPartyMode ||  global.providingPartyMode == undefined)
    {
    
    //  alert(global.providingPartyMode)
//alert(this.state.providingPartyMode)
      this.tripSatusCheck()
    }
   
    

// AsyncStorage.getItem('isFirstTime').then((value) => {
// if(value == null)
// {
//    global.providingPartyMode =true;
// }

//      // this.props.navigation.openDrawer();
// })

   


    this.loadMenu(this.state.providingPartyMode)
  }

  //check for device height(specially iPhone 6)
  heightReponsive () {
    if (height <= 667) {
      this.setState({ heightIphoneSix: true })
    }
  }

    onChangeFunction(){
      // alert(this.state.providingPartyMode)
         this.setState({ providingPartyMode: this.state.providingPartyMode })
         
    }
  //navigation to screens from side menu
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    })
    this.props.navigation.dispatch(navigateAction)
  }

  //sign out and clear all async storage
  async signOut () {
  
   
       firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/pushToken').remove();
        firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/userPlatform').remove();
        AsyncStorage.clear();
    

    await firebase.auth().signOut()
  }

  //CHECKING TRIP END OR START
  tripSatusCheck () {
   
    var curuser = firebase.auth().currentUser
    this.setState({ currentUser: curuser }, () => {
      const userData = firebase
        .database()
        .ref('users/' + this.state.currentUser.uid)
      userData.on('value', userData => {
        if (userData.val()) {
          var data = userData.val()
          if (data['my-booking']) {
            let bookingData = userData.val()['my-booking']
            for (key in bookingData) {
              bookingData[key].bookingKey = key
              if (bookingData[key].payment_status) {
                if (
                  bookingData[key].payment_status == 'WAITING' &&
                  bookingData[key].status == 'END' &&
                  bookingData[key].skip != true &&
                  bookingData[key].paymentstart != true
                ) {
                  //bookingData[key].bookingKey = bookingData[key].bookingId;
                  bookingData[key].firstname = userData.val().firstName
                  bookingData[key].lastname = userData.val().lastName
                  bookingData[key].email = userData.val().email
                  bookingData[key].phonenumber = userData.val().mobile
                  bookingData[key].trip_cost = bookingData[key].customer_paid;
                  this.props.navigation.navigate('CardDetails', {
                    data: bookingData[key]
                  })
                }
                // else if( bookingData[key].rating_queue == true && bookingData[key].payment_mode == 'Card'){
                //     this.props.navigation.navigate('ratingPage',{data:bookingData[key]});
                //  }
              }
            }
          }
        }
      })
    })
  }

  render () {
    return (
      <View style={styles.mainViewStyle}>
        <SideMenuHeader
          headerStyle={styles.myHeader}
          fName={this.state.firstName}
          lName={this.state.lastName}
          userPhoto={this.state.profile_image}
          userEmail={this.state.email}
          userName={this.state.firstName + ' ' + this.state.lastName}
        ></SideMenuHeader>
        <View >
          <View style={{ marginTop: 20, marginBottom:70, marginLeft:20, marginRight:20 }}>
            <View
              style={{ flex: 1,height:30,alignSelf: 'stretch',   flexDirection: 'row' }}
            >
               {/* <View style={{ flex: 1, alignSelf: 'stretch'}}>
                  <Text
                      style={{
                        
                        color: this.state.providingPartyMode  ? "#a3a9c1" : "#e5e5e5",
                        fontSize: 16,
                        fontFamily: 'OpenSans-Semibold',
                        height:55,
                        fontWeight: 'bold'
                      }}
                    >
                      Providing party
                    </Text>
              </View> */}
              <View style={{ flex: 1, alignSelf: 'stretch',  flexDirection: 'row',height:30,
    alignItems: 'center', textAlignVertical: 'center', justifyContent:'center'}}>
               
             
               

            <SwitchButton
                onValueChange={(val) => {global.providingPartyMode = !this.state.providingPartyMode;
                       this.setState({ providingPartyMode: global.providingPartyMode })
                       this.loadMenu(!this.state.providingPartyMode)}}     
                text1 = {'Providing Party'}                     // optional: first text in switch button --- default ON
                text2 = {'Receiving Party'}                     // optional: second text in switch button --- default OFF
                switchWidth = {250}                 // optional: switch width --- default 44
                switchHeight = {44}                 // optional: switch height --- default 100
                switchdirection = {'ltr' }            // optional: switch button direction ( ltr and rtl ) --- default ltr
                switchBorderRadius = {100}          // optional: switch border radius --- default oval
                switchSpeedChange = {500}           // optional: button change speed --- default 100
                switchBorderColor = '#d4d4d4'       // optional: switch border color --- default #d4d4d4
                switchBackgroundColor = '#fff'      // optional: switch background color --- default #fff
                btnBorderColor = '#00a4b9'          // optional: button border color --- default #00a4b9
                btnBackgroundColor = '#01d298'      // optional: button background color --- default #00bcd4
                fontColor = '#b1b1b1'               // optional: text font color --- default #b1b1b1
                activeFontColor = '#fff'  
             
                value = {this.state.activeSwitch}
                         // optional: active font color --- default #fff
            />
            
            
    

                  {/* <Switch
                  style={styles.switchAlignStyle}
                   trackColor={{false: 'black'}}
                  thumbColor='#01d298'
                 
                  value={this.state.providingPartyMode}
                  onValueChange={() => {
                       global.providingPartyMode = !this.state.providingPartyMode;
                       this.setState({ providingPartyMode: !this.state.providingPartyMode })
                       this.loadMenu(!this.state.providingPartyMode);
                  }}
                /> */}
              </View>
              {/* <View style={{ flex: 1, alignSelf: 'stretch' }}>
                <Text
                      style={{
                         color: this.state.providingPartyMode  ? "#e5e5e5" : "#a3a9c1",
                        fontSize: 16,
                        fontFamily: 'OpenSans-Semibold',
                        height:55
                      }}
                    >
                     Recieving party
                    </Text>
              </View>*/}
            </View>
          </View>
         
<View style={{ margin: 10 }}>
                        <Text style={{ color: '#a3a9c1', fontSize: 14, fontFamily: 'OpenSans-Semibold' }}>Account</Text>
                    </View>
          <FlatList
            data={this.state.sideMenuList}
            keyExtractor={(item, index) => index.toString()}
            bounces={false}
            renderItem={({ item, index }) => (
              <View>
                {index == this.state.sideMenuList.length - 1 && (
                  <View
                    style={{
                      margin: 10,
                      marginTop:
                        index == this.state.sideMenuList.length - 1 ? 30 : 0
                    }}
                  >
                    <Text
                      style={{
                        color: '#a3a9c1',
                        fontSize: 14,
                        fontFamily: 'OpenSans-Semibold'
                      }}
                    >
                      Information
                    </Text>
                  </View>
                )}
                <TouchableOpacity
                  onPress={
                   
                    item.name == languageJSON.logout
                      ? () => this.signOut()
                      : this.navigateToScreen(item.navigationName)
                  }
                  style={[styles.menuItemView]}
                >
                  <Text style={styles.menuName}>{item.name}</Text>
                  <View style={styles.viewIcon}>
                    <Image style={styles.iconStyle} source={item.icon} />
                    {/* <Icon
                                        name={item.icon}
                                        type={item.type}
                                        color='#01d298'
                                        size={20}
                                        containerStyle={styles.iconStyle}
                                    /> */}
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  myHeader: {
    marginTop: 0
  },
  menuItemView: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderTopColor: '#e5e5e5',
    borderTopWidth: 0.5
  },
  viewIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: colors.GREY.btnPrimary,
    left: 1
  },
  menuName: {
    color: colors.BLACK,

    flex: 1,
    fontFamily: 'OpenSans-Semibold',
    fontSize: 18,
    color: '#333333'
  },
  mainViewStyle: {
    backgroundColor: colors.WHITE,
    height: '100%'
  },
  compViewStyle: {
    position: 'relative'
    // flex: 3
  },
  iconStyle: {
    width: 20,
    height: 20
  },
  switchAlignStyle: {
   textAlignVertical: 'center',
  // transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
 
  
   
  }
})
