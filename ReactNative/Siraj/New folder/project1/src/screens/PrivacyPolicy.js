import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  Platform,
  Alert,
  Modal,
  ScrollView
} from 'react-native'
import { MapComponent } from '../components'
import { Icon, Button, Avatar, Header } from 'react-native-elements'
import { colors } from '../common/theme'

import * as Constants from 'expo-constants'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
var { height, width } = Dimensions.get('window')
import { GeoFire } from 'geofire'
import * as firebase from 'firebase'
import { AnimatedRegion } from 'react-native-maps'
import { google_map_key } from '../common/key'
import languageJSON from '../common/language'
import { Currency } from '../common/CurrencySymbol'
//import { hide } from 'expo/build/launch/SplashScreen'
import { RequestPushMsg } from '../common/RequestPushMsg'
import beeplinkPopup from '../../assets/images/ber.png';
import cross from '../../assets/images/cancelModal.png';
import { updateHistory } from '../common/ScreenTracker';
import NotificationNav from '../providingParty/components/NotificationNav'


export default class PrivacyPolicy extends React.Component {
  constructor (props) {
    super(props)

  }

  async componentWillMount () {
  // this.getDrivers()
    if (Platform.OS === 'android' && !Constants.default.isDevice) {
      this.setState({
        errorMessage:
          'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
      })
    } else {
      if (this.state.passData.wherelatitude == 0) {
        //nomi fix

        this._getLocationAsync()
        //this._getMyLocationAsync();
      }
    }

    //nomi fix

  }

