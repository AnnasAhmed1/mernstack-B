import React from 'react';
import { View, StyleSheet, TouchableHighlight, Image, TouchableWithoutFeedback, AsyncStorage, Text, } from 'react-native';
import { Header, } from 'react-native-elements';
import languageJSON from '../common/language';
import { colors } from '../common/theme';
import * as firebase from 'firebase';
import PaymentWebView from '../components/PaymentWebView';
import { ScrollView } from 'react-native-gesture-handler';


export default class SelectGatewayPage extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
      payData: null,
      providers:null,
      userdata:null,
      settings:null,
      selectedProvider:null
    };

  

   
  }

  componentDidMount() {
    let payData = this.props.navigation.getParam('payData');
    let uData = this.props.navigation.getParam('allData');
    let Settings = this.props.navigation.getParam('settings');
    let providers = this.props.navigation.getParam('providers');
     let onlyPayPal = [];
    if(providers.length >0){
     
      onlyPayPal.push(providers[0])
    }
    this.setState({ payData: payData, userdata: uData, settings: Settings, providers: onlyPayPal });
    this.selectProvider({
      "image": "../../assets/images/paypal-logo.png",
      "link": "/paypal_link",
      "name": "paypal",
    })
  }


  onSuccessHandler = (order_details) => {
  
  //  alert(order_details.transaction_id)
    if (this.state.userdata.paymentType) {
      firebase.database().ref('users/' + this.state.userdata.driver + '/my_bookings/' + this.state.userdata.bookingKey + '/').update({
        payment_status: "PAID",
        payment_mode: this.state.userdata.paymentMode,
        customer_paid: this.state.userdata.customer_paid,
        discount_amount: this.state.userdata.discount_amount,
        usedWalletMoney: this.state.userdata.usedWalletAmmount,
        cardPaymentAmount: this.state.userdata.cardPaymentAmount,
        getway: order_details.gateway,
        transaction_id: order_details.transaction_id
      }).then(() => {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/my-booking/' + this.state.userdata.bookingKey + '/').update({
          payment_status: "PAID",
          payment_mode: this.state.userdata.paymentMode,
          customer_paid: this.state.userdata.customer_paid,
          discount_amount: this.state.userdata.discount_amount,
          usedWalletMoney: this.state.userdata.usedWalletAmmount,
          cardPaymentAmount: this.state.userdata.cardPaymentAmount,
          getway: order_details.gateway,
          transaction_id: order_details.transaction_id
        }).then(() => {
          firebase.database().ref('bookings/' + this.state.userdata.bookingKey + '/').update({
            payment_status: "PAID",
            payment_mode: this.state.userdata.paymentMode,
            customer_paid: this.state.userdata.customer_paid,
            discount_amount: this.state.userdata.discount_amount,
            usedWalletMoney: this.state.userdata.usedWalletAmmount,
            cardPaymentAmount: this.state.userdata.cardPaymentAmount,
            getway: order_details.gateway,
            transaction_id: order_details.transaction_id
          }).then(() => {

            if (this.state.userdata.usedWalletAmmount) {
              if (this.state.userdata.usedWalletAmmount > 0) {
                let tDate = new Date();
                firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/walletHistory').push({
                  type: 'Debit',
                  amount: this.state.userdata.usedWalletAmmount,
                  date: tDate.toString(),
                  txRef: this.state.userdata.bookingKey,
                }).then(() => {
                  firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/').update({
                    walletBalance: this.state.userdata.currentwlbal - this.state.userdata.usedWalletAmmount
                  })
                })
              }
            }
          })
          setTimeout(() => {
            this.props.navigation.navigate('ratingPage', { data: this.state.userdata });
          }, 3000)

        })

      })

    } else {
      let tDate = new Date();
   
      let Walletballance = this.state.userdata.walletBalance + parseInt(this.state.payData.amount)
      firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/walletBalance').set(Walletballance).then(() => {
        firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/walletHistory').push({
          type: 'Credit',
          amount: parseInt(this.state.payData.amount),
          date: tDate.toString(),
          txRef: this.state.payData.order_id,
          getway: order_details.gateway,
          transaction_id: order_details.transaction_id
        })

        setTimeout(() => {
          this.props.navigation.navigate('wallet')
        }, 3000)
      });
    }
  };

  onCanceledHandler = () => {
    if (this.state.userdata.paymentType) {
      setTimeout(() => {
        this.props.navigation.navigate('CardDetails')
      }, 5000)
    } else {
      setTimeout(() => {
        this.props.navigation.navigate('wallet')
      }, 5000)
    }
  };
  
  goBack() {
    this.setState({selectedProvider:null});
    this.props.navigation.goBack();
  }

  selectProvider = (provider)=>{
console.log(provider)
    this.setState({selectedProvider:provider});
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={colors.GREY.default}
          leftComponent={{ icon: 'ios-arrow-back', type: 'ionicon', color: colors.WHITE, size: 30, component: TouchableWithoutFeedback, onPress: () => { this.goBack() } }}
          centerComponent={<Text style={styles.headerTitleStyle}>{languageJSON.payment}</Text>}
          containerStyle={styles.headerStyle}
          innerContainerStyles={{ marginLeft: 10, marginRight: 10 }}
        />
        {this.state.selectedProvider ? <PaymentWebView provider={this.state.selectedProvider} payData={this.state.payData} onSuccess={this.onSuccessHandler} onCancel={this.onCanceledHandler} /> : null}
        {/* {this.state.providers && this.state.selectedProvider==null ? 
          <ScrollView>
              {
              this.state.providers.map((provider) => {
              
                  return (
                    <View style={[styles.box, { marginTop: 12 }]} key={provider.name}>
                      <TouchableHighlight onPress={this.selectProvider.bind(this, provider)} underlayColor='#99d9f4'>
                        <Image
                          style={styles.thumb}
                          source={{uri: provider.image}}
                          source={require('../../assets/images/paypal-logo.png')}
                        />
                      </TouchableHighlight>
                    </View>
                  );
                })
              } 
          </ScrollView>
          :null
        } */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.WHITE,
    flex: 1
  },
  headerStyle: {
    backgroundColor: colors.GREY.default,
    borderBottomWidth: 0
  },
  headerTitleStyle: {
    color: colors.WHITE,
    fontFamily: 'Roboto-Bold',
    fontSize: 20
  },
  box: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ededed',
    borderRadius: 8,
    marginBottom: 4,
    marginHorizontal: 20,
    marginTop: 8
  },

  thumb: {
    height: 35,
    width: 100,
    resizeMode: 'contain'

  }
});


