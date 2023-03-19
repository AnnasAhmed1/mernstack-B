import React from 'react';
import { 
    StyleSheet,
    View,
    Image,
    Dimensions,
    Text,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    TouchableWithoutFeedback,
    ActivityIndicator,
    Alert,
    Switch
} from 'react-native';
import { Icon, Header } from 'react-native-elements';
import ActionSheet from 'react-native-actionsheet';
import Iconf from "react-native-vector-icons/MaterialIcons"
import { colors } from '../common/theme';
import {ChangePasswordModal} from '../components';

import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons'
import { Camera} from 'expo';
var { width, height } = Dimensions.get('window');

import * as firebase from 'firebase';
import  languageJSON  from '../common/language';
import Background from '../components/Background';
import items from '../constants/Categories'
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import NotificationNav from '../components/NotificationNav'

const aboutText = {
    Personal: "Describe yourself: What do you do in your spare time ? What kind of services can you offer? Do you have any prior experience?",
    Business: "Describe the type of services you provide in detail, including your knowledge and experience, as well as other relevant information about your business.",
    Volunteering:"Tell us more about yourself"

}


export default class ServiceScreen extends React.Component {

  constructor(props){
    super(props);
   
    this.state = {
        firstName: '',
        lastName:'',
        profile_image: null,
        loader:false,
        showForgotModal:false,
        checked:true,
        aboutMe: '',
        selectedOption:[],
        categories:[],
        categoryList:[]
    }
    
  }

    componentDidMount() {
                       firebase.database()
      .ref("categories")
      .once("value", res => {
         
       // alert(res.val().children)
       this.setState({
    categoryList: res.val().children
}, () => {
               var curuser =  firebase.auth().currentUser.uid

if(curuser){

    var curuser = firebase.auth().currentUser;
    this.setState({currentUser:curuser},()=>{
        const userData=firebase.database().ref('users/'+this.state.currentUser.uid);
        userData.once('value',userData=>{
            if(userData.val()){
                var str = userData.val().location.add
                var tempAdd = str.split(",")[0] + ","+str.split(",")[1] + ','+str.split(",")[3]+ ','+str.split(",")[4];
                this.setState({tempAddress:tempAdd});
                this.setState({aboutMe:userData.val().aboutMe});
                
                this.setState({categories:userData.val().categories});
                this.setState(userData.val(),(res)=>{
                });
            }
            
        })
    })
}

});
  })
   
  }

  async componentWillMount() {
  
  }
 
  showActionSheet = () => {
    this.ActionSheet.show()
  }
   onSelectedCategoriesChange = selectedItems => {
     firebase.database().ref(`/users/`+this.state.currentUser.uid+'/').update({
                categories:selectedItems
            }).then(()=>{
                this.setState({categories:selectedItems});
            })
  }

  uploadImage(){
    return (
        <View>      
          <ActionSheet
            ref={o => this.ActionSheet = o}
            title={languageJSON.photo_upload_action_sheet_title}
            options={[languageJSON.camera, languageJSON.galery, languageJSON.cancel]}
            cancelButtonIndex={2}
            destructiveButtonIndex={1}
            onPress={(index) => { 
                if(index == 0){
                 this._pickImage(ImagePicker.launchCameraAsync);
                }else if(index == 1){
                    this._pickImage(ImagePicker.launchImageLibraryAsync);
                }else{
                    //console.log('actionsheet close')
                }
            }} 
          />
        </View>
      )
    }
  
    
    
    _pickImage = async (res) => {
        var pickFrom = res;
        const { status } = await Permissions.askAsync(Permissions.CAMERA,Permissions.CAMERA_ROLL);
        if(status == 'granted'){ 
            this.setState({loader:true})
            let result = await pickFrom({
                allowsEditing: true,
                aspect: [3, 3],
                base64:true
            });
            if (!result.cancelled) {
                let data = 'data:image/jpeg;base64,'+result.base64
                //console.log(result)
                this.uploadmultimedia(result.uri)
                this.setState({ profile_image: 'data:image/jpeg;base64,'+result.base64 },()=>{  
                    this.setState({loader:false})
                });
            }
            else {
                this.setState({loader:false})
            }
        }
    };
  
