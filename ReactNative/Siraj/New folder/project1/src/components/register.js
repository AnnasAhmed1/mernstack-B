import React from "react";
import {
  View,
  Text,
  Dimensions,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Platform,
} from "react-native";
import Background from "./Background";
import { Icon, Avatar, Button, Header, Input } from "react-native-elements";
import { colors } from "../common/theme";
import * as firebase from "firebase"; //Database
var { height } = Dimensions.get("window");
import languageJSON from "../common/language";
import { appStyles } from "../common/styles";
var { width } = Dimensions.get("window");
import * as Cellular from "expo-cellular";
import countries from "../common/Countries";
import BackNav from './BackNav'

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: this.props.reqData ? this.props.reqData.profile.first_name : "",
      lname: this.props.reqData ? this.props.reqData.profile.last_name : "",
      email: this.props.reqData ? this.props.reqData.profile.email : "",
      mobile: "",
      password: "",
      confPassword: "",
      refferalId: "",

      fnameValid: true,
      lnameValid: true,
      mobileValid: true,
      emailValid: true,
      passwordValid: true,
      cnfPwdValid: true,
      pwdErrorMsg: "",
      allInfo: "",
      reffralIdValid: true,
      loadingModal: false,
      extension: {},
      step:1
    };
  }

  componentDidMount() {
    //alert(Cellular.isoCountryCode)
    const data = countries.filter(
      (item, index) => item.code.toLowerCase() == Cellular.isoCountryCode
    );

    if (data.length > 0) {
      this.setState(
        {
          extension: data[0],
        },
        () => {
          console.log(this.state.extension);
        }
      );
    }

    setTimeout(() => {
      this.setState(
        { allInfo: this.props.reqData ? this.props.reqData : "no data found" },
        () => {
          console.log("all informations are", this.state.allInfo);
        }
      );
    }, 3000);
  }

  // first name validation
  validateFirstName() {
    const { fname } = this.state;
    const fnameValid = fname.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ fnameValid });
    fnameValid || this.fnameInput.shake();
    return fnameValid;
  }

  validateLastname() {
    const { lname } = this.state;
    const lnameValid = lname.length > 0;
    LayoutAnimation.easeInEaseOut();
    this.setState({ lnameValid });
    lnameValid || this.lnameInput.shake();
    return lnameValid;
  }

  // mobile number validation
  validateMobile() {
    const { mobile } = this.state;
    const mobileValid = mobile.length == 10;
    LayoutAnimation.easeInEaseOut();
    this.setState({ mobileValid });
    mobileValid || this.mobileInput.shake();
    return mobileValid;
  }

  // email validation
  validateEmail() {
    const { email } = this.state;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailValid = re.test(email);
    LayoutAnimation.easeInEaseOut();
    this.setState({ emailValid });
    emailValid || this.emailInput.shake();
    return emailValid;
  }

  // password validation
  validatePassword() {
    const { complexity } = this.props;
    const { password } = this.state;
    const regx1 = /^([a-zA-Z0-9@*#]{8,15})$/;
    const regx2 = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
    if (complexity == "any") {
      var passwordValid = password.length >= 1;
      this.setState({ pwdErrorMsg: languageJSON.password_blank_messege });
    } else if (complexity == "alphanumeric") {
      var passwordValid = regx1.test(password);
      this.setState({ pwdErrorMsg: languageJSON.password_alphaNumeric_check });
    } else if (complexity == "complex") {
      var passwordValid = regx2.test(password);
      this.setState({ pwdErrorMsg: languageJSON.password_complexity_check });
    }
    LayoutAnimation.easeInEaseOut();
    this.setState({ passwordValid });
    passwordValid || this.passwordInput.shake();
    return passwordValid;
  }

  // confirm password validation
  validateConfPassword() {
    const { password, confPassword } = this.state;
    const cnfPwdValid = password == confPassword;
    LayoutAnimation.easeInEaseOut();
    this.setState({ cnfPwdValid });
    cnfPwdValid || this.cnfPwdInput.shake();
    return cnfPwdValid;
  }

  //register button press for validation
  onPressRegister() {
    
    const { onPressRegister } = this.props;
    LayoutAnimation.easeInEaseOut();
    const fnameValid = this.validateFirstName();
    const lnameValid = this.validateLastname();
    const emailValid = this.validateEmail();
    const mobileValid = this.validateMobile();
    const passwordValid = this.validatePassword();
   // const cnfPwdValid = this.validateConfPassword();

    if (
      fnameValid &&
      lnameValid &&
      emailValid &&
      mobileValid &&
      passwordValid 
    ) {
      if (this.state.refferalId != "") {
        this.setState({ loadingModal: true });
        const userRoot = firebase.database().ref("users/").orderByChild("referralId").equalTo(this.state.refferalId );
        userRoot.once("value", (userData) => {
          if (userData.val()) {
            let allUsers = userData.val();
            var flag = false;
            for (key in allUsers) {
              if (allUsers[key].refferalId) {
                if (
                  this.state.refferalId.toLowerCase() ==
                  allUsers[key].refferalId
                ) {
                  flag = true;
                  var referralVia = {
                    userId: key,
                    refferalId: allUsers[key].refferalId,
                  };
                  break;
                } else {
                  flag = false;
                }
              }
            }
            if (flag == true) {
              this.setState({ reffralIdValid: true, loadingModal: false });
              onPressRegister(
                this.state.fname,
                this.state.lname,
                this.state.email,
                this.state.mobile,
                this.state.password,
                true,
                referralVia,
                this.state.extension
              );
              this.setState({
                fname: "",
                lname: "",
                email: "",
                mobile: "",
                password: "",
                confPassword: "",
                refferalId: "",
              });
            } else {
              this.refferalInput.shake();
              this.setState({ reffralIdValid: false, loadingModal: false });
            }
          }
        });
      } else {
        //refferal id is blank
        onPressRegister(
          this.state.fname,
          this.state.lname,
          this.state.email,
          this.state.mobile,
          this.state.password,
          false,
          null,
          this.state.extension
        );
        this.setState({
          fname: "",
          lname: "",
          email: "",
          mobile: "",
          password: "",
          confPassword: "",
          refferalId: "",
        });
      }
    }
  }

  loading() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.loadingModal}
        onRequestClose={() => {
          this.setState({ loadingModal: false });
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(22,22,22,0.8)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "#DBD7D9",
              borderRadius: 10,
              flex: 1,
              maxHeight: 70,
            }}
          >
            <View
              style={{
                alignItems: "center",
                flexDirection: "row",
                flex: 1,
                justifyContent: "center",
              }}
            >
              <Image
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: colors.TRANSPARENT,
                }}
                source={require("../../assets/images/loader.gif")}
              />
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#000", fontSize: 16 }}>
                  {languageJSON.refferal_code_validation_modal}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const { onPressBack, registrationData, reqData, loading } = this.props;

    return (
      <Background>
        <View style={styles.containerView}>
          <Header
            backgroundColor={colors.TRANSPARENT}
            leftComponent={<BackNav navigation={this.props.navigation}/>}
            containerStyle={styles.headerContainerStyle}
            innerContainerStyles={styles.headerInnerContainer}
          />
          <ScrollView horizontal={false} style={styles.scrollViewStyle} keyboardShouldPersistTaps='handled'>
            <View style={styles.headContainerStyle}>
              <Text style={styles.header} >
                  Almost There !
                </Text>
                 <Text style={styles.subHeader} >
                  We are excited to see you here...!
                </Text>
            </View>
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "padding"}
              style={styles.form}
            >
              <View style={styles.containerStyle}>
                <Text style={styles.headerStyle}>
                  {languageJSON.registration_title}
                </Text>