// import React from 'react';
// import { View, StyleSheet,TouchableHighlight, Image,TouchableWithoutFeedback, Alert, Text, } from 'react-native';
// import { Header,} from 'react-native-elements';
// import StripeView from '../components/PaymentMethods/StripeView';
// import BraintreeView from '../components/PaymentMethods/BraintreeView';
// import languageJSON from '../common/language';
// import { colors } from '../common/theme';
// import * as firebase from 'firebase';
// import Background from '../components/Background';
// export default class SelectGatewayPage extends React.Component {

//     state = {
//         payData:null,
//         stripe:false,
//         braintree:false,
//     };

//     componentWillMount(){
//         let payData = this.props.navigation.getParam('payData');
//         let uData = this.props.navigation.getParam('allData');
//         if (payData && uData) {
//           this.setState({ payData: payData, userdata: uData }, () => {
//             console.log("this.state.userdata");
//             console.log(this.state.userdata);
//             console.log("this.state.payData")
//             console.log(this.state.payData)
//           });
//         }
//     }

//     onPressStripe = () => {
//       //nomi fix
//         alert("Temporarily unable to add funds to balance.") ;
//         return;
//         //this.setState({stripe:true});
//     };

//     onPressBraintree = () => {
//         alert("Temporarily unable to add funds to balance.") ;
//         return;
//        // this.setState({braintree:true});
//     };

    

//     onSuccessHandler = () => { 
      
//         if (this.state.userdata.paymentType) {
//             console.log(this.state.userdata)
//             console.log('users/' + this.state.userdata.driver + '/my_bookings/' + this.state.userdata.bookingKey + '/')
//             firebase.database().ref('users/' + this.state.userdata.driver + '/my_bookings/' + this.state.userdata.bookingKey + '/').update({
//               payment_status: "PAID",
//               payment_mode: this.state.userdata.paymentMode,
//               customer_paid: this.state.userdata.customer_paid,
//               discount_amount: this.state.userdata.discount_amount,
//               usedWalletMoney: this.state.userdata.usedWalletAmmount,
//               cardPaymentAmount: this.state.userdata.cardPaymentAmount,
//               getway:this.state.stripe?'Stripe':'Braintree'
//             }).then(() => {
//               firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/my-booking/' + this.state.userdata.bookingKey + '/').update({
//                 payment_status: "PAID",
//                 payment_mode: this.state.userdata.paymentMode,
//                 customer_paid: this.state.userdata.customer_paid,
//                 discount_amount: this.state.userdata.discount_amount,
//                 usedWalletMoney: this.state.userdata.usedWalletAmmount,
//                 cardPaymentAmount: this.state.userdata.cardPaymentAmount,
//                 getway:this.state.stripe?'Stripe':'Braintree'
//               }).then(() => {
//                 firebase.database().ref('bookings/' + this.state.userdata.bookingKey + '/').update({
//                   payment_status: "PAID",
//                   payment_mode: this.state.userdata.paymentMode,
//                   customer_paid: this.state.userdata.customer_paid,
//                   discount_amount: this.state.userdata.discount_amount,
//                   usedWalletMoney: this.state.userdata.usedWalletAmmount,
//                   cardPaymentAmount: this.state.userdata.cardPaymentAmount,
//                   getway:this.state.stripe?'Stripe':'Braintree'
//                 }).then(() => {
                 
