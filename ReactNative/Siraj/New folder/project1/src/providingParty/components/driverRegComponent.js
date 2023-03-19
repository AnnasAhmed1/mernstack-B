import React from 'react'
import {
  View,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
  StatusBar,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Platform,
  TouchableOpacity
} from 'react-native'
import Background from './Background'
import { Icon, Button, Header, Input } from 'react-native-elements'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { Camera } from 'expo'
import { colors } from '../common/theme'
import languageJSON from '../common/language'
import SectionedMultiSelect from 'react-native-sectioned-multi-select'
var { height } = Dimensions.get('window')
import { appStyles } from '../common/styles'
var { width } = Dimensions.get('window')
import { RadioButtons, SegmentedControls } from 'react-native-radio-buttons'


const items = [
  {
    name: '',
    id: 0,
    children: [
      {
        name: 'Animals and pets',
        id: 1
      },
      {
        name: 'Architecture',
        id: 2
      },
      {
        name: 'Art',
        id: 3
      },
      {
        name: 'Cars and motorcycles',
        id: 4
      },
      {
        name: 'Celebrities',
        id: 5
      },
      {
        name: 'DIY and crafts',
        id: 6
      },
      {
        name: 'Design',
        id: 7
      },
      {
        name: 'Education',
        id: 8
      },
      {
        name: 'Entertainment',
        id: 9
      },
      {
        name: 'Food and drink',
        id: 10
      },
      {
        name: 'Gardening',
        id: 11
      },
      {
        name: 'Geek',
        id: 12
      },
      {
        name: 'Hair and beauty',
        id: 13
      },
      {
        name: 'Health and fitness',
        id: 14
      },
      {
        name: 'History',
        id: 15
      },
      {
        name: 'Holidays and events',
        id: 16
      },
      {
        name: 'Home decor',
        id: 17
      },
      {
        name: 'Humor',
        id: 18
      },
      {
        name: 'Illustrations and posters',
        id: 19
      },
      {
        name: 'Kids and parenting',
        id: 20
      },
      {
        name: 'Men’s fashion',
        id: 21
      },
      {
        name: 'Photography',
        id: 22
      },
      {
        name: 'Products',
        id: 23
      },
      {
        name: 'Quotes',
        id: 24
      },
      {
        name: 'Science and nature',
        id: 25
      },
      {
        name: 'Sports',
        id: 26
      },
      {
        name: 'Technology',
        id: 27
      },
      {
        name: 'Travel',
        id: 28
      },
      {
        name: 'Weddings',
        id: 29
      },
      {
        name: 'Women’s fashion',
        id: 30
      }
    ]
  }
]

