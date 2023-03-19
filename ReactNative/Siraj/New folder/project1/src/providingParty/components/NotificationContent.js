import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ImageBackground,
  Image,
  FlatList
} from 'react-native'
import PropTypes from 'prop-types'
import cross from '../../../assets/images/cancelModal.png';
import * as firebase from "firebase";
import { colors } from "../common/theme";
import React, { Component } from "react";
import { NavigationActions } from 'react-navigation';

export default class NotificationContent extends Component {

constructor(props){
  super(props)
  this.state={
    allNotifications:[],
    navigation:this.props.navigation

  }
this.editProfile = this.editProfile.bind(this);
//alert(this)
}

  static contextTypes = {
    drawer: PropTypes.object.isRequired
  };

  componentDidMount() {
   

    this.getNotifications()
  }

  componentWillMount(){
      let date1 = new Date();
    firebase.database().ref('screen_clicks_history'+ '/' +firebase.auth().currentUser.uid ).push({
              screen:"Notifications",
              clickedDate:date1.toLocaleString(),
            }).then().catch(function(error) {
     console.log("Data could not be saved." + error);
     });
  }

  editProfile = ({ item }) => {
    alert(5)
  }

  

 renderItem({ item }) {
  //  const { navigation } = this.props;
   //alert(item.link)
  return (
                    
   
     item.side == "providing"? 
       <TouchableOpacity   
       onPress={() =>{
let params = {}
if(item.params){
  
  for(let param in item.params) {
   if(param)
    params[param] = item.params[param]
    //alert(param)
   
  }
}
//this.props.navigation.popToTop();
if( !global.providingPartyMode)
{
global.providingPartyMode = true

this.props.navigation.navigate('DriverRoot');

}

this.props.navigation.navigate(item.link,{passData:params})
this.props.closeDrawer();
// else{
//  this.props.navigation.navigate(item.link,{passData:params})
// }


        }}
                 >
       <View style={{backgroundColor: item.isNew? "#fff": "#ecf8f4", marginTop:20,marginRight:20, marginLeft:20 ,paddingtop:10,paddingBottom:10,  borderBottomLeftRadius:15,
  borderBottomRightRadius:15,
  borderTopRightRadius:15,
  borderTopLeftRadius:15}}> 
     <Text style={styles.msgTimeStyle}>{item?item.dateMsg:null}</Text>
    <Text style={styles.msgTextStyle}>{item?item.message:languageJSON.chat_not_found}</Text>
    <Text style={styles.msgTextStyle}>{item? item.extendedMessage:languageJSON.chat_not_found}</Text>
    
   
    </View>
     </TouchableOpacity>
    :
     <TouchableOpacity  onPress={() =>{
let params = {}
if(item.params){
  
  for(let param in item.params) {
   if(param)
    params[param] = item.params[param]
   
  }
}

let paramsWrapper = {passData:params};
//alert(item.params.requestID)

if(item.type === "MyRequest")
{

   firebase
.database()
.ref('users/' +firebase.auth().currentUser.uid  +'/my-booking/' + item.params.requestID + '/')
.once('value', data => {
  request = data.val();
  request.roundoffCost = Math.round(request.trip_cost).toFixed(2);
  request.roundoff = (Math.round(request.roundoffCost)-request.trip_cost).toFixed(2);
  var Bdate = new Date(request.tripdate);
  request.bookingDate = Bdate.toDateString();
  
  request.bookingId = item.params.requestID;
  paramsWrapper = {data: request}
})
}
if( global.providingPartyMode)
{
global.providingPartyMode = false

this.props.navigation.navigate('Root');

}
this.props.navigation.navigate(item.link,paramsWrapper)
this.props.closeDrawer();


        }} >
    <View style={{backgroundColor: item.isNew? "#fff": "#ecf8f4", marginTop:20,marginRight:20, marginLeft:20 ,paddingtop:10,paddingBottom:10,  borderBottomLeftRadius:15,
  borderBottomRightRadius:15,
  borderTopRightRadius:15,
  borderTopLeftRadius:15}}>
    <Text style={styles.msgTimeStyle}>{item?item.dateMsg:null}</Text> 
    <Text style={styles.msgTextStyle}>{item?item.message:languageJSON.chat_not_found}</Text>
     <Text style={styles.msgTextStyle}>{item? item.extendedMessage:languageJSON.chat_not_found}</Text>
    
    </View>
     </TouchableOpacity>

    
    )
    
}

