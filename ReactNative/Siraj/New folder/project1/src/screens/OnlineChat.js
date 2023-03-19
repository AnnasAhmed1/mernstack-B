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
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  AsyncStorage
} from "react-native";
import { colors } from "../common/theme";
import { Icon,Header} from "react-native-elements";
import * as firebase from 'firebase'
import  languageJSON  from '../common/language';
var {  height } = Dimensions.get('window');
import { RequestPushMsg } from '../common/RequestPushMsg';
import Background from '../components/Background';
import BackNav from '../components/BackNav'

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
        driverName:"",
        inputmessage:"",
        messegeData:[],
        user:"",
        flag:false,
        position: 'absolute', 
        paddingHeight:0,
        messageCntHeight:height-150,
        carbookedInfo:"",
        id:"",
        chat:false,
        allChat:[],
        messegesData:[],

        firstName: undefined,
        lastName:undefined,
        photo: undefined,
        rider:null,
        driver:null,
        name:null

    };
  }
 
   
saveOnChatScreen(mainKey){
       firebase.database().ref('users/' + this.state.rider).update({
                  onChatScreen: mainKey
            }).then(()=>{ return 1}).catch(function(error) {
  console.log("Data could not be saved." + error);
});

  }


   componentDidMount() {
      
    this.getParamData =  this.props.navigation.getParam('passData');
  
    this.setState({
      rider:String(this.getParamData.mainKey).split(',')[0], 
      driver: String(this.getParamData.mainKey).split(',')[1],
      nameOftheOtherPerson: this.getParamData.nameOftheOtherPerson
      }, () => {
    this.saveOnChatScreen(this.getParamData.mainKey)

    let connectedFlag=firebase.database().ref(`users/`+this.state.driver+"/connected" )
    
    connectedFlag.on('value',mmm=>{
          //console.log("msgData",msgData.val());
          let rootEntry=mmm.val();
          this.setState({connected:rootEntry})
          
  })
});

this.setState({name: firebase.auth().currentUser.displayName})
//   firebase.database().ref('users/' + String(this.getParamData.mainKey).split(',')[0]).update({
//                   onChatScreen: this.getParamData.mainKey
//             }).then(()=>{ return 1}).catch(function(error) {
//   console.log("Data could not be saved." + error);
// });


    let bookingData=firebase.database().ref('bookings/'+this.getParamData.bookingId)
    bookingData.on('value',response => {
      if(response.val()){
        this.setState({carbookedInfo:response.val()})
      }
    })

 //   AsyncStorage.multiGet(['firstName', 'lastName', 'photo']).then((data) => {
  //  let firstName = data[0][1];
  //  let lastName = data[1][1];
   // let photo = data[2][1];
    //this.setState({firstName:firstName, lastName:lastName, photo:photo})
    // if (email !== null)
        //Your logic
//});
    //totalId = rider + driver
   // let totalId=this.getParamData.customer + ',' + firebase.auth().currentUser.uid + '/' + totalId
    let msgData=firebase.database().ref(`chat/`+this.getParamData.bookingId + '/message/'+ this.getParamData.mainKey)
    
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
             
                this.setState({allChat:allMessages.reverse()},()=>{
                 // this.chatData(this.state.allChat)
                })
                
        })


    
    
    
    // msgData.on('value',msgData=>{
      
    //         let rootEntry=msgData.val();
    //         let allMesseges=[]
    //         for(let key in rootEntry){
    //                 let entryKey=rootEntry[key]
    //                 for(let msgKey in entryKey){
    //                         entryKey[msgKey].smsId=msgKey
    //                         allMesseges.push(entryKey[msgKey])
    //                 }
                    
    //         }
           
    //         this.setState({allChat:allMesseges})       
    // })
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
    this.saveOnChatScreen(null)
      firebase.database().ref('chat-sum'+ '/' +this.getParamData.bookingId + '/'+ 'message' + '/' + this.getParamData.mainKey).update({
              needHelpNewMessages:0
            }).then(()=>{})
  }
  _keyboardDidShow= (e)=> {
    console.log(e.endCoordinates.height);
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
    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = mm + ':' + dd + ':' + yyyy;

    let customer=this.state.carbookedInfo.customer;
    let driver=this.state.carbookedInfo.driver
    let totalId=this.state.carbookedInfo.customer + ',' + this.state.carbookedInfo.driver
    console.log(totalId);
    this.setState({id:totalId})

    if(inputmessage == '' || inputmessage == undefined || inputmessage == null){
      alert("Please write something...");
    }else{
  
        // let allChat=chat.val();
        // for(let key in allChat){
        //   if(this.getParamData.bookingId == key){
        //     this.setState({chat:true})
        //   }
        // }
        // if(this.state.chat == true){
        //   firebase.database().ref('chat'+ '/' +this.getParamData.bookingId + '/'+ 'message' + '/' + this.getParamData.mainKey).push({
        //     message:inputmessage,
        //     from:this.state.carbookedInfo.customer,
        //     type:"msg",
        //     msgDate:today,
        //     msgTime:time,
        //     source:"rider"
        //   })
        // } 
        // else{
          // firebase.database().ref('chat'+ '/' +this.getParamData.bookingId + '/').update({
          //    // distance:this.state.carbookedInfo.distance,
          //     //car:this.state.carbookedInfo.carType,
          //     bookingId:this.getParamData.bookingId
          //   }).then(()=>{
           // alert(inputmessage)
            firebase.database().ref('chat'+ '/' +this.getParamData.bookingId + '/'+ 'message' + '/' + this.getParamData.mainKey).push({
                message:inputmessage,
                from:this.state.carbookedInfo.customer,
                type:"msg",
                msgDate:today,
                msgTime:time,
                source:"rider",
                name: this.state.name,
                //photo: this.state.driverPhoto ? this.state.driverPhoto: null,
                isNew: true
              })

               let driver= undefined
           
              if
              (this.getParamData.mainKey)
                {
                    driver = String(this.getParamData.mainKey).split(',')[1]
                }





             
             // this.sendPushNotification(driver,this.getParamData.bookingId, global.firstName+ " "+ global.lastName + ', sent a messege to you: \n'+inputmessage);
       // })
        // }
    
    this.setState({inputmessage:""});
  }
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
renderItem({ item }) {
  return (
                    
    item.source == "rider"? 
    <View style={styles.drivermsgStyle}>
    <Text style={styles.msgTextStyle}>{item?item.message:languageJSON.chat_not_found}</Text>
    <Text style={styles.msgTimeStyle}>{item?item.msgTime:null}</Text>
    </View>
    :
    <View style={styles.riderMsgStyle}>
    <Text style={styles.riderMsgText}>{item?item.message:languageJSON.chat_not_found}</Text>
    <Text style={styles.riderMsgTime}>{item?item.msgTime:null}</Text> 
    </View>
                      
  );
}



render() {
  return (
     <Background>
    <View style={styles.container}>
        <Header 
            backgroundColor={'#EEE'}
            leftComponent={<BackNav navigation={this.props.navigation}/>}
            centerComponent={<Text style={styles.headerTitleStyle}>{languageJSON.chat_title}</Text>}
            rightComponent={<View><Text style={styles.connectedLable}>{this.state.nameOftheOtherPerson}</Text><Text style={styles.connectedSubLable}> {this.state.connected? " connected": ""}</Text></View>}
            innerContainerStyles={styles.inrContStyle}
            statusBarProps={{ barStyle: 'light-content' }}
            barStyle="light-content" 
         

            containerStyle={styles.headerStyle}
           
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
            placeholder={languageJSON.chat_input_title}
            onChangeText={text => this.setState({ inputmessage: text })}
          />
         
          <TouchableOpacity onPress={() => this.sendMessege(this.state.inputmessage)}>
            <Text style={styles.send}>{languageJSON.send_button_text}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
    </Background>
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
connectedLable: { 
  color: colors.BLACK,
  fontSize: 12,
  textAlign:'center',
  minWidth:100
 
},
connectedSubLable: { 
  color: colors.GREY.Deep_Nobel
 
},
headerStyle: { 
  backgroundColor: colors.transparent, 
  borderBottomWidth: 0 ,

},

inrContStyle:{
  marginLeft:10, 
  marginRight: 10,
  
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
} ,
drivermsgStyle:{
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
msgTextStyle:{
   marginStart:15,
  marginEnd:15,
  marginTop:15,
  marginBottom:15,
  textAlign:"left",
  fontSize:18,
  color:"grey",
  marginTop:10
},
msgTimeStyle:{
  marginStart:15,
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
  color: "white"
}
});
