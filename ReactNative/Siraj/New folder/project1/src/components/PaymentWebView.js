import React, { Component } from 'react';
import { WebView } from 'react-native-webview';
import { cloud_function_server_url } from '../common/serverUrl';


export default class PaymentWebView extends Component {

  constructor(props) {
    super(props);
 
  }

  onLoadStart = (syntheticEvent) => {
    // alert(cloud_function_server_url+ '/success')
    const { nativeEvent } = syntheticEvent;
    let matchUrl = nativeEvent.url.split('?');
    // alert(matchUrl[0])
    if (matchUrl[0] === cloud_function_server_url + '/success') {
      
      var obj = {gateway:this.props.provider.name};
      if(matchUrl[1]){
        var pairs = matchUrl[1].split('&');
        for(i in pairs){
            var split = pairs[i].split('=');
            obj[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
        }
      }
      if(obj['transaction_id']==undefined){
        obj['transaction_id']='no transaction id'
      }
      // alert(this.props.provider.name)
      // alert(obj)
      this.props.onSuccess(obj);
    }
    if (matchUrl[0] === cloud_function_server_url + '/cancel') {
      this.props.onCancel();
    }
  };

  render() {
     // nomi fix//alert(this.props.payData.currency)
   

    return (
      <WebView
        originWhitelist={['*']}
        source={{
          uri: cloud_function_server_url + this.props.provider.link,
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: 'order_id=' + this.props.payData.order_id
            + '&amount=' + this.props.payData.amount
            + '&currency=' + "USD"
            + '&product_name=' + this.props.payData.product_name
            + '&quantity=' + this.props.payData.quantity
            + '&cust_id=' + this.props.payData.cust_id
            + '&mobile_no=' + this.props.payData.mobile_no
            + '&email=' + this.props.payData.email
        }}
        onLoadStart={this.onLoadStart}
      />
    );
  }
};