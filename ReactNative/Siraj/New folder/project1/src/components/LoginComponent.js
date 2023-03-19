import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Dimensions,
    LayoutAnimation,
    Image,
    ScrollView,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView
  } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import {  colors } from '../common/theme';
import { loginPage } from '../common/key';
var { width } = Dimensions.get('window');
import  languageJSON  from '../common/language';
import {appStyles} from '../common/styles'
import { Audio } from 'expo-av';

export default class LoginComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            emailValid: true,
            passwordValid: true,
            pwdErrorMsg: ''
        }
    }

    //validation for email
    validateEmail() {
        const { email } = this.state
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const emailValid = re.test(email)
        LayoutAnimation.easeInEaseOut()
        this.setState({ emailValid })
        emailValid || this.emailInput.shake()
        return emailValid
    }

    //validation for password
    validatePassword() {
        const { complexity } = this.props
        const { password } = this.state
        const regx1 = /^([a-zA-Z0-9@*#]{8,15})$/
        const regx2 = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/
        if(complexity == 'any') {
            var passwordValid = password.length >=1;
            this.setState({pwdErrorMsg: languageJSON.password_blank_messege})
        }
        else if(complexity == 'alphanumeric') {
            var passwordValid = regx1.test(password);
            this.setState({pwdErrorMsg: languageJSON.password_alphaNumeric_check});
        }
        else if (complexity == 'complex') {
            var passwordValid = regx2.test(password);
            this.setState({pwdErrorMsg: languageJSON.password_complexity_check})
        }
        LayoutAnimation.easeInEaseOut()
        this.setState({ passwordValid })
        passwordValid || this.passwordInput.shake()
        return passwordValid
    }



    //login press for validation check
   async onPressLogin(){
        
        

//  const soundObject = new Audio.Sound(); 
//  await soundObject.loadAsync(require('../../assets/sounds/car_horn.wav')); 
//  await soundObject.playAsync()
//  try { await soundObject.loadAsync(require('../../assets/sounds/car_horn6.wav')); 
//  await soundObject.playAsync();
//  await soundObject.unloadAsync(); } 
//  catch (error) { alert(error) console.log("Unable to play sound"); }







        
        const { onPressLogin } = this.props;
        LayoutAnimation.easeInEaseOut();
        const emailValid = this.validateEmail();
        const passwordValid = this.validatePassword();
        
       if ( emailValid && passwordValid ) {
           //login function of smart component
            onPressLogin(this.state.email, this.state.password);
            this.setState({email: '', password: ''})
        }
    }
    
    render() {
        const { onPressRegister, onPressForgotPassword } = this.props;

        return (
            <View>
           
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={appStyles.inputContainer}>
                                <Image
                                style={appStyles.iconContainer }
                                source={require('../../assets/images/mail2.png')}
                            />
                    <Input
                        ref={input => (this.emailInput = input)}
                        editable={true}
                        underlineColorAndroid={colors.TRANSPARENT}
                        placeholder={languageJSON.email_placeholder}
                        placeholderTextColor={colors.BLACK}
                        value={this.state.email}
                        keyboardType={'email-address'}
                        inputStyle={styles.inputTextStyle}
                        onChangeText={(text)=>{this.setState({email: text})}}
                        errorMessage={this.state.emailValid ? null : languageJSON.valid_email_check}
                        secureTextEntry={false}
                        blurOnSubmit={true}
                        onSubmitEditing={() => { this.validateEmail(); this.passwordInput.focus()}}
                        errorStyle={this.state.emailValid ? appStyles.InputValidHideErrorPH :styles.errorMessageStyle}
                        inputContainerStyle={appStyles.inputContainerStyle}
                        containerStyle={styles.emailInputContainer}
                    />
                    </View>
                    </TouchableWithoutFeedback>

 <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <View style={appStyles.inputContainer} >
                  
                    <Image
                               
                               style={appStyles.iconContainer }
                               source={require('../../assets/images/password.png')}
                           />
                    <Input
                        ref={input => (this.passwordInput = input)}
                        editable={true}
                        blurOnSubmit={true}
                        underlineColorAndroid={colors.TRANSPARENT}
                        placeholder={languageJSON.password_placeholder}
                        placeholderTextColor={colors.BLACK}
                        value={this.state.password}
                        inputStyle={styles.inputTextStyle}
                        onChangeText={(text)=>{this.setState({password:text})}}
                        errorMessage={this.state.passwordValid ? null : this.state.pwdErrorMsg}
                        secureTextEntry={true}
                        onSubmitEditing={() => { this.validatePassword() }}
                        errorStyle={this.state.passwordValid ? appStyles.InputValidHideErrorPH :  styles.errorMessageStyle}
                        inputContainerStyle={appStyles.inputContainerStyle}
                        containerStyle={styles.pwdInputContainer}
                    />
                    </View>
               </TouchableWithoutFeedback>

                <View style={styles.buttonContainer}>
                    <Button
                        clear
                        title={languageJSON.register_link}
                        loading={false}
                        loadingProps={{ size: "large", color: colors.BLUE.default.primary }}
                        titleStyle= {[appStyles.linkLoginTitleStyle,{ textDecorationLine:"underline"}]}
                        onPress={onPressRegister}
                        buttonStyle={appStyles.linkStyle}
                        containerStyle={{flex:0.3, position:'relative', left:-14 }}
                    />
                    <View style={styles.verticalLineStyle}/>
                    <Button
                        clear
                        title={languageJSON.forgot_password_link}
                        loading={false}
                        onPress={onPressForgotPassword}
                        loadingProps={{ size: "large", color: colors.BLUE.default.primary }}
                        titleStyle={appStyles.linkLoginTitleStyle}
                        titleProps={{ numberOfLines: 2, ellipsizeMode: 'tail' }}
                        buttonStyle={appStyles.linkStyle}
                        containerStyle={{flex:2, position:'absolute', right:0}}
                    />
                 
                </View>
                <View>
                   <Button
                        title={languageJSON.login_button}
                        loading={false}
                        loadingProps={{ size: "large", color: colors.BLUE.default.primary }}
                        titleStyle={styles.buttonTitleStyle}
                        onPress={()=>{this.onPressLogin()}}
                        buttonStyle={appStyles.buttonStyle}
                        containerStyle={styles.loginButtonContainer}
                    />
                </View>
                 
            </View>
        );
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        flex:1, 
        width:'90%',
        alignItems: 'flex-end',
        elevation: 20,
        justifyContent: 'flex-end'
    },
    buttonContainer: {
        flexDirection: 'row', 
        position:'relative',
        top:-13
      
    },
    loginButtonContainer: { 
       
       
    },
    loginButtonStyle: {
        
    },
    // buttonStyle: { 
    //     backgroundColor: colors.BLUE.default.secondary 
    // },
    emailInputContainer: { 
       
        borderWidth:0, 
        width: width-80
    },
    pwdInputContainer: { 
       
       
       
       
        width: width-80
    },
  
    errorMessageStyle: { 
        fontSize: 12, 
        fontWeight:'bold',
        color: "#FD2323"
     
    },
    errorMessageStyleWi:{
        display: 'none'
    },
    inputTextStyle: {
        // color:colors.BLACK,
        fontSize:16
    },
    pwdInputContainerStyle: { 
        // paddingBottom: 15 
    },
    verticalLineStyle: { 
        // height: 25, 
        // width:2, 
        // top: 12, 
        // backgroundColor: colors.WHITE 
    },
    buttonTitleStyle: { 
       
    },
    forgotTitleStyle: { 
        // fontWeight: "700",
        // fontSize: 12,
        // width:"100%",
        // color: colors.BLACK
    },
    buttonContainerStyle: {
      
    }
    
});