const aboutText = {
    Personal: "Describe yourself: What do you do in your spare time (if relevant)? What kind of services can you offer? Do you have any prior experience?",
    Business: "Describe the type of services you provide in detail, including your knowledge and experience, as well as other relevant information about your business.",
    Volunteering:"Tell us more about yourself"

}
export default class DiverReg extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fname: '',
      lname: '',
      email: '',
      mobile: '',
      password: '',
      confPassword: '',
      vehicleNum: '111',
      vehicleName: 'Economy',
      image: null,
      categories: [],
      aboutMe: '',
      accountType: '',
      step: 1,
      aboutMePlaceHolder: 'Tell us more about yourself',

      fnameValid: true,
      lnameValid: true,
      mobileValid: true,
      emailValid: true,
      passwordValid: true,
      cnfPwdValid: true,
      vehicleNumValid: true,
      vehicleNameValid: true,
      categoriesValid: true,
      aboutMeValid: true,
      imageValid: true,
      pwdErrorMsg: '',
      categoriesValid: true
    }

      this.onBack = this.onBack.bind(this);
  }

  // first name validation
  validateFirstName () {
    const { fname } = this.state
    const fnameValid = fname.length > 0
    LayoutAnimation.easeInEaseOut()
    this.setState({ fnameValid })
    fnameValid || this.fnameInput.shake()
    return fnameValid
  }

  // last name validation
  validateLastname () {
    const { lname } = this.state
    const lnameValid = lname.length > 0
    LayoutAnimation.easeInEaseOut()
    this.setState({ lnameValid })
    lnameValid || this.lnameInput.shake()
    return lnameValid
  }

  // mobile number validation
  validateMobile () {
    const { mobile } = this.state
    const mobileValid = mobile.length > 0
    LayoutAnimation.easeInEaseOut()
    this.setState({ mobileValid })
    mobileValid || this.mobileInput.shake()
    return mobileValid
  }

  // email validation
  validateEmail () {
    const { email } = this.state
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const emailValid = re.test(email)
    LayoutAnimation.easeInEaseOut()
    this.setState({ emailValid })
    emailValid || this.emailInput.shake()
    return emailValid
  }

  // password validation
  validatePassword () {
    const { complexity } = this.props
    const { password } = this.state
    const regx1 = /^([a-zA-Z0-9@*#]{8,15})$/
    const regx2 = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
    if (complexity == 'any') {
      var passwordValid = password.length >= 1
      this.setState({ pwdErrorMsg: languageJSON.password_blank_error })
    } else if (complexity == 'alphanumeric') {
      var passwordValid = regx1.test(password)
      this.setState({ pwdErrorMsg: languageJSON.password_complexity_alphabet })
    } else if (complexity == 'complex') {
      var passwordValid = regx2.test(password)
      this.setState({ pwdErrorMsg: languageJSON.password_complexity_complex })
    }
    LayoutAnimation.easeInEaseOut()
    this.setState({ passwordValid })
    passwordValid || this.passwordInput.shake()
    return passwordValid
  }

  // confirm password validation
  validateConfPassword () {
    const { password, confPassword } = this.state
    const cnfPwdValid = password == confPassword
    LayoutAnimation.easeInEaseOut()
    this.setState({ cnfPwdValid })
    cnfPwdValid || this.cnfPwdInput.shake()
    return cnfPwdValid
  }

  // vehicle name validation
  validateVehicleName () {
    const { vehicleName } = this.state
    const vehicleNameValid = vehicleName.length >= 1
    LayoutAnimation.easeInEaseOut()
    this.setState({ vehicleNameValid })
    vehicleNameValid || this.vehicleNameInput.shake()
    return vehicleNameValid
  }

  // vehicle number validation
  validateVehicleNum () {
    const { vehicleNum } = this.state
    var regx3 = /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{4}$/
    // const vehicleNumValid = regx3.test(vehicleNum)
    const vehicleNumValid = vehicleNum.length >= 1
    LayoutAnimation.easeInEaseOut()
    this.setState({ vehicleNumValid })
    vehicleNumValid || this.vehicleNumInput.shake()
    return vehicleNumValid
  }

  // image upload validation
  validateImage () {
    //fix true
    // return true
    const { image } = this.state
    const imageValid = image != null
    LayoutAnimation.easeInEaseOut()
    this.setState({ imageValid })
    return imageValid
    //return imageValid
  }

  //imagepicker for license upload
  CapturePhoto = async () => {
    //permission check
    const { status: cameraStatus } = await Permissions.askAsync(
      Permissions.CAMERA
    )
    const { status: cameraRollStatus } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    )

    if (cameraStatus === 'granted' && cameraRollStatus === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        // base64: true,
        quality: 1.0
      })
      if (!result.cancelled) {
        this.setState({ image: result.uri })
      }
    } else {
      throw new Error('Camera permission not granted')
    }
  }

 

  // first name validation
  validateAboutMe () {
    const { aboutMe } = this.state
    const aboutMeValid = aboutMe.length > 0
    LayoutAnimation.easeInEaseOut()
    this.setState({ aboutMeValid })
    //  aboutMeValid || this.aboutMeInput.shake();
    return aboutMeValid
  }

  validateCategories () {
    const { categories } = this.state
    const categoriesValid = categories.length
    this.setState({ categoriesValid })
    return categoriesValid
  }
 onSubmitStep(){
       const { categories } = this.state
    const categoriesValid = categories.length
    if (!categoriesValid) {
      alert('Please select at least 1 category')
      return
    }
    else{
        this.setState({ step: this.state.step+1 })
    }
  }

   onSubmitStep1(){
    
        this.setState({ step: this.state.step-1 })
    
  }
  //upload cancel
  cancelPhoto = () => {
    this.setState({ image: null })
  }

  onSelectedCategoriesChange = selectedItems => {
    this.setState({ categories: selectedItems })
  }

