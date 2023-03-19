import React, { Component } from "react";
import {
View,
StyleSheet,
Text,
TouchableOpacity,
FlatList,
KeyboardAvoidingView,
Dimensions,
Keyboard,
TouchableWithoutFeedback,
StatusBar,
TextInput,
AsyncStorage
} from "react-native";
import { colors } from "../common/theme";
import { Icon, Header} from "react-native-elements";
import * as firebase from 'firebase'
import { RequestPushMsg } from '../common/RequestPushMsg';
var { height } = Dimensions.get('window');
import  languageJSON  from '../common/language';
import BackNav from '../components/BackNav'
import NotificationNav from '../components/NotificationNav'

const VisibilitySensor = require('react-visibility-sensor');




export default class OnlineChat extends Component {
  getParamData;
  constructor(props) {
      super(props);
      
      this.state = {
        search: "",
        text: "",
        data:"" ,
        tempData: [],
        persons: [],
        messages: [],
        driverName:global.firstName + " " + global.lastName,
        driverPhoto: global.photo,
        inputmessage:"",
        messegeData:[],
        user:"",
        flag:false,
        position: 'absolute', 
        paddingHeight:0,
        messageCntHeight:height-150,
        tripData:"",
        idFound:false,
        id:"",
        carbookedInfo:"",
        allChat:[],
        firstName: undefined,
        lastName:undefined,
        photo: undefined,
        name:null

      };
       //this.onChange = this.onChange.bind(this);
  }

  componentDidMount(){
    this.getChat()
   this.setState({name: firebase.auth().currentUser.displayName, 
    nameOftheOtherPerson: this.getParamData.nameOftheOtherPerson
   })

const rider=String(this.getParamData.mainKey).split(',')[0];
   let connectedFlag=firebase.database().ref(`users/`+rider+"/connected" )
    
   connectedFlag.on('value',mmm=>{
         //console.log("msgData",msgData.val());
         let rootEntry=mmm.val();
         this.setState({connected:rootEntry})
         
 })


  }

chatData(allChat){
  // alert(this.state.allChat.length)
   console.log("My all chats are here",this.state.allChat);
  }

  getChat= i => {
        this.getParamData = this.props.navigation.getParam('passData');
       // alert(this.getParamData.bookingId)
       let totalId=this.getParamData.mainKey
      // alert(this.getParamData.bookingId)
        let msgData=firebase.database().ref(`chat/`+this.getParamData.bookingId + '/message'+ '/' + totalId)
        msgData.on('value',msgData=>{
                //console.log("msgData",msgData.val());
                let rootEntry=msgData.val();
                let allMessages=[]
                for(let key in rootEntry){
                 
                        //console.log("root entry",rootEntry[key]);
                        let entryKey=rootEntry[key]

                         entryKey.smsId=key
                        allMessages.push(entryKey)
                        
                }
                //console.log(allMessages);
             
                this.setState({allChat:allMessages.reverse()},()=>{
                  this.chatData(this.state.allChat)
                })
                
        })

        this.keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        this._keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        this._keyboardDidHide,
        );
}


componentWillUnmount() {
  this.keyboardDidShowListener.remove();
  this.keyboardDidHideListener.remove();
   firebase.database().ref('chat-sum'+ '/' +this.getParamData.bookingId + '/'+ 'message' + '/' + this.getParamData.mainKey).update({
              helperNewMessages:0,
              helperActive:true
            }).then(()=>{})
}

_keyboardDidShow= (e)=> {
  //console.log(e.endCoordinates.height);
  if (this.state.position !== 'relative') {
  this.setState({
  position: 'relative',paddingHeight:e.endCoordinates.height
  },()=>{
  console.log(this.state.paddingHeight)
  })
  }
}

_keyboardDidHide =(e) =>{
        if (this.state.position !== 'absolute') {
          this.setState({
            position: 'absolute',paddingHeight:0
          },()=>{
          })
        }
}


