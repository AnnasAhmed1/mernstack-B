

import React from 'react';
import {View, Text, Dimensions, ScrollView, KeyboardAvoidingView, Image, TouchableWithoutFeedback, LayoutAnimation, Platform, TouchableOpacity} from 'react-native';
import  SectionedMultiSelect from 'react-native-sectioned-multi-select';
import RequestHeader from './Header'
import items from '../../constants/Categories'
import * as f from "firebase";
import { Modal } from "react-native";
import { TextInput } from "react-native";
import * as Cellular from "expo-cellular";
import { colors } from '../../common/theme';
import Icon from "react-native-vector-icons/MaterialIcons"




export default class Category extends React.Component {
    
    constructor(props){
       super(props);
       this.state = {
        selectedItems: [] ,
        categories: { children: [] },
        modal: false,
        categoryType: "",
        haveSuggested: false
      }

      this.submit = this.submit.bind(this);
      this.onCurrentHelpClick = this.onCurrentHelpClick.bind(this);
      

     }
     onCurrentHelpClick(){
       this.props.onHelpClick1()
     }

     componentDidMount() {
    f.database()
      .ref("categories")
      .child('children')
   //   .orderByKey()
      .orderByChild('name')
     // .orderByChild('name')
     // .limitToFirst(5)
      .once("value", res => {
       // alert(res.val().children)
       let categories = res.val();
       let cats  = categories.sort(function(a, b) {
   return a.name.localeCompare(b.name);
});

cats = cats.filter(function(item) {
    return item.id != 99
})

if(Cellular.isoCountryCode == "IL")
  cats = cats.filter(function(item) {
    return item.id != 5
})

cats.push({id:99, name: "Can't find a suitable category ?"})
        this.setState({categories: cats,selectedItems: this.props.selectedItems})
        // console.log(res.val());
        // res.forEach((data) => {
        //   this.setState((prevState) => ({
        //     categories: 
        //   }));
        // });
      });
  }

     onSelectedItemsChange = (selectedItems) => {
      
      // selectedItems = selectedItems.filter(item => (item != 33));
      // alert(selectedItems[1])
      //  if(selectedItems.children )
      //  alert(8)
        //this.setState({ selectedItems });
        console.log(selectedItems);
    if (selectedItems.filter((data) => data == 99).length > 0 && !this.state.haveSuggested) {
      this.setState({ modal: true, haveSuggested: true });
      //return;
    }

    if (
      selectedItems.length == 1 &&
      selectedItems.selectedItems?.filter((data) => data == selectedItems[0])
        .length > 0
    ) {
      
      this.setState({ selectedItems });
      return;
    }

    if (selectedItems?.length < 4 ) {
      this.setState({ selectedItems });
      return;
    }
    else{
      alert("You cannot choose more than 3 categories. You can uncheck one category and then add a new one.")
    }

    // alert("You cannot select more than 2 categories");

      }

       submitNewCategory = () => {
    f.database()
      .ref("categories-suggestions")
      .push({ name: this.state.categoryType })
      .then(() => {
        this.setState({ modal: false, categoryType: "" });
        alert("Thanks... it helps us to improve the system.");
      });
  };

      submit(){
        

        ////try categorie

debugger
   
       this.props.onStepSubmit(this.state.selectedItems)
      }

     render(){
     return(
      
        <View style={styles.allPage}>
        <Modal visible={this.state.modal} transparent animationType="slide">
          <View
            style={{
              width: "100%",
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.6)",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: "95%",
                padding: 10,
                backgroundColor: "white",
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <TextInput
                placeholder="Please type the category that best describes your need"
                placeholderTextColor="gray"
                style={{
                  width: "100%",
                  height: 40,
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: "gray",
                  borderStyle: "solid",
                  paddingLeft: 10,
                }}
                value={this.state.categoryType}
                onChangeText={(val) => this.setState({ categoryType: val })}
              />

              <TouchableOpacity
                onPress={this.submitNewCategory}
                style={{
                  width: "100%",
                  padding: 15,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#01D298",
                  borderRadius: 10,
                  marginTop: 20,
                }}
              >
                <Text style={{ color: "white" }}>submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  this.setState({ modal: false, categoryType: false })
                }
                style={{ marginTop: 20 }}
              >
                <Text style={{ color: "red" }}>cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
     <RequestHeader headerText='New Request' 
     showHelp={true}
     onHelpClick = {this.onCurrentHelpClick}
     //subHeaderText='Pick the categories that best describe the type of service\help you need'
     subHeaderText="It’s quick and easy."
     ></RequestHeader>
     <Text style={styles.subHeader}>Pick the categories that best describe the type of service\help you need</Text> 
<Text style={{ color: "grey", fontSize:11, fontWeight: "bold" }}>(*Maximum 3 categories)</Text>
     <View style={styles.selectStyle}><SectionedMultiSelect
     IconRenderer={Icon}
        items={this.state.categories} 
        uniqueKey='id'
        subKey='children'
        selectText='Choose categories...'
        showDropDowns={true}
        readOnlyHeadings={false}
        onSelectedItemsChange={this.onSelectedItemsChange}
         showChips={true}
        colors={{"primary":'#01D298' }}
        itemFontFamily = {{ "fontWeight" :"bold"}}
        selectedItems={this.state.selectedItems}
        styles={{
             chipText: {
              maxWidth: Dimensions.get('screen').width - 70,
            },
           
            container:{
              maxWidth: 450,
            },
            itemText: {
              color:  '#686868'
            },
            // selectedItemText: {
            //   color: 'blue',
            // },
           // chipsWrapper:{ backgroundColor: '#01D298',color: '#01D298' },
            button:{
                backgroundColor: '#01D298'  
            },
            confirmText:{
                
                backgroundColor: '#01D298'  
            },
            chipIcon:{
              //  backgroundColor: '#01D298' ,
                color: '#01D298' 
            },
            modalWrapper:{
                height: 100
            },
            // subItemText: {
            //   color: this.state.selectedItems.length ? 'black' : 'lightgrey'
            // },
            // selectedSubItemText: {
            //   color: 'red',
            // }
          }}
      /></View>
      {/* <Text style={styles.attention}>Attention: Any request is transferred for approval before submitting. Inappropriate requests, requests that lack details or inconsistencies in the data - will not be sent</Text> */}
        </View>	
        ); 
        }
    }

    const styles={
      selectStyle:{

        marginRight: 50
        
    },
    attention:{
      color:'red',
      position:'absolute',
      bottom:0
    },
     subHeader:{
        fontSize: 19,
       color: '#9f9f9f',
        fontWeight: '600',
        marginTop: 0,
        marginBottom:10
       },
    allPage:{
      height:'100%',
      borderColor:'black'
    }
    }