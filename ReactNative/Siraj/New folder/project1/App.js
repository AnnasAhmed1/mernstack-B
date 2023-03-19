import 'react-native-reanimated'
import 'react-native-gesture-handler'
import React, { useEffect, useRef, useState } from 'react'
import AppLoading from 'expo-app-loading'
import { Asset } from 'expo-asset'
import * as Font from 'expo-font'
import AppContainer from './src/navigation/AppNavigator'
import { ThemeProvider } from 'react-native-elements'
import { theme } from './src/common/theme'
import VersionCheck from 'react-native-version-check'
import { checkVersion } from 'react-native-check-version'
import * as firebase from 'firebase'
var semverDiff = require('semver-diff')
import { Audio } from 'expo-av'
import NotificationNav from './src/providingParty/components/NotificationNav'
import * as Notifications from 'expo-notifications'
import { NativeBaseProvider } from 'native-base';

//require('react-native').unstable_enableLogBox();

import {
  I18nManager,
  Alert,
  BackHandler,
  AppStateIOS,
  Linking,
  Platform,
  AppState,
  Text,
  AsyncStorage,
  View
} from 'react-native'

import app from './app.json'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false
  })
})

// var firebaseConfig = {
//  apiKey: "AIzaSyDl7cRphmSYC1I0NS9Xn8625W0qyMBL4OE",
//     authDomain: "beeplink-test.firebaseapp.com",
//     databaseURL: "https://beeplink-test.firebaseio.com",
//     projectId: "beeplink-test",
//     storageBucket: "beeplink-test.appspot.com",
//     messagingSenderId: "530423287614",
//     appId: "1:530423287614:web:b3e477c56271b63a09666f",
//     measurementId: "G-50WQG5YFS5"
//     };

var firebaseConfig = {
  apiKey: 'AIzaSyALUMteZ5t1FZutXyaQ9Q8St4WHW8GWZJ8',
  authDomain: 'beep-452f3.firebaseapp.com',
  databaseURL: 'https://beep-452f3.firebaseio.com',
  projectId: 'beep-452f3',
  storageBucket: 'beep-452f3.appspot.com',
  messagingSenderId: '1089171421226',
  appId: '1:1089171421226:web:bdf7262c1a60550c5ceb53',
  measurementId: 'G-J4TRJ9MKCB'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)

export default class App extends React.Component {
  //userActivityTimeout:null
  state = {
    assetsLoaded: false,
    appState: AppState.currentState
  }

  constructor() {
    super()
    I18nManager.allowRTL(false)
    console.disableYellowBox = true

    const self = this
    firebase.auth().onAuthStateChanged(function (user) {
      global.curUser = user.uid
      self._handleAppStateChange('active')
    })
  }

  //   resetUserActivityTimeout() {
  //   clearTimeout(userActivityTimeout);
  //   userActivityTimeout = setTimeout(() => {
  //     inactiveUserAction();
  //   }, INACTIVE_USER_TIME_THRESHOLD);
  // }

  _handleAppStateChange = nextAppState => {
    const connected = nextAppState === 'active' ? true : false

    firebase
      .database()
      .ref('users/' + global.curUser)
      .update({
        connected: connected
      })
      .then(res => {
        return true
      })
      .catch(error => {
        console.log(error)
        return false
      })

    //  if (
    //     this.state.appState.match(/inactive|background/) &&
    //     nextAppState === "active"
    //   ) {
    //     console.log("App has come to the foreground!");
    //   }
    //   this.setState({ appState: nextAppState });
  }