    //upload picture function
    async uploadmultimedia(url){
        // console.log(url)
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function() {
            resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
        };
        xhr.onerror = function() {
            reject(new TypeError('Network request failed')); // error occurred, rejecting
        };
        xhr.responseType = 'blob'; // use BlobModule's UriHandler
        xhr.open('GET', url, true); // fetch the blob from uri in async mode
        xhr.send(null); // no initial data
        });
        console.log('After')
        var imageRef = firebase.storage().ref().child(`users/${this.state.currentUser.uid}`);
        return imageRef.put(blob).then(() => {
            blob.close()
            return imageRef.getDownloadURL()
        }).then((url) => {
            var d = new Date();
            console.log(url);
            firebase.database().ref(`/users/`+this.state.currentUser.uid+'/').update({
                profile_image:url
            })
        })
    }

    //edit profile button press
    editProfile=() => {
        //console.log('props')
        //console.log(this.props.navigation)
        //console.log('props end')
        this.props.navigation.push('editUser');
    }

    //change password function
    onPressChangePassword(oldPass,newPass){
        console.log(oldPass+' , '+newPass);
        var credential = firebase.auth.EmailAuthProvider.credential(this.state.currentUser.email, oldPass);
        var user = firebase.auth().currentUser;

        user.reauthenticateAndRetrieveDataWithCredential(credential).then((res)=>{
        if(res){
            firebase.auth().currentUser.updatePassword(newPass).then((res)=> {
                this.setState({showForgotModal:false},()=>{
                    setTimeout(() => {
                        alert(languageJSON.password_change);    
                    }, 600);
                })
            })
        }
        }).catch((error)=>{
            alert(languageJSON.password_not_match);
        });
    }


    loader(){
        return (
            <View style={[styles.loadingcontainer, styles.horizontal]}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
            )
    }
    
    //sign out and clear all async storage
    async signOut() {
        firebase.auth().signOut();
    }
  
    //Delete current user
    async deleteAccount(){        
        Alert.alert(
            languageJSON.confrim,
            languageJSON.delete_account,
            [
              {
                text: languageJSON.cancel,
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: languageJSON.yes, onPress: () =>
                {
                    var ref = firebase.database().ref('users/'+this.state.currentUser.uid +'/')
                    ref.remove().then(()=>{
                        firebase.auth().signOut();
                        firebase.auth().currentUser.delete()
                    });
                }
            },
            ],
            {cancelable: false},
          );   
    }

    //show change password modal
    ShowchangePasswordModal() {
        console.log(this.state.currentUser)
        this.setState({showForgotModal:true})
    }

    //close change password modal
    closeModal(){
        this.setState({showForgotModal:false})
    }

    onChangeFunction(data){
        
        if(data == true){
         
            firebase.database().ref(`/users/`+this.state.currentUser.uid+'/').update({
                driverActiveStatus:false
            }).then(()=>{
                this.setState({driverActiveStatus:false});
            })
        }else {
              
            firebase.database().ref(`/users/`+this.state.currentUser.uid+'/').update({
                driverActiveStatus:true
            }).then(()=>{
                this.setState({driverActiveStatus:true});
            })
        }
    }

    render() {
        let { image } = this.state;
        const options = ['Personal', 'Business', 'Volunteering']

        // function setSelectedOption (selectedOption) {

    //    let aboutPlaceHolder  = aboutText.Volunteering
    //    this.setState({accountType: selectedOption});
    //    if(selectedOption == "Personal")
    //       aboutPlaceHolder = aboutText.Personal

    //        if(selectedOption == "Business")
    //       aboutPlaceHolder = aboutText.Business
    //   this.setState({
    //     selectedOption,
    //     aboutMePlaceHolder: aboutPlaceHolder
    //   })
  //  }

        return (        
        <Background style={styles.mainView}>
            <Header 
                backgroundColor={colors.TRANSPARENT}
                leftComponent={{icon:'md-menu', type:'ionicon', color: colors.BLACK, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.toggleDrawer();} }}
                rightComponent = { <NotificationNav  navigation={this.props.navigation} closeDrawer={() => this.closeDrawer()}/>}
                centerComponent={<Text style={styles.headerTitleStyle}>{languageJSON.my_service}</Text>}
                containerStyle={styles.headerStyle}
                innerContainerStyles={{marginLeft:10, marginRight: 10}}
            />
            <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollStyle}>
               {
                   this.uploadImage()
               }
                <ChangePasswordModal
                     modalvisable={this.state.showForgotModal}
                     requestmodalclose={()=>{this.closeModal()}}
                     inputEmail={this.state.email}
                     emailerrorMsg={this.state.emailerror}
                     onChangeTextInput={(value)=>{this.setState({emailerror:null,email:value})}}  
                     onPressChangePassword={(o,n)=>this.onPressChangePassword(o,n)} 
                />
                 <View style={styles.scrollViewStyle1} >
                    <Text style={styles.profStyle}>{languageJSON.active_status}</Text>
                    <Switch
                    trackColor={{true: "#b2f1e0", false: "grey"}}
                     thumbColor={this.state.driverActiveStatus ? "#01d298": "#f4f3f4" } 
                        style={styles.switchAlignStyle}
                        value={this.state.driverActiveStatus}
                        onValueChange={() => {
                        this.onChangeFunction(this.state.driverActiveStatus);
                    }}
              />
                </View>
                <View style={styles.scrollViewStyle} >
                
                    <Text style={styles.profStyle}>{languageJSON.categories}</Text>
                     {/* <TouchableOpacity onPress={this.editProfile}>
                     <Image
                               
                               style={styles.editIconContainer }
                               source={require('../../../assets/images/edit.png')}
                           />
                           </TouchableOpacity > */}
                </View>

           

                <View >
  {/* <View style={styles.myViewStyle}> */}

 {/* <Text style={styles.header2}>Account Type</Text>
                  <View style={styles.accountType}>
                    <SegmentedControls
                      tint={'#01d298'}
                      selectedTint={'white'}
                      backTint={'white'}
                      options={options}
                      allowFontScaling={false} // default: true
                      onSelection={setSelectedOption.bind(this)}
                      selectedOption={this.state.selectedOption}
                      optionStyle={{ fontSize: 15 }}
                      optionContainerStyle={{ flex: 1 }}
                    />
   
                  </View> */}
 {/* </View> */}


               
                   
                    
                   
              
                   
            
                  
                            <View style={styles.myViewStyle}>
                        <View >
                             {/* <Image
                               
                               style={styles.iconContainer }
                               source={require('../../../assets/images/IconCategory2.png')}
                           /> */}

                       
                            <Text style={styles.text1}>Please select categories for alerts if you can offer paid service/help in these areas. 
