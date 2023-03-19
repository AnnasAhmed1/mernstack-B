
import {TouchableOpacity, View, Image,Modal,TouchableHighlight, Text} from "react-native";
import { Icon, Header} from "react-native-elements";
import React from 'react';
import notIcon from '../../../assets/images/chat-bubble.png';
import Drawer from 'react-native-drawer'
import NotificationsModal from '../components/NotificationsModal'
 import ControlPanel from './ControlPanel'
import NotificationContent from './NotificationContent'
import { colors } from "../common/theme";
import * as firebase from "firebase";



export default class NotificationNav extends React.Component {

   constructor(props){
     super(props)
   }

   state={
    drawerOpen: false,
    drawerDisabled: false,
    numOfMessages:0
  };
  closeDrawer = () => {
     this.setState({ drawerOpen: false })
    this._drawer.close()
  };
  openDrawer = () => {
    //this._drawer.open()
    this.setState({ drawerOpen: true })
  };


  componentDidMount(){
        let msgData=firebase.database().ref(`user_notifications/`+firebase.auth().currentUser.uid )
        .orderByChild('isNew')
        .equalTo(true);
        msgData.on('value',msgData=>{
                //console.log("msgData",msgData.val());
                var nom = 0
                let rootEntry=msgData.val();
              ///  alert(rootEntry)
              if(rootEntry)
              nom = 1
                if(rootEntry && rootEntry.length)
                {
                  // alert(rootEntry.length)
                   nom = rootEntry.length
                   
                }
                this.setState({ numOfMessages: nom })
                   
        })
  }

  render() {
         const { width, height } = this.props;
       //   const { drawerOpen } = this.state;
  return (
    <View style={{ justifyContent: 'center',
                   alignSelf: 'stretch',
                   alignItems:"center",
                   flex:1}}>
    <Text>{this.state.drawerOpen}</Text>
     {/* { this.state.numOfMessages > 0?  */}
     <TouchableOpacity onPress={this.openDrawer} 
    >
<View  >
{/* <Image  style={{width:35, height:45,  elevation: 60,
    shadowOpacity: 4.75,
    shadowRadius: 30,
    shadowColor: colors.GREY.Deep_Nobel,
    shadowOffset: { height: 10, width: 0 }, */}
<Image     style={{width:this.props.screen == "map" ?49: 35, 
                height:this.props.screen == "map" ?63: 45,
                position:"relative",
                top:-3,
                alignSelf: 'stretch', 
                alignItems:"center",
                justifyContent:"flex-end",
                justifyContent: 'center',
                shadowOffset: { height: 1, width: 0 }}}
                source={notIcon}
                    />
                    <View  style={{
     position:"absolute",
     left:this.props.screen== "map"?18:13,
    // flexDirection:"row",
     justifyContent:"flex-end",
    
     top:this.props.screen== "map"?8: 6,
    //  right:2,
    fontSize: 16,
    color: colors.black,
    fontFamily: "Roboto-Medium",
    //paddingLeft: 1,
  }}>
                     <Text style={{textAlign: 'center', color:"black", 
                     fontSize:this.props.screen == "map" ?20:14}}>{this.state.numOfMessages > 0? this.state.numOfMessages:"" }</Text>
                     </View>
                    </View>
                    </TouchableOpacity>
                    {/* :null
  } */}
      <Modal
      transparent
        visible={this.state.drawerOpen}
         onBackdropPress={() => { this.setState({ drawerOpen: false });}}
        //   visible="true"
           // animationType={'slide'}
          
          //  transparent={true}
            onRequestClose={() => {this.setState({ drawerOpen: false });}}
        >
    <Drawer
        ref={(ref) => this._drawer = ref}
        type="static"
        content={
          <ControlPanel closeDrawer={this.closeDrawer} />
        }
        acceptDoubleTap
        styles={{main: { shadowOpacity: 0.3, shadowRadius: 15}}}
        onOpen={() => {
          console.log('onopen')
          this.setState({drawerOpen: false})
        }}
        onClose={() => {
          console.log('onclose')
           this.setState({drawerOpen: true})
         // this.setState({drawerOpen: false})
        }}
        captureGestures={false}
        tweenDuration={20}
        panThreshold={0.08}
        disabled={this.state.drawerDisabled}
        openDrawerOffset={(viewport) => {
          return 100
        }}
    // closedDrawerOffset={() => 70}
        panOpenMask={0.2}
        negotiatePan
        >
        <NotificationContent navigation={this.props.navigation} closeDrawer = {this.closeDrawer}/>
      </Drawer>
      </Modal>
      </View>
  );
 }
}

const drawerStyles = {
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
   msgBoldStyle: {
     position:"absolute",
     left:18,
    // flexDirection:"row",
     justifyContent:"flex-end",
    
     top:8,
    //  right:2,
    fontSize: 16,
    color: colors.black,
    fontFamily: "Roboto-Medium",
    //paddingLeft: 1,
  },
  
         saveButtomWrapper: {
    backgroundColor: "#ecf8f4",
    borderWidth:1,
    borderColor:colors.GREEN2,
  //   //color: "white",
  //   right: 0,
   top: -20,
    width: 50,
   height: 50,
   borderRadius: 50/2,
  //   borderRadius: 50,
   elevation: 40,
  //   width: 60,
  //   height: 60,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: colors.GREY.Deep_Nobel,
    shadowOffset: { height: 1, width: 0 },
    //flex: 1,
  },
}