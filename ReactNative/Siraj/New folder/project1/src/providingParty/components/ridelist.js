import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { Icon, Button } from 'react-native-elements'
var { width, height } = Dimensions.get("window");
import { colors } from '../common/theme';
import  languageJSON  from '../common/language';
import { Currency } from '../common/CurrencySymbol';
import SideMenuHeader from "./SideMenuHeader";
import * as firebase from "firebase";
export default class RideList extends React.Component {

    constructor(props) {
        super(props);
       
    }

    //on press of each item function
    onPressButton(item, index) {
        const { onPressButton } = this.props;
        onPressButton(item, index)
    }

      chat(item){
       // console.log("chat here");
        const { navigate } = this.props.navigate;
        // console.log(this.state.tripInfo);
      
      
      item.mainKey = item.customer + ',' + firebase.auth().currentUser.uid
      item.bookingId = item.bookingUid
      //alert  (   item.mainKey )
      navigate("Chat",{passData:item});
    }

    cancel(item){
            //console.log(helperNewMessages)
   

                     firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/my_bookings/'+item.bookingUid).update({
              status:"CANCELED",
             
            }).then().catch(function(error) {
  console.log("Data could not be saved." + error);
});


                     firebase.database().ref('bookings/' + item.bookingUid +  '/requestedDriver/'+ firebase.auth().currentUser.uid ).update({
              status:"CANCELED",
             
            }).then().catch(function(error) {
  console.log("Data could not be saved." + error);
});

 
    }


    //flatlist return function
    newData = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.iconClickStyle} onPress={() => this.onPressButton(item, index)}>
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
                      showDistance= {false}
                      onPress={() => this.onPressButton(item, index)}
                      //isLink = "true"
                      item={item}
                      headerStyle={styles.myHeader}
                      fName={item.customer_name}
                      lName={""}
                      userPhoto={item.customer_profile_image == "" ? undefined : item.customer_profile_image}
                      //userEmail={this.state.email}
                      userName={item.customer_name}
                    ></SideMenuHeader>
                  </View>
                
                  </View>
                  <View style={styles.dateView}>
                    <Text style={styles.listDate}>
                      {new Date(item.tripdate).toLocaleString()}
                    </Text>
                  </View>
                  {/* <View style={styles.billOptions}>
                    <View style={styles.billItem}>
                      <Text style={styles.billAmount}>
                        {Currency}{" "}
                        {item.estimate > 0
                          ? parseFloat(item.estimate).toFixed(2)
                          : 0}
                      </Text>
                    </View>
                  </View> */}
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
                                         {item.pickup &&  item.pickup.add
                          ? item.pickup.add
                          : ""}
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
                  </View>

                       
                          <Text style={[ styles.statusStyle]}>STATUS: {item.status ? item.status : null} </Text>
 <View style={styles.dateView}>
                    {/* <Text  style={[ styles.goToRequest]}
                      >
                  Go To Request
                     </Text> */}
                  <View style={styles.detailsBtnView}>
                    <View style={{ flex: 1 }}>
                      <Button
                        onPress={() => {
                          this.cancel(item);
                        }}
                        title={languageJSON.cancel}
                        titleStyle={{ width: "100%",
    alignSelf: "center", color:"#ED5E68"}}
                        buttonStyle={styles.myButtonStyle}
                        containerStyle={{
                          flex: 1,
                          alignSelf: "flex-end",
                          paddingLeft: 5,
                        }}
                      />
                    </View>
                    <View style={styles.viewFlex1}>
                      <Button
                        title="View Details"
                        titleStyle={{ width: "100%",
    alignSelf: "center", color:colors.GREEN2}}
                        onPress={(e) => {
                          this.onPressButton(item, index)
                        }}
                        buttonStyle={{
                          backgroundColor: "white",
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
                    </View>
                     <View style={styles.viewFlex1}>
                      <Button
                        title={"Message"+ (item.newMessages? "(" + item.newMessages + ")" : "")}
                        titleStyle={{ width: "100%",
    alignSelf: "center", color:"#3493a8"}}
                        onPress={() => {
                          this.chat(item);
                        }}
                        buttonStyle={{
                          width: height / 7,
                          padding: 2,
                          borderColor: "#3493a8",
                          borderWidth: 1,
                          borderRadius: 10,
                          color:"black", 
                          backgroundColor: "#fff",
                          marginLeft:10
                        }}
                        containerStyle={{
                          flex: 1,
                          alignSelf: "flex-start",
                          paddingLeft: 5,
                        }}
                      />
                    </View>
                  </View>
                </View>

                 

              </View>
               
                  </TouchableOpacity>
        )
    }

    render() {
        const { data } = this.props;
        return (
            <View style={styles.textView3}>
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={data}
                    renderItem={this.newData}
                />
            </View>
        );
    }
};

