import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Dimensions,
    LayoutAnimation,
    Image
  } from 'react-native';
import { Input, Button } from 'react-native-elements';
import {  colors } from '../common/theme';
import language from '../common/language';
import  languageJSON  from '../common/language';
import {appStyles} from '../common/styles'
var { width } = Dimensions.get('window');

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
            this.setState({pwdErrorMsg: languageJSON.password_blank_error})
        }
        else if(complexity == 'alphanumeric') {
            var passwordValid = regx1.test(password);
            this.setState({pwdErrorMsg: languageJSON.password_complexity_alphabet});
        }
        else if (complexity == 'complex') {
            var passwordValid = regx2.test(password);
            this.setState({pwdErrorMsg: languageJSON.password_complexity_complex})
        }
        LayoutAnimation.easeInEaseOut()
        this.setState({ passwordValid })
        passwordValid || this.passwordInput.shake()
        return passwordValid
    }

    //login press for validation check
    onPressLogin(){
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
        const { onPressRegister, onPressForgotPassword, loading } = this.props;

        return (
            <View>
                <View style={appStyles.inputContainer}>
                <Image
                               
                               style={appStyles.iconContainer }
                               source={require('../../../assets/images/mail2.png')}
                           />
                    <Input
                        ref={input => (this.emailInput = input)}
                        editable={true}
                        underlineColorAndroid={colors.TRANSPARENT}
                        placeholder={languageJSON.email}
                        borderColor='transparent'
                        placeholderTextColor={colors.BLACK}
                        value={this.state.email}
                        keyboardType={'email-address'}
                        inputStyle={styles.inputTextStyle}
                        onChangeText={(text)=>{this.setState({email: text})}}
                        errorMessage={this.state.emailValid ? null : languageJSON.email_blank_error}
                        secureTextEntry={false}
                        blurOnSubmit={true}
                        onSubmitEditing={() => { this.validateEmail(); this.passwordInput.focus()}}
                        errorStyle={styles.errorMessageStyle}
                        inputContainerStyle={appStyles.inputContainerStyle}
                        containerStyle={styles.emailInputContainer}
                    />
                    </View>
                    <View style={appStyles.inputContainer}>
                    <Image
                               
                               style={appStyles.iconContainer }
                               source={require('../../../assets/images/password.png')}
                           />
                    <Input
                        ref={input => (this.passwordInput = input)}
                        editable={true}
                        blurOnSubmit={true}
                        underlineColorAndroid={colors.TRANSPARENT}
                        placeholder={languageJSON.password}
                        placeholderTextColor={colors.BLACK}
                        value={this.state.password}
                        inputStyle={styles.inputTextStyle}
                        onChangeText={(text)=>{this.setState({password:text})}}
                        errorMessage={this.state.passwordValid ? null : this.state.pwdErrorMsg}
                        secureTextEntry={true}
                        onSubmitEditing={() => { this.validatePassword() }}
                        errorStyle={styles.errorMessageStyle}
                        inputContainerStyle={appStyles.inputContainerStyle}
                        containerStyle={styles.pwdInputContainer}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        clear
                        title={languageJSON.register}
                        loading={false}
                        loadingProps={{ size: "large", color: colors.BLUE.default.primary }}
                        titleStyle={appStyles.linkLoginTitleStyle}
                        onPress={onPressRegister}
                        buttonStyle={appStyles.linkStyle}
                        containerStyle={{flex:0.3, position:'relative', left:-14}}
                    />
                    <View style={styles.verticalLineStyle}/>
                    <Button
                        clear
                        title={languageJSON.forgot_password}
                        loading={false}
                        onPress={onPressForgotPassword}
                        loadingProps={{ size: "large", color: colors.BLUE.default.primary }}
                        titleStyle={appStyles.linkLoginTitleStyle}
                        titleProps={{ numberOfLines: 2, ellipsizeMode: 'tail' }}
                        buttonStyle={appStyles.linkStyle}
                        containerStyle={{flex:2, position:'absolute', right:0}}
                    />
                   
                </View>
                 <View  >
                    <Button
                        title={languageJSON.login}
                        loading={loading}
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

//style for this component
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
    buttonStyle: { 
        // height: 45 ,

    },
    emailInputContainer: { 
        borderWidth:0, 
        width: width-80,
    },
    pwdInputContainer: { 
     
        width: width-80
    },
   
    errorMessageStyle: { 
        fontSize: 12, 
        fontWeight:'bold',
        color: "#FD2323"
    },
    inputTextStyle: {
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
        // fontWeight: "700",
        // width:"100%"
    },
    forgotTitleStyle: { 
        // fontWeight: "700",
        // fontSize: 12,
        // width:"100%",
        // color: colors.BLACK
    },
    buttonContainerStyle: {
        // flex: 1
    }
});