onBack(){
  if(this.state.step == 1)
         this.props.onPressBack();
           if(this.state.step == 2)
          this.setState({ step: 1 })
           if(this.state.step == 3)
          this.setState({ step: 2 })
     }
  //register button press for validation
  onPressRegister () {
    const { onPressRegister } = this.props
    LayoutAnimation.easeInEaseOut()
    const fnameValid = this.validateFirstName()
    const lnameValid = this.validateLastname()
    const mobileValid = this.validateMobile()
    const emailValid = this.validateEmail()
    const passwordValid = this.validatePassword()
    const cnfPwdValid = this.validateConfPassword()
    const imageValid = this.validateImage()
    const vehicleNumValid = this.validateVehicleNum()
    const vehicleNameValid = this.validateVehicleName()
    const aboutMeValid = this.validateAboutMe()
    const categoriesValid = this.validateCategories()
    if (!categoriesValid) {
      alert('Please select at least 1 category')
      return
    }
    if (
      fnameValid &&
      lnameValid &&
      mobileValid &&
      emailValid &&
      passwordValid &&
      cnfPwdValid &&
      vehicleNumValid &&
      vehicleNameValid
    ) {
      //register function of smart component
      onPressRegister(
        this.state.fname,
        this.state.lname,
        this.state.mobile,
        this.state.email,
        this.state.password,
        this.state.vehicleNum,
        this.state.vehicleName,
        this.state.image,
        this.state.aboutMe,
        this.state.categories,
        this.state.accountType
      )
      // this.setState({fname:'', lname:'', mobile:'', email: '', password: '', confPassword: '', vehicleNum: '', image: null})
    }
  }

  render () {
    const { onPressBack, loading } = this.props
    const options = ['Personal', 'Business', 'Volunteering']

    function setSelectedOption (selectedOption) {

       let aboutPlaceHolder  = aboutText.Volunteering
       this.setState({accountType: selectedOption});
       if(selectedOption == "Personal")
          aboutPlaceHolder = aboutText.Personal

           if(selectedOption == "Business")
          aboutPlaceHolder = aboutText.Business
      this.setState({
        selectedOption,
        aboutMePlaceHolder: aboutPlaceHolder
      })
    }

    

    function renderOption (option, selected, onSelect, index) {
      const style = selected ? { fontWeight: 'bold' } : {}

      return (
        <TouchableWithoutFeedback onPress={onSelect} key={index}>
          <Text style={style}>{option}</Text>
        </TouchableWithoutFeedback>
      )
    }

    function renderContainer (optionNodes) {
      return <View>{optionNodes}</View>
    }
    let { image } = this.state
    return (
      <Background>
        <View style={styles.containerView}>
          <Header
            backgroundColor={colors.TRANSPARENT}
            leftComponent={{
              icon: 'ios-arrow-back',
              type: 'ionicon',
              color: colors.BLACK,
              size: 35,
              component: TouchableWithoutFeedback,
              onPress:  this.onBack
            }}
            containerStyle={styles.headerContainerStyle}
            innerContainerStyles={styles.headerInnerContainer}
          />
          <ScrollView style={styles.scrollViewStyle}>
            <View style={styles.logo}>
              <Image source={require('../../../assets/images/Logo.png')} />
            </View>
            <KeyboardAvoidingView
        
              behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}
              style={styles.form}
            >
              <View style={styles.containerStyle}>
                {/* <Text style={styles.headerStyle}>{languageJSON.driver_registration}</Text> */}
  { this.state.step ==1 && 
  <View>
 <Text style={styles.header}>Sign Up</Text>
      <Text style={styles.subHeader}>Please set up your profile</Text>
 </View>
  }
  
  

   {/* account type */}
                <View style={styles.step2}>
                 { this.state.step ==1 && 
                <View>
                 <Text style={styles.header2}>Account Type</Text>
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
   
                  </View>
                 <View style={styles.categoryContainer}>
                           <Text style={styles.header2}>Categories</Text>
      <Text style={styles.subHeader2}>Please pick the categories that best describe the type of service\help you’d like to provide.
</Text>
                    {/* <View style={styles.category} ><Text>Select Categories</Text></View> */}
                    <View style={styles.category}>
                      <SectionedMultiSelect
                        items={items}
                        uniqueKey='id'
                        subKey='children'
                        
                        showDropDowns={false}
                        readOnlyHeadings={true}
                        onSelectedItemsChange={this.onSelectedCategoriesChange}
                        selectedItems={this.state.categories}
                        styles={{
                           chipText: {
            },
            subItem:{fontSize:20},
            item:{fontSize:20},
            container:{
            
              fontSize:20
            },
            itemText: {
              //color: this.state.selectedItems.length ? 'black' : 'lightgrey'
               fontSize:20,
               color: 'green'
            },
            selectedItemText: {
              color: 'blue',
              fontSize:20
            },
           // chipsWrapper:{ backgroundColor: '#01D298',color: '#01D298' },
            button:{
                backgroundColor: '#01D298'  ,
                fontSize:20
            },
            confirmText:{
                
                backgroundColor: '#01D298'  ,
                  fontSize:20
            },
            chipIcon:{
              //  backgroundColor: '#01D298' ,
                color: '#01D298' 
            },
            modalWrapper:{
                height: 56
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
                 }
                  
                  {/* about me */}
                  { this.state.step == 2 && 
                   <View >
                   <Text style={styles.header2}>About Me(optional)</Text>
                       {/*  <Text style={styles.subHeader2}>{this.state.aboutMePlaceHolder}</Text>*/}
                  <View style={appStyles.inputContainer}>
                    <Image
                      style={styles.iconContainer}
                      source={require('../../../assets/images/IconDesc5.png')}
                    />
                    <TextInput
                      ref={el => {
                        this.aboutMeInput = el
                      }}
                      onChangeText={aboutMe => this.setState({ aboutMe })}
                      underlineColorAndroid='transparent'
                      placeholder={this.state.aboutMePlaceHolder}
                      placeholderTextColor='gray'
                      numberOfLines={4}
                      autoFocus={true}
                      multiline={true}
                      style={{
                        height: 320,
                        textAlignVertical: 'top',
                        marginLeft: 20,
                        fontSize:15,
                         paddingVertical: 10,
                          flex: 1,
                        justifyContent:"center"
                      }}
                      value={this.state.aboutMe}
                      //inputContainerStyle={appStyles.inputAboutMeStyle}
                      // inputStyle={styles.inputAboutMeStyle}
                      //containerStyle={styles.inputAboutMeStyle}
                    />
                     </View>
                  </View>
  }

  
   { this.state.step == 3 &&
                <View >
             
                <View style={appStyles.inputContainer}>
                  <Image
                    style={appStyles.iconContainer}
                    source={require('../../../assets/images/user.png')}
                  />
                  <Input
                    ref={input => (this.fnameInput = input)}
                    editable={true}
                    returnKeyType={'next'}
                    underlineColorAndroid={colors.TRANSPARENT}
                    placeholder={languageJSON.first_name}
                    placeholderTextColor={colors.BLACK}
                    value={this.state.fname}
                    keyboardType={'email-address'}
                    inputStyle={styles.inputTextStyle}
                    onChangeText={text => {
                      this.setState({ fname: text })
                    }}
                    errorMessage={
                      this.state.fnameValid
                        ? null
                        : languageJSON.first_name_error
                    }
                    secureTextEntry={false}
                    blurOnSubmit={true}
                    onSubmitEditing={() => {
                      this.validateFirstName()
                      this.lnameInput.focus()
                    }}
                    errorStyle={styles.errorMessageStyle}
                    inputContainerStyle={appStyles.inputContainerStyle}
                    containerStyle={styles.textInputStyle}
                  />
                </View>

                <View style={appStyles.inputContainer}>
                  <Image
                    style={appStyles.iconContainer}
                    source={require('../../../assets/images/user.png')}
                  />
                  <Input
                    ref={input => (this.lnameInput = input)}
                    editable={true}
                    returnKeyType={'next'}
                    underlineColorAndroid={colors.TRANSPARENT}
                    placeholder={languageJSON.last_name}
                    placeholderTextColor={colors.BLACK}
                    value={this.state.lname}
                    keyboardType={'email-address'}
                    inputStyle={styles.inputTextStyle}
                    onChangeText={text => {
                      this.setState({ lname: text })
                    }}
                    errorMessage={
                      this.state.lnameValid
                        ? null
                        : languageJSON.last_name_error
                    }
                    secureTextEntry={false}
                    blurOnSubmit={true}
                    onSubmitEditing={() => {
                      this.validateLastname()
                      this.emailInput.focus()
                    }}
                    errorStyle={styles.errorMessageStyle}
                    inputContainerStyle={appStyles.inputContainerStyle}
                    containerStyle={styles.textInputStyle}
                  />
                </View>

                <View style={appStyles.inputContainer}>
                  <Image
                    style={appStyles.iconContainer}
                    source={require('../../../assets/images/mail2.png')}
                  />
                  <Input
                    ref={input => (this.emailInput = input)}
                    editable={true}
                    returnKeyType={'next'}
                    underlineColorAndroid={colors.TRANSPARENT}
                    placeholder={languageJSON.email}
                    placeholderTextColor={colors.BLACK}
                    value={this.state.email}
                    keyboardType={'email-address'}
                    inputStyle={styles.inputTextStyle}
                    onChangeText={text => {
                      this.setState({ email: text })
                    }}
                    errorMessage={
                      this.state.emailValid
                        ? null
                        : languageJSON.email_blank_error
                    }
                    secureTextEntry={false}
                    blurOnSubmit={true}
                    onSubmitEditing={() => {
                      this.validateEmail()
                      this.mobileInput.focus()
                    }}
                    errorStyle={styles.errorMessageStyle}
                    inputContainerStyle={appStyles.inputContainerStyle}
                    containerStyle={styles.textInputStyle}
                  />
                </View>
                <View style={appStyles.inputContainer}>
                  <Image
                               
                               style={styles.iconContainer }
                               source={require('../../../assets/images/iconMobile.png')}
                           />
                  <Input
                    ref={input => (this.mobileInput = input)}
                    editable={true}
                    returnKeyType={'done'}
                    underlineColorAndroid={colors.TRANSPARENT}
                    placeholder={languageJSON.mobile}
                    placeholderTextColor={colors.BLACK}
                    value={this.state.mobile}
                    keyboardType={'numeric'}
                    inputStyle={styles.inputTextStyle}
                    onChangeText={text => {
                      this.setState({ mobile: text })
                    }}
                    errorMessage={
                      this.state.mobileValid
                        ? null
                        : languageJSON.mobile_no_blank_error
                    }
                    secureTextEntry={false}
                    blurOnSubmit={true}
                    onSubmitEditing={() => {
                      this.validateMobile()
                      this.passwordInput.focus()
                    }}
                    errorStyle={styles.errorMessageStyle}
                    inputContainerStyle={appStyles.inputContainerStyle}
                    containerStyle={styles.textInputStyle}
                  />
                </View>

                <View style={appStyles.inputContainer}>
                  <Image
                    style={appStyles.iconContainer}
                    source={require('../../../assets/images/password.png')}
                  />
                  <Input
                    ref={input => (this.passwordInput = input)}
                    editable={true}
                    returnKeyType={'next'}
                    underlineColorAndroid={colors.TRANSPARENT}
                    placeholder={languageJSON.password}
                    placeholderTextColor={colors.BLACK}
                    value={this.state.password}
                    inputStyle={styles.inputTextStyle}
                    onChangeText={text => {
                      this.setState({ password: text })
                    }}
                    errorMessage={
                      this.state.passwordValid ? null : this.state.pwdErrorMsg
                    }
                    secureTextEntry
                    blurOnSubmit={true}
                    onSubmitEditing={() => {
                      this.validatePassword()
                      this.cnfPwdInput.focus()
                    }}
                    errorStyle={styles.errorMessageStyle}
                    inputContainerStyle={appStyles.inputContainerStyle}
                    containerStyle={styles.textInputStyle}
                  />
                </View>

                <View style={appStyles.inputContainer}>
                  <Image
                    style={appStyles.iconContainer}
                    source={require('../../../assets/images/password.png')}
                  />
                  <Input
                    ref={input => (this.cnfPwdInput = input)}
                    editable={true}
                    returnKeyType={'next'}
                    underlineColorAndroid={colors.TRANSPARENT}
                    placeholder={languageJSON.confrim_password}
                    placeholderTextColor={colors.BLACK}
                    value={this.state.confPassword}
                    inputStyle={styles.inputTextStyle}
                    onChangeText={text => {
                      this.setState({ confPassword: text })
                    }}
                    errorMessage={
                      this.state.cnfPwdValid
                        ? null
                        : languageJSON.password_not_match
                    }
                    secureTextEntry
                    blurOnSubmit={true}
                    onSubmitEditing={() => {
                      this.validateConfPassword()
                      this.vehicleNameInput.focus()
                    }}
                    errorStyle={styles.errorMessageStyle}
                    inputContainerStyle={appStyles.inputContainerStyle}
                    containerStyle={styles.textInputStyle}
                  />
                </View>
                
             
                {/* </View> */}

              
                <View style={styles.hideField}>
                  <Icon
                    name='numeric'
                    type={'material-community'}
                    color={colors.WHITE}
                    size={20}
                    containerStyle={styles.iconContainer}
                  />
                  <Input
                    ref={input => (this.vehicleNumInput = input)}
                    editable={true}
                    underlineColorAndroid={colors.TRANSPARENT}
                    placeholder={languageJSON.vehicle_reg_no}
                    placeholderTextColor={colors.BLACK}
                    value={this.state.vehicleNum}
                    inputStyle={styles.inputTextStyle}
                    onChangeText={text => {
                      this.setState({ vehicleNum: text })
                    }}
                    errorMessage={
                      this.state.vehicleNumValid
                        ? null
                        : languageJSON.vehicle_number_blank_err
                    }
                    blurOnSubmit={true}
                    onSubmitEditing={() => {
                      this.validateVehicleNum()
                    }}
                    errorStyle={styles.errorMessageStyle}
                    inputContainerStyle={styles.inputContainerStyle}
                    containerStyle={styles.textInputStyle}
                  />
                </View>
                <View style={styles.hideField}>
                  {image ? (
                    <View style={styles.imagePosition}>
                      <TouchableOpacity
                        style={styles.photoClick}
                        onPress={this.cancelPhoto}
                      >
                        <Image
                          source={require('../../../assets/images/cross.png')}
                          resizeMode={'contain'}
                          style={styles.imageStyle}
                        />
                      </TouchableOpacity>
                      <Image
                        source={{ uri: image }}
                        style={styles.photoResult}
                        resizeMode={'cover'}
                      />
                    </View>
                  ) : (
                    <View style={styles.capturePhoto}>
                      <View>
                        {this.state.imageValid ? (
                          <Text style={styles.capturePhotoTitle}>
                            {languageJSON.upload_driving_lisence}
                          </Text>
                        ) : (
                          <Text style={styles.errorPhotoTitle}>
                            {languageJSON.upload_driving_lisence}
                          </Text>
                        )}
                      </View>
                      <View style={styles.capturePicClick}>
                        <TouchableOpacity
                          style={styles.flexView1}
                          onPress={this.CapturePhoto}
                        >
                          <View>
                            <View style={styles.imageFixStyle}>
                              <Image
                                source={require('../../../assets/images/camera.png')}
                                resizeMode={'contain'}
                                style={styles.imageStyle2}
                              />
                            </View>
                          </View>
                        </TouchableOpacity>
                        <View style={styles.myView}>
                          <View style={styles.myView1} />
                        </View>
                        <View style={styles.myView2}>
                          <View style={styles.myView3}>
                            <Text style={styles.textStyle}>
                              {languageJSON.image_size_warning}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
                {/* <View style={styles.buttonContainer}> */}
     
  {/* <View style={styles.saveButtomWrapper2}> */}
                  {/* <Button
                    onPress={() => {
                      this.onPressRegister()
                    }}
                    title={languageJSON.reg_no}
                    loading={loading}
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.registerButton}
                  /> */}
                   {/* </View> */}
                {/* </View> */}
               
                 </View>
                  }
                  {/* category */}
     <View style={{flex:1, flexDirection:'row'}} >
     { this.state.step == 3 &&
       <View>
       
               
         
<View >
  <TouchableOpacity onPress ={() => {
                      this.onPressRegister()
                    }} keyboardShouldPersistTaps = "always" style={styles.registerButtomWrapper}>
         {/* <Image  style={styles.saveButtonImageOK} source={require('../../assets/images/ook.png')}></Image> */}
<Button
                    onPress={() => {
                      this.onPressRegister()
                    }}
                    title={languageJSON.reg_no}
                    loading={loading}
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.registerButton}
                  />
{/* <Image  style={styles.saveButtonImage} source={require('../../assets/images/IconNext.png')}></Image> */}
</TouchableOpacity></View>
 
</View>
    }
      { this.state.step != 3 &&
       <View>
       
                  <TouchableOpacity onPress ={() => {
                      this.onSubmitStep()
                    }} keyboardShouldPersistTaps = "always" style={styles.saveButtomWrapper}>
         
<View style={styles.saveButton}>

<Image  style={styles.saveButtonImage} source={require('../../../assets/images/IconNext.png')}></Image>
</View></TouchableOpacity>
 
</View>
    }

   {/* { this.state.step != 1 &&
<View style={{flex:1, position:'absolute', left:0}}>
   <TouchableOpacity onPress ={() => {
                      this.onSubmitStep1()
                    }} keyboardShouldPersistTaps = "always" style={styles.saveButtomWrapper2}>
         
<View style={styles.saveButton}>
<Image  style={styles.saveButtonImage2} source={require('../../assets/images/IconNext2.png')}></Image>
</View></TouchableOpacity>
</View> 
  } */}
 </View>    
</View>
     

           
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Background>
    )
  }
}

//style for this component
const styles = {
  headerContainerStyle: {
    backgroundColor: colors.TRANSPARENT,
    borderBottomWidth: 0
  },
  headerInnerContainer: {
    marginLeft: 10,
    marginRight: 10
  },
  inputContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.BLACK
  },
  textInputStyle: {
    borderWidth: 0,
    width: width - 80
  },
 
  gapView: {
    height: 40,
    width: '100%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 40
    
  },
  registerButton: {
   
    backgroundColor: colors.GREEN2,
  
    borderRadius: 24,
    borderColor: '#01d298',
     width:100,
          height:50,
  },
  buttonTitle: {
    fontSize: 18
  },
  inputTextStyle: {
    color: colors.BLACK,
    fontSize: 15,
    marginLeft: 0,
    height: 32
  },
  errorMessageStyle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 0
  },
  containerStyle: {
    flexDirection: 'column',
    marginTop: 20
  },
  form: {
    flex: 1,

    
   
  },
  logo: {
    width: '100%',
    justifyContent: 'flex-start',
    marginTop: 10,
    alignItems: 'center'
  },
  scrollViewStyle: {
    height: height,
    width: '90%',
  
  },
  textInputContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    padding: 15
  },
  headerStyle: {
    fontSize: 18,
    color: colors.WHITE,
    textAlign: 'center',
    flexDirection: 'row',
    marginTop: 0
  },
  capturePhoto: {
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colors.WHITE,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 15,
    paddingBottom: 10,
    marginTop: 15
  },
  capturePhotoTitle: {
    color: colors.BLACK,
    fontSize: 14,
    textAlign: 'center',
    paddingBottom: 15
  },
  errorPhotoTitle: {
    color: colors.RED,
    fontSize: 13,
    textAlign: 'center',
    paddingBottom: 15
  },
  photoResult: {
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 15,
    paddingBottom: 10,
    marginTop: 15,
    width: '80%',
    height: height / 4
  },
  imagePosition: {
    position: 'relative'
  },
  photoClick: {
    paddingRight: 48,
    position: 'absolute',
    zIndex: 1,
    marginTop: 18,
    alignSelf: 'flex-end'
  },
  capturePicClick: {
    backgroundColor: colors.WHITE,
    flexDirection: 'row',
    position: 'relative',
    zIndex: 1
  },
  categoryContainer: { flexDirection: 'column', marginBottom:80},
  category: {  fontSize:20},
  imageStyle: {
    width: 30,
    height: height / 15
  },
  flexView1: {
    flex: 12
  },
  imageFixStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageStyle2: {
    width: 150,
    height: height / 15
  },
  myView: {
    flex: 2,
    height: 50,
    width: 1,
    alignItems: 'center'
  },
  saveButtomWrapper:{
          marginTop:20,
          marginBottom:20,
          backgroundColor:  '#01d298',
        
         position:'relative',
         right:-width+90,
          textAlign: 'right',
          color:'white',
        
          borderRadius: 50,
          elevation :5,
          width:50,
          height:50,
          shadowOpacity: 0.25,
          shadowRadius: 10,
          shadowColor: colors.GREY.Deep_Nobel,
          shadowOffset: { height: 1, width: 0 },
         flex:1,
  alignSelf: 'stretch',
  
   
         
        },