sendMessege(inputmessage){
 
        if(inputmessage == '' || inputmessage == undefined || inputmessage == null){
                alert(languageJSON.chat_blank);
        }else{
              let bookingData=firebase.database().ref('bookings/'+this.getParamData.bookingId)
              bookingData.once('value',response => {
                  if(response.val()){
                          this.setState({carbookedInfo:response.val()},()=>{  
                          let currentUserUid=firebase.auth().currentUser.uid
                          var today = new Date();
                          var time = today.getHours() + ":" + today.getMinutes();
                          //console.log(time);
                          var dd = String(today.getDate()).padStart(2, '0');
                          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                          var yyyy = today.getFullYear();
                          today = mm + ':' + dd + ':' + yyyy;
                          //console.log(today)
                          let customer=this.state.carbookedInfo.customer;
                          let driver=currentUserUid
                          let totalId=this.state.carbookedInfo.customer + ',' + currentUserUid
                          //console.log(totalId);
                          this.setState({id:totalId})
                           
                         // alert(totalId)
                                  //console.log("allChat",allChat);
                                  firebase.database().ref('chat'+ '/' + this.getParamData.bookingId + '/'+ 'message' + '/' + this.getParamData.mainKey).push({
                                    message:inputmessage,
                                    from:currentUserUid,
                                    type:"msg",
                                    msgDate:today,
                                    msgTime:time,
                                    source:"driver",
                                    name: this.state.name,
                                    // name: this.state.driverName,
                                    // isNew: true,
                                    // photo: this.state.driverPhoto ? this.state.driverPhoto: null
                                  })
    //                                const chatsumRoot=firebase.database().ref('chat-sum'+ '/' +this.getParamData.bookingId + '/'+ 'message' + '/' + this.getParamData.mainKey);
    // chatsumRoot.once('value',chatsum=>{
    //      let needHelpNewMessages = 1

    //      if(chatsum.val().needHelpNewMessages)
    //         needHelpNewMessages = chatsum.val().needHelpNewMessages +1
    //       firebase.database().ref('chat-sum'+ '/' +this.getParamData.bookingId + '/'+ 'message' + '/' + this.getParamData.mainKey).update({
    //           needHelpNewMessages:needHelpNewMessages,
    //            message:inputmessage,
    //           date: today,
    //           time:time,
    //           driverName: this.state.firstName+ ' ' +this.state.lastName,
    //           photoDriver: this.state.photo
    //         }).then(()=>{})
    // })
              //              let rider = undefined
              //               if
              // (this.state.id)
              //   {
              //       rider = String(this.state.id).split(',')[0]
              //   }
                 //this.sendPushNotification(rider,this.getParamData.bookingId, global.firstName+ " "+ global.lastName + ', sent a messege to you: \n'+inputmessage);
                           
                    }
                    )
                  }
                })
                this.setState({inputmessage:""})   
        }     
}

  renderItem({ item }) {
    return (
                      
          item.source== "driver"? 
          <View>
          <View style={styles.drivermsgStyle}>
          <Text style={styles.msgTextStyle}>{item?item.message: languageJSON.chat_history_not_found}</Text>
          </View>
          <Text style={styles.msgTimeStyle}>{item?item.msgTime:null}</Text>
          </View>
          :
          <View style={{ textAlign:"left"}}>
          <View style={styles.riderMsgStyle}>
          <Text style={styles.riderMsgText}>{item?item.message: languageJSON.chat_history_not_found}</Text>
          </View>
           <Text style={styles.riderMsgTime}>{item?item.msgTime:null}</Text> 
          </View>
                        
    );
  }
  onChange () {
  alert(7)
}

  sendPushNotification(customerUID,bookingId,msg){
    const customerRoot=firebase.database().ref('users/'+customerUID);
    customerRoot.once('value',customerData=>{
        if(customerData.val()){
            let allData = customerData.val()
            RequestPushMsg(allData.pushToken?allData.pushToken:null,msg)
        }
    })
  }

