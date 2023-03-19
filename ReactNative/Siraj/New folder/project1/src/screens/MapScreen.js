import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Platform,
  Alert,
  Modal,
  ScrollView
} from 'react-native'
import { MapComponent } from '../components'
import { Icon, Button, Avatar, Header } from 'react-native-elements'
import { colors } from '../common/theme'

import * as Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
var { height, width } = Dimensions.get('window')
import { GeoFire } from 'geofire'
import * as firebase from 'firebase'
import { AnimatedRegion } from 'react-native-maps'
import { google_map_key } from '../common/key'
import languageJSON from '../common/language'
import { Currency } from '../common/CurrencySymbol'
//import { hide } from 'expo/build/launch/SplashScreen'
import { RequestPushMsg } from '../common/RequestPushMsg'
import beeplinkPopup from '../../assets/images/ber.png';
import cross from '../../assets/images/cancelModal.png';
import { updateHistory } from '../common/ScreenTracker';
import NotificationNav from '../providingParty/components/NotificationNav'


export default class MapScreen extends React.Component {
  bonusAmmount = 0
  //   allCabs = '';
  constructor (props) {
    super(props)
    var ridesOBJ = undefined
   

    this.state = {
      nominomi: false,
      loadingModal: false,
      giftModal: false,
      location: null,
      errorMessage: null,
      newUserModal:global.newUser ? true : false,
      region: {
        latitude: 9.06146,
        longitude: 7.50064,
        latitudeDelta: 0.9922,
        longitudeDelta: 0.9421
      },
      whereText: languageJSON.map_screen_where_input_text,
      dropText: languageJSON.map_screen_drop_input_text,
      backgroundColor: colors.BLACK,
      carType: '',
      coordinate: new AnimatedRegion({
        latitude: 9.06146,
        longitude: 7.50064
      }),
      allRiders: [],
      passData: {
        droplatitude: 0,
        droplongitude: 0,
        droptext: '',
        whereText: '',
        wherelatitude: 0,
        wherelongitude: 0,
        carType: '',
        title: '',
        description: '',
        time: '',
        requestCategories: [],
        budget: ''
      },
      allCars: [],
      nearby: [],
      mainCarTypes: [],
      checkCallLocation: '',
      lastRequest: {},
      hasRequest: false,
      curuser: '',
      numOfMessages: 0
    }
    this.getNumOfMessage()
    //find user requests
  }

  allCarsData () {
    const cars = firebase.database().ref('rates/car_type')
    cars.once('value', allCars => {
      if (allCars.val()) {
        let cars = allCars.val()
        let arr = []
        for (key in cars) {
          cars[key].minTime = ''
          cars[key].available = true
          cars[key].active = false
          arr.push(cars[key])
        }
        this.setState({ mainCarTypes: arr })
      }
    })
  }

