import React from "react";
import {
  View,
  Text,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  Modal,
} from "react-native";
import Background from "../Background";
import { Icon, Button, Header, Input, CheckBox } from "react-native-elements";
import { colors } from "../../common/theme";
import languageJSON from "../../common/language";
import cross from '../../../assets/images/cancelModal.png';
import beeplinkPopup from '../../../assets/images/requestRouls.png';

var { height, width } = Dimensions.get("window");

import FooterSteps from "./FooterSteps";
import Category from "./Category";
import Place from "./Place";
import Details from "./Details";
import Time from "./Time";
import Budget from "./Budget";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as firebase from "firebase";
import { Dropdown } from "react-native-material-dropdown-v2";
import Navigator from "react-native";
import { google_map_key } from "../../common/key";
import { updateHistory } from '../../common/ScreenTracker';

export default class OpenRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      budget: "5",
      time: new Date().toLocaleString(),
      place: {},
      selectedCategories: [],
      currentStep: 1,
      maxStep: 1,
      currentBookingId: 0,
      userDetails: {},
      locationName: "",
      imagesEvent: [],
      isDating: false,
      confirmationModal: false,
      confirmed: false,
      curuser:firebase.auth().currentUser.uid,
      showRulesModal:false
    };

    // this.onPressBook = this.onPressBook.bind(this);

    // this.onClickStep = this.onClickStep.bind(this, this.state.maxStep);
  }