  render () {
    return (
   <div>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <meta name="”description”" content="”Realtime" notification system htmlFor connecting service providers with people who need or help based on their locations.” />
        <title>Get express service\help with any issue based on your location</title>
        <link href="css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i,800,800i" rel="stylesheet" />
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-xs-12 col-sm-12">
              <h3>PRIVACY POLICY</h3>
              <h4>Welcome to Beeplink!</h4>
              <p><b>Beeplink</b> values your privacy. This notice describes what information we collect, how we use it, and, if necessary, those with whom we share it.&nbsp;</p>
              <p><b>By downloading and using the Beeplink application and website, you are accepting the practices described in this Privacy Policy.</b>&nbsp;Your use of the application and website is also subject to our Terms and Conditions.</p>
              <p>This Privacy Policy may change from time to time. Your continued use of the application and website after we make changes is deemed to be acceptance of those changes, so please check the policy periodically for updates. This Privacy Policy has been developed and is maintained in accordance with all applicable federal and international laws and regulations, and specifically with the California Online Privacy Protection Act (CalOPPA – U.S regulation) and the GDPR (General Data Protection Regulation - European regulation).</p>
              <h4>GENERAL INFORMATION</h4>
              <p>The personal data of the users that are collected and processed through:</p>
              <ul>
                <li>Beeplink App (Android and iOS version – Available on Google Play and App store)</li>
                <li><a href="#">https://beeplink.com</a></li>
              </ul>
              <p>Will be under responsibility and in charge of:</p>
              <p><b>Beeplink</b> </p>
              <p><b>Israel</b></p>
              <p><b>info@beeplink.com</b></p>
              <p>(Hereinafter referred to as <b>“Beeplink”).</b> </p>
              <h4>TYPES OF INFORMATION GATHERED</h4>
              <p>The information we learn from customers helps personalize and continually improve your experience at Beeplink. Here are the types of information we gather:</p>
              <p><b>Information You Give Us.</b> You provide information when you download the app, search, read and watch the content, use the services or communicate with us. As a result of those actions, you might supply us with the following information:</p>
              <ul>
                <li>First and last name</li>
                <li>Email address</li>
                <li>Country/province/state</li>
                <li>Address</li>
                <li>Phone number (includes WhatsApp)</li>
                <li>IP address</li>
                <li>Payment information</li>
                <li>Any additional information relating to you that you provide to us directly through our websites or indirectly through our websites or online presence such as ‘cookies’.</li>
              </ul>
              <p>Beeplink will not collect any personally identifiable information about you, unless you provide it.</p>
              <p><b>Payment information:</b> Your credit card information or payment information, will be processed by Braintree and Stripe (payment platforms), which will treat and safeguard your data with total security and with the exclusive purpose of processing the purchase of the service. Beeplink reserves the right to contract any payment platform available in the market, which treats your data for the exclusive purpose of processing the purchase of the service.</p>
              <p>Please consult Braintree and Stripe Privacy Policy here:</p>
              <ul>
                <li><a href="#">https://www.braintreepayments.com/legal/braintree-privacy-policy</a></li>
                <li><a href="#">https://stripe.com/gb/privacy</a></li>
              </ul>
              <p><b>GOOGLE Analytics.</b> We use Google Analytics provided by Google, Inc., USA (“Google”). These tool and technologies collect and analyze certain types of information, including IP addresses, device and software identifiers, referring and exit URLs, feature use metrics and statistics, usage and purchase history, media access control address (MAC Address), mobile unique device identifiers, and other similar information via the use of cookies. The information generated by Google Analytics (including your IP address) may be transmitted to and stored by Google on servers in the United States. We use the GOOGLE Analytics collection of data to enhance the website and platform and improve our service.</p>
              <p>Please consult Google's privacy policy here:</p>
              <p><a href="#">https://policies.google.com/privacy</a></p>
              <p>Automatic Information. Like many websites, we use "cookies." We obtain certain types of anonymous information which is not personally identifiable when your web browser accesses Beeplink or third-party content served by or on behalf of Beeplink on other websites. Some of the information we collect and analyze includes the Internet protocol (IP) address; computer and connection information such as browser type, version, and connection speed; purchase history; and the content you searched for, viewed, and possibly purchased.</p>
              <h3>HOW LONG WE KEEP YOUR DATA</h3>
              <p>The personal data will be kept for the time necessary to provide the services or as long as the user does not delete the application from his phone or withdraw his consent. Your personal data will be deleted from our database immediately after you delete the application, terminate your subscription or withdraw your consent.</p>
              <h3>HOW WE USE YOUR INFORMATION. </h3>
              <p>In general, we use the information we collect primarily to provide, maintain, protect and improve our current application, website and services. We use personal information collected through our site as described below and described elsewhere in this Policy to:</p>
              <ul>
                <li>Identify you as a user in our system.</li>
                <li>Provide the application (Android and iOS version).</li>
                <li>User registration.</li>
                <li>Find job offers near your location (professional users).</li>
                <li>Provide the services (connecting the user with professionals).</li>
                <li>Process your requests.</li>
                <li>Send notifications of the service.</li>
                <li>Process payments.</li>
                <li>Improve our services, website, and how we operate our business</li>.
                <li>Understand and enhance your experience using our website and services.</li>
                <li>Send emails through bulk email delivery platforms such as MailChimp and Klaviyo.</li>
                <li>Respond to your comments or questions through our support team (Chat and email).</li>
                <li>Send you related information, including confirmations, invoices, technical notices, updates, security alerts and support and administrative messages.</li>
                <li>Communicate with you about upcoming events and news about services offered by Beeplink and our selected partners.</li>
                <li>Marketing purposes of Beeplink.</li>
                <li>Link or combine your information with other information we get from third parties to help understand your needs and provide you with better service.</li>
                <li>Protect, investigate and deter against fraudulent, unauthorized or illegal activity.</li>
              </ul>
              <h3>HOW DO YOU GET MY CONSENT?</h3>
              <p>By downloading the application, registering, using the services and providing us with personal information to communicate with you, you agree that we collect and use your information. You can withdraw your consent, contact us through the contact information or the contact page.</p>
              <h3>HOW WE SHARE INFORMATION</h3>
              <p>Information about our customers is an important part of our business, and we are not in the business of selling it to others. We share customer information only as described below.</p>
              <p><b>Third-Party Service Providers.</b>&nbsp;We employ other companies and individuals to perform functions on our behalf. Examples include process payments (PayPal and Braintree), sending email, analyzing data, providing marketing assistance, providing search results and links. They have access to personal information needed to perform their functions, but may not use it for other purposes.</p>
              <p><b>Business Transfers.</b>&nbsp;In the event that Beeplink creates, merges with, or is acquired by another entity, your information will most likely be transferred. Beeplink will email you or place a prominent notice on our Website before your information becomes subject to another privacy policy.</p>
              <p><b>Protection of Beeplink and others.</b>&nbsp;We release personal information when we believe release is appropriate to comply with the law, enforce or apply our Terms and conditions and other agreements, or protect the rights, property, or safety of Beeplink, our users or others. This includes exchanging information with other companies and organizations for fraud protection and credit risk reduction.</p>
              <p><b>With Your Consent.</b>&nbsp;Other than as set out above, you will receive notice when personally identifiable information about you might go to third parties, and you will have an opportunity to choose not to share the information.</p>
              <p><b>Anonymous Information.</b>&nbsp;Beeplink uses the anonymous browsing information collected automatically by our servers primarily to help us administer and improve the platform and website. We may also use aggregated anonymous information to provide information about the website to potential business partners and other unaffiliated entities. This information is not personally identifiable.</p>
              <p><b>Email Address.</b>&nbsp;The email address that you supply to us for purposes of receiving our email communications will never be rented or sold to a third party.</p>
              <h3>PROTECTING YOUR INFORMATION</h3>
              <p>We work to protect the security of your information during transmission by using Secure Sockets Layer (SSL) software, which encrypts information you input. If transactions are processed on the Website, transaction information is transmitted to and from the Website in encrypted form using industry-standard SSL connections to help protect such information from interception. We restrict authorized access to your personal information to those persons who have a legitimate purpose to know that information to provide products or services to you and those persons you have authorized to have access to such information.</p>
              <p>Beeplink follows generally accepted industry standards to protect the personal information submitted to us, both during transmission and once Beeplink receives it. No method of transmission over the Internet, or method of electronic storage, is 100% secure. Therefore, while Beeplink strives to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security. </p>
              <p>We will not sell, distribute, or lease your personal information to third parties unless we have your permission or are required by law to do so.</p>
              <h3>YOUR RIGHTS</h3>
              <p>You have the following rights in relation to your personal data provided to Beeplink:</p>
              <ul>
                <li>Access your personal data.</li>
                <li>Request the correction of inaccurate data.</li>
                <li>Request its deletion.</li>
                <li>Request limitation of the processing of your data.</li>
                <li>Oppose the treatment of your data.</li>
                <li>Request your portability.</li>
                <li>Not be subject to automated individual decisions.</li>
              </ul>
              <p>The Users can exercise all these rights contacting us through the contact information or the contact page and indicating the reason for his request.</p>
              <p>Without preconception to any other administrative appeal or legal action, the User shall have the right to submit a claim to a Control Authority, in particular in the Member State in which he or she has their habitual residence, place of work or place of the alleged infringement. If you consider that the processing of your personal data is not appropriate to the regulations, as well as in the case of not seeing the exercise of your rights satisfied. The control authority in which the claim was filed will inform the claimant about the course and result of the claim.</p>
              <h3>EU MEMBERS’ RIGHTS (GDPR COMPLIANT)</h3>
              <p>If you are habitually located in the European Union, you have the right to access, rectify, download or erase your information, as well as the right to restrict and object to certain processing of your information. While some of these rights apply generally, certain rights apply only in certain limited circumstances.</p>
              <p>We describe these rights below:</p>
              <ul>
                <li>Access and Porting: You can access your information at any time.</li>
                <li>Rectify, Restrict, Limit, Delete: You can also rectify, restrict, limit or delete much of your information by contact us. </li>
                <li>Object: Where we process your information based on our legitimate interests explained above, or in the public interest, you can object to this processing in certain circumstances. In such cases, we will cease processing your information unless we have compelling legitimate grounds to continue processing or where it is needed for legal reasons.</li>
                <li>Revoke consent: Where you have previously provided your consent, such as to permit us to process health-related data about you, you have the right to withdraw your consent to the processing of your information at any time. For example, you can withdraw your consent by updating your settings. In certain cases, we may continue to process your information after you have withdrawn consent if we have a legal basis to do so or if your withdrawal of consent was limited to certain processing activities.</li>
                <li>Complain: Should you wish to raise a concern about our use of your information (and without prejudice to any other rights you may have), you have the right to do so with your local supervisory authority.</li>
              </ul>
              <p>Additionally, if you are a European resident, we note that we are processing your information in order to fulfil contracts we might have with you or otherwise to pursue our legitimate business interests listed above. Additionally, please note that your information will be transferred outside of Europe.</p>
              <p>You can see more about these rights at:</p>
              <p><a href="#">https://ec.europa.eu/info/law/law-topic/data-protection/reform/rights-citizens_en</a></p>
              <h3>CALIFORNIA ONLINE PRIVACY PROTECTION ACT COMPLIANCE (CalOPPA)</h3>
              <p>CalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy. The law’s reach stretches well beyond California to require any person or company in the United States (and conceivably the world) that operates websites collecting Personally Identifiable Information from California consumers to post a conspicuous privacy policy on its website stating exactly the information being collected and those individuals or companies with whom it is being shared.</p>
              <p>Because we value your privacy, we have taken the necessary precautions to be in compliance with the California Online Privacy Protection Act (CalOPPA). </p>
              <p>According to the California Online Privacy act, you have the following rights:</p>
              <ul>
                <li>Know what personal data is being collected.</li>
                <li>Know whether your personal data is sold or disclosed and to whom.</li>
                <li>Access to your personal data.</li>
                <li>Request to delete any personal information about you.</li>
                <li>Not be discriminated against for exercising their privacy rights.</li>
              </ul>
              <h3>CHILDREN’S ONLINE PRIVACY PROTECTION </h3>
              <p>We are in compliance with the requirements of the GDPR (General Data Protection Regulation) and the California Online Privacy Protection Act (CalOPPA) regarding the protection of the personal data of minors. We do not collect any information from anyone under 13 years of age. Our website, platform and services are all directed to people who are at least 18 years old or older.</p>
              <h3>EDITING AND DELETING INFORMATION</h3>
              <p>If you believe that any information, we are holding on you is incorrect or incomplete, please write to or email us as soon as possible. We will promptly correct any information found to be incorrect. You can change, modify, rectify and delete your Information at any time, please contact us through the contact information.</p>
              <p>To opt-out of Beeplink email, follow the instructions included in the email. Your request should be processed within 48 hours.</p>
              <h3>SUPPLIERS AND OTHER THIRD PARTIES</h3>
              <p>Except as otherwise expressly included in this Privacy Policy, this document addresses only the use and disclosure of information Beeplink collects from you. If you disclose your information to others, whether other users or suppliers on Beeplink, different rules may apply to their use or disclosure of the information you disclose to them. Beeplink does not control the privacy policies of third parties, and you are subject to the privacy policies of those third parties where applicable. Beeplink is not responsible for the privacy or security practices of other websites on the Internet, even those linked to or from the Beeplink site. Beeplink encourages you to ask questions before you disclose your personal information to others.</p>
              <h3>CHANGES TO THIS PRIVACY POLICY</h3>
              <p>Beeplink will post modifications by date to this Privacy Policy to inform you of any changes. Beeplink reserves the right to modify this Privacy Policy at any time, please review it frequently.</p>
              <h3>ENFORCEMENT</h3>
              <p>Beeplink regularly reviews its compliance with this Policy. Please feel free to direct any questions or concerns regarding this Policy or Beeplink treatment of personal information by contacting us.</p>
              <p>When we receive formal written complaints, it is Beeplink policy to contact the complaining user regarding his or her concerns. We will cooperate with the appropriate regulatory authorities, including local data protection authorities, to resolve any complaints regarding the transfer of personal data that cannot be resolved between Beeplink and an individual.</p>
              <h3>CONTACT US</h3>
              <p>If you have questions or concerns about these Privacy Policy and the handling and security of your data on this site, please contact us at:</p>
              <p><b>info@beeplink.com</b></p>
            </div>	
          </div>	
        </div>       
      </div>)}
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.GREY.default,
    borderBottomWidth: 0
  },
  headerTitleStyle: {
    color: colors.BLACK,
    fontFamily: 'Roboto-Bold',
    fontSize: 18
  },
  mapcontainer: {
    flex: 6,
    width: width,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject
  },
  inrContStyle: {
    marginLeft: 10,
    marginRight: 10
  },
  mainViewStyle: {
    flex: 1,
    backgroundColor: colors.BLACK
    //marginTop: StatusBar.currentHeight
  },
  myViewStyle: {
    display: 'none',
    flex: 1.5,
    flexDirection: 'row',
    borderTopWidth: 0,
    alignItems: 'center',
    backgroundColor: colors.GREY.default,
    paddingEnd: 20
  },
  coverViewStyle: {
    flex: 1.5,
    alignItems: 'center'
  },
  viewStyle1: {
    height: 12,
    width: 12,
    borderRadius: 15 / 2,
    backgroundColor: colors.YELLOW.light
  },
  viewStyle2: {
    height: height / 25,
    width: 1,
    backgroundColor: colors.YELLOW.light
  },
  viewStyle3: {
    height: 14,
    width: 14,
    backgroundColor: colors.GREY.iconPrimary
  },
  iconsViewStyle: {
    flex: 9.5,
    justifyContent: 'space-between'
  },
  contentStyle: {
    flex: 1,
    justifyContent: 'center',
    borderBottomColor: colors.BLACK,
    borderBottomWidth: 1
  },
  textIconStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  textStyle: {
    flex: 9,
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: colors.BLACK
  },
  searchClickStyle: {
    flex: 1,
    justifyContent: 'center'
  },
  compViewStyle: {
    flex: 0.5,
    alignItems: 'center',
    display: 'none'
  },
  pickCabStyle: {
    display: 'none',
    flex: 0.3,
    fontFamily: 'Roboto-Bold',
    fontSize: 15,
    fontWeight: '500',
    color: colors.BLACK
  },
  sampleTextStyle: {
    display: 'none',
    flex: 0.2,
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    fontWeight: '300',
    color: colors.GREY.secondary
  },
  adjustViewStyle: {
    display: 'none',
    flex: 9,
    flexDirection: 'row',
    //justifyContent: 'space-around',
    marginTop: 8
  },
  cabDivStyle: {
    flex: 1,
    width: width / 3,
    alignItems: 'center'
  },
  imageViewStyle: {
    flex: 2.7,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  imageStyle: {
    height: height / 14,
    width: height / 14,
    borderRadius: height / 14 / 2,
    borderWidth: 3,
    borderColor: colors.YELLOW.secondary,
    //backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textViewStyle: {
    flex: 1,
    alignItems: 'center'
  },
  text1: {
    fontFamily: 'Roboto-Bold',
    fontSize: 14,
    fontWeight: '900',
    color: colors.WHITE
  },
  text2: {
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    fontWeight: '900',
    color: colors.GREY.secondary
  },
  imagePosition: {
    height: height / 14,
    width: height / 14,
    borderRadius: height / 14 / 2,
    borderWidth: 3,
    borderColor: colors.YELLOW.secondary,
    //backgroundColor: colors.YELLOW.secondary,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyleView: {
    height: height / 14,
    width: height / 14,
    borderRadius: height / 14 / 2,
    borderWidth: 3,
    borderColor: colors.YELLOW.secondary,
    //backgroundColor: colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle1: {
    height: height / 20.5,
    width: height / 20.5
  },
  imageStyle2: {
    height: height / 20.5,
    width: height / 20.5
  },
  buttonContainer: {
    flex: 1
  },

  buttonTitleText: {
    color: colors.GREY.default,
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
    alignSelf: 'flex-end'
  },

  cancelButtonStyle: {
    backgroundColor: '#edede8',
    elevation: 0,
    width: '60%',
    borderRadius: 5,
    alignSelf: 'center'
  },
  headerMap: {
    position: 'absolute',
    top: 50,
    left: 15,
    height: 45,
    display: 'flex'
  },
  openRequest: {
    position: 'absolute',
    bottom: 47,
    width: 200,
    height: 45,
    
    backgroundColor: '#fff',
    //background: #fff url(../img/Iconhelp.png) 9px 9px no-repeat;
    borderRadius: 25,
    textAlign: 'center',
    alignSelf: 'center',
    // fontWeight: 600,
    //border: 'none',
    marginTop: 0,
    elevation: 10,
    shadowOpacity: 0.75,
    shadowRadius: 10,
    shadowColor: colors.GREY.Deep_Nobel,
    shadowOffset: { height: 1, width: 0 }
  },

  openRequestText: {
    lineHeight: 40,
    textAlignVertical: 'center',
    //background: #fff url(../img/Iconhelp.png) 9px 9px no-repeat;

    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20
    //border: 'none',
  },
  openRequestImageWrapper: {},
  openRequestImage: {
    position: 'absolute',
    textAlignVertical: 'center',
    //background: #fff url(../img/Iconhelp.png) 9px 9px no-repeat;
    alignSelf: 'flex-end',
    textAlign: 'center',
    top: 10,
    left: 10
  },
  hideField: {
    display: 'none'
  },
  openMenuIcon: {
    height: 34,
    width: 34,
  },
  logo: {
    width: '50%',
    justifyContent: 'flex-start',
    marginTop: 10,
    alignItems: 'center',
    position: 'absolute',
    top: 43
  },
   mesgIcon: {
     shadowOpacity: 0.75,
     backgroundColor:"white",
      elevation: 30,
    //width: '100%',
    flex:1,
    flexDirection:"row",
    //marginTop: 10,
   
     textAlign: 'right',
     
     flexDirection:"row",
    alignItems: 'center',
    position: 'absolute',
    top: 135,
    right:5,
    
    shadowOpacity: 0.75,
    shadowRadius: 10,
    shadowColor: colors.GREY.Deep_Nobel,
    shadowOffset: { height: 1, width: 0 },
    width:60,
    height:60,
    borderRadius:33
  },
  currentRequest: {
    width: '50%',
    backgroundColor:'white',
    borderRadius:10,
    //borderWidth:2,
    //borderColor: "#d6dcde",
   // justifyContent: 'flex-start',
    marginTop: 10,
    alignItems: 'center',
    elevation: 10,
    position: 'absolute',
    top: 110,
    fontSize: 30,
    fontWeight: '700',
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight:7,
    paddingLeft:7,
    shadowOpacity: 0.75,
    shadowRadius: 10,
    shadowColor: colors.GREY.Deep_Nobel,
    shadowOffset: { height: 1, width: 0 }
  },
   msgIcon: {
    width: '20%',
    borderRadius:10,
    //borderWidth:2,
    //borderColor: "#d6dcde",
    justifyContent: 'flex-start',
    marginTop: 10,
    right:0,
    //alignItems: 'right',
    elevation: 10,
    position: 'absolute',
    top: 190,
    fontSize: 30,
    fontWeight: '700',
    paddingTop: 5,
    paddingBottom: 5,
    shadowOpacity: 0.75,
    shadowRadius: 10,
    shadowColor: colors.GREY.Deep_Nobel,
    shadowOffset: { height: 1, width: 0 }
  }
})