//                   if (this.state.userdata.usedWalletAmmount) {
//                     if (this.state.userdata.usedWalletAmmount > 0) {
//                       let tDate = new Date();
//                       firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/walletHistory').push({
//                         type: 'Debit',
//                         amount: this.state.userdata.usedWalletAmmount,
//                         date: tDate.toString(),
//                         txRef: this.state.userdata.bookingKey,
//                       }).then(() => {
//                         firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/').update({
//                           walletBalance: this.state.userdata.currentwlbal - this.state.userdata.usedWalletAmmount
//                         })
//                       })
//                     }
//                   }
//                 })
//                 setTimeout(() => {
//                   this.props.navigation.navigate('ratingPage', { data: this.state.userdata });
//                 }, 3000)
                
//               })
      
//             })
      
//           } else {
//             let tDate = new Date();
//             let Walletballance = this.state.userdata.walletBalance + parseInt(this.state.payData.amount)
//             firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/walletBalance').set(Walletballance).then(() => {
//               firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/walletHistory').push({
//                 type: 'Credit',
//                 amount: parseInt(this.state.payData.amount),
//                 date: tDate.toString(),
//                 txRef: this.state.payData.order_id,
//                 getway:this.state.stripe?'Stripe':'Braintree'
//               })
              
//               setTimeout(() => {
//               this.props.navigation.navigate('wallet')
//               },3000)
//             });
//           }
//     };

//     onCanceledHandler = () => {
//       if (this.state.userdata.paymentType) {
//         setTimeout(()=>{
//           this.props.navigation.navigate('CardDetails')
//       },5000)
//       }else{
//         setTimeout(()=>{
//           this.props.navigation.navigate('wallet')
//       },5000)
//       }  
//     };
//     goBack(){
//       this.props.navigation.goBack();
//     }

//     render() {
//         // if(this.state.stripe){
//         //     return <StripeView payData={this.state.payData} onSuccess={this.onSuccessHandler} onCancel={this.onCanceledHandler}/>
//         // }
//         // if(this.state.braintree){
//         //     return <BraintreeView payData={this.state.payData} onSuccess={this.onSuccessHandler} onCancel={this.onCanceledHandler}/> 
//         // } 
        
//         return (
           
//                 <Background style={styles.container}>

             
//                 <Header
//                   backgroundColor={colors.GREY.default}
//                   leftComponent={{ icon: 'ios-arrow-back', type: 'ionicon', color: colors.BLACK, size: 35, component: TouchableWithoutFeedback, onPress: () => { this.goBack() } }}
//                   centerComponent={<Text style={styles.headerTitleStyle}>{languageJSON.payment}</Text>}
//                   containerStyle={styles.headerStyle}
//                   innerContainerStyles={{ marginLeft: 10, marginRight: 10 }}
//                 /> 
//                  {this.state.stripe?<StripeView payData={this.state.payData} onSuccess={this.onSuccessHandler} onCancel={this.onCanceledHandler}/>:null}
//                 {this.state.braintree?<BraintreeView payData={this.state.payData} onSuccess={this.onSuccessHandler} onCancel={this.onCanceledHandler}/> :null}
//                 {this.state.stripe || this.state.braintree?null:
//                   <View>
//                       <View style = {[styles.box,{marginTop:12}]}>
//                           <TouchableHighlight onPress={this.onPressStripe} underlayColor='#99d9f4'>
//                               <Image
//                                   style={styles.thumb}
//                                   source={require('../../assets/images/stripe-logo.png')}
//                               />   
//                           </TouchableHighlight>
//                       </View>
//                       <View style = {styles.box}>
//                           <TouchableHighlight onPress={this.onPressBraintree} underlayColor='#99d9f4'>
//                               <Image
//                                   style={styles.thumb}
//                                   source={require('../../assets/images/braintree-logo.png')}
//                               />   
//                           </TouchableHighlight>
//                       </View>  
//                   </View>
//                 }           
//               </Background>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//       backgroundColor: colors.TRANSPARENT,
//       flex:1
//     },
//     headerStyle: {
//       backgroundColor: colors.TRANSPARENT,
//       borderBottomWidth: 0
//     },
//     headerTitleStyle: {
//       color: colors.BLACK,
//       fontFamily: 'Roboto-Bold',
//       fontSize: 20
//     },
//     box: {
//         height:80,
//         justifyContent:'center',
//         alignItems:'center',
//         backgroundColor:'#ededed',
//         borderRadius:8,
//         marginBottom:4,
//         marginHorizontal:20,
//         marginTop:8
//     },

//     thumb:{
//         height:35,
//         resizeMode: 'contain'
       
//     }
// });