registerButtomWrapper:{
          marginTop:20,
          marginBottom:20,
          backgroundColor:  '#01d298',
        
         position:'relative',
         right:-width+140,
          textAlign: 'right',
          color:'white',
        
          borderRadius: 50,
          elevation :5,
          width:100,
          height:50,
          
       
         flex:1,
  alignSelf: 'stretch',
  
   
         
        },









          saveButtomWrapper2:{
          marginTop:20,
          marginBottom:20,
          backgroundColor:  '#01d298',
         position:'absolute',
         left:1,
    textAlign: 'right',
          color:'white',
          flex:1,
          borderRadius: 50,
          elevation :5,
          width:50,
          height:50,
          shadowOpacity: 0.25,
          shadowRadius: 10,
          shadowColor: colors.GREY.Deep_Nobel,
          shadowOffset: { height: 1, width: 0 },
        alignSelf: 'stretch'
  
   
         
        },
  myView1: {
    height: height / 18,
    width: 1.5,
    backgroundColor: colors.GREY.btnSecondary,
    alignItems: 'center',
    marginTop: 10
  },
  myView2: {
    flex: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  myView3: {
    flex: 2.2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    color: colors.GREY.btnPrimary,
    fontFamily: 'Roboto-Bold',
    fontSize: 13
  },
  hideField: {
    display: 'none'
  },
  inputAboutMeStyle: {
    backgroundColor: colors.RED
  },
  accountType: {
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 15
  },
  step2: { height:'100%' ,flex: 1},
  buttonsContainer: {  flex: 1,

    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'},
  containerView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
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
        marginBottom:20
       },
        subHeader2:{
        fontSize: 17,
        color: '#9f9f9f',
        fontWeight: '600',
        marginTop: 0,
        marginBottom:10
       },
         header2:{
        fontSize: 17,
        color: 'black',
        fontWeight: '600',
        marginTop: 0,
        marginBottom:10,
        marginTop:20,
       },
        saveButton:{
         
        },
        saveButtonImage:{
         position: 'relative',
         top:5,
         left:15,
         
         height:45
        },
        saveButtonImageOK:{
         position: 'relative',
         top:5,
         left:8,
         
         height:40
        },
         saveButtonImage2:{
         position: 'relative',
         top:4,
         left:12,
         
         height:45
        },
        iconContainer: {
        // flexDirection: 'column',
        fontSize:20,
        height:20,
        width:20,
        marginLeft: 10,
         alignSelf: 'stretch',
         marginTop:9}
}
