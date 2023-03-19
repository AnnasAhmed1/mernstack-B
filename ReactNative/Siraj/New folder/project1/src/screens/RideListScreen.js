import React from 'react';
import { RideList } from '../components';
import { 
   StyleSheet,
   View,
   Text,
   TouchableWithoutFeedback
  } from 'react-native';
import { Header } from 'react-native-elements';
import { colors } from '../common/theme';
import * as firebase from 'firebase';
import  languageJSON  from '../common/language';

import Background from '../components/Background';
import { updateHistory } from '../common/ScreenTracker';

export default class RideListPage extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            currentUser:firebase.auth().currentUser,
        }
    }

    componentDidMount(){
        this.getMyRides();

        updateHistory(this.state.currentUser.uid,"MyRequests", null )
    }

  //Go to ride details page
  goDetails(item, index){
    if(item && item.trip_cost >0){
        item.roundoffCost = Math.round(item.trip_cost).toFixed(2);
        item.roundoff = (Math.round(item.roundoffCost)-item.trip_cost).toFixed(2);
        this.props.navigation.push('RideDetails',{data:item});
    }else{
        item.roundoffCost = Math.round(item.estimate).toFixed(2);
        item.roundoff = (Math.round(item.roundoffCost)-item.estimate).toFixed(2);
        this.props.navigation.push('RideDetails',{data:item});
    }
    
  }

  //Fetching My Rides
  getMyRides(){
    const ridesListPath=firebase.database().ref('/users/'+this.state.currentUser.uid+ '/my-booking/');
    ridesListPath.on('value',myRidesData=>{
       if(myRidesData.val()){
           var ridesOBJ = myRidesData.val();
           var allRides =[];
           for(let key in ridesOBJ){
               ridesOBJ[key].bookingId = key;
                var Bdate = new Date(ridesOBJ[key].tripdate);
                ridesOBJ[key].bookingDate = Bdate.toDateString();
                ridesOBJ[key].requestTime = Bdate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
                allRides.push(ridesOBJ[key]);   
           }
           if(allRides){
            this.setState({
                myrides:allRides.reverse()
            },()=>{
               
            })
           }
       }
    })
  } 


  render() {
    return (
        <Background style={styles.mainView}>
            <Header 
                backgroundColor={colors.TRANSPARENT}
                leftComponent={{icon:'md-menu', type:'ionicon', color: colors.BLACK, size: 35, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.toggleDrawer();} }}
                centerComponent={<Text style={styles.headerTitleStyle}>{languageJSON.my_requests_menu}</Text>}
                containerStyle={styles.headerStyle}
                innerContainerStyles={{marginLeft:10, marginRight: 10}}
            />
            
            <RideList onPressButton={(item, index) => {this.goDetails(item, index)}} data ={this.state.myrides}></RideList>
        </Background>
        );
    }
}

const styles = StyleSheet.create({
    headerStyle: { 
         backgroundColor: colors.TRANSPARENT, 
        borderBottomWidth: 0 
    },
    headerTitleStyle: { 
         color: colors.BLACK,
        fontFamily:'Roboto-Bold',
        fontSize: 20
    },
    containerView:{ flex:1 },
    textContainer:{textAlign:"center"},
    mainView:{ 
        flex:1, 
        backgroundColor: colors.WHITE, 
        //marginTop: StatusBar.currentHeight 
    } 
});
