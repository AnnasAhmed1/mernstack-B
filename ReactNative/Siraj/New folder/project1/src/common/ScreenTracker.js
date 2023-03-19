
import * as firebase from 'firebase'

export function updateHistory (user,name, details)  {
   let date1 = new Date();
   // var oiph =  await  NetworkInfo.getIPAddress()
  ///  alert(oiph)
    firebase.database().ref('screen_clicks_history'+ '/' +user ).push({
              screen:name,
              clickedDate:date1.toLocaleString(),
              details:details
            }).then().catch(function(error) {
    // alert("Data could not be saved." + error);
     });

}