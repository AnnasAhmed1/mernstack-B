

import React,{ useState }  from 'react';
import {View, Image, Button, Text, TouchableOpacity, TouchableHighlight} from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DatePicker from 'react-native-datepicker';
import DateTimePicker from "@react-native-community/datetimepicker";
import RequestHeader from './Header'
import moment from "moment";



  


export default class Time extends React.Component {
    
    constructor(props){
       super(props);

       this.state = {
         date:this.props.time, 
         time: '',
         showDate: false,
         modalDate: new Date(),
         showTime: false
    }

    this.onASAP = this.onASAP.bind(this)
      
    this.onSceduleTime = this.onSceduleTime.bind(this);
     }

     submit(){
        
       this.props.onStepSubmit(this.state.date)
     }

     onASAP(){
       this.setState({date: new Date().toLocaleString()})
     }

      onSceduleTime(){
      alert("Currently unavailable")
       //  this.setState({ showDate: true });
      }



     onCancel() {
      this.TimePicker.close();
    }

    onConfirm(hour, minute) {
   
       this.setState({ time: `${hour}:${minute}` });
    this.TimePicker.close();
    }

     render(){
     //const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
        
          
         
     return(
        <View> 
            <View style={styles.linkBottom}>
            {/* <View style={styles.container}> */}

 
{/* </View> */}

<View >
<RequestHeader headerText='Please select time' subHeaderText=''></RequestHeader>
      
<View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
            <View style={{ flex: 1, alignSelf: 'stretch' }} >
            <TouchableOpacity onPress={this.onASAP}>
            <Image  source={require('../../../assets/images/asap.png')}></Image>
            </TouchableOpacity>
            </View>	
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
             <TouchableOpacity onPress={this.onSceduleTime}>
            <Image   source={require('../../../assets/images/selectTime.png')}></Image>
             </TouchableOpacity>
  {this.state.showDate && (
                  <DateTimePicker
                    showIcon={false}
                    value={new Date()}
                    mode={"date"}
                    // is24Hour={true}
                    display="calendar"
                    onChange={(event, date) => {
                      console.log(date);
                      this.setState({
                        date: moment(date).format("DD-MMM-YYYY"),
                        showDate: false,
                        showTime: true,
                      });
                    }}
                  />
                )}

                {this.state.showTime && (
                  <DateTimePicker
                    showIcon={false}
                    value={new Date()}
                    mode={"time"}
                    // is24Hour={true}
                    display="clock"
                    onChange={(event, date) => {
                      console.log(date);
                      this.setState({
                        date: `${this.state.date} ${moment(date).format(
                          "h:mm:ss a"
                        )}`,
                        showTime: false,
                      });
                    }}
                  />
                )}
              


            {/* <TimePicker
          ref={ref => {
            this.TimePicker = ref;
          }}
          onCancel={() => this.onCancel()}
          onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
        /> */}
           {/* <DatePicker
  style={{width: 200}}
  date={this.state.date} //initial date from state
  mode="date" //The enum of date, datetime and time
  placeholder="select date"
  format="DD-MM-YYYY"
  minDate="01-01-2016"
  maxDate="01-01-2019"
  confirmBtnText="Confirm"
  cancelBtnText="Cancel"
  customStyles={{
    dateIcon: {
      position: 'absolute',
      left: 70,
      top: -40,
      marginLeft: 0,
      display:'hide'
      
  
    },
    dateInput: {
      marginLeft: 80,
      display:'hide'
    }
  }}
  onDateChange={(date) => {this.setState({date: date})}}
/>   */}
            </View>	
           
          </View>	
      <View style ={styles.dateStyle}>
        <Text style ={styles.dateTextStyle}>{this.state.date}</Text>
      </View>
      {/* <View style ={styles.dateStyle}>
        <Text style ={styles.dateTextStyle}>{this.state.time}</Text>
      </View> */}
         {/* <TouchableOpacity
          onPress={() => this.TimePicker.open()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>TIMEPICKER</Text>
        </TouchableOpacity>  */}
       
        
     

      </View>

      </View>
      </View>
      ); 
        }
    }

    const styles={
        linkBottom :{
           
        },
        container: {
            marginLeft:10, 
            marginRight: 10
        },
        image: {
            width: 20
        },
        container: {
          flex: 1,
          alignItems: "center",
          backgroundColor: "#fff",
          paddingTop: 100
        },
        text: {
          fontSize: 20,
          marginTop: 10
        },
        button: {
          backgroundColor: "#4EB151",
          paddingVertical: 11,
          paddingHorizontal: 17,
          borderRadius: 3,
          marginVertical: 50
        },
        buttonText: {
          color: "#FFFFFF",
          fontSize: 16,
          fontWeight: "600"
        },
        dateStyle:{
          flex: 1, 
          justifyContent: 'center',
          alignItems: "center",
         
        },
        dateTextStyle:{
          fontSize:20,
        }
    }