//style for this component
const styles = StyleSheet.create({
    textStyle: {
        fontSize: 18,
    },
    fareStyle: {
        fontSize: 18,
    },
    carNoStyle: {
        marginLeft: 45,
        fontSize: 13,
        marginTop: 10
    },
    picupStyle: {
        flexDirection: 'row',
    },
    picPlaceStyle: {
        color: colors.GREY.secondary
    },
    dropStyle: {
        flexDirection: 'row',
    },
    drpIconStyle: {
        color: colors.RED,
        fontSize: 20
    },
    dropPlaceStyle: {
        color: colors.GREY.secondary
    },
    greenDot: {
        alignSelf: 'center',
        borderRadius: 10,
        width: 10,
        height: 10,
        backgroundColor: colors.GREEN.default
    },
    redDot: {
        borderRadius: 10,
        width: 10,
        height: 10,
        backgroundColor: colors.RED

    },
    logoStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    iconClickStyle: {
        flex: 1,
        flexDirection: 'row'
    },
    flexViewStyle: {
        flex: 7,
        flexDirection: 'row',
        borderBottomColor: colors.GREY.secondary,
        borderBottomWidth: 1,
        marginTop: 10,
        marginLeft: 5
    },
    dateStyle: {
        fontFamily: 'Roboto-Bold',
        color: colors.GREY.default
    },
    carNoStyle: {
        fontFamily: 'Roboto-Regular',
        fontSize: 12,
        marginTop: 8,
        color: colors.GREY.default
    },
    placeStyle: {
        marginLeft: 10,
        fontFamily: 'Roboto-Regular',
        fontSize: 16,
        alignSelf: 'center'
    },

     statusStyle: {
       marginLeft:10,
        marginTop:0,
        marginBottom:0,
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        fontWeight:"bold"
       
    },
        goToRequest: {
       marginLeft:10,
       color: '#3493a8',
       textDecorationLine: "underline",
        marginTop:10,
        marginBottom:10,
        fontFamily: 'Roboto-Regular',
        fontSize: 17,
        fontWeight:"bold",
        
       
    },
    textViewStyle: {
        marginTop: 10,
        marginBottom: 10
    },
    cancelImageStyle: {
        width: 50,
        height: 50,
        marginRight: 20,
        marginTop: 10,
        alignSelf:'flex-end'
    },
    iconViewStyle: {
         marginTop: 10,
        
    },
    textView1: {
        flex: 5
    },
    textView2: {
        flex: 2
    },
    textView3: {
        flex: 1
    },
    position: {
        marginTop: 20
    },
    textPosition: {
        alignSelf: 'center'
    },
    mapDetails: {
    backgroundColor: colors.WHITE,
    flex: 1,
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
   fixAdressStyle: {
    flexDirection: "row",
    alignItems: "center",
  },
  myButtonStyle: {
    backgroundColor: "#fff",
    marginRight:10,
    width: height / 7,
    padding: 2,
    borderColor: "#ED5E68",
    borderWidth: 1,
    borderRadius: 10,
    elevation: 0,
  },
    billOptions: {
    marginTop: 10,
    marginLeft: 10,
    textAlign: "left",
  },
  billAmount: {
    textAlign: "left",
  },
  addressViewStyle: {
    flex: 2,
    paddingLeft: 10,
    marginTop: 10,
  },
    viewFlex1: {
    flex: 1,
  },
   detailsBtnView: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    width: width,
    marginTop: 20,
    marginBottom: 20,
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
  addressViewTextStyle: {
    color: colors.GREY.secondary,
    fontSize: 15,
    marginLeft: 15,
    lineHeight: 24,
    flexWrap: "wrap",
  },

});





    
                 {/* <View style={styles.iconViewStyle}>
                  {/*  <Icon
                        name='car-sports'
                        type='material-community'
                        color={colors.DARK}
                        size={35}
                    />*/}
                {/* </View> 
                <View style={styles.flexViewStyle}>
                    <View >

                        <Text style={[styles.textStyle, styles.dateStyle]}>{new Date(item.tripdate).toLocaleString()}</Text>
                     <Text style={[styles.textStyle, styles.carNoStyle]}>{item.title ? item.title : null} </Text>
                        <View style={[styles.picupStyle, styles.position]}>
                          {/*   <View style={styles.greenDot} />*/}
                           
                    //         <Text style={[styles.picPlaceStyle, styles.placeStyle]}>{item.pickup && item.pickup.add ? item.pickup.add : ""}</Text>
                    //     </View>
                       
                    //      <Text style={[ styles.statusStyle]}>{item.status ? item.status : null} </Text>
                        
                        
                        
                    //     {/* <View style={[styles.dropStyle, styles.textViewStyle]}>
                    //         <View style={[styles.redDot, styles.textPosition]} />
                    //         <Text style={[styles.dropPlaceStyle, styles.placeStyle]}>{item.drop.add ? item.drop.add : ""}</Text>
                    //     </View> */}

                    // </View>
                    // <View style={styles.textView2}>
                    //     <Text style={[styles.fareStyle, styles.dateStyle]}>{item.status == 'END' && item.payment_status == 'PAID' ? item.trip_cost > 0 ? Currency + parseFloat(item.trip_cost).toFixed(2) : Currency + parseFloat(item.estimate).toFixed(2) : null}</Text>
                    //     {
                    //         item.status == 'CANCELLED' ?
                    //             <Image
                    //                 style={styles.cancelImageStyle}
                    //                 source={require('../../../assets/images/cancel.png')}
                    //             />
                    //             :
                    //             null
                    //     }
                    // </View>
                // </View> */} */}