onHelpClick = () => {
      this.setState({ showRulesModal: true });

 }

  handleCategorySubmit = (selectedCategories) => {
    if (selectedCategories.length == 0)
      alert("Please select at least 1 category");
    else {
      var isDating = false;
      var budget = "0"
      if(selectedCategories.indexOf(5)>-1 || 
      selectedCategories.indexOf(41)>-1 || selectedCategories.indexOf(35)>-1 
      || selectedCategories.indexOf(42)>-1)
      {
        isDating =  true
        budget = "0"
       
      }
      this.setState({ selectedCategories: selectedCategories,isDating:isDating, budget:budget });
      
      this.processStep();
      updateHistory(this.state.curuser,"NewRequestStep1",selectedCategories )
    }
  };
   onSubmit() {
   alert(7)
  }

  handlePlaceSubmit = (place) => {
    debugger
  // alert(place.geometry)
    if (!place || place == "") alert("Please select location");
   else {
    // this.setState({ place: place });
    this.processStep();
     }
      updateHistory(this.state.curuser,"NewRequestStep2",place )
  };

  handleAddPlaceSubmit = (place) => {
    this.setState({ place: place }, () => {});
    // console.log(responseJson.results[0].place_id);
    // fetch(
    //   `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place}&fields=name,rating,address_component,adr_address,business_status,formatted_address,geometry,icon,name,photo,place_id,plus_code,type,url,utc_offset,vicinity,formatted_phone_number,international_phone_number,opening_hours,website,price_level,rating,review,user_ratings_total&key=${google_map_key}`
    // )
    //   .then((rs) => rs.json())
    //   .then((data) => {
    //     this.setState({ place: data.result }, () => {});
    //   });
  };

  handleDetailsSubmit = (title, description, images) => {
  //  if (title == "") alert("Title is mandatory");
     if (description == "") alert("Description is mandatory");
    else if (description.length < 30) alert("Description must be at least 30 characters long..!");
    else {
      this.setState({ title: title });
      this.setState({ description: description, imagesEvent: images });
      this.processStep();
    }
      updateHistory(this.state.curuser,"NewRequestStep3",title+""+description )
  };

  handleBudgetSubmit = (budget) => {
    if (budget == "") alert("Budget is mandatory");
    else {
      this.setState({ confirmationModal: true, budget });
    }
   updateHistory(this.state.curuser,"NewRequestStep5",budget )
  };

  handleTimeSubmit = (time) => {
    if (time == "") alert("Please select time");
    else {
      this.setState({ time: time });
      this.processStep();
    }
     updateHistory(this.state.curuser,"NewRequestStep4",null )
  };

  async componentDidMount() {
    // this._getLocationAsync();
  }

  // first name validation

  onCategoriesPress() {}

  onClickStep = (step) => {
    if (step <= this.state.maxStep) this.setState({ currentStep: step });
  };

  onFooterSubmitStep = () => {
    // this.state.currentStep  = 2
    if (this.state.currentStep == 1)
      //category
      this.category.submit();

    if (this.state.currentStep == 2)
      //place
      this.place.submit();

    if (this.state.currentStep == 3){
     
         this.details.submit();
    }
      //details
   

    if (this.state.currentStep == 4)
      //time
      this.time.submit();

    if (this.state.currentStep == 5) {
      //budget
      this.budget.submit();
    }
    // if(this.state.currentStep == 6)//budget
    // {

    // }
  };

  processStep = async () => {
    //alert(currentStep)
if(this.state.currentStep == 3)
 await this.setState({ currentStep: this.state.currentStep + 2 });
else
    await this.setState({ currentStep: this.state.currentStep + 1 });
    // alert(this.state.currentStep)

    if (this.state.currentStep > this.state.maxStep)
      this.setState({ maxStep: this.state.currentStep });
  };

  handleConfirmation = () => {
     this.setState({ confirmed: false });
      updateHistory(this.state.curuser,"SubmitRequest",null )
    
    this.onPressBook();

    this.processStep();
  };

  onPressBook() {
    var otp = Math.floor(Math.random() * 90000) + 10000;
    var curuser = firebase.auth().currentUser.uid;

    const userData = firebase.database().ref("users/" + curuser);
    userData.once("value", (userData) => {
      //alert(userData.val().profile_image)
      var profile_image = userData.val().profile_image
        ? userData.val().profile_image
        : null;
      //  this.setState({ userDetails: userData.val() });
      //console.log(userData.val())
      //     alert(profile_image)
      // alert(this.state.userDetails.firstName)
      //  alert(this.state.userDetails.profile_image)

      var pickUp = {
        lat: this.state.place?.geometry?.location?.lat || "",
        lng: this.state.place?.geometry?.location?.lng || "",
        add: this.state.place?.formatted_address || "",
        country: this.state.place?.country
      };
      var drop = {
        lat: this.state.place?.geometry?.location?.lat || "",
        lng: this.state.place?.geometry?.location?.lng || "",
        add: this.state.place?.formatted_address || "",
        country: this.state.place?.country
      };
      var data = {
        carImage: "",
        carType: "Economy",
        customer: curuser,
        customer_name: userData.val().firstName + " " + userData.val().lastName,
        customer_profile_image: profile_image,
        distance: 500,
        driver: "",
        driver_image: "",
        driver_name: "",
        drop: drop,
        pickup: pickUp,
        estimateDistance: 500,
        serviceType: "pickUp",
        status: "NEW",
        total_trip_time: 0,
        trip_cost: 0,
        trip_end_time: "00:00",
        trip_start_time: "00:00",
        tripdate: this.state.time,
        estimate: this.state.budget,
        otp: otp,
        title: this.state.title,
        description: this.state.description,
        time: this.state.time,
        selectedCategories: this.state.selectedCategories,
        images: this.state.imagesEvent,
      };

      var MyBooking = {
        images: this.state.imagesEvent,
        carType: "Economy",
        carImage: "",
        driver: "",
        driver_image: "",
        driver_name: "",
        drop: drop,
        pickup: pickUp,
        estimate: this.state.budget,
        estimateDistance: 500,
        serviceType: "pickUp",
        status: "NEW",
        total_trip_time: 0,
        trip_cost: 0,
        trip_end_time: "00:00",
        trip_start_time: "00:00",
        tripdate: this.state.time,
        estimate: this.state.budget,
        coords: "",
        otp: otp,
        title: this.state.title,
        description: this.state.description,
        time: this.state.time,
        selectedCategories: this.state.selectedCategories,
        customer_name: userData.val().firstName + " " + userData.val().lastName,
        customer_profile_image: profile_image,
        customer: curuser,
      };

      firebase
        .database()
        .ref("bookings/")
        .push(data)
        .then((res) => {
          var bookingKey = res.key;








          firebase
            .database()
            .ref("users/" + curuser + "/my-booking/" + bookingKey + "/")
            .set(MyBooking)
            .then((res) => {
              this.setState({ currentBookingId: bookingKey }, () => {
                this.props.navigation.replace("Map", {
                  openRequestData: this.state,
                });
              });
            });
        });
    });
  }

  //register button press for validation
  // onPressRegister() {
  //   const { onPressRegister } = this.props;
  //   LayoutAnimation.easeInEaseOut();
  //   const fnameValid = this.validateFirstName();
  //   const lnameValid = this.validateLastname();
  //   const mobileValid = this.validateMobile();
  //   const emailValid = this.validateEmail();

  //   if (fnameValid && lnameValid && mobileValid && emailValid) {
  //     //register function of smart component
  //     onPressRegister(
  //       this.state.fname,
  //       this.state.lname,
  //       this.state.mobile,
  //       this.state.email
  //     );
  //     this.setState({ fname: "", lname: "", mobile: "", email: "" });
  //   }
  // }

  render() {
    const { onPressBack } = this.props;
    const { navigate } = this.props.navigation;

    return (
      <Background>
       <Modal visible={this.state.showRulesModal} transparent animationType="slide" 
      onBackdropPress={() => {this.setState({ showRulesModal: false }); global.newUser = false}}
       onRequestClose={() => {this.setState({ showRulesModal: false }); global.newUser = false}}>
         
           <TouchableOpacity style={{ flex:1,width: "100%", height:  "100%", border:"1px solid black"}}
        onPress={() => {this.setState({ showRulesModal: false });global.newUser = false}}
      >
   
      <View
      
      style={{ flexDirection: 'row',flex:1,
      border:"1px solid black",
        alignItems: "center",
             justifyContent: "space-around", textAlign:"center"}}
      >
        <TouchableOpacity onPress={() => {this.setState({ showRulesModal: false });global.newUser = false}} style={{ flexDirection: 'row', flex:0.97,
    height:  "100%",
    
             justifyContent: "center",
     }}
       
      >
      <View   style={{
                 border:"1px solid black",         
              width: "100%",
    height:  "100%",
            }}>
             <TouchableOpacity   onPress={() => {this.setState({ showRulesModal: false });global.newUser = false}} style={{
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
                           // source={cross}
                        />
</TouchableOpacity >
                          <Image
                           style={{
                            border:"1px solid black",
                            // flex:1,
                            // alignItems: "center",
                             margin:0,padding:0,
              width: "100%",
    height:  "100%",
   // resizeMode: 'contain'
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
         <Modal
          visible={this.state.confirmationModal}
          transparent
          animationType="slide"
        >
          <View
            style={{
              width: "100%",
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.6)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "95%",
                padding: 10,
                backgroundColor: "white",
                borderRadius: 10,
                // alignItems: "center",
              }}
            >
              <Text style={{ width: "100%" , color:"black"}}>
                Please confirm that all request details are correct
              </Text>
              <CheckBox
                checked={this.state.confirmed}
                onPress={() =>
                  this.setState({ confirmed: !this.state.confirmed })
                }
              />
              <View
                style={{ width: "100%", marginTop: 20, alignItems: "center" }}
              >
                <TouchableOpacity
                  onPress={this.handleConfirmation}
                  style={{
                    width: "100%",
                    padding: 15,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#01D298",
                    borderRadius: 10,
                    marginTop: 20,
                    opacity: this.state.confirmed ? 1 : 0.5,
                  }}
                  disabled={!this.state.confirmed}
                >
                  <Text style={{ color: "white" }}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>{
                    updateHistory(this.state.curuser,"CancelRequest",null )
                    this.setState({
                      confirmationModal: false,
                      confirmed: false,
                    })
                  }
                  }
                  style={{ marginTop: 20 , paddingRight:20, paddingLeft:20}}
                >
                  <Text style={{ color: "red" }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.containerStyle}>
          <Header
            leftComponent={{
              icon: "md-menu",
              type: "ionicon",
              color: colors.Black,
              size: 35,
              component: TouchableWithoutFeedback,
              onPress: () => {
                this.props.navigation.toggleDrawer();
              },
            }}
            centerComponent={<Text style={styles.headerTitleStyle}></Text>}
            containerStyle={styles.headerStyle}
            innerContainerStyles={styles.inrContStyle}
          />
          <ScrollView style={styles.main} keyboardShouldPersistTaps="always">
            <View style={styles.contentStyle}>
              {this.state.currentStep == 1 ? (
                <Category
                  ref={(category) => {
                    this.category = category;
                  }}
                  onHelpClick1={this.onHelpClick}
                  selectedItems={this.state.selectedCategories}
                  onStepSubmit={this.handleCategorySubmit}
                ></Category>
              ) : null}
              {this.state.currentStep == 2 ? (
                <Place
                  ref={(place) => {
                    this.place = place;
                  }}
                  isDating={this.state.isDating}
                  place={this.state.place}
                  onAdd={(val) => this.handleAddPlaceSubmit(val)}
                  onStepSubmit={this.handlePlaceSubmit}
                  locationName={this.state.locationName}
                  setLocationName={(val) =>
                    this.setState({ locationName: val })
                  }
                ></Place>
              ) : null}
              {this.state.currentStep == 3 ? (
                <Details
                  setImages={(val) =>
                    this.setState({
                      imagesEvent: [...this.state.imagesEvent, val],
                    })
                  }
                  images={this.state.imagesEvent}
                  ref={(details) => {
                    this.details = details;
                  }}
                  title={this.state.title}
                  description={this.state.description}
                      isDating={this.state.isDating}
                  onStepSubmit={this.handleDetailsSubmit}
                ></Details>
              ) : null}
              {this.state.currentStep == 4 ? (
                <Time
                  ref={(time) => {
                    this.time = time;
                  }}
                  time={this.state.time}
                  onStepSubmit={this.handleTimeSubmit}
                ></Time>
              ) : null}
              {this.state.currentStep == 5  ? (
                <Budget
                  ref={(budget) => {
                    this.budget = budget;
                  }}
                  budget={this.state.budget}
                  onStepSubmit={this.handleBudgetSubmit}
                ></Budget>
              ) : null}
              {/* <Details style={styles.step}></Details>
                <Time></Time> */}
            </View>
          </ScrollView>
          <View style={styles.contentStyleIn}>
            <FooterSteps
              onSubmit={this.onFooterSubmitStep}
              onClickStep={this.onClickStep}
              maxStep={this.state.maxStep}
              currentStep={this.state.currentStep}
               isDating={this.state.isDating}
            ></FooterSteps>
             
            {/* <Details style={styles.step}></Details>
                <Time></Time> */}
          </View>
          <View >
          <TouchableOpacity   style={[styles.saveButtomWrapperBorder]}  onPress={this.onFooterSubmitStep}> 
              <TouchableOpacity
                onPress={this.onFooterSubmitStep}
                keyboardShouldPersistTaps="always"
                style={[styles.saveButtomWrapper, { marginRight: 10 }]}
              >
                <View style={styles.saveButton}>
                  <Image
                    style={styles.saveButtonImage}
                    source={require("../../../assets/images/IconNext.png")}
                  ></Image>
                </View>
              </TouchableOpacity>
             </TouchableOpacity> 
              </View>
        </View>
      </Background>
    );
  }
}

const styles = {
  headerStyle: {
    backgroundColor: colors.TRANSPARENT,
    borderBottomWidth: 0,
  },
  footer: {
    // position: 'fixed',
    bottom: 0,
    height: 45,
  },
  step: {},
  main: {
    flex: 1,
    zIndex:0
    // backgroundColor: colors.BLACK,
  },
  headerContainerStyle: {
    backgroundColor: colors.TRANSPARENT,
    borderBottomWidth: 0,

    width: "100%",
  },
  headerInnerContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  inputContainerStyle: {
    backgroundColor: colors.TRANSPARENT,
    borderBottomWidth: 0,
    width: "100%",
  },
  textInputStyle: {
    marginLeft: 0,
  },
  iconContainer: {
    paddingTop: 8,
  },
  gapView: {
    height: 40,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    // nomi fix borderRadius:40
  },
  registerButton: {
    backgroundColor: colors.YELLOW.primary,
    width: 180,
    height: 45,
    borderColor: colors.TRANSPARENT,
    borderWidth: 0,
    marginTop: 30,
    //  nomi fix  borderRadius:8,
    elevation: 0,
  },
  buttonTitle: {
    fontSize: 16,
  },
  inputTextStyle: {
    color: colors.BLACK,
    fontSize: 13,
    marginLeft: 0,
  },
  errorMessageStyle: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 0,
  },
  containerStyle: {
    flex: 1,
  },
  main: { marginTop: 15, marginLeft: 20, marginRight: 20, zIndex:0 },

  mainView: {
    flex: 1,
    backgroundColor: colors.BLACK,
    //marginTop: StatusBar.currentHeight
  },

  loadingcontainer: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  contentStyle: {
    // borderWidth:1,
    // borderColor:"black"
    //    height:20
  },
  contentStyleIn: {
    zIndex:1,
    // borderWidth:1,
    // borderColor:"black"
    //    height:20
  },
   saveButtomWrapper: {
   // margin:50,

      //zIndex:2,
    backgroundColor: "#01d298",
    color: "white",
     position: "absolute",
     right: 0,
    // top: -60,
    borderRadius: 50,
    elevation: 10,
    width: 60,
    height: 60,
    shadowOpacity: 0.75,
    shadowRadius: 10,
    shadowColor: colors.GREY.Deep_Nobel,
    shadowOffset: { height: 1, width: 0 },
    
  },
    saveButtomWrapperBorder: {
     zIndex:4,
    backgroundColor: "transparent",
    // borderColor:"black",
    //  borderWidth:1,
    flex: 1,
    color: "white",
    position: "absolute",
     right: 0,
    bottom:80,
    // borderRadius: 50,
    // elevation: 10,
    width: 70,
    height: 60,
    // shadowOpacity: 0.75,
    // shadowRadius: 10,
    // shadowColor: colors.GREY.Deep_Nobel,
    // shadowOffset: { height: 1, width: 0 },
    
  },
   saveButton: { },
  saveButtonImage: {
    position: "relative",
    top: 5,
    left: 20,

    height: 55,
  },
};