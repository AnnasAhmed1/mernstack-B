

import React,{ useState }  from 'react';
import {View, Image, Button, Text, TouchableOpacity} from 'react-native';
import { colors } from '../../common/theme';

export default class RequestHeader extends React.Component {
    
    constructor(props){
       super(props);

       this.state = {date:"15-05-2018", time: ''
    }
 this.onCurrentHelpClick = this.onCurrentHelpClick.bind(this);
     }
     onCancel() {
      this.TimePicker.close();
    }
 onCurrentHelpClick() {
   this.props.onHelpClick();
  }

    onConfirm(hour, minute) {
   
      this.setState({ time: `${hour}:${minute}` });
      this.TimePicker.close();
    }

     render(){
     //const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
        
          
         
     return(
       
          
           
  
<View style={styles.container}>
       
       <View style={{flexDirection:'row'}}> 
    <Text style={styles.header}>{this.props.headerText}</Text>
    {this.props.showHelp?
    
     ( <TouchableOpacity onPress={this.onCurrentHelpClick}><Image  style={{ marginLeft:2}}source={require("../../../assets/images/question-mark-grey.jpg")}></Image></TouchableOpacity>): null
     }
   
</View>
    
  
      </View>
      ); 
        }
    }

    const styles={
        
       header:{
        fontSize: 20,
        color: '#333333',
        fontFamily:'OpenSans-Semibold',
        fontWeight: '600',
        marginTop: 0,
        marginBottom:10
       },
       subHeader:{
        fontSize: 17,
        color: '#9f9f9f',
        fontWeight: '600',
        marginTop: 0,
        marginBottom:10
       },
        container: {
         
        
          backgroundColor: colors.TRANSPARENT
       
        },
        text: {
          fontSize: 20,
          marginTop: 10
        },
        button: {
          backgroundColor: "black",
          paddingVertical: 11,
          paddingHorizontal: 17,
          borderRadius: 3,
          marginVertical: 50
        },
        buttonText: {
          color: "#FFFFFF",
          fontSize: 16,
          fontWeight: "600"
        }
    }