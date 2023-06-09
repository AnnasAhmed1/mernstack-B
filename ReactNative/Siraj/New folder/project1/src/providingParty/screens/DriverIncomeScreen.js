import React from 'react';
import { Header } from 'react-native-elements';
import { colors } from '../common/theme';
import { 
    StyleSheet,
    View,
    Text,
    StatusBar,
    ScrollView,
    TouchableWithoutFeedback,
    Dimensions,
    Image
  } from 'react-native';
  var {width} = Dimensions.get('window');
  import * as firebase from 'firebase';
  import  languageJSON  from '../common/language';
  import  {Currency}  from '../common/CurrencySymbol';
  import Background from '../components/Background';
import { Colors } from 'react-native/Libraries/NewAppScreen';
export default class DriverIncomePage extends React.Component {
    constructor(props){
        super(props);
        this.state={}
        
    }
  
    componentDidMount(){
        let userUid = firebase.auth().currentUser.uid;
        let ref = firebase.database().ref('bookings/');
        ref.once('value',allBookings=>{
            if(allBookings.val()){
                let data = allBookings.val();
                var myBookingarr = [];
                for(let k in data){  
                    if(data[k].driver == userUid){
                        data[k].bookingKey = k
                        myBookingarr.push(data[k])
                    }
                }

                if(myBookingarr){ 
                    this.setState({myBooking:myBookingarr},()=>{
                       this.eraningCalculation()
                        //console.log('this.state.myBooking ==>',this.state.myBooking)
                    })
                    
                }
            }
        })
    }

    eraningCalculation(){
       
        if(this.state.myBooking){
            
            let today =  new Date();
            let tdTrans = 0;
            let mnTrans = 0;
            let totTrans = 0;
            for(let i=0;i<this.state.myBooking.length;i++){
                const {tripdate,driver_share} = this.state.myBooking[i];
                let tDate = new Date(tripdate);
                if(driver_share != undefined){
                    console.log(driver_share)
                    if(tDate.getDate() === today.getDate() && tDate.getMonth() === today.getMonth()){
                        tdTrans  = tdTrans + driver_share;
                    }          
                    if(tDate.getMonth() === today.getMonth() && tDate.getFullYear() === today.getFullYear()){
                        mnTrans  = mnTrans + driver_share;
                    }
                    
                    totTrans  = totTrans + driver_share;
                   
                }
            }
            this.setState({
                totalEarning:totTrans,
                today:tdTrans,
                thisMothh:mnTrans
            })
            //console.log('today- '+tdTrans +' monthly- '+ mnTrans + ' Total-'+ totTrans);

        }
    }
    render() {  
        return (
        
            <Background style={styles.mainView}>
                <Header 
                    backgroundColor={colors.GREY.default}
                    leftComponent={{icon:'md-menu', type:'ionicon', color:colors.BLACK, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.toggleDrawer();} }}
                    centerComponent={<Text style={styles.headerTitleStyle}>{languageJSON.incomeText}</Text>}
                    containerStyle={styles.headerStyle}
                    innerContainerStyles={{marginLeft:10, marginRight: 10}}
                />
                <View style={styles.bodyContainer}>
                    <View style={styles.todaysIncomeContainer}>
                       <Text style={styles.todayEarningHeaderText}>{languageJSON.today}</Text>
                       <Text style={styles.todayEarningMoneyText}>{Currency}{this.state.today?parseFloat(this.state.today).toFixed(2):'0'}</Text>
                    </View>
                    <View style={styles.listContainer}>
                      <View style={styles.totalEarning}>
                        <Text style={styles.thismonthHeaderText}>{languageJSON.thismonth}</Text>
                        <Text style={styles.thismonthMoneyText}>{Currency}{this.state.thisMothh?parseFloat(this.state.thisMothh).toFixed(2):'0'}</Text>
                      </View>
                      <View style={styles.thismonthEarning}>
                        <Text style={styles.todayEarningHeaderText2}>{languageJSON.totalearning}</Text>
                        <Text style={styles.todayEarningMoneyText2}>{Currency}{this.state.totalEarning?parseFloat(this.state.totalEarning).toFixed(2):'0'}</Text>
                      </View>
                    </View>
               </View>
           </Background>
           
        );
      }
    
}
const styles = StyleSheet.create({
    mainView:{ 
        flex:1, 
        backgroundColor: colors.WHITE, 
        
    } ,
    headerStyle: { 
        backgroundColor: colors.TRANSPARENT, 
        borderBottomWidth: 0 
    },
     thismonthHeaderText:{fontSize:16,
        paddingBottom:5,
        color:colors.BLACK},
        thismonthMoneyText:{  fontSize:20,
        fontWeight:'bold',
        color: colors.GREEN2},
    headerTitleStyle: { 
        color: colors.BLACK,
        fontFamily:'Roboto-Bold',
        fontSize: 20
    },
    bodyContainer:{
        flex:1,
       // backgroundColor:'#fdd352',
        flexDirection:'column',
        opacity:0.9,
        marginTop:15, marginLeft:5, marginRight:5
    },
    todaysIncomeContainer:{
        flex:1.5,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fdfac6',
        borderRadius:6,
        borderColor:'#fdfac6',
        borderBottomColor:'#fdfac6',
    },
    listContainer:{
        flex:5,
        backgroundColor:'#fff',
        marginTop:1,
        flexDirection:'row',
        paddingHorizontal:6,
        paddingVertical:6,
        paddingBottom:6,
        justifyContent:'space-between',
        alignItems:'flex-start'
    },
    todayEarningHeaderText:{
        fontSize:20,
        paddingBottom:5,
        color:colors.GREEN2
    },
    todayEarningMoneyText:{
        fontSize:55,
        fontWeight:'bold',
        color:colors.GREEN2 
    },
    totalEarning:{
       height:90,
       width:'49%',
       backgroundColor: '#E0E0E0',
       opacity:0.9,
       borderRadius:6,
       justifyContent:'center',
       alignItems:'center',
    },
    thismonthEarning:{
        
        height:90,
        width:'49%',
        backgroundColor:colors.GREEN2,
        borderRadius:6,
        opacity:0.9,
        justifyContent:'center',
        alignItems:'center',
    },
    todayEarningHeaderText2:{
        fontSize:16,
        paddingBottom:5,
        color:'#FFF'
    },
    todayEarningMoneyText2:{
        fontSize:20,
        fontWeight:'bold',
        color:'#FFF'
    },
})