import React from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  AsyncStorage,
  FlatList,
  Modal,
  TouchableHighlight,
  StatusBar,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Alert
} from "react-native";
import { Button, Header } from "react-native-elements";
import Polyline from "@mapbox/polyline";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { colors } from "../common/theme";
import * as Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
var { width, height } = Dimensions.get("window");
import { GeoFire } from "geofire";
import * as firebase from "firebase";
var { height } = Dimensions.get("window");
import { Currency } from "../common/CurrencySymbol";
var google;
import { RequestPushMsg } from "../common/RequestPushMsg";
import { google_map_key } from "../common/key";
import languageJSON from "../common/language";
import Background from "../components/Background";
import SideMenuHeader from "../components/SideMenuHeader";
import {getDistance} from "../../common/LocationFunc"
import NotificationNav from '../components/NotificationNav'
import Categories from '../../components/Categories'

export default class DriverTripAccept extends React.Component {
  setModalVisible(visible, data) {
    this.setState({
      modalVisible: visible,
      modalData: data,
    });
  }

  constructor(props) {
    super(props);
    // alert(7)
    this.state = {
      region: {
        latitude: 31.7935349,
        longitude: 35.1705512,
        latitudeDelta: 0.9922,
        longitudeDelta: 0.9421,
      },
      starCount: 5,
      modalVisible: false,
      alertModalVisible: false,
      coords: [],
      radio_props: [
        { label: languageJSON.cancel_reson_1, value: 0 },
        { label: languageJSON.cancel_reson_2, value: 1 },
        { label: languageJSON.cancel_reson_3, value: 2 },
        { label: languageJSON.cancel_reson_4, value: 3 },
        { label: languageJSON.cancel_reson_5, value: 4 },
      ],
      value: 0,
      tasklist: [],
      myLocation: {},
      driverDetails: null,
      curUid: "",
      id: 0,
      imagesModal: false,
      selectedImages: [],
    };
    this._getLocationAsync();
  }

  //checking booking status
  checking() {
    if (this.state.currentBId) {
      let curUid = firebase.auth().currentUser.uid;
      let bookingId = this.state.currentBId;
      const userData = firebase
        .database()
        .ref("users/" + curUid + "/my_bookings/" + bookingId + "/");
      userData.on("value", (bookingDetails) => {
        if (bookingDetails.val()) {
          let curstatus = bookingDetails.val().status;
          this.setState({ status: curstatus });
        }
      });
    }
  }

  componentDidMount() {
     let date1 = new Date();
    firebase.database().ref('screen_clicks_history'+ '/' +firebase.auth().currentUser.uid ).push({
              screen:"NewRequestAccept",
              clickedDate:date1.toLocaleString(),
            }).then().catch(function(error) {
     console.log("Data could not be saved." + error);
     });
    this.getRiders();
  }