  async componentWillMount () {
  // this.getDrivers()
    if (Platform.OS === 'android' && !Constants.default.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      })
    } else {
      if (this.state.passData.wherelatitude == 0) {
        //nomi fix

        this._getLocationAsync()
        //this._getMyLocationAsync();
      }
    }

    //nomi fix

    let openRequestObj = (await this.props.navigation.getParam(
      'openRequestData'
    ))
      ? this.props.navigation.getParam('openRequestData')
      : null
    if (openRequestObj) {
      Alert.alert(
        '!',
        "Messages have been sent to people around you and you will be notified as soon as there it a person available. You can always check the status of your request in 'My Requests'",
        [
          {
            text: 'Ok',
            onPress: () => {},
            style: 'cancel'
          }
        ],
        { cancelable: false }
      )

      //alert("catch2")
      this.props.navigation.setParams({ openRequestData: null })
      this.setState(
        {
          region: {
            latitude: openRequestObj.place.geometry.location.lat,
            longitude: openRequestObj.place.geometry.location.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
          },
          whereText: openRequestObj.place.formatted_address,
          dropText: '',
          carType: 'Economy',
          //loadingModal: true,
          passData: {
            droplatitude: openRequestObj.place.geometry.location.lat,
            droplongitude: openRequestObj.place.geometry.location.lng,
            droptext: openRequestObj.place.formatted_address,
            whereText: openRequestObj.place.formatted_address,
            wherelatitude: openRequestObj.place.geometry.location.lat,
            wherelongitude: openRequestObj.place.geometry.location.lng,
            carType: 'Economy',
            title: openRequestObj.title,
            description: openRequestObj.description,
            time: openRequestObj.time,
            requestCategories: openRequestObj.selectedCategories,
            budget: openRequestObj.budget
          },
          checkCallLocation: 'navigation'
        }
        // ,
        // () => {
        //   this.getDrivers()
        // }
      )
    }
    let searchObj = (await this.props.navigation.getParam('searchObj'))
      ? this.props.navigation.getParam('searchObj')
      : null

    if (searchObj) {
      if (searchObj.searchFrom == 'where') {
        if (searchObj.searchDetails) {
          console.log(this.props.navigation.getParam('old'))
          this.setState(
            {
              region: {
                latitude: searchObj.searchDetails.geometry.location.lat,
                longitude: searchObj.searchDetails.geometry.location.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
              },
              whereText: searchObj.whereText,
              dropText: searchObj.dropText,
              carType: this.state.passData.carType,
              // loadingModal: true,
              passData: this.props.navigation.getParam('old'),
              checkCallLocation: 'navigation'
            }
            // ,
            // () => {
            //   this.getDrivers()
            // }
          )
        }
      } else {
        if (searchObj.searchDetails) {
          this.setState({
            region: {
              latitude: searchObj.searchDetails.geometry.location.lat,
              longitude: searchObj.searchDetails.geometry.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            },
            whereText: searchObj.whereText,
            dropText: searchObj.dropText
          })
          this.setState({ passData: this.props.navigation.getParam('old') })
          this.setState(
            {
              carType: this.state.passData.carType,
              //loadingModal: true,
              checkCallLocation: 'navigation'
            }
            // ,
            // () => {
            //   this.getDrivers()
            // }
          )
        }
      }
    }
    this.allCarsData()

    this.onPressModal()
  }

  async componentDidMount () {
    var curuser = await firebase.auth().currentUser.uid

    if (curuser) {
      this.setState({ curuser: curuser })
      //.orderByChild("status").equalTo("NEW")
      const ridesListPath = firebase
        .database()
        .ref('/users/' + curuser + '/')
        .child('my-booking')

        .limitToLast(1)
      ridesListPath.on('value', myRidesData => {
       
        //  if(myRidesData.val()!= null)
debugger
        if (myRidesData.val()) {
          ridesOBJ = myRidesData.val()
          if (ridesOBJ && Object.keys(ridesOBJ)[0]) {
            //this.state.passData.wherelatitude, this.state.passData.wherelongitude
            var request = ridesOBJ[Object.keys(ridesOBJ)[0]]
            if (request) {
              request.requestUid = Object.keys(ridesOBJ)[0]
              request.bookingId = Object.keys(ridesOBJ)[0]
              if (request.status == 'NEW') {
                this.setState({ hasRequest: true })
                global.hasRequest = true
              }
              
              this.setState({ lastRequest: request })
            }
          }
          //alert(ridesOBJ.length)
        }
      })
    }
    this.load()
        this.props.navigation.addListener('willFocus', this.load)
  }

    async getNumOfMessage(){
        requestUid = this.lastRequest && this.lastRequest.requestUid? this.lastRequest.requestUid: undefined;
        if(!requestUid)
          return;
         firebase
        .database()
        .ref('chat-sum'+ '/' +requestUid + '/'+ 'message' ).on('value', chatSum => {
          let numOfMessages = 0
             let rootEntry=chatSum.val();
            for(let key in rootEntry){
             let entryKey = rootEntry[key]
                if(entryKey.needHelpNewMessages && entryKey.needHelpNewMessages >0)
                {
                  
                  numOfMessages = numOfMessages + entryKey.needHelpNewMessages
                  this.setState({ numOfMessages: numOfMessages })
                }
      
                 
            }
           // alert(numOfMessages)
        //  if(myRidesData.val()!= null)
// debugger
//         if (myRidesData.val()) {
//           ridesOBJ = myRidesData.val()
//     }
      })


    // setInterval(() => {
    //   if (this.state.lastRequest ) {
    //      // alert(77)
    //     this.setState({
    //       checkCallLocation: 'interval'
    //     })
    //     this.getDrivers()
    //   }
    // }, 30000)
  }

  loading () {
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.state.loadingModal}
        onRequestClose={() => {
          this.setState({ loadingModal: false })
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(22,22,22,0.8)',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              width: '85%',
              backgroundColor: '#DBD7D9',
              borderRadius: 10,
              flex: 1,
              maxHeight: 70
            }}
          >
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'center'
              }}
            >
              <Image
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: colors.TRANSPARENT
                }}
                source={require('../../assets/images/loader.gif')}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#000', fontSize: 16 }}>
                  {languageJSON.driver_finding_alert}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  getDistance = (lat1, lon1, lat2, lon2) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0
  } else {
    var radlat1 = (Math.PI * lat1) / 180
    var radlat2 = (Math.PI * lat2) / 180
    var theta = lon1 - lon2
    var radtheta = (Math.PI * theta) / 180
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    if (dist > 1) {
      dist = 1
    }
    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344
    return dist
  }
}

 checkUserForRequest = (keyb, booking, key,driver) => {
   firebase
    .database()
    .ref('bookings/' + keyb + '/requestedDriver/' + key)
    .once('value', snapshot => {
      if (snapshot.val() === null) {
        firebase
          .database()
          .ref('users/' + key + '/waiting_riders_list/' + keyb + '/')
          .set(booking)

        RequestPushMsg(driver.pushToken, 'You Have A New Booking Request')

        firebase
          .database()
          .ref('bookings/' + keyb + '/')
          .once('value', data => {
            if (data.val()) {
              let mainBookingData = data.val()


              firebase
                .database()
                .ref('bookings/' + keyb + '/requestedDriver/' + key + '/')
                .set({ status: 'NEW' })
                .then(res => {
                  return true
                })
                .catch(error => {
                  console.log(error)
                  return false
                })
            }
          })
      }
    })
  ///////////////////////////////////////

  
}

  checkRequest  = async (requestID, booking) => {

   //alert(requestID)
    var tghh = this;
    var newUsers =[]
  // .orderBy('tripdate') // .startAt(today).endAt(today);
   await firebase
    .database()
    .ref('/users')
    .orderByChild('driverActiveStatus')
    .equalTo(true).once('value', function (snapshot) {
        var promises = []
    // loop through each branch received from firebase // AND map to array of promises var promises = [];
    snapshot.forEach(function (userb) {
  //if(userb.key === "LACwenGwCfXp8nqWbLd2kTnRn9k1")
   //   console.log("mylo")
      var driver = userb.val() //console.log(bookings.key)
      //var someID = data.val().someID;

  if (driver.location && booking.pickup) {
      let distance = tghh.getDistance(
        booking.pickup.lat,
        booking.pickup.lng,
        driver.location.lat,
        driver.location.lng
      )

      ////////check categories
      let categoryMatched = false
      if (distance < 10) {
        if (driver.categories && driver.categories.length > 0) {
          if (booking.selectedCategories)
            for (let rc in booking.selectedCategories) {
              if (
                driver.categories.indexOf(booking.selectedCategories[rc]) > -1
              ) {
                categoryMatched = true
              }
            }
        } else {
          categoryMatched = true
        }
      }

      if (distance < 10 && categoryMatched) {
         // console.log(userb.key)
        driver.arriveDistance = distance
        driver.userID = userb.key
       // alert(requestID)
       //alert(requestID)
       newUsers.push(driver)
       // return requestID;
      //   promises.push(
      //     checkUserForRequest(requestID, booking, userb.key, userb).then(function (someValue) {
      //       return {
      //         bookingID: requestID
      //         // "someValue": someValue
      //       }
      //     }).catch(error => {
      //   console.log(error.message)
      // })
      //   )
      }
      // else{
      //   return null
      // }
    }
    // else{
    //   return null
    // }
    })
  
    // return Promise.all(promises)
    //   .then(function (results) {
    //     console.log('finished 2 succesfuly')
    //      return 1
    //     // this.setState({ // snapshots: results // });
    //   })
    //   .catch(error => {
    //     console.log(error.message)
    //   })
  },
  function(error) {
    alert(error)
    console.error(error);
  });
  return {newUsers: newUsers, bookingID : requestID, booking: booking}

}

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION)
    if (status !== 'granted') {
      // alert("Location Permission Issue");
    }
    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
      maximumAge: 15000
    })
    if (location) {
      var pos = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
      var curuser = firebase.auth().currentUser.uid

      if (pos) {
        let latlng = pos.latitude + ',' + pos.longitude
        return fetch(
          'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
            latlng +
            '&key=' +
            google_map_key
        )
          .then(response => response.json())
          .then(responseJson => {
            if (!this.state.hasRequest) {
              this.setState(
                {
                  whereText: responseJson.results[0].formatted_address,
                  region: {
                    latitude: pos.latitude,
                    longitude: pos.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                  }
                  //nomi fix
                  //loadingModal: true
                },
                () => {
                  let obj = {}
                  obj = this.state.passData
                  obj.wherelatitude = pos.latitude
                  obj.wherelongitude = pos.longitude
                  obj.whereText = responseJson.results[0].formatted_address
                  this.setState({
                    passData: obj,
                    checkCallLocation: 'navigation'
                  })
                  //this.getDrivers()
                  firebase
                    .database()
                    .ref('users/' + curuser + '/location')
                    .update({
                      add: responseJson.results[0].formatted_address,
                      lat: pos.latitude,
                      lng: pos.longitude
                    })
                }
              )
            } else {
              //  alert("catch")
              //fix nomi
              //this.setState({ loadingModal: true });
              let obj = {}
              obj = this.state.lastRequest
              obj.wherelatitude = pos.latitude
              obj.wherelongitude = pos.longitude
              obj.whereText = responseJson.results[0].formatted_address
              this.setState({
                passData: obj,
                region: {
                  latitude: this.state.lastRequest.pickup.lat,
                  longitude: this.state.lastRequest.pickup.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                },
                checkCallLocation: 'navigation'
              })
              //this.getDrivers()
              firebase
                .database()
                .ref('users/' + curuser + '/location')
                .update({
                  add: responseJson.results[0].formatted_address,
                  lat: pos.latitude,
                  lng: pos.longitude
                })
            }
          })
          .catch(error => {
            console.error(error)
          })
      }
    }
  }

  

  getDrivers = async () => {
   var lastMonth = new Date()
    lastMonth.setMonth(lastMonth.getMonth() - 1)
   // alert(lastMonth)
    var tttt= this;
    ///////tring new
    var bookingRef = firebase
      .database()
      .ref('/bookings')
      .orderByChild('status')
      .equalTo('NEW')
    // .orderBy('tripdate')
    // .startAt(today).endAt(today);
    bookingRef.on('value', function (snapshot) {
      // loop through each branch received from firebase
      // AND map to array of promises
      var promises = []
      var a = 0 ;
alert(snapshot.numChildren())
      snapshot.forEach(function (bookings) {
  var booking = bookings.val()

        //console.log(booking.tripdate)
        //var someID = data.val().someID;
        if (new Date(booking.tripdate) > lastMonth ) {
          // alert(88877)
          a++;
          alert(a)
        //if(bookings.key == "-MP3VcZTGR-J9-fK7Ige")
  //alert(bookings.key)
              // console.log("/////////////////////")
          promises.push(
            tttt.checkRequest(bookings.key, booking).then(function (someValue) {
              if(someValue != undefined && someValue.newUsers && someValue.newUsers.length >0)
                {
                  // if(bookingID == "-MP3VcZTGR-J9-fK7Ige")
                  // {
                  //   alert(777)
                  // }
                   for(let dkey in someValue.newUsers){
                        let driver = someValue.newUsers[dkey];
                        tttt.checkUserForRequest(someValue.bookingID,someValue.booking, driver.userID, driver)
                }
                }
             // return 1;
              // return {
              //   bookingID: bookings.key
              //   // "someValue": someValue
              // }
            })
          )

        // if(a == 1){
       
         // }
        }
      })

      // Wait for all promises to resolve
            Promise.all(promises)
        .then(function (results) {
         
          console.log(results)
          return results
          // this.setState({
          //   snapshots: results
          // });
        })
        .catch(error => {
          console.log(error.message)
        })
     
    })
    
}
  //Go to confirm booking page
  onPressBook () {
    if (
      (this.state.passData.whereText == '' ||
        this.state.passData.wherelatitude == 0 ||
        this.state.passData.wherelongitude == 0) &&
      (this.state.passData.dropText == '' ||
        this.state.passData.droplatitude == 0 ||
        this.state.passData.droplongitude == 0)
    ) {
      alert(languageJSON.pickup_and_drop_location_blank_error)
    } else {
      if (
        this.state.passData.whereText == '' ||
        this.state.passData.wherelatitude == 0 ||
        this.state.passData.wherelongitude == 0
      ) {
        alert(languageJSON.pickup_location_blank_error)
      } else if (
        this.state.passData.dropText == '' ||
        this.state.passData.droplatitude == 0 ||
        this.state.passData.droplongitude == 0
      ) {
        alert(languageJSON.drop_location_blank_error)
      } else if (
        this.state.passData.carType == '' ||
        this.state.passData.carType == undefined
      ) {
        alert(languageJSON.car_type_blank_error)
      } else {
        this.state.passData.latitudeDelta = '0.0922'
        this.state.passData.longitudeDelta = '0.0421'

        this.props.navigation.navigate('FareDetails', {
          data: this.state.passData,
          carType: this.state.passData.carType,
          carimage: this.state.passData.carImage
        })
      }
    }
  }

  selectCarType (value, key) {
    let allCars = this.state.allCars
    for (let i = 0; i < allCars.length; i++) {
      allCars[i].active = false
      if (i == key) {
        allCars[i].active = true
      }
    }
    this.setState(
      {
        allCars: allCars
      },
      () => {
        this.state.passData.carType = value.name
        this.state.passData.carImage = value.image
      }
    )
  }

  getDriverTime (startLoc, destLoc) {
    return new Promise(function (resolve, reject) {
      fetch(
        `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${startLoc}&destinations=${destLoc}&key=${google_map_key}`
      )
        .then(response => response.json())
        .then(res =>
          resolve({
            distance_in_meter: res.rows[0].elements[0].distance.value,
            time_in_secs: res.rows[0].elements[0].duration.value,
            timein_text: res.rows[0].elements[0].duration.text
          })
        )
        .catch(error => {
          reject(error)
        })
    })
  }

 

  sendPushNotification (customerUID, bookingId, msg) {
    const customerRoot = firebase.database().ref('users/' + customerUID)
    customerRoot.once('value', customerData => {
      if (customerData.val()) {
        let allData = customerData.val()

        RequestPushMsg(allData.pushToken ? allData.pushToken : null, msg)
      }
    })
  }

  showNoDriverAlert () {
    // alert(this.state.checkCallLocation)
    this.setState({ loadingModal: false })
    if (this.state.checkCallLocation == 'navigation') {
      Alert.alert(
        languageJSON.no_driver_found_alert_title,
        languageJSON.no_driver_found_alert_messege,
        [
          {
            text: languageJSON.no_driver_found_alert_OK_button,
            onPress: () => this.setState({ loadingModal: false })
          }
          // { text: languageJSON.no_driver_found_alert_TRY_AGAIN_button, onPress: () => { this.setState({nominomi:false}),this._getLocationAsync() }, style: 'cancel', },
        ],
        { cancelable: true }
      )
    }
  }

  onPressCancel () {
    this.setState({
      giftModal: false
    })
  }

  bonusModal () {
    return (
      <Modal
        animationType='fade'
        transparent={true}
        visible={this.state.giftModal}
        onRequestClose={() => {
          this.setState({ giftModal: false })
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(22,22,22,0.8)',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              width: '80%',
              backgroundColor: '#fffcf3',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              maxHeight: 325
            }}
          >
            <View style={{ marginTop: 0, alignItems: 'center' }}>
              <Avatar
                rounded
                size={200}
                source={require('../../assets/images/gift.gif')}
                containerStyle={{
                  width: 200,
                  height: 200,
                  marginTop: 0,
                  alignSelf: 'center',
                  position: 'relative'
                }}
              />
              <Text
                style={{
                  color: '#0cab03',
                  fontSize: 28,
                  textAlign: 'center',
                  position: 'absolute',
                  marginTop: 170
                }}
              >
                {languageJSON.congratulation}
              </Text>
              <View>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    marginTop: 12,
                    textAlign: 'center'
                  }}
                >
                  {languageJSON.refferal_bonus_messege_text} {Currency}
                  {this.bonusAmmount}
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  title={languageJSON.no_driver_found_alert_OK_button}
                  loading={false}
                  titleStyle={styles.buttonTitleText}
                  onPress={() => {
                    this.onPressCancel()
                  }}
                  buttonStyle={styles.cancelButtonStyle}
                  containerStyle={{ marginTop: 20 }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  onPressModal () {
    var curuser = firebase.auth().currentUser.uid
    const userRoot = firebase.database().ref('users/' + curuser)
    userRoot.once('value', userData => {
      if (userData.val()) {
        if (userData.val().refferalId == undefined) {
          let name = userData.val().firstName
            ? userData.val().firstName.toLowerCase()
            : ''
          let uniqueNo = Math.floor(Math.random() * 9000) + 1000
          let refId = name + uniqueNo
          userRoot
            .update({
              refferalId: refId,
              walletBalance: 0
            })
            .then(() => {
              if (userData.val().signupViaReferral == true) {
                firebase
                  .database()
                  .ref('referral/bonus')
                  .once('value', referal => {
                    if (referal.val()) {
                      this.bonusAmmount = referal.val().amount
                      userRoot
                        .update({
                          walletBalance: this.bonusAmmount
                        })
                        .then(() => {
                          this.setState({
                            giftModal: true
                          })
                        })
                    }
                  })
              }
            })
        }
      }
    })
  }

  onNeedHelp () {
    if (this.state.lastRequest.status == 'NEW') {
      alert(
        'You cannot open more than one new request. You can change the status of the last request to a canceled, then you can add a new request'
      )
      return
    }
    
         this.props.navigation.navigate('OpenRequest')
         updateHistory(this.state.curuser,"NewRequest",null )
       
    
 
  }

  onMenuOpen () {
    this.props.navigation.toggleDrawer()
  }

   load = () => {
    }

  render () {
    return (
      <View style={styles.mainViewStyle}>
      <Modal visible={this.state.newUserModal} transparent animationType="slide"
      onBackdropPress={() => {this.setState({ newUserModal: false }); global.newUser = false}}
       onRequestClose={() => {this.setState({ newUserModal: false }); global.newUser = false}}>
         
           <TouchableOpacity style={{ flex:1,width: "100%", height:  "100%"}}
        onPress={() => {this.setState({ newUserModal: false });global.newUser = false}}
      >
   
      <View
      style={{ flexDirection: 'row',flex:1,
        alignItems: "center",
             justifyContent: "space-around", textAlign:"center"}}
      >
        <TouchableOpacity style={{ flexDirection: 'row', flex:0.97,
    height:  "87%",
             justifyContent: "center",
     }}
       
      >
      <View   style={{
                          
              width: "100%",
    height:  "100%",
            }}>
             <TouchableOpacity   onPress={() => {this.setState({ newUserModal: false });global.newUser = false}} style={{
                             position:"absolute",
                           right:25,
                           top:50,
                            height:50,
                             width:50,
                              zIndex:1,
                            // flex:1,
                            // alignItems: "center",
        
            }} >
              <Image
                          
                           style={{
                          
                           
                            height:30,
                             width:30,
                          //  flex:0.5,
                           // textAlign:"center",
                            //flexDirection: 'row',
                          // alignItems: "center",
                           //  margin:0,padding:0,
                           
          //  justifyContent: "center",
            }}
                            source={cross}
                        />
</TouchableOpacity >
                          <Image
                          
                           style={{
                            
                            // flex:1,
                            // alignItems: "center",
                             margin:0,padding:0,
              width: "100%",
    height:  "100%",
    resizeMode: 'contain'
            }}
                            source={beeplinkPopup}
                        />
                        </View>
                          </TouchableOpacity>
                          </View>
                        </TouchableOpacity>
                         {/* </TouchableOpacity > */}
          {/* </View> */}
        </Modal>
        {/* <Header 
            backgroundColor={colors.GREY.default}
            leftComponent={{icon:'md-menu', type:'ionicon', color: colors.BLACK, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.toggleDrawer();} }}
            centerComponent={<Text style={styles.headerTitleStyle}>{languageJSON.map_screen_title}</Text>}
            containerStyle={styles.headerStyle}
            innerContainerStyles={styles.inrContStyle}
        /> */}

        <View style={styles.myViewStyle}>
          <View style={styles.coverViewStyle}>
            <View style={styles.viewStyle1} />
            <View style={styles.viewStyle2} />
            <View style={styles.viewStyle3} />
          </View>
          <View style={styles.iconsViewStyle}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Search', {
                  from: 'where',
                  whereText: this.state.whereText,
                  dropText: this.state.dropText,
                  old: this.state.passData
                })
              }}
              style={styles.contentStyle}
            >
              <View style={styles.textIconStyle}>
                <Text numberOfLines={1} style={styles.textStyle}>
                  {this.state.whereText}
                </Text>
                <Icon
                  name='gps-fixed'
                  color={colors.BLACK}
                  size={23}
                  containerStyle={{ flex: 1 }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Search', {
                  from: 'drop',
                  whereText: this.state.whereText,
                  dropText: this.state.dropText,
                  old: this.state.passData
                })
              }}
              style={styles.searchClickStyle}
            >
              <View style={styles.textIconStyle}>
                <Text numberOfLines={1} style={styles.textStyle}>
                  {this.state.dropText}
                </Text>
                <Icon
                  name='search'
                  type='feather'
                  color={colors.BLACK}
                  size={23}
                  containerStyle={{ flex: 1 }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.mapcontainer}>
          <MapComponent
            markerRef={marker => {
              this.marker = marker
            }}
            mapStyle={styles.map}
            mapRegion={this.state.region}
            nearby={this.state.nearby}
            markerCord={this.state.passData}
          />
          <View style={styles.logo}>
            <Image source={require('../../assets/images/logo9.png')} />
          </View>
          <View style={styles.mesgIcon}>
          
          <NotificationNav screen="map" width="49" height="63"  style={{
                      //borderWidth:1, 
                       // borderColor:"red", 
                      //   width:400, 
                      // position:"relative",
                      // top:15,
                      shadowOpacity: 4.75,
                       elevation: 30,
                        // flex:1,
                       //  alignItems:"center",
                       //  textAlign: 'center'
                          }}
           navigation={this.props.navigation} closeDrawer={() => this.closeDrawer()}/>
          </View>
         {/* <View style={styles.msgIcon}>
          <NotificationNav navigation={this.props.navigation} closeDrawer={() => this.closeDrawer()}/>
          </View> */}
          {this.state.lastRequest && this.state.lastRequest.requestUid && this.state.lastRequest.status != "CANCELLED" ? (
            <View style={styles.currentRequest}>
              <Text
                onPress={() =>
                  this.props.navigation.push('RideDetails', {
                    data: this.state.lastRequest
                  })
                }
                style={{
                  fontSize: 20,
                // textDecorationLine: 'underline',
                  textDecorationStyle: 'solid',
                  textDecorationColor: '#000',
                  textAlignVertical: "center",textAlign: "center"
                }}
              >
                {this.state.lastRequest.title ? (<Text>Request - </Text>): (<Text>My Request</Text>)}  {this.state.lastRequest.title}
              </Text>
                {/* <Text
                onPress={() =>
                  this.props.navigation.push('RideDetails', {
                    data: this.state.lastRequest
                  })
                }
                style={{
                  fontSize: 20,
                  ///textDecorationLine: 'underline',
                  textDecorationStyle: 'solid',
                  textDecorationColor: '#000'
                }}
              >
              
               {this.state.numOfMessages && this.state.numOfMessages > 0?  (<View><Text>Messages({this.state.numOfMessages})</Text></View> ): null}
              </Text> */}
            </View>
          ) : null}
          <View style={styles.headerMap}>
            <TouchableOpacity
              onPress={() => {
                this.onMenuOpen()
              }}
            >
              <Image
                style={styles.openMenuIcon}
                source={require('../../assets/images/hamBlack.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.openRequest}>
            <TouchableOpacity
              onPress={() => {
                this.onNeedHelp()
              }}
            >
              <Text style={styles.openRequestText}>Open Request</Text>
              <Image
                style={styles.openRequestImage}
                source={require('../../assets/images/request.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.compViewStyle}>
          <Text style={styles.pickCabStyle}>
            {languageJSON.cab_selection_title}
          </Text>
          <Text style={styles.sampleTextStyle}>
            {languageJSON.cab_selection_subtitle}
          </Text>
          <ScrollView
            horizontal={true}
            style={styles.adjustViewStyle}
            showsHorizontalScrollIndicator={false}
          >
            {/* <Text>hhhhhh{this.state.allCars.length}</Text> */}
            {this.state.allCars.map((prop, key) => {
              return (
                <TouchableOpacity
                  key={key}
                  style={styles.cabDivStyle}
                  onPress={() => {
                    this.selectCarType(prop, key)
                  }}
                  disabled={prop.minTime == ''}
                >
                  <View
                    style={[
                      styles.imageStyle,
                      {
                        backgroundColor:
                          prop.active == true
                            ? colors.YELLOW.secondary
                            : colors.BLACK
                      }
                    ]}
                  >
                    <Image
                      source={
                        prop.image
                          ? { uri: prop.image }
                          : require('../../assets/images/microBlackCar.png')
                      }
                      style={styles.imageStyle1}
                    />
                  </View>
                  <View style={styles.textViewStyle}>
                    <Text style={styles.text1}>{prop.name.toUpperCase()}</Text>
                    <Text style={styles.text2}>
                      {prop.minTime != '' ? '' : languageJSON.not_available}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </ScrollView>
          <View style={styles.hideField}>
            <Button
              title={languageJSON.book_now_button}
              loading={false}
              loadingProps={{
                size: 'large',
                color: colors.BLUE.default.primary
              }}
              // titleStyle={{color: colors.BLACK, fontFamily: 'Roboto-Bold', fontSize: 18,}}
              onPress={() => {
                this.onPressBook()
              }}
              buttonStyle={{
                width: width,
                backgroundColor: colors.GREY.btnPrimary,
                elevation: 0
              }}
              containerStyle={{
                flex: 1,
                backgroundColor: colors.GREY.btnPrimary
              }}
            />
          </View>
        </View>

        {this.bonusModal()}
        {this.loading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.GREY.default,
    borderBottomWidth: 0
  },
  headerTitleStyle: {
    color: colors.BLACK,
    fontFamily: 'Roboto-Bold',
    fontSize: 18
  },
  mapcontainer: {
    flex: 6,
    width: width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject
  },
  inrContStyle: {
    marginLeft: 10,
    marginRight: 10
  },
  mainViewStyle: {
    flex: 1,
    backgroundColor: colors.BLACK
    //marginTop: StatusBar.currentHeight
  },
  myViewStyle: {
    display: 'none',
    flex: 1.5,
    flexDirection: 'row',
    borderTopWidth: 0,
    alignItems: 'center',
    backgroundColor: colors.GREY.default,
    paddingEnd: 20
  },
  coverViewStyle: {
    flex: 1.5,
    alignItems: 'center'
  },
  viewStyle1: {
    height: 12,
    width: 12,
    borderRadius: 15 / 2,
    backgroundColor: colors.YELLOW.light
  },
  viewStyle2: {
    height: height / 25,
    width: 1,
    backgroundColor: colors.YELLOW.light
  },
  viewStyle3: {
    height: 14,
    width: 14,
    backgroundColor: colors.GREY.iconPrimary
  },
  iconsViewStyle: {
    flex: 9.5,
    justifyContent: 'space-between'
  },
  contentStyle: {
    flex: 1,
    justifyContent: 'center',
    borderBottomColor: colors.BLACK,
    borderBottomWidth: 1
  },
  textIconStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  textStyle: {
    flex: 9,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: colors.BLACK
  },
  searchClickStyle: {
    flex: 1,
    justifyContent: 'center'
  },
  compViewStyle: {
    flex: 0.5,
    alignItems: 'center',
    display: 'none'
  },
  pickCabStyle: {
    display: 'none',
    flex: 0.3,
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    fontWeight: '500',
    color: colors.BLACK
  },
  sampleTextStyle: {
    display: 'none',
    flex: 0.2,
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    fontWeight: '300',
    color: colors.GREY.secondary
  },
  adjustViewStyle: {
    display: 'none',
    flex: 9,
    flexDirection: 'row',
    //justifyContent: 'space-around',
    marginTop: 8
  },
  cabDivStyle: {
    flex: 1,
    width: width / 3,
    alignItems: 'center'
  },
  imageViewStyle: {
    flex: 2.7,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  imageStyle: {
    height: height / 14,
    width: height / 14,
    borderRadius: height / 14 / 2,
    borderWidth: 3,
    borderColor: colors.YELLOW.secondary,
    //backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textViewStyle: {
    flex: 1,
    alignItems: 'center'
  },
  text1: {
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    fontWeight: '900',
    color: colors.WHITE
  },
  text2: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    fontWeight: '900',
    color: colors.GREY.secondary
  },
  imagePosition: {
    height: height / 14,
    width: height / 14,
    borderRadius: height / 14 / 2,
    borderWidth: 3,
    borderColor: colors.YELLOW.secondary,
    //backgroundColor: colors.YELLOW.secondary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyleView: {
    height: height / 14,
    width: height / 14,
    borderRadius: height / 14 / 2,
    borderWidth: 3,
    borderColor: colors.YELLOW.secondary,
    //backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle1: {
    height: height / 20.5,
    width: height / 20.5
  },
  imageStyle2: {
    height: height / 20.5,
    width: height / 20.5
  },
  buttonContainer: {
    flex: 1
  },

  buttonTitleText: {
    color: colors.GREY.default,
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    alignSelf: 'flex-end'
  },

  cancelButtonStyle: {
    backgroundColor: '#edede8',
    elevation: 0,
    width: '60%',
    borderRadius: 5,
    alignSelf: 'center'
  },
  headerMap: {
    position: 'absolute',
    top: 50,
    left: 15,
    height: 45,
    display: 'flex'
  },
  openRequest: {
    position: 'absolute',
    bottom: 47,
    width: 200,
    height: 45,
    
    backgroundColor: '#fff',
    //background: #fff url(../img/Iconhelp.png) 9px 9px no-repeat;
    borderRadius: 25,
    textAlign: 'center',
    alignSelf: 'center',
    // fontWeight: 600,
    //border: 'none',
    marginTop: 0,
    elevation: 10,
    shadowOpacity: 0.75,
    shadowRadius: 10,
    shadowColor: colors.GREY.Deep_Nobel,
    shadowOffset: { height: 1, width: 0 }
  },

  openRequestText: {
    lineHeight: 40,
    textAlignVertical: 'center',
    //background: #fff url(../img/Iconhelp.png) 9px 9px no-repeat;

    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20
    //border: 'none',
  },
  openRequestImageWrapper: {},
  openRequestImage: {
    position: 'absolute',
    textAlignVertical: 'center',
    //background: #fff url(../img/Iconhelp.png) 9px 9px no-repeat;
    alignSelf: 'flex-end',
    textAlign: 'center',
    top: 10,
    left: 10
  },
  hideField: {
    display: 'none'
  },
  openMenuIcon: {
    height: 34,
    width: 34,
  },
  logo: {
    width: '50%',
    justifyContent: 'flex-start',
    marginTop: 10,
    alignItems: 'center',
    position: 'absolute',
    top: 43
  },
   mesgIcon: {
     shadowOpacity: 0.75,
     backgroundColor:"white",
      elevation: 30,
    //width: '100%',
    flex:1,
    flexDirection:"row",
    //marginTop: 10,
   
     textAlign: 'right',
     
     flexDirection:"row",
    alignItems: 'center',
    position: 'absolute',
    top: 135,
    right:5,
    
    shadowOpacity: 0.75,
    shadowRadius: 10,
    shadowColor: colors.GREY.Deep_Nobel,
    shadowOffset: { height: 1, width: 0 },
    width:60,
    height:60,
    borderRadius:33
  },
  currentRequest: {
    width: '50%',
    backgroundColor:'white',
    borderRadius:10,
    //borderWidth:2,
    //borderColor: "#d6dcde",
   // justifyContent: 'flex-start',
    marginTop: 10,
    alignItems: 'center',
    elevation: 10,
    position: 'absolute',
    top: 110,
    fontSize: 30,
    fontWeight: '700',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight:7,
    paddingLeft:7,
    shadowOpacity: 0.75,
    shadowRadius: 10,
    shadowColor: colors.GREY.Deep_Nobel,
    shadowOffset: { height: 1, width: 0 }
  },
   msgIcon: {
    width: '20%',
    borderRadius:10,
    //borderWidth:2,
    //borderColor: "#d6dcde",
    justifyContent: 'flex-start',
    marginTop: 10,
    right:0,
    //alignItems: 'right',
    elevation: 10,
    position: 'absolute',
    top: 190,
    fontSize: 30,
    fontWeight: '700',
    paddingTop: 5,
    paddingBottom: 5,
    shadowOpacity: 0.75,
    shadowRadius: 10,
    shadowColor: colors.GREY.Deep_Nobel,
    shadowOffset: { height: 1, width: 0 }
  }
})
