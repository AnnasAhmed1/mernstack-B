

import React from 'react';
import {View, Text, Platform} from 'react-native';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import RequestHeader from './Header'
import { colors } from '../../common/theme';
import {  Input , Image} from 'react-native-elements'



export default class Budget extends React.Component {
    
    constructor(props){
       super(props);
       this.state = {
        budget: this.props.budget
      }

      this.submit = this.submit.bind(this);

     }

     submit(){
       let num = this.state.budget.replace(".", '');
     if(isNaN(num)){
         alert("The specified budget is incorrect")
     }else{
         this.props.onStepSubmit(this.state.budget)
        }  
     
         
       }

     onSelectedItemsChange = (selectedItems) => {
        this.setState({ selectedItems });
      }

     

     render(){
     return(
      
        <View >
     <RequestHeader headerText='What is your budget for handling this?' subHeaderText=''></RequestHeader>
      
     <View > 
     <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
            <View style={{ flex: 1, alignSelf: 'stretch' }}>
           
            
            <Text style={styles.dollar}>$</Text>
            </View>	
            <View style={{ flex: 12, alignSelf: 'stretch' }}>
            <Input
                                                         ref={input => (this.budgetInput = input)}
                                                         editable={true}
                                                         underlineColorAndroid={colors.TRANSPARENT}
                                                         placeholder={'0.00'}
                                                         placeholderTextColor={colors.GREY}
                                                         value={this.state.budget}
                                                         keyboardType={Platform.OS=='android' ? "numeric" : "number-pad"}
                                                         inputStyle={styles.inputTextStyle}
                                                         onChangeText={(text)=>{this.setState({budget: text})}}
                                                         errorMessage={ null }
                                                         pattern="[0-9]*"
                                                         secureTextEntry={false}
                                                         blurOnSubmit={true}
                                                         onSubmitEditing={() => { this.validateFirstName(); this.lnameInput.focus()}}
                                                         errorStyle={styles.errorMessageStyle}
                                                         inputContainerStyle={styles.inputContainerStyle}
                                                         
                                                     />
            </View>	
           
          </View>	
                            <View ><Text style={{ color:'gray', marginTop: 30, fontSize:16 }}>*If you are just looking to connect with people do not specify a price,
if you expect to receive something in return from the other party, specify a price that you will transfer to them after completing the task. </Text></View>  
                              
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
        dollar:{
            color:'green',
            fontSize: 30
        }
    }