<View style={{flex:1, flexDirection:"row"}}>
                <View style={[appStyles.inputContainer, { flexGrow: 1, width: "43%", marginLeft: 15 }]}>
                  <Image
                    style={appStyles.iconContainer}
                    source={require("../../assets/images/user.png")}
                  />
                  <Input
                    ref={(input) => (this.fnameInput = input)}
                    editable={true}
                    underlineColorAndroid={colors.TRANSPARENT}
                    placeholder={languageJSON.first_name_placeholder}
                    placeholderTextColor={colors.BLACK}
                    value={this.state.fname}
                    keyboardType={"email-address"}
                    inputStyle={styles.inputTextStyle}
                    onChangeText={(text) => {
                      this.setState({ fname: text });
                    }}
                    errorMessage={
                      this.state.fnameValid
                        ? null
                        : languageJSON.first_name_blank_error
                    }
                    secureTextEntry={false}
                    blurOnSubmit={true}
                    onSubmitEditing={() => {
                      this.validateFirstName();
                      this.lnameInput.focus();
                    }}
                    errorStyle={
                      this.state.fnameValid
                        ? appStyles.InputValidHideErrorPH
                        : styles.errorMessageStyle
                    }
                    inputContainerStyle={appStyles.inputContainerStyle}
                    containerStyle={styles.textInputStyle}
                  />
                </View>
        <View style={[ { flexGrow: 1, width: "5%"}]}></View>
                <View style={[appStyles.inputContainer, { flexGrow: 1,  width: "43%",marginRight: 30}]}>
                  <Image
                    style={appStyles.iconContainer}
                    source={require("../../assets/images/user.png")}
                  />
                  <Input
                    ref={(input) => (this.lnameInput = input)}
                    editable={true}
                    underlineColorAndroid={colors.TRANSPARENT}
                    placeholder={languageJSON.last_name_placeholder}
                    placeholderTextColor={colors.BLACK}
                    value={this.state.lname}
                    keyboardType={"email-address"}
                    inputStyle={styles.inputTextStyle}
                    onChangeText={(text) => {
                      this.setState({ lname: text });
                    }}
                    errorMessage={
                      this.state.lnameValid
                        ? null
                        : languageJSON.last_name_blank_error
                    }
                    secureTextEntry={false}
                    blurOnSubmit={true}
                    onSubmitEditing={() => {
                      this.validateLastname();
                      this.emailInput.focus();
                    }}
                    errorStyle={
                      this.state.lnameValid
                        ? appStyles.InputValidHideErrorPH
                        : styles.errorMessageStyle
                    }
                    inputContainerStyle={appStyles.inputContainerStyle}
                    containerStyle={styles.textInputStyle}
                  />
                </View>
 </View>
                <View style={[appStyles.inputContainer, { marginLeft: -15 }]}>
                  <Image
                    style={appStyles.iconContainer}
                    source={require("../../assets/images/mail2.png")}
                  />
                  <Input
                    ref={(input) => (this.emailInput = input)}
                    editable={true}
                    underlineColorAndroid={colors.TRANSPARENT}
                    placeholder={languageJSON.email_placeholder}
                    placeholderTextColor={colors.BLACK}
                    value={this.state.email}
                    keyboardType={"email-address"}
                    inputStyle={styles.inputTextStyle}
                    onChangeText={(text) => {
                      this.setState({ email: text });
                    }}
                    errorMessage={
                      this.state.emailValid
                        ? null
                        : languageJSON.valid_email_check
                    }
                    secureTextEntry={false}
                    blurOnSubmit={true}
                    onSubmitEditing={() => {
                      this.validateEmail();
                      this.mobileInput.focus();
                    }}
                    errorStyle={
                      this.state.emailValid
                        ? appStyles.InputValidHideErrorPH
                        : styles.errorMessageStyle
                    }
                    inputContainerStyle={appStyles.inputContainerStyle}
                    containerStyle={styles.textInputStyle}
                  />
                </View>
                <View style={[appStyles.inputContainer, { marginLeft: -15 }]}>
                  <Image
                    style={[appStyles.iconContainer]}
                    source={require("../../assets/images/iconMobile.png")}
                  />
                  <View
                    style={{
                      width: 60,
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: 10,
                    }}
                  >
                    <Text
                      style={[
                        styles.inputTextStyle,
                        { margin: 0, padding: 0, height: 20 },
                      ]}
                    >
                      {this.state.extension?.flag}{" "}
                      {this.state.extension?.dial_code}
                    </Text>
                  </View>
                  <Input
                    ref={(input) => (this.mobileInput = input)}
                    editable={true}
                    underlineColorAndroid={colors.TRANSPARENT}
                    placeholder={languageJSON.mobile_no_placeholder}
                    placeholderTextColor={colors.BLACK}
                    value={this.state.mobile}
                    keyboardType={"number-pad"}
                    inputStyle={styles.inputTextStyle}
                    onChangeText={(text) => {
                      this.setState({ mobile: text });
                    }}
                    errorMessage={
                      this.state.mobileValid
                        ? null
                        : languageJSON.mobile_no_blank_error
                    }
                    secureTextEntry={false}
                    blurOnSubmit={true}
                    onSubmitEditing={() => {
                      this.validateMobile();
                      this.passwordInput.focus();
                    }}
                    errorStyle={
                      this.state.mobileValid
                        ? appStyles.InputValidHideErrorPH
                        : styles.errorMessageStyle
                    }
                    inputContainerStyle={[
                      appStyles.inputContainerStyle,
                      { width: "80%" },
                    ]}
                    containerStyle={styles.textInputStyle}
                  />
                </View>

                <View style={[appStyles.inputContainer, { marginLeft: -15 }]}>
                  <Image
                    style={appStyles.iconContainer}
                    source={require("../../assets/images/password.png")}
                  />
                  <Input
                    ref={(input) => (this.passwordInput = input)}
                    editable={true}
                    underlineColorAndroid={colors.TRANSPARENT}
                    placeholder={languageJSON.password_placeholder}
                    placeholderTextColor={colors.BLACK}
                    value={this.state.password}
                    inputStyle={styles.inputTextStyle}
                    onChangeText={(text) => {
                      this.setState({ password: text });
                    }}
                    errorMessage={
                      this.state.passwordValid ? null : this.state.pwdErrorMsg
                    }
                    secureTextEntry
                    blurOnSubmit={true}
                    onSubmitEditing={() => {
                      this.validatePassword();
                      this.cnfPwdInput.focus();
                    }}
                    errorStyle={
                      this.state.passwordValid
                        ? appStyles.InputValidHideErrorPH
                        : styles.errorMessageStyle
                    }
                    inputContainerStyle={appStyles.inputContainerStyle}
                    containerStyle={styles.textInputStyle}
                  />
                </View>

                {/* <View style={[appStyles.inputContainer, { marginLeft: -15 }]}>
                  <Image
                    style={appStyles.iconContainer}
                    source={require("../../assets/images/password.png")}
                  />
                  <Input
                    ref={(input) => (this.cnfPwdInput = input)}
                    editable={true}
                    underlineColorAndroid={colors.TRANSPARENT}
                    placeholder={languageJSON.confrim_password_placeholder}
                    placeholderTextColor={colors.BLACK}
                    value={this.state.confPassword}
                    inputStyle={styles.inputTextStyle}
                    onChangeText={(text) => {
                      this.setState({ confPassword: text });
                    }}
                    errorMessage={
                      this.state.cnfPwdValid
                        ? null
                        : languageJSON.confrim_password_not_match_err
                    }
                    secureTextEntry
                    blurOnSubmit={true}
                    onSubmitEditing={() => {
                      this.validateConfPassword();
                      this.refferalInput.focus();
                    }}
                    errorStyle={
                      this.state.cnfPwdValid
                        ? appStyles.InputValidHideErrorPH
                        : styles.errorMessageStyle
                    }
                    inputContainerStyle={appStyles.inputContainerStyle}
                    containerStyle={styles.textInputStyle}
                  />
                </View> */}
                {/* <View style={[appStyles.inputContainer, { marginLeft: -15 }]}>
                            <Image
                               
                               style={appStyles.iconContainer }
                               source={require('../../assets/images/password.png')}
                           />
                                 <Input
                                    ref={input => (this.refferalInput = input)}
                                    editable={true}
                                    underlineColorAndroid={colors.TRANSPARENT}
                                    placeholder={languageJSON.referral_id_placeholder}
                                    placeholderTextColor={colors.BLACK}
                                    value={this.state.refferalId}
                                    // keyboardType={'email-address'}
                                    inputStyle={styles.inputTextStyle}
                                    onChangeText={(text)=>{this.setState({refferalId: text})}}
                                    errorMessage={this.state.reffralIdValid == true ? null : languageJSON.refferal_id_not_match_error}
                                    secureTextEntry={false}
                                    blurOnSubmit={true}
                                   // onSubmitEditing={() => { this.validateRefferalId()}}
                                    // errorStyle={styles.errorMessageStyle}
                                    inputContainerStyle={styles.inputContainerStyle}
                                    containerStyle={styles.textInputStyle}
                                />
                            </View> */}
                <View style={styles.buttonContainer}>
                  <Button
                    onPress={() => {
                      this.onPressRegister();
                    }}
                    title={languageJSON.register_button}
                    loading={loading}
                    titleStyle={styles.buttonTitle}
                    buttonStyle={styles.registerButton}
                  />
                </View>
                <View style={styles.gapView} />
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
          {this.loading()}
        </View>
      </Background>
    );
  }
}

