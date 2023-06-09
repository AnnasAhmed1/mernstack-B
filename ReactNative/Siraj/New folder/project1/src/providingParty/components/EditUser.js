import React from "react";
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
} from "react-native";
import Background from "./Background";
import { Icon, Button, Header, Input } from "react-native-elements";
import { colors } from "../../common/theme";
import languageJSON from "../../common/language";
var { height } = Dimensions.get("window");
import * as firebase from "firebase";
import { appStyles } from "../../common/styles";
import { Tooltip } from "react-native-elements";
import countries from "../../common/Countries";
import * as Cellular from "expo-cellular";

export default class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: "",
      lname: "",
      email: "",
      mobile: "",
      fnameValid: true,
      lnameValid: true,
      mobileValid: true,
      emailValid: true,
      passwordValid: true,
      cnfPwdValid: true,
      pwdErrorMsg: "",
      extension: 0,
    };
  }

  componentDidMount() {
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
  }

  async componentWillMount() {
    // console.log(Cellular.isoCountryCode);
    var curuser = firebase.auth().currentUser.uid;
    const userData = firebase.database().ref("users/" + curuser);
    userData.once("value", (userData) => {
      // console.log(userData.val());
      this.setState({
        fname: userData.val().firstName,
        lname: userData.val().lastName,
        email: userData.val().email,
        mobile: userData.val().mobile,
        extension: userData.val()?.extension,
      });
    });
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

  // last name validation
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

  //register button press for validation
  onPressRegister() {
    const { onPressRegister } = this.props;
    LayoutAnimation.easeInEaseOut();
    const fnameValid = this.validateFirstName();
    const lnameValid = this.validateLastname();
    const mobileValid = this.validateMobile();
    const emailValid = this.validateEmail();
    if (fnameValid && lnameValid && mobileValid && emailValid) {
      //register function of smart component
      onPressRegister(
        this.state.fname,
        this.state.lname,
        this.state.mobile,
        this.state.email,
        this.state.extension
      );
      this.setState({ fname: "", lname: "", mobile: "", email: "" });
    }
  }

  render() {
    const { onPressBack } = this.props;
    return (
      <View style={styles.main}>
        <Header
          backgroundColor={colors.TRANSPARENT}
          leftComponent={{
            icon: "md-close",
            type: "ionicon",
            color: colors.BLACK,
            size: 35,
            component: TouchableWithoutFeedback,
            onPress: onPressBack,
          }}
          containerStyle={styles.headerContainerStyle}
          innerContainerStyles={styles.headerInnerContainer}
        />
        <ScrollView style={styles.scrollViewStyle}>
          {/* <View style={styles.logo}>
                        <Image source={require('../../assets/images/logo.png')} />
                    </View> */}
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "padding"}
            style={styles.form}
          >
            <View style={styles.containerStyle}>
              <Text style={styles.headerStyle}>
                {languageJSON.update_profile_title}
              </Text>

              <View style={styles.textInputContainerStyle}>
                <Icon
                  name="user"
                  type="font-awesome"
                  color={colors.GREY.secondary}
                  size={30}
                  containerStyle={styles.iconContainer}
                />
                <Input
                  ref={(input) => (this.fnameInput = input)}
                  editable={true}
                  underlineColorAndroid={colors.TRANSPARENT}
                  placeholder={languageJSON.first_name_placeholder}
                  placeholderTextColor={colors.GREY.secondary}
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
                  errorStyle={styles.errorMessageStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={styles.textInputStyle}
                />
              </View>

              <View style={styles.textInputContainerStyle}>
                <Icon
                  name="user"
                  type="font-awesome"
                  color={colors.GREY.secondary}
                  size={30}
                  containerStyle={styles.iconContainer}
                />
                <Input
                  ref={(input) => (this.lnameInput = input)}
                  editable={true}
                  underlineColorAndroid={colors.TRANSPARENT}
                  placeholder={languageJSON.last_name_placeholder}
                  placeholderTextColor={colors.GREY.secondary}
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
                    this.mobileInput.focus();
                  }}
                  errorStyle={styles.errorMessageStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={styles.textInputStyle}
                />
              </View>

              <View
                style={[
                  styles.textInputContainerStyle,
                  { alignItems: "center", marginTop: -10 },
                ]}
              >
                <Icon
                  name="mobile-phone"
                  type="font-awesome"
                  color={colors.GREY.secondary}
                  size={40}
                  containerStyle={styles.iconContainer}
                />
                <View
                  style={{
                    width: 50,
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: 25,
                    marginTop: 10,
                    borderBottomWidth: 1,
                    borderColor: "black",
                    borderStyle: "solid",
                    height: 35,
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
                <View style={{ flexGrow: 1, width: "76%" }}>
                  <Input
                    ref={(input) => (this.mobileInput = input)}
                    editable={true}
                    underlineColorAndroid={colors.TRANSPARENT}
                    placeholder={languageJSON.mobile_no_placeholder}
                    placeholderTextColor={colors.GREY.secondary}
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
                    }}
                    errorStyle={styles.errorMessageStyle}
                    inputContainerStyle={[
                      styles.inputContainerStyle,
                      { marginTop: 30 },
                    ]}
                    containerStyle={[styles.textInputStyle]}
                  />
                </View>
              </View>

              {/* <View style={styles.textInputContainerStyle}>
                <Icon
                  name="mobile-phone"
                  type="font-awesome"
                  color={colors.GREY.secondary}
                  size={40}
                  containerStyle={styles.iconContainer}
                />
                <View style={{ width: "100%", alignItems: "flex-end" }}>
                  <View
                    style={{
                      width: "93%",
                      borderBottomWidth: 1,
                      borderColor: "black",
                      borderStyle: "solid",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        width: 70,
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={[
                          styles.inputTextStyle,
                          { margin: 0, padding: 0, height: 20 },
                        ]}
                      >
                        {countries[this.state.extension].flag}{" "}
                        {countries[this.state.extension].dial_code}
                      </Text>
                    </View>
                    <TouchableWithoutFeedback>
                      <Tooltip
                        ref={(e) => (this.tooltip = e)}
                        overlayColor="rgba(0,0,0,0.5)"
                        backgroundColor="white"
                        containerStyle={styles.tooTipConatiner}
                        popover={
                          <ScrollView
                            style={{ width: "100%", padding: 0, margin: 0 }}
                          >
                            {countries.map((item, i) => (
                              <TouchableOpacity
                                key={i}
                                onPress={() => {
                                  this.setState({ extension: i });
                                  this.tooltip.toggleTooltip();
                                }}
                                activeOpacity={0.5}
                                style={styles.tooTipItems}
                              >
                                <Text>
                                  {item.flag} {item.code} {item.dial_code}
                                </Text>
                              </TouchableOpacity>
                            ))}
                          </ScrollView>
                        }
                      ></Tooltip>
                    </TouchableWithoutFeedback>
                    <Input
                      ref={(input) => (this.mobileInput = input)}
                      editable={true}
                      underlineColorAndroid={colors.TRANSPARENT}
                      placeholder={languageJSON.mobile_no_placeholder}
                      placeholderTextColor={colors.GREY.secondary}
                      value={this.state.mobile}
                      keyboardType={"number-pad"}
                      inputStyle={[styles.inputTextStyle]}
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
                      }}
                      errorStyle={styles.errorMessageStyle}
                      inputContainerStyle={[styles.inputContainerStyle]}
                      containerStyle={styles.textInputStyle}
                    />
                  </View>
                </View>
              </View> */}
              <View style={styles.textInputContainerStyle}>
                <Icon
                  name="envelope"
                  type="font-awesome"
                  color={colors.GREY.secondary}
                  size={25}
                  containerStyle={styles.iconContainer}
                />
                <Input
                  ref={(input) => (this.emailInput = input)}
                  editable={this.state.loginType != "email" ? true : false}
                  underlineColorAndroid={colors.TRANSPARENT}
                  placeholder={languageJSON.email_placeholder}
                  placeholderTextColor={colors.GREY.secondary}
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
                  }}
                  errorStyle={styles.errorMessageStyle}
                  inputContainerStyle={styles.inputContainerStyle}
                  containerStyle={styles.textInputStyle}
                />
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => {
                    this.onPressRegister();
                  }}
                  title={languageJSON.update_button}
                  titleStyle={styles.buttonTitle}
                  buttonStyle={styles.registerButton}
                />
              </View>
              <View style={styles.gapView} />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  main: {
    // backgroundColor: colors.BLACK,
  },
  headerContainerStyle: {
    backgroundColor: colors.TRANSPARENT,
    borderBottomWidth: 0,
  },
  tooTipItems: {
    width: "100%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "solid",
    borderBottomWidth: 0.2,
    borderColor: "black",
  },
  headerInnerContainer: {
    marginLeft: 10,
    marginRight: 10,
  },
  tooTipConatiner: {
    margin: 0,
    padding: 0,
    height: 200,
    justifyContent: "flex-start",
    width: 200,
  },
  inputContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.BLACK,
  },
  textInputStyle: {
    marginLeft: 10,
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
  },
  registerButton: {
    width: 180,
    height: 45,
    borderColor: colors.TRANSPARENT,
    borderWidth: 0,
    // marginTop: 30,
    elevation: 0,
    backgroundColor: colors.GREEN2,
    borderRadius: 24,
    borderColor: "#01d298",
    padding: 0,
    margin: 0,
  },
  buttonTitle: {
    fontSize: 16,
    margin: 0,
  },
  inputTextStyle: {
    color: colors.BLACK,
    fontSize: 13,
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
  },
  form: {
    flex: 1,
  },
  logo: {
    width: "90%",
    justifyContent: "flex-start",
    marginTop: 10,
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
    fontSize: 18,
    color: colors.BLACK,
    textAlign: "center",
    flexDirection: "row",
    marginTop: 0,
  },
};