</Text>

                          {/* <Text style={styles.redText}>*Registration is for receiving alerts only, with no obligation to accept them. Please select categories. You have nothing to lose;)
</Text> */}
                        </View>
                        <View style={styles.categoriesSection}>
                 <SectionedMultiSelect
                     IconRenderer={Iconf}
                        items={this.state.categoryList}
                        uniqueKey='id'
                        subKey='children'
                        
                        showDropDowns={true}
                        readOnlyHeadings={false}
                        onSelectedItemsChange={this.onSelectedCategoriesChange}
                        selectedItems={this.state.categories}
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
            }
            // subItemText: {
            //   color: this.state.selectedItems.length ? 'black' : 'lightgrey'
            // },
            // selectedSubItemText: {
            //   color: 'blue',
            // },
          }}
                      />
                        </View>
                    </View>
               
                </View>

                <View style={styles.flexView3}>
                    <TouchableOpacity style={styles.textIconStyle}  onPress={()=>{this.ShowchangePasswordModal()}}>
                        <Text style={styles.emailStyle}>{languageJSON.change_password}</Text>
                        <Icon
                            name='ios-arrow-forward'
                            type='ionicon'
                            color={colors.GREY.iconPrimary}
                            size={35}
                            containerStyle={{ right: 20 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.textIconStyle2} onPress={()=>{this.deleteAccount()}}>
                        <Text style={styles.emailStyle}>{languageJSON.delete_account}</Text>
                        <Icon
                            name='ios-arrow-forward'
                            type='ionicon'
                            color={colors.GREY.iconPrimary}
                            size={35}
                            containerStyle={{ right: 20 }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.signOut()}} style={styles.textIconStyle2}>
                        <Text style={styles.emailStyle}>{languageJSON.sign_out}</Text>
                        <Icon
                            name='ios-arrow-forward'
                            type='ionicon'
                            color={colors.GREY.iconPrimary}
                            size={35}
                            containerStyle={{ right: 20 }}
                        />
                    </TouchableOpacity> 
                </View>

            </ScrollView>
           
        </Background>
        );
    }
}