const styles = {
  headerContainerStyle: {
    backgroundColor: colors.TRANSPARENT,
    borderBottomWidth: 0,
    marginTop: 0,
  },
  headerInnerContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  inputContainerStyle: {},
  textInputStyle: {
    borderWidth: 0,
    width: width - 80,
  },
  iconContainer: {
    paddingTop: 8,
  },
  gapView: {
    height: 40,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 40,
    marginTop: 30,
  },
  registerButton: {
    width: 180,
    height: 50,
    backgroundColor: colors.GREEN2,
    color: "red",
    borderRadius: 24,
    borderColor: "#01d298"
  },
  buttonTitle: {
    fontSize: 18,
  },
  inputTextStyle: {
    color: colors.BLACK,
    fontSize: 16,
    marginLeft: 0,
    height: 32,
  },
  errorMessageStyle: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 0,
  },
  containerStyle: {
    flexDirection: "column",
    marginTop: 20,
    alignItems: "center",
    width: "100%",
    // paddingRight: 20,
  },
  headContainerStyle: {
    flexDirection: "column",
    marginTop: 20,
    width: "100%",
    marginLeft:15
    // paddingRight: 20,
  },
  form: {
    flex: 1,
  },
  logo: {
    width: "100%",
    justifyContent: "flex-start",
    marginTop: 10,
    marginBottom: 25,
    alignItems: "center",
  },
  scrollViewStyle: {
    height: height,
  },
  textInputContainerStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 20,
    marginRight: 20,
    padding: 15,
  },
  headerStyle: {
    fontSize: 16,
    color: colors.BLACK,
    textAlign: "center",
    flexDirection: "row",
    marginTop: 0,
    display: "none",
  },
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
  containerView: { flex: 1, justifyContent: "center", alignItems: "center" },
};