import React from "react";
import {
  StyleSheet,
  View,
  
  TouchableWithoutFeedback,
  ImageBackground,
  
  Dimensions,
  Platform,
  Linking,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import RadioForm from "react-native-simple-radio-button";
var { width, height } = Dimensions.get("window");
import Polyline from "@mapbox/polyline";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { Header, Rating , Icon } from "react-native-elements";
import Dash from "react-native-dash";
import { colors } from "../common/theme";
var { width } = Dimensions.get("window");
import * as firebase from "firebase"; //Database
import { google_map_key } from "../common/key";
import languageJSON from "../common/language";
import { Currency } from "../common/CurrencySymbol";
import Background from "../components/Background";
import { RequestPushMsg } from "../common/RequestPushMsg";
import BackNav from '../components/BackNav'
import { updateHistory } from '../common/ScreenTracker';
import { Badge, Box, Pressable, ScrollView ,  Image, Button, Text,Avatar} from 'native-base';
import Categories from '../components/Categories'
import NotificationNav from '../providingParty/components/NotificationNav'
const profilePic = "../../assets/images/profilePic.png"

export default class RideDetails extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.state != nextState;
  }
  getRideDetails;
  constructor(props) {
    super(props);

    this.state = {
      coords: [],
      intialregion: {},
      helpers: [],
      messages:[],
      modalVisible: false,
      radio_props: [],
    };
    this.getRideDetails = this.props.navigation.getParam("data");
    console.log(this.getRideDetails);
  }

   RequestMoreDetail = (request) => {
    return (
      <Box>
      {this.state.paramData ? (
        <Box w={'100%'}
            bg={'#fff'} pt={10} px={5}>
            <Button
                position={'absolute'}
                top={5}
                right={5}
                bg={'#fff'} px={2} py={2} mr={2}
                borderWidth={1} borderColor={'#07d29a'}
                borderRadius={16} w={'30%'}
                _text={{
                    color: '#07d29a',
                    fontSize: 12,
                    lineHeight: 15,
                    textAlign: 'center'
                }}
                _pressed={{
                    bg: '#fff'
                }}
                onPress={() => {
                  this.onPressCancel(null);
                }}
            >Close Request</Button>
             <Text
                fontSize={16} fontWeight={'bold'} lineHeight={24} color={'#000'}
            > {this.state.paramData.title}</Text> 
            <Text
                my={5} fontSize={15} fontWeight={'400'} lineHeight={18} color={'#a3a3a3'}
            >{this.state.paramData.description}</Text>
           
           <Box>
                <Box flexDir={'row'} alignItems={'center'} my={2}>
                    <Box w={'10%'} mr={2} ml={1}>
                        <Image
                            source={require('../../assets/images/172506_money_icon.png')}
                            alt={'money_icon'}
                        />
                    </Box>
                    <Text
                        w={'80%'} fontSize={15} fontWeight={'400'} lineHeight={25} color={'#a3a3a3'}
                    > {Currency}
                    {this.state.paramData && this.state.paramData.customer_paid
                      ? parseFloat(this.state.paramData.customer_paid).toFixed(
                          2
                        )
                      : this.state.paramData && this.state.paramData.estimate
                      ? this.state.paramData.estimate
                      : 0}</Text>
                </Box>
                <Box flexDir={'row'} alignItems={'center'} my={2}>
                    <Box w={'10%'} mr={2} alignItems={'center'}>
                        <Image
                            source={require('../../assets/images/Layer21.png')}
                            alt={'money_icon'}
                        />
                    </Box>
                    <Text
                        fontSize={15} fontWeight={'400'} lineHeight={22} color={'#a3a3a3'}
                    >  {this.state.paramData && this.state.paramData.pickup ? (
                          this.state.paramData.pickup.add
                     
                    ) : null}</Text>
                </Box>
                {this.state.paramData.categoriesStr?(
                <Categories category={ this.state.paramData.categoriesStr.split(',').filter(i => i)} />
                ):null}
            </Box>
        </Box>
        
    ):null}
      </Box>
    )
}

   RequestMessage = () => {

    return (
        <Box
            w={'100%'}
            bg={'#fff'} pt={5}
        >
            <Text
                px={5} my={5} fontSize={16} fontWeight={'500'} lineHeight={24} color={'#000'}
            >Message</Text>
     
            {this.state.messages.map((item, index) => {
                return (
                    <Pressable
                        key={index}
                        w={'100%'}
                        borderBottomWidth={this.state.messages.length - 1 === index ? 1 : 0}
                        h={70} px={5}
                        onPress={() => this.chat(item)}
                        borderTopWidth={1} borderColor={'#a3a3a3'}
                        flexDir={'row'} alignItems={'center'} py={2} >
                          
         { item.photo != ""  && item.photo != null ? (
            <Avatar
            size="sm"
              source={{  uri:  item.photo }}
              activeOpacity={0.7}
            />
          ) :  (
           
            <Image size={35}
            resizeMode={'cover'}
                  source={require('../../assets/images/profilePic.png')}
                  alt={'_icon1'} activeOpacity={0.7}
              />
          )}

                      
                        <Box ml={3} >
                            <Text
                                fontSize={15} fontWeight={item.numOfNewMessages != "" ? '700':'500'} lineHeight={24} color={'#000'}
                            >{item.name}</Text>
                            <Text isTruncated maxW={'150'}
                                fontSize={12} fontWeight={item.numOfNewMessages != "" ? '700':'400'} lineHeight={20} color={item.numOfNewMessages != ""? '#000':'#a3a3a3'}
                            >{item.message}</Text>
                        </Box>
                        {item.numOfNewMessages != "" ? (
                        <Badge bg={'#07d29a'} borderRadius={20} w={'30px'} h={'30px'}
                            position={'absolute'} right={'90px'}
                        >
                            <Text
                                fontSize={14} fontWeight={item.numOfNewMessages != "" ? '700':'500'} lineHeight={24} color={'#fff'}
                            >{item.numOfNewMessages}</Text>
                        </Badge> ): null}
                        <Text
                            fontSize={10} fontWeight={'500'} lineHeight={24} color={'#a3a3a3'}
                            position={'absolute'} right={8}
                        >{item.date}</Text>
                    </Pressable>
                )
            })}
        </Box>
    )
}

   OfferingPersonDetail = () => {
  
    return (
     
        <Box
            w={'100%'}
            bg={'#fff'} pt={5} px={5} mb={5}
        >
           {this.getRideDetails.status == "NEW" &&
      this.state.helpers.length > 0 ? (
        <View>
            <Text
                my={5} fontSize={16} fontWeight={'500'} lineHeight={24} color={'#000'}
            >Offers</Text>
            {this.state.helpers.map((item, index) => {
                return (
                    <Box key={index} shadow={5} mb={5}
                        flexDir={'row'} alignItems={'center'} justifyContent={'space-between'}
                        h={100} bg={'#fff'} borderWidth={1} borderRadius={8} borderColor={'#fff'} px={5}
                    >
                       { item.driver_image? <Avatar bg="green.500" size="sm" source={{
                            uri: item.driver_image
                        }} /> : (  
                          <Image size={35}
                          resizeMode={'cover'}
                                source={require('../../assets/images/profilePic.png')}
                                alt={'_icon1'} activeOpacity={0.7}
                            />)}
                        <Text
                            fontSize={15} fontWeight={'500'} lineHeight={24} color={'#000'}
                        >{item.driver_name}</Text>
                        <Text
                            fontSize={15} fontWeight={'500'} lineHeight={24} color={'#07d29a'}
                        >      {Currency}{" "}
                        {this.state.paramData &&
                        this.state.paramData.trip_cost > 0
                          ? parseFloat(this.state.paramData.trip_cost).toFixed(
                              2
                            )
                          : this.state.paramData &&
                            this.state.paramData.estimate
                          ? parseFloat(this.state.paramData.estimate).toFixed(2)
                          : 0}</Text>
                        <Button
                            bg={'#07d29a'} px={2}
                            borderWidth={1} borderColor={'#07d29a'}
                            borderRadius={16} w={'30%'}
                            _text={{
                                color: '#fff',
                                fontSize: 12,
                                lineHeight: 15,
                                textAlign: 'center'
                            }}
                            _pressed={{
                                bg: '#07d29a'
                            }}
                            onPress={() => this.acceptOffer(item)}
                        >Accept</Button>
                    </Box>
                )
            })}
            </View>
            ):null}
        </Box>
    )
   
}

   TrackOfferPerson = () => {
    return (
        <Box shadow={5} my={5} mx={5} px={5}
            justifyContent={'center'}
            h={150} bg={'#fff'} borderWidth={1} borderColor={'#fff'} borderRadius={8}
        >
          
            <Box flexDir={'row'} alignItems={'center'} my={2} >
            { this.state.paramData.driver_image != ""  ? (
            <Avatar
            size="sm"
              source={{  uri: this.state.paramData.driver_image}}
              activeOpacity={0.7}
            />
          ) :  (
           
            <Image size={35}
            resizeMode={'cover'}
                  source={require('../../assets/images/profilePic.png')}
                  alt={'_icon1'} activeOpacity={0.7}
              />
          )}   
        
                <Box w={'90%'} flexDir={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Box ml={3} >
                        <Text
                            fontSize={15} fontWeight={'500'} lineHeight={24} color={'#000'}
                        >{this.state.paramData.driver_name}</Text>
                        {/* <Text isTruncated maxW={'150'}
                            fontSize={12} fontWeight={'400'} lineHeight={20} color={'#a3a3a3'}
                        >Rider</Text> */}
                    </Box>
                    <Box flexDir={'row'} alignItems={'center'}>
                      {this.state.paramData.driverRating>0?(
                    <Rating
  type='custom'
  ratingColor='#07d29a'
  ratingBackgroundColor='#c8c7c8'
  startingValue={parseFloat(
    this.state.paramData.driverRating
  )}
  imageSize={15}
  onFinishRating={this.ratingCompleted}
  style={{ paddingVertical: 10 }}
  fractions={3}
  readonly
  tintColor='#fff'
/>):null}
                        {/* <Text
                            fontSize={12} fontWeight={'500'} lineHeight={24} color={'#a3a3a3'}
                        >5.0</Text>
                        <Image
                            source={require('../../assets/images/star.png')}
                            alt={'rated'} ml={2}
                        /> */}
                    </Box>
                </Box>
            </Box>
            <Box  flexDir={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Box  flexDir={'row'} alignItems={'center'}>
                    <Pressable
                        w={'40px'} h={'40px'} borderWidth={1} borderColor={'#fff'} shadow={5} bg={'#f7f7f7'}
                        borderRadius={30} alignItems={'center'} justifyContent={'center'}
                        mr={2}
                        onPress={() => { this.onPressCall(
                          "tel:" + this.state.paramData.driver_contact
                        )}}
                    >
                        <Image
                            source={require('../../assets/images/ic_call_24px.png')}
                            alt={'_icon1'} resizeMode={'contain'}
                        />
                    </Pressable>
                    <Text
                        fontSize={12} fontWeight={'400'} lineHeight={20} color={'#a3a3a3'}
                    >Call {this.state.paramData.driver_name}</Text>
                </Box>
                <Box  flexDir={'row'} alignItems={'center'}>
                    <Pressable
                        w={'40px'} h={'40px'} borderWidth={1} borderColor={'#fff'} shadow={5} bg={'#f7f7f7'}
                        borderRadius={30} alignItems={'center'} justifyContent={'center'}
                        onPress={() => navigation.navigate('TrackingScreen')} mr={2}
                        onPress={() => {  this.trackNow(this.state.paramData)}}
                    >
                        <Image
                            source={require('../../assets/images/ic_my_location_24px.png')}
                            alt={'_icon1'} resizeMode={'contain'}
                        />
                    </Pressable>
                    <Text
                        fontSize={12} fontWeight={'400'} lineHeight={20} color={'#a3a3a3'}
                    >Track now</Text>
                </Box>
            </Box>
          
        </Box>
    )
}

ReqDetailHeader = () => {
  return (
      <Box
          flexDir={'row'} justifyContent={'space-between'} alignItems={'center'}
          h={60} w={'100%'} px={5} marginTop={2} zIndex={100}
      >
          <Pressable
              w={'50px'} h={'50px'} borderWidth={1} borderColor={'#fff'} shadow={2} bg={'#fff'}
              borderRadius={30} alignItems={'center'} justifyContent={'center'} 
              onPress={() => this.goBack()}
          >
              <Image
                  source={require('../../assets/images/back.png')}
                  alt={'_icon1'} resizeMode={'contain'}
              />
          </Pressable>
          {/* <Text
              fontSize={18} fontWeight={'bold'} lineHeight={24} color={'#000'}
          >Request Details</Text> */}
          <Box
              w={'50px'} h={'50px'} borderWidth={1} borderColor={'#fff'} shadow={2} bg={'#fff'}
              borderRadius={30} alignItems={'center'} justifyContent={'center'} 
          >
             <NotificationNav  navigation={this.props.navigation} />
          </Box>
      </Box>  
  )
}


 RequestDetails = () => {
  return (
    <View>
          {this.state.messages.length == 0 ? (
            <View style={styles.mapView}>
              
              <View style={styles.mapcontainer}>
              { this.ReqDetailHeader() }
                <MapView
                  style={styles.map}
                  provider={PROVIDER_GOOGLE}
                  region={{
                    latitude: this.state.intialregion.latitude
                      ? this.state.intialregion.latitude
                      : 22,
                    longitude: this.state.intialregion.longitude
                      ? this.state.intialregion.longitude
                      : 88,
                    latitudeDelta: 0.9922,
                    longitudeDelta: 1.9421,
                  }}
                >
                  <Marker
                    coordinate={{
                      latitude: this.state.paramData
                        ? this.state.paramData.pickup.lat
                        : 0.0,
                      longitude: this.state.paramData
                        ? this.state.paramData.pickup.lng
                        : 0.0,
                    }}
                    title={"marker_title_1"}
                    description={
                      this.state.paramData
                        ? this.state.paramData.pickup.add
                        : null
                    }
                  />

                  <Marker
                    coordinate={{
                      latitude: this.state.paramData
                        ? this.state.paramData.drop.lat
                        : 0.0,
                      longitude: this.state.paramData
                        ? this.state.paramData.drop.lng
                        : 0.0,
                    }}
                    title={"marker_title_2"}
                    description={
                      this.state.paramData
                        ? this.state.paramData.drop.add
                        : null
                    }
                    pinColor={colors.GREEN.default}
                  />

                  <MapView.Polyline
                    coordinates={
                      this.state.coords
                        ? this.state.coords
                        : { latitude: 0.0, longitude: 0.0 }
                    }
                    strokeWidth={4}
                    strokeColor={colors.BLUE.default}
                  />
                </MapView>
              </View>
            </View>
           ) :     
              
           <View style={styles.mapcontainer}>
           { this.ReqDetailHeader() }
         </View>}
              {/* Header */}
           
        
       
          {this.RequestMoreDetail()}
          {this.state.paramData &&
              this.state.paramData.status == "ACCEPTED" ? (
           this.TrackOfferPerson() 
              ):null}
          {this.OfferingPersonDetail()}
          {this.state.messages.length >0?
          (this.RequestMessage()):null}
        
          <Box h={50}></Box>
      </View>
  );
}

  getCancelReasons() {
    const reasonListPath = firebase.database().ref("/cancel_reason/");
    reasonListPath.on("value", (reasons) => {
      if (reasons.val()) {
        this.setState({
          radio_props: reasons.val(),
        });
      }
    });
  }


  getChat() {
        let msgData=firebase.database().ref(`chat-sum/`+this.state.paramData.bookingId + '/message')
         msgData.on('value',msgData=>{
            let rootEntry=msgData.val();
            let allMessages=[]
            for(let key in rootEntry){
                if(key != "undefined")///////nomi fix
                {
                 // alert(key)
                 let entryKey=rootEntry[key]
                 
                 entryKey.name = entryKey.driverName
                 entryKey.photo = entryKey.photoDriver
                 entryKey.date = entryKey.date
                 entryKey.numOfNewMessages = entryKey.needHelpNewMessages
                 entryKey.mainKey = key
                 if(entryKey.name)
                 allMessages.push(entryKey)
                }
            
                 
                 
            }
            this.setState({ messages: allMessages.reverse()})

         })
        // let msgData=firebase.database().ref(`chat/`+this.state.paramData.bookingId + '/message')
        // msgData.on('value',msgData=>{
      
        //         //console.log("msgData",msgData.val());
        //         let rootEntry=msgData.val();
        //         let allMessages=[]
        //         for(let key in rootEntry){
                 
        //           debugger
        //           //alert(key)
        //                 //console.log("root entry",rootEntry[key]);
        //                 let entryKey=rootEntry[key]
        //                // alert(entryKey.name)
        //                 //entryKey.msgId = key
                        
                        



        //               let name = undefined
        //               let photo = undefined
        //               let numOfNewMessages = 0
        //               let date = undefined
        //               for(let msgKey in entryKey){
        //                       if(entryKey[msgKey].name != undefined && msgKey != key)
        //                       {
        //                     name = entryKey[msgKey].name
        //                     photo = entryKey[msgKey].photo
        //                     date = entryKey[msgKey].msgDate
        //                       }
        //                 if(entryKey[msgKey].isNew)
        //                       numOfNewMessages++;
        //               }
        //               let aa = Object.keys(entryKey)[Object.keys(entryKey).length-1]
        //               entryKey.message = entryKey[aa].message


        //                entryKey.name = name
        //                 entryKey.photo = photo
        //                 entryKey.date = date
        //                 entryKey.numOfNewMessages = numOfNewMessages
        //                 entryKey.mainKey = key
        //                 allMessages.push(entryKey)
        //         }
        //          this.setState({ messages: allMessages.reverse() })
                
        // })



      }


    chat(item){
     
    const  obj = {
         "bookingId": this.state.paramData.bookingId,
         "mainKey":item.mainKey,
         "nameOftheOtherPerson": item.name
      }
       // console.log("chat here");
        // console.log(this.state.tripInfo);
        
       this.props.navigation.navigate("onlineChat",{passData:obj});
    }

  componentDidMount() {

   
    if (this.getRideDetails) {
      this.getCancelReasons();

       var curuser = firebase.auth().currentUser;
      updateHistory(curuser.uid,"RequestDetails",this.getRideDetails.bookingId )

      this.setState(
        {
          intialregion: {
            latitude: this.getRideDetails.pickup.lat,
            longitude: this.getRideDetails.pickup.lng,
            latitudeDelta: 0.9922,
            longitudeDelta: 0.9421,
          },
          currentUser: curuser,
          paramData: this.getRideDetails,
        },
        () => {
          console.log(this.state);
          this.getDirections(
            '"' +
              this.state.paramData.pickup.lat +
              "," +
              this.state.paramData.pickup.lng +
              '"',
            '"' +
              this.state.paramData.drop.lat +
              "," +
              this.state.paramData.drop.lng +
              '"'
          );
          this.forceUpdate();
          this.getOffers();
          this.getChat();
        }
      );
    }
  }

  componentWillUnmount() {}

  dismiss() {
    this.el.remove();
  }
  //////////////////////////////////////////////////////////
  //Cancel button press
  onPressCancel(param) {
     
    this.setState({
      modalVisible: true,
    });
  }

  //caacel modal design
  cancelModal() {
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          this.setState({ modalVisible: false });
        }}
      >
        <View style={styles.cancelModalContainer}>
          <View style={styles.cancelModalInnerContainer}>
            <View style={styles.cancelContainer}>
              <View style={styles.cancelReasonContainer}>
                <Text style={styles.cancelReasonText}>
                  {languageJSON.cancel_reason_modal_title}
                </Text>
              </View>

              <View style={styles.radioContainer}>
                <RadioForm
                  radio_props={
                    this.state.radio_props ? this.state.radio_props : null
                  }
                  initial={0}
                  animation={false}
                  buttonColor={colors.GREY.secondary}
                  selectedButtonColor={colors.GREY.secondary}
                  buttonSize={10}
                  buttonOuterSize={20}
                  style={styles.radioContainerStyle}
                  labelStyle={styles.radioText}
                  radioStyle={styles.radioStyle}
                  onPress={(value) => {
                    this.setState({ value: value });
                  }}
                />
              </View>
              <View style={styles.cancelModalButtosContainer}>
             
                <Button
                 bg={'#fff'} px={2} py={3} mr={2}
                 borderWidth={1} borderColor={'#07d29a'}
                 borderRadius={16} w={'30%'}
                 _text={{
                     color: '#07d29a',
                     fontSize: 12,
                     lineHeight: 15,
                     textAlign: 'center'
                 }}
                 _pressed={{
                  bg: '#fff'
              }}
                  title={languageJSON.no_driver_found_alert_OK_button}
                  
                  onPress={() => {
                    this.dissMissCancel();
                  }}>
                 {"Don't close"}
                </Button>

                <View style={styles.buttonSeparataor} />

                <Button
                 bg={'#fff'} px={2} py={3} mr={2}
                 borderWidth={1} borderColor={'#07d29a'}
                 borderRadius={16} w={'30%'}
                 _text={{
                     color: '#07d29a',
                     fontSize: 12,
                     lineHeight: 15,
                     textAlign: 'center'
                 }}
                 _pressed={{
                  bg: '#fff'
              }}
                  title={languageJSON.no_driver_found_alert_OK_button}
                  
                  onPress={() => {
                    this.onCancelConfirm();
                  }}>
                 OK
                </Button>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  dissMissCancel() {
    if (this.state.bookingStatus == "NEW") {
      this.setState({ modalVisible: false, driverSerach: true });
    } else {
      this.setState({ modalVisible: false });
    }
  }

  //cancel modal ok button press
  onCancelConfirm() {
    var bookingID = this.state.paramData.bookingId;
    this.setState({ modalVisible: false }, () => {
      setTimeout(() => {

        ////start
        var selectedReason = this.state.value;
        var bookingID = this.state.paramData.bookingId;
        if (!this.state.value) selectedReason = 0;
        // update status for rider booking node

firebase
              .database()
              .ref(`bookings/` + this.state.paramData.bookingId + "/")
              .update({
                status: "CANCELLED",
                reason: this.state.radio_props[selectedReason].label
              })
              .then(() => {
                

                    firebase
          .database()
          .ref(
            `/users/` +
             this.state.currentUser.uid +
              "/my-booking/" +
              this.state.paramData.bookingId +
              "/"
          )
          .update({
            status: "CANCELLED",
            reason: this.state.radio_props[selectedReason].label
          })
          .then((data) => { alert("Request closed successfully!");})

              })



      }, 500);
    });
  }

  ////////////////////////////////////////////////////////

  async getOffers() {
    let userUid = firebase.auth().currentUser.uid;

    let dbRef = firebase
      .database()
      .ref("bookings/" + this.state.paramData.bookingId + "/requestedDriver/");
    dbRef.on("value", (snap) => {
      var allUsers = [];
      let users = snap.val();
      if (users)
        for (let key in users) {
          users[key].userUid = key;
          if (users[key].status == "ACCEPTED") allUsers.push(users[key]);
        }
      this.setState({ helpers: allUsers.reverse() });
    });
  }

  acceptOffer = (item) => {
    //  if (!this.isMounted) {
    //    return
    //  }
    let curuid = firebase.auth().currentUser.uid;

    let ref = firebase
      .database()
      .ref(
        "users/" + curuid + "/my-booking/" + this.getRideDetails.bookingId + "/"
      );
    ref.on("value", (snapshot) => {
      // console.log("current user data is",snapshot.val());

      let riderDetails = snapshot.val();

      debugger;
      var riderData = {
        carType: riderDetails.carType,
        distance: riderDetails.estimateDistance,
        driver: item.driver,
        driver_image: item.driver_image ? item.driver_image : "",
        driver_name: item.driver_name,
        driver_contact: item.driver_contact,
        vehicle_number: 1111,
        // vehicleModelName: this.state.driverDetails.vehicleModel,
        driverRating: item.driverRating ? item.driverRating : "0",
        drop: riderDetails.drop,
        otp: riderDetails.otp,
        pickup: riderDetails.pickup,
        estimate: riderDetails.estimate,
        estimateDistance: riderDetails.estimateDistance,
        serviceType: riderDetails.serviceType,
        status: "ACCEPTED",
        total_trip_time: riderDetails.total_trip_time,
        trip_cost: riderDetails.trip_cost,
        trip_end_time: riderDetails.trip_end_time,
        trip_start_time: riderDetails.trip_start_time,
        tripdate: riderDetails.tripdate,
      };
      //alert(this.getRideDetails.bookingId)
      let userDbRef = firebase
        .database()
        .ref(
          "users/" +
            curuid +
            "/my-booking/" +
            this.getRideDetails.bookingId +
            "/"
        );
      userDbRef.update(riderData);
      // console.log(this.jobs);
    });

    firebase
      .database()
      .ref(
        "users/" +
          item.driver +
          "/my_bookings/" +
          this.getRideDetails.bookingId +
          "/status/"
      )
      .set("ACCEPTED");

    var lastRequestDetails = this.state.paramData;
    lastRequestDetails.status = "ACCEPTED";

    lastRequestDetails.driver = item.driver;
    lastRequestDetails.driver_image = item.driver_image;
    lastRequestDetails.driver_name = item.driver_name;
    lastRequestDetails.driver_contact = item.driver_contact;
    this.setState({
      paramData: lastRequestDetails,
      helpers: [],
    });

    this.sendPushNotification(
      item.driver,
      this.getRideDetails.bookingId,
      this.getRideDetails.customer_name + " has accepted your offer"
    );
    let date1 = new Date();
    firebase.database().ref('user_notifications'+ '/' +item.driver ).push({
      message:this.getRideDetails.customer_name + " has accepted your offer",
      extendedMessage:"",
      dateMsg:date1.toLocaleString(),
      type:"",
      isNew:true,
      side:"providing",
      link:"SellerRideList",
      params:{}
    })

    //  let currentUserdbRef = firebase.database().ref('users/' + item.driver + '/');
    //  currentUserdbRef.update({
    //      queue: true
    //  })
  };

  sendPushNotification(customerUID, bookingId, msg) {
    const customerRoot = firebase.database().ref("users/" + customerUID);
    customerRoot.once("value", (customerData) => {
      if (customerData.val()) {
        let allData = customerData.val();
        RequestPushMsg(allData.pushToken ? allData.pushToken : null, msg);
      }
    });
  }


   newmessageData = ({ item, index }) => {
    return (
      <TouchableOpacity  onPress={() => this.chat(item)}>
      <View style={[styles.userDesc, styles.msgNow]}>
      
        {item ? (
          item.photo != ""  && item.photo != null ? (
            <Avatar
            size="sm"
              source={{ uri: item.photo }}
              activeOpacity={0.7}
            />
          ) : item.name != "" ? (
            <Avatar
            size="sm"
              source={require("../../assets/images/profilePic.png")}
              activeOpacity={0.7}
            />
          ) : null
        ) : null}

        <View style={styles.userView}>
          {/*Driver Name */}
          {item.driver_name != "" ? (
            <View>
            <Text style={styles.personStyle}>{item.name}</Text>
            <Text style={[item.numOfNewMessages != "" ? styles.msgBoldStyle : styles.msgStyle]}>{item.message}</Text>
            </View>
          ) : null}
        </View>

        {/* <View style={styles.offerChat}>
          { <TouchableOpacity
                style={styles.floatButtonStyle}
                
                onPress={() => this.chat(item)}
                >
                <Text style={{color:"white"}}>(2)</Text>
                <Icon
                    name="ios-chatbubbles"
                    type="ionicon"
                    // icon: 'chat', color: '#fff',
                    size={20}
                    color={colors.WHITE}
                />
        </TouchableOpacity> }
        </View> */}
         <View style={{ right:0,position:"absolute" }}>
         <Text style={styles.msgStyle}>{item.date}</Text>
      {item.numOfNewMessages != "" ? (
        <Button
          title={item.numOfNewMessages}
          loading={false}
          buttonStyle={styles.buttonStylenm}
          loadingProps={{ size: "large", color: colors.GREEN.default }}
          titleStyle={styles.buttonTitleText2nm}
          onPress={() => this.chat(item)}
          containerStyle={styles.numOfMesaaage}/>
          ) : null}
             
 </View>
      </View>
       </TouchableOpacity>
    );
  };


  newData = ({ item, index }) => {
    return (
      <View style={[styles.userDesc, styles.offerNow]}>
       <View style={{flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center"}}>
      <View>
        {item ? (
          item.driver_image != "" ? (
            <Avatar
            size="sm"
              source={{ uri: item.driver_image }}
              activeOpacity={0.7}
            />
          ) : item.driver_name != "" ? (
            <Avatar
            size="sm"
              source={require("../../assets/images/profilePic.png")}
              activeOpacity={0.7}
            />
          ) : null
        ) : null}
      </View>
       
        

         </View>

        {/* <View style={styles.offerChat}>
          { <TouchableOpacity
                style={styles.floatButtonStyle}
                
                onPress={() => this.chat(item)}
                >
                <Text style={{color:"white"}}>(2)</Text>
                <Icon
                    name="ios-chatbubbles"
                    type="ionicon"
                    // icon: 'chat', color: '#fff',
                    size={20}
                    color={colors.WHITE}
                />
        </TouchableOpacity> }
        </View> */}
        <Text style={styles.billAmount}>
                        {Currency}{" "}
                        {this.state.paramData &&
                        this.state.paramData.trip_cost > 0
                          ? parseFloat(this.state.paramData.trip_cost).toFixed(
                              2
                            )
                          : this.state.paramData &&
                            this.state.paramData.estimate
                          ? parseFloat(this.state.paramData.estimate).toFixed(2)
                          : 0}
                      </Text>
        <Button
          title={languageJSON.accept_offer}
          loading={false}
          buttonStyle={styles.buttonStyle}
          loadingProps={{ size: "large", color: colors.GREEN.default }}
          titleStyle={styles.buttonTitleText2}
          onPress={() => this.acceptOffer(item)}
          containerStyle={styles.acceptOffer}
        />
      </View>
    );
  };

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
      this.setState({ coords: coords }, () => {});
      return coords;
    } catch (error) {
      alert(error);
      return error;
    }
  }

  //call driver button press
  onPressCall(phoneNumber) {
    Linking.canOpenURL(phoneNumber)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle Phone Number: " + phoneNumber);
        } else {
          return Linking.openURL(phoneNumber);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  }
  //go back
  goBack() {
    this.props.navigation.goBack();
  }

  trackNow(data) {

    if (data.status == "ACCEPTED") {
      let bookingData = {
        bookingId: data.bookingId,
        coords: data.coords,
        driver: this.state.paramData.driver
      };
      this.props.navigation.navigate("BookedCab", { passData: bookingData });
    } else if (data.status == "START") {
      this.props.navigation.navigate("trackRide", {
        data: data,
        bId: data.bookingId,
        driver: this.state.paramData.driver
      });
    } else {
      console.log("track not posible");
    }
  }

  PayNow(data) {
    debugger;
    var curuser = firebase.auth().currentUser;
    this.setState({ currentUser: curuser }, () => {
      const userData = firebase
        .database()
        .ref("users/" + this.state.currentUser.uid);
      userData.once("value", (userData) => {
        if (userData.val()) {
          var udata = userData.val();
          const bDataref = firebase
            .database()
            .ref(
              "users/" +
                this.state.currentUser.uid +
                "/my-booking/" +
                data.bookingId
            );
          bDataref.once("value", (bookingdetails) => {
            if (bookingdetails.val()) {
            const  bookingData = bookingdetails.val();
             // alert(bookingData.payment_status);
              if (
                (bookingData.payment_status == "WAITING" ||
                  bookingData.payment_status == "IN_PROGRESS") &&
                bookingData.status == "END"
              ) {
                debugger;
                bookingData.bookingKey = data.bookingId;
                bookingData.firstname = udata.firstName;
                bookingData.lastname = udata.lastName;
                bookingData.email = udata.email;
                bookingData.phonenumber = udata.mobile;
                bookingData.trip_cost = bookingData.customer_paid;
                this.props.navigation.navigate("CardDetails", {
                  data: bookingData,
                });
              }
            }
          });
        }
      });
    });
  }

  render() {
    return (
     
      <ScrollView backgroundColor="white" keyboardShouldPersistTaps={'handled'}>
       {this.RequestDetails()}
      
          <View style={styles.container}>
         


         
         
            {/* end offers */}


           



         
            {this.state.paramData ? (
              this.state.paramData.status == "START" ? (
                <View style={styles.locationView2}>
                  <Button
                    title={languageJSON.track_now_button}
                    loading={false}
                    buttonStyle={styles.buttonStyle}
                    loadingProps={{
                      size: "large",
                      color: colors.GREEN.default,
                    }}
                    titleStyle={styles.buttonTitleText2}
                    onPress={() => {
                      this.trackNow(this.state.paramData);
                    }}
                    containerStyle={styles.callButtonContainerStyle2}
                  />
                </View>
              ) : null
            ) : null}

            {this.state.paramData && this.state.paramData.payment_status ? (
              this.state.paramData.payment_status == "IN_PROGRESS" ||
              this.state.paramData.payment_status == "PAID" ||
              this.state.paramData.payment_status == "WAITING" ? (
                <View style={styles.billView}>
                  <View style={styles.billView}>
                    <Text style={styles.billTitle}>
                      {languageJSON.bill_details_title}
                    </Text>
                  </View>
                  <View style={styles.billOptions}>
                    <View style={styles.billItem}>
                      <Text style={styles.billName}>
                        {languageJSON.your_trip}
                      </Text>

                      <Text style={styles.billAmount}>
                        {Currency}{" "}
                        {this.state.paramData &&
                        this.state.paramData.trip_cost > 0
                          ? parseFloat(this.state.paramData.trip_cost).toFixed(
                              2
                            )
                          : this.state.paramData &&
                            this.state.paramData.estimate
                          ? parseFloat(this.state.paramData.estimate).toFixed(2)
                          : 0}
                      </Text>
                    </View>
                    <View style={styles.billItem}>
                      <View>
                        <Text style={[styles.billName, styles.billText]}>
                          {languageJSON.convenienceFee}
                        </Text>
                        <Text style={styles.taxColor}>
                          {languageJSON.include_tax}
                        </Text>
                      </View>
                      <Text style={styles.billAmount}>
                        {this.state.paramData &&
                        this.state.paramData.convenience_fees
                          ? "+" +
                            Currency +
                            parseFloat(
                              this.state.paramData.convenience_fees
                            ).toFixed(2)
                          : "0"}
                      </Text>
                    </View>
                    <View style={styles.billItem}>
                      <View>
                        <Text style={[styles.billName, styles.billText]}>
                          {languageJSON.discount}
                        </Text>
                        <Text style={styles.taxColor}>
                          {languageJSON.promo_apply}
                        </Text>
                      </View>
                      <Text style={styles.discountAmount}>
                        {" "}
                        - {Currency}
                        {this.state.paramData &&
                        this.state.paramData.discount_amount
                          ? parseFloat(
                              this.state.paramData.discount_amount
                            ).toFixed(2)
                          : 0}
                      </Text>
                    </View>

                    {this.state.paramData &&
                    this.state.paramData.cardPaymentAmount ? (
                      this.state.paramData.cardPaymentAmount > 0 ? (
                        <View style={styles.billItem}>
                          <View>
                            <Text>{languageJSON.CardPaymentAmount}</Text>
                          </View>
                          <Text>
                            {" "}
                            {Currency}
                            {this.state.paramData &&
                            this.state.paramData.cardPaymentAmount
                              ? parseFloat(
                                  this.state.paramData.cardPaymentAmount
                                ).toFixed(2)
                              : 0}
                          </Text>
                        </View>
                      ) : null
                    ) : null}
                    {this.state.paramData &&
                    this.state.paramData.cashPaymentAmount ? (
                      this.state.paramData.cashPaymentAmount > 0 ? (
                        <View style={styles.billItem}>
                          <View>
                            <Text>{languageJSON.CashPaymentAmount}</Text>
                          </View>
                          <Text>
                            {" "}
                            {Currency}
                            {this.state.paramData &&
                            this.state.paramData.cashPaymentAmount
                              ? parseFloat(
                                  this.state.paramData.cashPaymentAmount
                                ).toFixed(2)
                              : 0}
                          </Text>
                        </View>
                      ) : null
                    ) : null}
                    {this.state.paramData &&
                    this.state.paramData.usedWalletMoney ? (
                      this.state.paramData.usedWalletMoney > 0 ? (
                        <View style={styles.billItem}>
                          <View>
                            <Text>{languageJSON.WalletPayment}</Text>
                          </View>
                          <Text>
                            {" "}
                            {Currency}
                            {this.state.paramData &&
                            this.state.paramData.usedWalletMoney
                              ? parseFloat(
                                  this.state.paramData.usedWalletMoney
                                ).toFixed(2)
                              : 0}
                          </Text>
                        </View>
                      ) : null
                    ) : null}
                  </View>
                  <View style={styles.paybleAmtView}>
                    <Text style={styles.billTitle}>
                      {languageJSON.grand_total}
                    </Text>
                    <Text style={styles.billAmount2}>
                      {Currency}
                      {this.state.paramData &&
                      this.state.paramData.customer_paid
                        ? parseFloat(
                            this.state.paramData.customer_paid
                          ).toFixed(2)
                        : null}
                    </Text>
                  </View>
                </View>
              ) : null
            ) : null}
            {this.state.paramData && this.state.paramData.payment_status ? (
              this.state.paramData.payment_status == "IN_PROGRESS" ||
              this.state.paramData.payment_status == "PAID" ||
              this.state.paramData.payment_status == "WAITING" ? (
                <View>
                  <View style={styles.iosView}>
                    {Platform.OS == "ios" ? (
                      <ImageBackground
                        source={require("../../assets/images/dash.png")}
                        style={styles.backgroundImage}
                        resizeMode={Platform.OS == "ios" ? "repeat" : "stretch"}
                      ></ImageBackground>
                    ) : (
                      <Dash style={styles.dashView} />
                    )}
                  </View>

                  <View style={styles.paymentTextView}>
                    <Text style={styles.billTitle}>
                      {languageJSON.payment_status}
                    </Text>
                  </View>
                  {this.state.paramData &&
                  this.state.paramData.payment_status ? (
                    <View style={styles.billOptions}>
                      <View style={styles.billItem}>
                        <Text style={styles.billName}>
                          {languageJSON.payment_status}
                        </Text>
                        <Text style={styles.billAmount}>
                          {this.state.paramData.payment_status ==
                            "IN_PROGRESS" ||
                          this.state.paramData.payment_status == "WAITING"
                            ? "Yet to pay"
                            : this.state.paramData.payment_status}
                        </Text>
                      </View>
                      <View style={styles.billItem}>
                        <Text style={styles.billName}>
                          {languageJSON.pay_mode}
                        </Text>
                        <Text style={styles.billAmount}>
                          {this.state.paramData.payment_mode
                            ? this.state.paramData.payment_mode
                            : null}{" "}
                          {this.state.paramData.getway
                            ? "(" + this.state.paramData.getway + ")"
                            : null}
                        </Text>
                      </View>
                    </View>
                  ) : (
                    <View style={styles.billOptions}>
                      <View style={styles.billItem}></View>
                    </View>
                  )}
                </View>
              ) : null
            ) : null}
            {this.state.paramData ? (
              this.state.paramData.payment_status == "WAITING" ||
              this.state.paramData.payment_status == "IN_PROGRESS" ? (
                <View style={styles.locationView2}>
                  <Button
                    loading={false}
                    bg={'black'}  px={2} py={2} mr={2} mt={5}
                    borderWidth={1} borderColor={'black'}
                    borderRadius={30} w={'100%'}
                    _text={{
                        color: 'white',
                        fontSize: 15,
                        lineHeight: 22,
                        textAlign: 'center'
                    }}
                    _pressed={{
                        bg: '#07d29a'
                    }}
                   
                   
                    onPress={() => {
                      this.PayNow(this.state.paramData);
                    }}>
                      {languageJSON.paynow_button}
                 </Button>
                </View>
              ) : null
            ) : null}

              {/* messages */}
            
            {/* end offers */}
          </View>
          {this.cancelModal()}
        </ScrollView>
      
    );
  }
}