  async componentWillMount() {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  async componentDidMount() {
    const soundObject = new Audio.Sound()
    const music = await soundObject.loadAsync(
      require('./assets/sounds/car_horn.wav')
    )
    AppState.addEventListener('change', this._handleAppStateChange)
    AppStateIOS.addEventListener('change', state =>
      console.log('AppStateIOS changed to', state)
    )

    AppState.addEventListener('change', state => alert('dsd'))

    this.getUserDetails()
    ///////from functions

    ////////
    //console.log(music);
    //  alert(88)
    // this._handleNotification()
    let updateNeeded = VersionCheck.needUpdate()
    global.curUser = firebase.auth().currentUser.uid
    //alert( global.curUser)

    //async
    // const {currentUser} = await firebase.auth()
    // let userUid = currentUser.uid
    //alert(userUid)
    //sync
    // let userUid;
    // firebase.auth().then( currentUser => {
    //    userUid = currentUser.uid
    // })
    // .catch(error => console.log(error) )
    // Platform.OS == 'ios'?'IOS':'ANDROID'

    this.checkPermission()

    // Register all listener for notification
    //this.createNotificationListeners();

    const about = firebase.database().ref('About_Us/')
    about.on('value', aboutData => {
      if (aboutData.val()) {
        let data = aboutData.val()

        if (data.ImportantVersionUpdate)
          if (
            (Platform.OS == 'ios' &&
              semverDiff(data.iosV, app.expo.version) != undefined) ||
            (Platform.OS == 'android' &&
              semverDiff(data.androidV, app.expo.version) != undefined)
          ) {
            Alert.alert(
              'Please Update',
              'You will have to update the app to the latest version to continue using.',
              [
                {
                  text: 'Update',
                  onPress: () => {
                    BackHandler.exitApp()
                    Linking.openURL(
                      'https://play.google.com/store/apps/details?id=com.beeplink.beep'
                    )
                  },
                  style: 'cancel'
                }
              ],
              { cancelable: false }
            )
          }
      }
    })

    //Alert the user and direct to the app url
  }

  async getUserDetails() { }

  async checkPermission() {
    const enabled = await firebase.messaging().hasPermission()
    // If Premission granted proceed towards token fetch
    if (enabled) {
      this.getToken()
    } else {
      // If permission hasn’t been granted to our app, request user in requestPermission method.
      this.requestPermission()
    }
  }

  async getToken() {
    let fcmToken = await AsyncStorage.getItem('fcmToken')
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken()
      if (fcmToken) {
        // user has a device token
        await AsyncStorage.setItem('fcmToken', fcmToken)
      }
    }
  }

  async requestPermission() {
    try {
      await firebase.messaging().requestPermission()
      // User has authorised
      this.getToken()
    } catch (error) {
      // User has rejected permissions
      console.log('permission rejected')
    }
  }

  async noteSave(note) {
    let date1 = new Date()
    firebase
      .database()
      .ref('notes_test' + '/')
      .push(note)
      .then()
      .catch(function (error) {
        console.log('Data could not be saved.' + error)
      })
  }

  async createNotificationListeners() {
    // This listener triggered when notification has been received in foreground
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body, channelId } = notification
        this.noteSave(notification)

        this.displayNotification(title, body, channelId)
      })

    // This listener triggered when app is in backgound and we click, tapped and opened notifiaction
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body, channelId } = notificationOpen.notification
        this.noteSave(notificationOpen.notification)

        this.displayNotification(title, body, channelId)
      })

    // This listener triggered when app is closed and we click,tapped and opened notification
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification()
    if (notificationOpen) {
      const { title, body, channelId } = notificationOpen.notification
      this.noteSave(notificationOpen.notification)

      this.displayNotification(title, body, channelId)
    }
  }

  displayNotification(title, body, channelId) {
    // we display notification in alert box with title and body
    // alert(7777)
    Alert.alert(
      title,
      body,
      [{ text: 'Ok', onPress: () => console.log('ok pressed') }],
      { cancelable: false }
    )
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/background.png'),
        require('./assets/images/Logo.png')
      ]),
      Font.loadAsync({
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
        'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
        'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
        'OpenSans-Semibold': require('./assets/fonts/OpenSans-Semibold.ttf'),
        'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf')
      })
    ])
  }

  render() {
    return this.state.assetsLoaded ? (
      <NativeBaseProvider>
        <ThemeProvider theme={theme}>
          {/* <Text>Current state is: {this.state.appState}</Text>   */}

          <AppContainer style={{ zIndex: 1 }}>
            <View style={{ zIndex: 0, position: 'absolute' }}>
              <Text
                style={{ borderColor: 'black', zIndex: 1, position: 'absolute' }}
              >
                Hijhjkhjkhkhhkhjkh
              </Text>
              <NotificationNav
                navigation={this.props.navigation}
                closeDrawer={() => this.closeDrawer()}
              />
            </View>
          </AppContainer>
        </ThemeProvider>
      </NativeBaseProvider>
    ) : (
      <AppLoading
        startAsync={this._loadResourcesAsync}
        onFinish={() => this.setState({ assetsLoaded: true })}
        onError={console.warn}
        autoHideSplash={true}
      />
    )
  }
}