//Screen Styling
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
    logo:{
      flex:1,
      position:'absolute',
      top:110,
      width:'100%',
      justifyContent:"flex-end",
      alignItems:'center'      
    },
    footer:{
      flex:1,
      position:'absolute',
      bottom:0,
      height:150,
      width:'100%',
      flexDirection:'row',
      justifyContent: 'space-around',
      alignItems:'center'
    },
    scrollStyle:{
        flex: 1,
        height: height, 
       // backgroundColor:colors.WHITE
    },
    scrollViewStyle1:{
        width: width, 
        height: 50, 
        
        backgroundColor: colors.TRANSPARENT, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderTopColor: '#e5e5e5',
        borderTopWidth: 0.5,
    },
    scrollViewStyle:{
        width: width, 
        height: 50, 
       
        backgroundColor: colors.TRANSPARENT, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
       
        marginTop:10,
      
        paddingRight: 10,
        borderTopColor: '#e5e5e5',
        borderTopWidth: 0.5,
    },
    profStyle:{
        fontSize: 20, 
        left: 20, 
        fontWeight:'bold',
        color:colors.GREY.btnPrimary, 
        fontFamily:'Roboto-Bold'
    },
    viewStyle:{ 
        justifyContent:'center',
        alignItems:'center', 
        marginTop: 13 
    },
    imageParentView:{
        borderRadius: 150/2, 
        width: 150, 
        height: 150, 
        backgroundColor: '#01d298', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    imageViewStyle:{ 
        borderRadius: 140/2, 
        width: 140, 
        height: 140,
        backgroundColor: colors.WHITE, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    textPropStyle:{
        fontSize: 20, 
        fontWeight:'bold',
        color: colors.GREY.iconSecondary, 
        fontFamily:'Roboto-Bold', 
        top: 8,
       
    },
    newViewStyle:{
        flex: 1, 
        height: 450, 
        marginTop: 40
    },
    myViewStyle:{
        flex: 1,
        left: 20, 
        marginRight: 40, 
        
        flexWrap:"wrap"
    },
    iconViewStyle:{
        flex: 2, 
        flexDirection: 'row',
        alignItems: 'center'
    },
    emailStyle:{
        fontSize: 17, 
        left: 10, 
        color: colors.GREY.btnPrimary, 
        fontFamily:'Roboto-Bold'
    },
    emailAdressStyle:{
        fontSize: 15, 
        color: colors.GREY.secondary, 
        fontFamily:'Roboto-Regular'
    },
    mainIconView:{
        flex: 1, 
        left: 20, 
        marginRight: 40, 
        borderBottomColor: colors.GREY.iconSecondary,
         borderBottomWidth: 1
    },
    text1:{
        // fontSize: 17, 
        // left: 10, 
        // color:colors.GREY.btnPrimary, 
        // fontFamily:'Roboto-Bold',


         fontSize: 20,
        color: '#9f9f9f',
      
        marginTop: 0,
        marginBottom:10,
        fontWeight:"600"
    },
    text2:{
        fontSize: 15, 
        left: 10, 
        color:colors.GREY.secondary, 
        fontFamily:'Roboto-Regular'
    },
    textIconStyle:{
        width: width, 
        height: 50, 
        backgroundColor: colors.TRANSPARENT, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderTopColor: '#e5e5e5',
        borderTopWidth: 0.5
    },
    textIconStyle2:{
        width: width, 
        height: 50, 
        marginTop:10,
        backgroundColor: colors.TRANSPARENT, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        borderTopColor: '#e5e5e5',
        borderTopWidth: 0.5,
    },
    mainView:{ 
        flex:1, 
        backgroundColor: colors.TRANSPARENT, 
       
       
    },
    flexView1:{
        flex:1
    },
    flexView2:{
        flex:1,
       
    },
    categoriesSection:{
        flex:1,
        height:300
    },
    flexView3:{
        marginTop: 54
    },
    loadingcontainer: {
        flex: 1,
        justifyContent: 'center'
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
    },
    redText: {
        color:'red'
    },
    switchAlignStyle: {
        alignContent: "center"
      },
         editIconContainer: {
       
    },
});