render() {
  return (
    // <VisibilitySensor onChange={this.onChange}>
    <View style={styles.container}>
        <Header 
            backgroundColor={colors.WHITE}
            leftComponent={<BackNav navigation={this.props.navigation}/>}
            rightComponent = {<View><Text style={styles.connectedLable}>{this.state.nameOftheOtherPerson}</Text><Text style={styles.connectedSubLable}> {this.state.connected? " connected": ""}</Text></View>}
            centerComponent={<Text style={styles.headerTitleStyle}>{languageJSON.chat}</Text>}
            containerStyle={styles.headerStyle}
            innerContainerStyles={styles.inrContStyle}
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content" 
             outerContainerStyles={[styles.headerOuterContainer]}
            containerStyle={{
              justifyContent: 'space-around',
            

            }}
        /> 
      
      <FlatList
        data={this.state.allChat}
        renderItem={this.renderItem}
        inverted
      />
      
      <KeyboardAvoidingView >
        <View style={styles.footer}>
          <TextInput
            value={this.state.inputmessage}
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder={languageJSON.type_messege}
            onChangeText={text => this.setState({ inputmessage: text })}
          />
         
          <TouchableOpacity onPress={() => this.sendMessege(this.state.inputmessage)}>
            <Text style={styles.send}>{languageJSON.send}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
    // </VisibilitySensor>
  );
}

}
//Screen Styling
const styles = StyleSheet.create({
container: {
flex: 1,
backgroundColor:"#F8F8F8",
//marginTop: StatusBar.currentHeight,
},
container1:{
height:height-150
},
container2:{
bottom:0,
left:0,
right:0,
borderTopWidth:StyleSheet.hairlineWidth
},
backIconStyle: {
alignSelf:'flex-start',
marginLeft:20
},
contentContainerStyle: {
flexGrow: 1
},
headerTitleStyle: { 
  color: colors.BLACK,
  fontSize: 18,
  textAlign:'center',
},
headerStyle: { 
  height:100,
  backgroundColor: colors.BLACK, 
  borderBottomWidth: 0 ,
  flex:1
},

inrContStyle:{
  marginLeft:10, 
  marginRight: 10,
  zIndex:1
},
row: {
  flexDirection: 'row',
  padding: 20,
  borderBottomWidth: 1,
  borderBottomColor: '#eee'
},
avatar: {
  borderRadius: 20,
  width: 40,
  height: 40,
  marginRight: 10
},
rowText: {
  flex: 1
},
message: {
  fontSize: 18
},
sender: {
  fontWeight: 'bold',
  paddingRight: 10
},
footer: {
  flexDirection: 'row',
  backgroundColor: 'white',
  paddingBottom:35,
  marginTop:15,
  borderTopLeftRadius:15,
  borderBottomLeftRadius:15,
},
input: {
  paddingHorizontal: 20,
  fontSize: 18,
  flex: 1,
   borderTopLeftRadius:15,
  borderBottomLeftRadius:15,
},
send: {
  alignSelf: 'center',
  color: colors.GREEN2,
  fontSize: 16,
  fontWeight: 'bold',
  padding: 20
},
drivermsgStyle:{
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
msgTextStyle:{
  marginStart:15,
  marginEnd:15,
  marginTop:15,
  marginBottom:15,
  textAlign:"right",
  fontSize:18,
  color:"#fff"
},
msgTimeStyle:{
  marginStart:15,
  marginBottom:10,
  marginEnd:15,
  textAlign:"right",
  fontSize:12,
  color: colors.GREY.default
},
riderMsgStyle:{
 
  backgroundColor:"#fff",
  marginBottom:10,
  marginTop:10,
  marginRight:10,
  marginLeft:30,
  //borderRadius:20,
  //shadowOpacity: 0.75,
  borderBottomLeftRadius:15,
  borderBottomRightRadius:15,
  borderTopRightRadius:15,
  borderTopLeftRadius:0,
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
riderMsgText:{
   marginStart:15,
  marginEnd:15,
  marginTop:15,
  marginBottom:15,
  textAlign:"left",
  fontSize:18,
  color:"grey",
  marginTop:10
},
riderMsgTime:{
   marginStart:15,
  marginBottom:10,
  marginEnd:15,
  textAlign:"left",
  fontSize:12,
  color: colors.GREY.default
},
headerOuterContainer:{
  height:150
},
connectedLable: { 
  color: colors.BLACK,
  fontSize: 13,
  textAlign:'center',
  minWidth:100
 
},
connectedSubLable: { 
  color: colors.GREY.Deep_Nobel
 
},
});