  // find your origin and destination point coordinates and pass it to our method.
  async getDirections(startLoc, destinationLoc) {
    try {
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${google_map_key}`
      );
      let respJson = await resp.json();
      let points = Polyline.decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point[0],
          longitude: point[1],
        };
      });
      await this.setState({ coords: coords });
      return coords;
    } catch (error) {
      alert(error);
      return error;
    }
  }

  //get current location
  _getLocationAsync = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            console.log('Permission to access location was denied');
        }
        let uid = firebase.auth().currentUser.uid;
        let location = await Location.getCurrentPositionAsync({});
        if (location) {
            var latlng = location.coords.latitude + ',' + location.coords.longitude;
            return fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latlng + '&key=' + google_map_key)
                .then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson.results[0] && responseJson.results[0].formatted_address) {
                        let address  = responseJson.results[0].formatted_address;
                        firebase.database().ref('users/' + uid + '/location').update({
                            add: address,
                            lat: location.coords.latitude,
                            lng: location.coords.longitude
                        })
                    } else {
                        alert(languageJSON.api_error)
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

  //get nearby riders function
  getRiders() {
     var lastMonth = new Date()
    lastMonth.setMonth(lastMonth.getMonth() - 1)
    var curuid = firebase.auth().currentUser.uid;
    this.setState({ curUid: firebase.auth().currentUser.uid });
    let ref = firebase.database().ref("users/" + curuid + "/");
    ref.on("value", (snapshot) => {
      // console.log("current user data is",snapshot.val());
      this.setState({ driverDetails: snapshot.val() });
      var jobs = [];
      let waiting_riderData = snapshot.val().waiting_riders_list;
      for (let key in waiting_riderData) {
        if (waiting_riderData[key].status == "NEW"  || (waiting_riderData[key].status != "NEW" &&  waiting_riderData[key].hasMessages )) {
          waiting_riderData[key].bookingId = key;
          jobs.push(waiting_riderData[key]);
        }
        if(new Date(waiting_riderData[key].tripdate)> lastMonth)
        {
          let distance = getDistance(snapshot.val().location.lat, snapshot.val().location.lng,waiting_riderData[key].pickup.lat, waiting_riderData[key].pickup.lng )
          waiting_riderData[key].distance = (Math.round(distance * 10) / 10) + " km"
        }
        else{
          waiting_riderData[key].distance = "";
        }
           
      }
      this.setState({ tasklist: jobs.reverse() });
      this.jobs = jobs;
      // console.log(this.jobs);
    });
  }

  //get booking details function
  getBookingDetails() {
    let ref = firebase.database().ref("bookings/" + item.bookingId + "/");
    ref.on("value", (snapshot) => {
      this.setState({
        bookingDetails: snapshot.val(),
      });
    });
  }

  pressAccept(item) {
    
    var data = {
      carType: item.carType,
      customer: item.customer,
      customer_name: item.customer_name,
      customer_profile_image: item.customer_profile_image
        ? item.customer_profile_image
        : "",
      otp: item.otp,
      distance: item.estimateDistance,
      driver: this.state.curUid,
      driver_image: this.state.driverDetails.profile_image
        ? this.state.driverDetails.profile_image
        : "",
      driver_name:
        this.state.driverDetails.firstName +
        " " +
        this.state.driverDetails.lastName,
      driver_contact: this.state.driverDetails.mobile,
      vehicle_number: 1111,
      // vehicleModelName: this.state.driverDetails.vehicleModel,
      driverRating: this.state.driverDetails.ratings
        ? this.state.driverDetails.ratings.userrating
        : "0",
      drop: item.drop,
      pickup: item.pickup,
      estimate: item.estimate,
      estimateDistance: item.estimateDistance,
      serviceType: item.serviceType,
      status: "ACCEPTED",
      total_trip_time: item.total_trip_time,
      trip_cost: item.trip_cost,
      trip_end_time: item.trip_end_time,
      trip_start_time: item.trip_start_time,
      tripdate: item.tripdate,
      title: item.title,
    };

    let dbRef = firebase
      .database()
      .ref(
        "users/" + this.state.curUid + "/my_bookings/" + item.bookingId + "/"
      );
    dbRef.update(data).then(() => {
      firebase
        .database()
        .ref(
          "bookings/" +
            item.bookingId +
            "/requestedDriver/" +
            item.customer +
            "/"
        )
        .update({
          status: "ACCEPTED",
        });
    });
  }

    chat(item){
       // console.log("chat here");
        // console.log(this.state.tripInfo);
      //alert  (item.bookingId)
     
      item.nameOftheOtherPerson = item.customer_name;
      item.mainKey = item.customer + ',' + firebase.auth().currentUser.uid
        this.props.navigation.navigate("Chat",{passData:item});
    }


onPressAcceptMsg(item) {
 Alert.alert(        "Are you sure you want to approve your request?",
                    `Approving the request means receiving service and paying for the request.
                    \n You can correspond and find out more details first free at “Message” button
                    \n Are you sure you want to approve your request?
                    `,
                    
                    [
                        { text: "yes", onPress: () => this.onPressAccept(item) },
                        {text: "no"}
                    ],
                    { cancelable: true },
                );
}
  // accept button press function
  onPressAccept(item) {
    alert(
      "The request is sent back to "+item.customer_name+" for approval. You can view the status of the request in 'Approved Requests' link on the menu"
    );

    //nomi fix distance: item.distance,
    var data = {
      carType: item.carType,
      customer: item.customer,
      customer_name: item.customer_name,
      customer_profile_image: item.customer_profile_image
        ? item.customer_profile_image
        : "",
      otp: item.otp,
      distance: item.estimateDistance,
      driver: this.state.curUid,
      driver_image: this.state.driverDetails.profile_image
        ? this.state.driverDetails.profile_image
        : "",
      driver_name:
        this.state.driverDetails.firstName +
        " " +
        this.state.driverDetails.lastName,
      driver_contact: this.state.driverDetails.mobile,
      vehicle_number: 1111,
      // vehicleModelName: this.state.driverDetails.vehicleModel,
      driverRating: this.state.driverDetails.ratings
        ? this.state.driverDetails.ratings.userrating
        : "0",
      drop: item.drop,
      pickup: item.pickup,
      estimate: item.estimate,
      estimateDistance: item.estimateDistance,
      serviceType: item.serviceType,
      status: "WAITING FOR CUSTOMER APPROVAL...",
      total_trip_time: item.total_trip_time,
      trip_cost: item.trip_cost,
      trip_end_time: item.trip_end_time,
      trip_start_time: item.trip_start_time,
      tripdate: item.tripdate,
      title: item.title,
    };

    var riderData = {
      carType: item.carType,
      distance: item.estimateDistance,
      driver: this.state.curUid,
      driver_image: this.state.driverDetails.profile_image
        ? this.state.driverDetails.profile_image
        : "",
      driver_name:
        this.state.driverDetails.firstName +
        " " +
        this.state.driverDetails.lastName,
      driver_contact: this.state.driverDetails.mobile,
      vehicle_number: 1111,
      // vehicleModelName: this.state.driverDetails.vehicleModel,
      driverRating: this.state.driverDetails.ratings
        ? this.state.driverDetails.ratings.userrating
        : "0",
      drop: item.drop,
      otp: item.otp,
      pickup: item.pickup,
      estimate: item.estimate,
      estimateDistance: item.estimateDistance,
      serviceType: item.serviceType,
      status: "ACCEPTED",
      total_trip_time: item.total_trip_time,
      trip_cost: item.trip_cost,
      trip_end_time: item.trip_end_time,
      trip_start_time: item.trip_start_time,
      tripdate: item.tripdate,
    };

    let dbRef = firebase
      .database()
      .ref(
        "users/" + this.state.curUid + "/my_bookings/" + item.bookingId + "/"
      );
    dbRef
      .update(data)
      .then(() => {
        firebase
          .database()
          .ref("bookings/" + item.bookingId + "/")
          .update(data)
          .then(() => {
            firebase
              .database()
              .ref(
                "bookings/" +
                  item.bookingId +
                  "/requestedDriver/" +
                  this.state.curUid +
                  "/"
              )
              .update({
                status: "ACCEPTED",
                driver: this.state.curUid,
                driver_image: this.state.driverDetails.profile_image
                  ? this.state.driverDetails.profile_image
                  : "",
                driver_name:
                  this.state.driverDetails.firstName +
                  " " +
                  this.state.driverDetails.lastName,
                driver_contact: this.state.driverDetails.mobile,
                driverRating: this.state.driverDetails.ratings
                  ? this.state.driverDetails.ratings.userrating
                  : "0",
              });
            //firebase.database().ref('users').child(this.state.curUid).child('my_booking').child(item.bookingId).child('offersNum').set(firebase.database.ServerValue.increment(1))

            firebase
              .database()
              .ref(
                "users/" +
                  this.state.curUid +
                  "/waiting_riders_list/" +
                  item.bookingId +
                  "/"
              )
              .remove();

            //firebase.database().ref('bookings/' + item.bookingId).once('value',(snap) => {
            //    let requestedDriverArr = snap.val().requestedDriver;

            //   if(requestedDriverArr) {

            //      for(let i=0; i<requestedDriverArr.length; i++) {
            //         firebase.database().ref('users/' + requestedDriverArr[i] + '/waiting_riders_list/' + item.bookingId + '/').remove();
            //      }
            //     this.props.navigation.navigate('DriverTripStart', {allDetails: item})
            //  }
            // console.log(snap.val().requestedDriver)
            // })
          });
        this.setState({ currentBId: item.bookingId }, () => {
          this.checking();
          this.sendPushNotification(
            item.customer,
            item.bookingId,
            riderData.driver_name + languageJSON.accept_booking_request
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });

    // let userDbRef = firebase.database().ref('users/' + item.customer + '/my-booking/' + item.bookingId + '/');userDbRef.update(riderData);
    //  let currentUserdbRef = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/');
    // currentUserdbRef.update({
    //     queue: true
    //  })
  }

  //ignore button press function
  onPressIgnore(item) {
    console.log(item.bookingId);
    firebase
      .database()
      .ref("bookings/" + item.bookingId + "/")
      .once("value", (data) => {
        if (data.val()) {
          let mainBookingData = data.val();
          console.log(mainBookingData);
          if (mainBookingData.requestedDriver) {
            firebase
              .database()
              .ref(
                "bookings/" +
                  item.bookingId +
                  "/requestedDriver/" +
                  this.state.curUid +
                  "/"
              )
              .update({
                status: "CANCELLED",
              });

            firebase
              .database()
              .ref(
                "users/" +
                  item.customer +
                  "/waiting_riders_list/" +
                  this.state.curUid +
                  "/"
              )
              .update({
                status: "CANCELLED",
              });

            // if(mainBookingData.requestedDriver.length == 1) {
            //     firebase.database().ref('bookings/' + item.bookingId + '/').update({
            //         status: "CANCELLED",
            //         requestedDriver: []
            //     })
            //     .then(()=>{
            //         let userDbRef = firebase.database().ref('users/' + item.customer + '/my-booking/' + item.bookingId + '/');
            //         userDbRef.update({
            //             status: "CANCELLED",
            //         });
            //         this.sendPushNotification(item.customer,item.bookingId,languageJSON.booking_request_rejected)
            //     })
            // }
            // else {
            //     let arr = mainBookingData.requestedDriver.filter((item)=>{
            //         return item != this.state.curUid
            //     })
            //     firebase.database().ref('bookings/' + item.bookingId + '/').update({
            //         requestedDriver: arr
            //     })
            // }
          }
        }
      });

    firebase
      .database()
      .ref(
        "users/" +
          this.state.curUid +
          "/waiting_riders_list/" +
          item.bookingId +
          "/"
      )
      .remove()
      .then(() => {
        this.setModalVisible(false, null);
      });
  }

  sendPushNotification(customerUID, bookingId, msg) {
    const customerRoot = firebase.database().ref("users/" + customerUID);
    customerRoot.once("value", (customerData) => {
      if (customerData.val()) {
        let allData = customerData.val();
        RequestPushMsg(allData.pushToken ? allData.pushToken : null, msg);
      }
    });
  }

  render() {
    return (
      <Background style={styles.mainViewStyle}>
        <Header
          backgroundColor={colors.GREY.default}
          rightComponent = { <NotificationNav  navigation={this.props.navigation} closeDrawer={() => this.closeDrawer()}/>}
          leftComponent={{
            icon: "md-menu",
            type: "ionicon",
            color: colors.BLACK,
            size: 30,
            component: TouchableWithoutFeedback,
            onPress: () => {
              this.props.navigation.toggleDrawer();
            },
          }}
          centerComponent={
            <Text style={styles.headerTitleStyle}>
              {languageJSON.task_list +"(" + this.state.tasklist.length + ")"}
            </Text>
          }
          containerStyle={styles.headerStyle}
          innerContainerStyles={styles.headerInnerStyle}
        />
        <FlatList
          data={this.state.tasklist}
           style={{
                backgroundColor: "white"
              }}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                // marginLeft:20,
                alignItems: "center",
                height: height,
              }}
            >
            <View style={{position:"relative", top:-90}}>
              <Text style={styles.addressViewTextStyleNoRider}>
                {languageJSON.rider_not_here}
              </Text>
              </View>
            </View>
          }
          //////////////////////////
          renderItem={({ item, index }) => {
            return (
              <View style={styles.listItemView}>
               

                <View style={styles.mapDetails}>
                  <View>
                    <SideMenuHeader
                      showImagesModal={() =>
                        this.setState({
                          imagesModal: true,
                          selectedImages: item.images,
                        })
                      }
                      showDistance= {true}
                      item={item}
                      headerStyle={styles.myHeader}
                      fName={item.customer_name}
                      lName={""}
                      userPhoto={item.customer_profile_image}
                      userEmail={this.state.email}
                      userName={this.state.customer_name}
                    ></SideMenuHeader>
                  </View>

                  <View style={styles.dateView}>
                    <Text style={styles.listDate}>
                      {new Date(item.tripdate).toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.billOptions}>
                    <View style={styles.billItem}>
                      <Text style={styles.billAmount}>
                        {Currency}{" "}
                        {item.estimate > 0
                          ? parseFloat(item.estimate).toFixed(2)
                          : 0}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.addressViewStyle}>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <View>
                        <Image
                          style={styles.iconContainer}
                          source={require("../../../assets/images/pin.png")}
                        />
                      </View>
                      <Text style={styles.addressViewTextStyle}>
                        {item.pickup.add}
                      </Text>
                    </View>

                    {/* <View style={styles.fixAdressStyle}>
                                            <View style={styles.redDot}></View>
                                            <Text style={styles.addressViewTextStyle}>{item.drop.add}</Text>
                                        </View> */}

                    <View style={styles.fixAdressStyle}>
                      <Text style={styles.addressViewTextStyle}>
                        {item.title}
                      </Text>
                    </View>
                    <View style={styles.description}>
                      <Text style={styles.addressViewTextStyle}>
                        {item.description}
                      </Text>
                    </View>
                    <View>
                    {item.categoriesStr?(
                <Categories hideIcon={true} category={ item.categoriesStr.split(',').filter(i => i)} />
                ):null}
                 </View>
                  </View>

                  <View style={styles.detailsBtnView}>
                    <View style={{ flex: 1 }}>
                      <Button
                        onPress={() => {
                          this.setModalVisible(true, item);
                        }}
                        title={languageJSON.ignore_text}
                        titleStyle={{ width: "100%",
    alignSelf: "center", color: "#ED5E68"}}
                        buttonStyle={{
                            backgroundColor: "#fff",
                            width: height / 7,
                            padding: 2,
                            borderColor: "#ED5E68",
                            borderWidth: 1,
                           borderRadius: 10,
                        }}
                        containerStyle={{
                          flex: 1,
                          alignSelf: "flex-end",
                          paddingLeft: 5,
                           marginRight:item.estimate && parseFloat(item.estimate)>0 ? 0:10
                        }}
                      />
                    </View>
                    {item.estimate && parseFloat(item.estimate)>0 ? (
                    <View style={styles.viewFlex1}>
                    
                      <Button
                        title={languageJSON.accept}
                        titleStyle={{ width: "100%",
    alignSelf: "center", color:colors.GREEN2}}
                        onPress={() => {
                          this.onPressAcceptMsg(item);
                        }}
                        buttonStyle={{
                          backgroundColor: "#fff",
                          width: height / 7,
                          padding: 2,
                          borderColor: colors.GREEN2,
                          borderWidth: 1,
                          borderRadius: 10,
                        }}
                        containerStyle={{
                          flex: 1,
                            alignItems: 'center',
                          paddingLeft: 5,
                        }}
                      />
                     
                    </View> ) : null}
                     <View style={styles.viewFlex1}>
                      <Button
                        title={"Message"+ (item.newMessages? "(" + item.newMessages + ")" : "")}
                        titleStyle={{ width: "100%",
    alignSelf: "center", color:"#3493a8"}}
                        onPress={() => {
                          this.chat(item);
                        }}
                        buttonStyle={{
                          width:  height / 7   ,
                          padding: 2,
                          borderColor: "#3493a8",
                          borderWidth: 1,
                          borderRadius: 10,
                          elevation: 0,
                          color:"black", 
                          backgroundColor: "#fff"
                        }}
                        containerStyle={{
                          flex: 1,
                        alignSelf: "flex-start",
                          paddingLeft: 5,
                          marginLeft:item.estimate && parseFloat(item.estimate)>0 ? 0:10
                        }}
                      />
                    </View>
                    
                  </View>
                   {/* {item.estimate && parseFloat(item.estimate)>0 ? (
                    <View style={styles.contactUser}>
                    <Text style={{ color:"red"}}>*Please contact {item.customer_name} before accepting the request</Text>
                    </View>): null} */}
                </View>
              </View>
            );
          }}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.imagesModal}
          onRequestClose={() => {
            this.setState({
              imagesModal: false,
            });
          }}
        >
          <View style={styles.modalMain}>
            <View
              style={{
                width: "90%",
                backgroundColor: colors.WHITE,
                borderRadius: 10,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: 10,
              }}
            >
              <ScrollView
                horizontal
                style={{
                  width: "100%",
                }}
              >
                {this.state.selectedImages?.map((item, i) => (
                  <View>
                    <Image
                      source={{ uri: item }}
                      key={i}
                      style={{
                        width: 250,
                        height: 250,
                        marginLeft: 10,
                        marginRight: i == 2 ? 60 : 0,
                      }}
                    />
                  </View>
                ))}
              </ScrollView>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  borderTopColor: colors.GREY.iconPrimary,
                  borderTopWidth: 1,
                  width: "100%",
                  height: 40,
                }}
              >
                <TouchableHighlight
                  style={[styles.btnStyle, styles.clickText]}
                  onPress={() => {
                    this.setState({ imagesModal: false, selectedImages: [] });
                  }}
                >
                  <Text style={styles.cancelTextStyle}>
                    {languageJSON.cancel}
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>

        <View style={styles.modalPage}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              Alert.alert(languageJSON.modal_close);
            }}
          >
            <View style={styles.modalMain}>
              <View style={styles.modalContainer}>
                <View style={styles.modalHeading}>
                  <Text style={styles.alertStyle}>
                    {languageJSON.alert_text}
                  </Text>
                </View>
                <View style={styles.modalBody}>
                  <Text style={{ fontSize: 16 }}>
                    {languageJSON.ignore_job_title}
                  </Text>
                </View>
                <View style={styles.modalFooter}>
                  <TouchableHighlight
                    style={[styles.btnStyle, styles.clickText]}
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible, null);
                    }}
                  >
                    <Text style={styles.cancelTextStyle}>
                      {languageJSON.cancel}
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    style={styles.btnStyle}
                    onPress={() => {
                      this.onPressIgnore(this.state.modalData);
                    }}
                  >
                    <Text style={styles.okStyle}>{languageJSON.ok}</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </Background>
    );
  }
}

//Screen Styling
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.TRANSPARENT,
    borderBottomWidth: 0,
  },
  headerInnerStyle: {
    marginLeft: 10,
    marginRight: 10,
  },
  headerTitleStyle: {
    color: colors.BLACK,
    fontFamily: "Roboto-Bold",
    fontSize: 18,
  },
  mapcontainer: {
    flex: 1.5,
    width: width,
    height: 150,
    borderWidth: 7,
    borderColor: colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
  mapDetails: {
    backgroundColor: colors.WHITE,
    flex: 1,
    flexDirection: "column",
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: colors.TRANSPARENT,
    borderStyle: "solid",
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderBottomWidth: 10,
    borderLeftColor: colors.TRANSPARENT,
    borderRightColor: colors.TRANSPARENT,
    borderBottomColor: colors.YELLOW.secondary,
    transform: [{ rotate: "180deg" }],
  },
  signInTextStyle: {
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
    color: colors.WHITE,
  },
  listItemView: {
    flex: 1,
    width: "100%",
    // height: 350,
    borderBottomWidth:1,
    borderBottomColor:"#cccccc",
    marginTop: 35,
  
    flexDirection: "column",
  },
  dateView: {
    flex: 1.1,
  },
  listDate: {
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 10,
    color: colors.GREY.default,
    flex: 1,
  },
  addressViewStyle: {
    flex: 2,
    paddingLeft: 10,
    marginTop: 10,
  },
  addressViewTextStyle: {
    color: colors.GREY.secondary,
    fontSize: 15,
    marginLeft: 15,
    lineHeight: 24,
   // fontSize:18,
    // borderColor:"black",
    // borderWidth:1,
    flexWrap: "wrap",
  },
    addressViewTextStyleNoRider: {
    color: colors.GREY.secondary,
    fontSize: 15,
    marginLeft: 15,
    lineHeight: 24,
    fontSize:17,
    marginLeft:20,
     marginRight:20,
    // borderColor:"black",
    // borderWidth:1,
    flexWrap: "wrap",
  },
  greenDot: {
    backgroundColor: colors.GREEN.default,
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  redDot: {
    backgroundColor: colors.RED,
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  detailsBtnView: {
    flex: 1,
 
    justifyContent: "space-between",
    flexDirection: "row",
    //width: width,
    marginTop: 30,
    marginBottom: 20,

    

  //   display: flex;
  // justify-content: space-between;
  // max-width: 60%;
  // margin: auto;
  },

  modalPage: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalMain: {
    flex: 1,
    backgroundColor: colors.GREY.background,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: colors.WHITE,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    flex: 1,
    maxHeight: 180,
  },
  modalHeading: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBody: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  modalFooter: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    borderTopColor: colors.GREY.iconPrimary,
    borderTopWidth: 1,
    width: "100%",
  },
  btnStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mainViewStyle: {
    flex: 1,
    //marginTop: StatusBar.currentHeight
  },
  fixAdressStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  myButtonStyle: {
    backgroundColor: "#fff",
    width: height / 7,
    padding: 2,
    borderColor: "#ED5E68",
    borderWidth: 1,
    borderRadius: 10,
  },
  alertStyle: {
    fontWeight: "bold",
    fontSize: 18,
    width: "100%",
    textAlign: "center",
  },
  cancelTextStyle: {
    color: colors.BLUE.secondary,
    fontSize: 18,
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
  okStyle: {
    color: colors.BLUE.secondary,
    fontSize: 18,
    fontWeight: "bold",
  },
  viewFlex1: {
    flex: 1,
  },
  contactUser: {
    flex: 1,
    paddingLeft:6,
    paddingRight:5,
    paddingTop:2,
    marginBottom:3
  },
  clickText: {
    borderRightColor: colors.GREY.iconPrimary,
    borderRightWidth: 1,
  },
  titleStyles: {
    width: "100%",
    alignSelf: "center",
    color:"blue"
  },
  billOptions: {
    marginTop: 10,
    marginLeft: 10,
    textAlign: "left",
  },
  billAmount: {
    textAlign: "left",
  },
});