 getNotifications() {
   //this.props.navigation.push("DriverTripAccept")
  
        let msgData=firebase.database().ref(`user_notifications/`+firebase.auth().currentUser.uid ).limitToLast(50)
        // .orderByChild('isNew')
        // .equalTo(true);
        msgData.on('value',msgData=>{
                //console.log("msgData",msgData.val());
                let rootEntry=msgData.val();
                let allMessages=[]
                for(let key in rootEntry){
                 
                        //console.log("root entry",rootEntry[key]);
                        let entryKey=rootEntry[key]

                         //entryKey.smsId=key
                        allMessages.push(entryKey)
                        
                }
                //console.log(allMessages);
                this.setState({allNotifications:allMessages},()=>{
                 // alert(allNotifications.length)
                  //this.chatData(this.state.allChat)
                })
                
        })
       }


  render() {
       const { requestmodalclose, modalvisable, navigation } = this.props;
      // alert(navigation)
    return (
        //   <Modal
        //     visible={modalvisable}
        //     animationType={'slide'}
        //   //  transparent={true}
        //     onRequestClose={requestmodalclose}
        // >
        <ImageBackground 
        
           // source={require('../../../assets/images/bg.png')}
            style={{height:"auto", backgroundColor:"white",
            width:"100%", height:"100%"}}
            //  / resizeMode={Platform.OS == "ios" ? "repeat" : "stretch"}
            > 
      <ScrollView >
       <TouchableOpacity style={styles.button} onPress={this.context.drawer.open}>
            <Image
                          
                           style={{
                          
                           
                            height:30,
                             width:30,
            }}
                            source={cross}
                        />
        </TouchableOpacity>
        {/* <Text style={{marginTop:40, color:"white", fontSize:30,  alignSelf: 'stretch'
        ,  textAlign: "center",
    flex: 1}}>Notifications</Text> */}


     {this.state.allNotifications &&  this.state.allNotifications.length? (
            
         

  <View style={styles.drivermsgStyle}>
  
  <FlatList
        data={this.state.allNotifications}
        renderItem={this.renderItem.bind(this)}
        inverted
         extraData={this.props}
      />


</View>
 ) : <Text style={{color:"black",  fontSize: 16,
    textAlign: "center",
    marginLeft: 10,
    marginTop:30,
    fontFamily: "OpenSans-Semibold"}}>You don't have any notifications right now</Text>}



      </ScrollView>
      </ImageBackground>
    //   </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "#F8F8F8",
    backgroundColor: "#F8F8F8",
    padding: 20,
   
  },
  button: {
    padding: 10,
    marginRight:10,
    marginTop:35,
    justifyContent:"flex-end",
    flexDirection:"row"
  },
   backgroundImage: {
    flex: 1,
    width: "100%",
    height: 2,
  },
  drivermsgStyle:{
    paddingBottom:20,
 backgroundColor:"#ecf8f4",
  marginBottom:10,
  marginTop:10,
  marginRight:10,
  marginLeft:30,
  //borderRadius:20,
  //shadowOpacity: 0.75,
  borderBottomLeftRadius:15,
  borderBottomRightRadius:15,
  borderTopRightRadius:15,
  borderTopLeftRadius:15,
    elevation: 5,
  shadowOpacity: 0.75,
  shadowRadius: 5,
  shadowColor: colors.GREY.Deep_Nobel,
  shadowOffset: { height: 1, width: 0 },
   textAlign:"left",
  width:"90%",
  position: "relative",
  left:-10
},
msgTextStyle:{
   marginStart:15,
  marginEnd:15,
  marginTop:15,
  marginBottom:5,
  textAlign:"left",
  fontSize:13,
  color:"grey",
  marginTop:5
},
msgTimeStyle:{
  marginStart:15,
  marginTop:10,
  marginBottom:10,
  marginEnd:15,
  textAlign:"left",
  fontSize:12,
  color: colors.GREY.default
},
riderMsgStyle:{
 backgroundColor:colors.GREEN2,
  marginBottom:10,
  marginTop:10,
  marginRight:10,
  marginLeft:30,
  //borderRadius:20,
  borderBottomLeftRadius:15,
  borderBottomRightRadius:15,
  borderTopLeftRadius:15,
  elevation: 5,
  shadowOpacity: 0.75,
  shadowRadius: 5,
  shadowColor: colors.GREY.Deep_Nobel,
  shadowOffset: { height: 1, width: 0 },
},
riderMsgText:{
   marginStart:15,
  marginEnd:15,
  marginTop:15,
  marginBottom:15,
  textAlign:"right",
  fontSize:18,
  color:"#fff"
},
riderMsgTime:{
  marginStart:15,
  marginBottom:10,
  marginEnd:15,
  textAlign:"right",
  fontSize:12,
  paddingTop:7,
  color: colors.GREY.default
}
})