const styles = StyleSheet.create({

 
  
 
  mapView: {
    justifyContent: "center",
    alignItems: "center",
    height: 160,
    marginBottom: 15,
  },
  mapcontainer: {
    flex: 7,
    width: width,
    alignItems: "center",
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },

  rideDesc: {
    flexDirection: "column",
  },
  userDesc: {
    flexDirection: "row",
    paddingHorizontal: 10,
    alignItems: "center",
    borderBottomWidth:0.5,
    borderBottomColor: "grey"
  },
  userView: {
    flexDirection: "column",
  },
   descView: {
    marginTop: 25
  },
  locationView: {
    flex: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    marginVertical: 14,
    justifyContent: "space-between",
  },
  locationView2: {
    flex: 1,
    flexDirection: "row",
    // paddingHorizontal: 10,
    padding: 10,
    marginVertical: 14,
  },
  // callButtonStyle:{
  // width:400
  // },
  location: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 20,
  },
  greenDot: {
    backgroundColor: colors.GREEN.default,
    width: 10,
    height: 10,
    borderRadius: 50,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  redDot: {
    backgroundColor: colors.RED,
    width: 10,
    height: 10,
    borderRadius: 50,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  address: {
    flexDirection: "row",
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: 0,
  },
  billView: {
    marginVertical: 5,
  },
  billTitle: {
    fontSize: 18,
    color: colors.GREY.default,
    fontFamily: "Roboto-Bold",
    marginTop:15
  },
  billOptions: {
    marginHorizontal: 10,
    marginVertical: 6,
  },
  billItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 15,
  },
  billName: {
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    color: colors.GREY.default,
  },
  billAmount: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    color: colors.GREY.default,
  },
  discountAmount: {
    fontSize: 16,
    fontFamily: "Roboto-Medium",
    color: colors.RED,
  },

  billAmount2: {
    fontWeight: "bold",
    fontSize: 18,
    fontFamily: "Roboto-Bold",
    color: colors.GREY.default,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: 2,
  },
  carNoStyle: {
    fontSize: 16,
    //fontWeight: 'bold',
    fontFamily: "Roboto-Medium",
  },
  carNoStyleSubText: {
    fontSize: 16,
    //fontWeight: 'bold',
    fontFamily: "Roboto-Regular",
    color: colors.GREY.default,
  },
  textStyle: {
    fontSize: 16,
    textAlign: "left",
    //fontWeight: 'bold',
    fontFamily: "Roboto-Medium",
  },
  mainView: {
    flex: 1,
    backgroundColor: colors.WHITE,
    //marginTop: StatusBar.currentHeight
  },
  personStyle: {
    fontSize: 16,
    //fontWeight: 'bold',
    color: colors.BLACK,
    fontFamily: "Roboto-Medium",
    paddingLeft: 4,
  },
   msgStyle: {
    fontSize: 16,
    //fontWeight: 'bold',
    color: colors.GREY.default,
    fontFamily: "Roboto-Medium",
    paddingLeft: 4,
  },
   msgBoldStyle: {
    fontSize: 16,
    color: colors.DARK,
    fontFamily: "Roboto-Medium",
    paddingLeft: 4,
  },
  personTextView: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 16,
    color: colors.GREY.iconSecondary,
    marginRight: 8,
    fontFamily: "Roboto-Regular",
  },
  avatarView: {
    marginVertical: 15,
  },
  timeStyle: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    marginTop: 1,
  },
  adressStyle: {
    marginLeft: 6,
    fontSize: 15,
    lineHeight: 20,
  },
  billView: {
    paddingHorizontal: 5,
  },
  billText: {
    fontFamily: "Roboto-Bold",
  },
  taxColor: {
    color: colors.GREY.default,
  },
  paybleAmtView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  iosView: {
    paddingVertical: 10,
  },
  dashView: {
    width: width,
    height: 1,
  },
  paymentTextView: {
    paddingHorizontal: 10,
  },
  // callButtonStyle:{
  //     width:50+'%'
  // },
  callButtonContainerStyle1: {
    flex: 1,
    width: "80%",
    height: 100,
  },
  callButtonContainerStyle2: {
    flex: 1,
    width: "80%",
    height: 100,
  },
  paynowButton: {
    flex: 1,
    width: "80%",
    height: 150,
  },
  editIconContainer: {
    height: 40,
    width: 40,
  },
  buttonStyle: {
    backgroundColor: colors.GREEN2,
    marginRight: 10,
    elevation: 1,
    borderRadius: 30,
  },
   buttonStylenm: {
    backgroundColor: colors.GREEN2,
    width:35,
    height:35,
   // marginRight: 10,
    elevation: 1,
    borderRadius: 50,
  },

   numOfMesaaage: {
   // width: "100%",
    textAlign: "center",
    flexDirection: "row",
    justifyContent: "center",
    //height: "100%",
    borderRadius: 10,
  },
  acceptOffer: {
    // flex: 1,
    // width: "80%",
    height: 100,

    textAlign: "center",
    flexDirection: "row",
    // a must alignItems: 'center',
    // to make items center vertically.
    justifyContent: "center",
    height: "100%",
  },
  container: {
    paddingLeft: 10,
  },
  offerRow: {
    paddingTop: 20,
    paddingBottom: 20,
   
  },
  msgNow:{
    paddingTop: 10,
    paddingBottom: 10,
  },
   offerNow:{
    display: "flex",
  justifyContent: "space-between",
   paddingTop: 10,
    paddingBottom: 10,
  },
  offersTbl: {
    fontSize: 18,
    marginBottom: 20,
     
  },
  feeStyle: {
    textAlign: "left",
    width: "90%",
    alignSelf: "stretch",
    flex: 1,
  },
  //cancel modal
  cancelModalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.GREY.background,
  },
  cancelModalInnerContainer: {
    height: 400,
    width: width * 0.95,
    padding: 0,
    backgroundColor: colors.WHITE,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 7,
  },
  cancelContainer: {
    flex: 1,
    justifyContent: "space-between",
    width: width * 0.95,
  },
  cancelReasonContainer: { flex: 1 },
  cancelReasonText: {
    top: 10,
    color: colors.BLACK,
    fontFamily: "Roboto-Bold",
    fontSize: 20,
    alignSelf: "center",
  },
  radioContainer: { flex: 8, alignItems: "center" },
  radioText: { fontSize: 16, fontFamily: "Roboto-Medium", color: colors.DARK },
  radioContainerStyle: { paddingTop: 30, marginLeft: 10 },
  radioStyle: { paddingBottom: 25 },
  cancelModalButtosContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom:10
  },
  buttonSeparataor: {
    width: 0.5,
    backgroundColor: colors.WHITE,
    alignItems: "center",
  },
  cancelModalButttonStyle: {
    backgroundColor: colors.GREY.iconSecondary,
    borderRadius: 0,
  },
  cancelModalButtonContainerStyle: {
    flex: 1,
    width: (width * 2) / 2,
    backgroundColor: colors.GREY.iconSecondary,
    alignSelf: "center",
    margin: 0,
  },
  signInTextStyle: {
    fontFamily: "Roboto-Bold",
    fontWeight: "700",
    color: colors.WHITE,
  },
  floatButtonStyle: {
    borderWidth: 1,
    borderColor: colors.BLACK,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 60,
    backgroundColor: colors.BLACK,
    borderRadius: 30,
  },
 

 
 
  buttonTitleText2nm:{
    fontSize:13
  },


});