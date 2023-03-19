import React from 'react';
import { Header } from 'react-native-elements';
import { colors } from '../common/theme';
import { 
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableWithoutFeedback,
    Dimensions,
    Image
  } from 'react-native';
  var {width} = Dimensions.get('window');
  import * as firebase from 'firebase';
  import  languageJSON  from '../common/language';
  import Background from '../components/Background';
export default class AboutPage extends React.Component {
    constructor(props){
        super(props);
        this.state={}
        const about=firebase.database().ref('About_Us/');
        about.on('value',aboutData=>{
            if(aboutData.val()){
                let data = aboutData.val()
                this.setState(data);
            }
        })
    }
    render() {  
        return (
        
                 <Background style={styles.mainView}>
                <Header 
                    backgroundColor={colors.GREY.default}
                    leftComponent={{icon:'md-menu', type:'ionicon', color:colors.BLACK, size: 30, component: TouchableWithoutFeedback,onPress: ()=>{this.props.navigation.toggleDrawer();} }}
                    centerComponent={<Text style={styles.headerTitleStyle}></Text>}
                    containerStyle={styles.headerStyle}
                    innerContainerStyles={{marginLeft:10, marginRight: 10}}
                />
                <View>
                <ScrollView styles={{marginTop:10}}>
                    <Text style={styles.aboutTitleStyle}>About App</Text>
                    <View style={styles.aboutcontentmainStyle}>
                    <Image
                      style={{ alignItems: 'center',justifyContent: 'center'}}
                      source={require('../../../assets/images/logo9.png')}
                    />
                    
                    <Text style={styles.aboutcontentStyle}>
                      Connects you to people in your vicinity for urgent help or prompt service regarding any issue.
                       {/* {this.state.contents?this.state.contents:null} */}
                    </Text>
                    <View style={{alignItems:'center',marginTop:10,flexDirection:'row',textAlign: 'center',alignSelf: 'center'}}>  
                             <Text styles={{}}> Version 0.0.1</Text>
                        </View>  
                    <Text style={styles.contactTitleStyle}>{languageJSON.contact_details}</Text>
                     
                    <View style={styles.contact}>
                    
                        <View style={{alignItems:'center',flexDirection:'row',textAlign: 'center',alignSelf: 'center'}}>  
                            <Text style={styles.contacttype1}>{languageJSON.email_placeholder} :</Text>
                            <Text style={styles.contacttype1}> info@beeplink.com</Text>
                        </View>  
                           
                        {/* <View style={{justifyContent:'flex-start',alignItems:'center',flexDirection:'row'}}>
                            <Text style={styles.contacttype2}>{languageJSON.phone} :</Text>
                            <Text style={styles.contacttype1}> {this.state.phone?this.state.phone:null}</Text>
                        </View> */}
                    </View>               
                 </View>
                </ScrollView>
               </View>
               </Background>
           
        );
      }
    
}
const styles = StyleSheet.create({
    mainView:{ 
        flex:1, 
        backgroundColor: colors.TRANSPARENT, 
        //marginTop: StatusBar.currentHeight,
    } ,
    headerStyle: { 
        backgroundColor: colors.TRANSPARENT, 
        borderBottomWidth: 0 
    },
    headerTitleStyle: { 
        color: colors.BLACK,
        fontFamily:'Roboto-Bold',
        fontSize: 20
    },
    aboutTitleStyle:{
        color: colors.BLACK,
        fontFamily:'Roboto-Bold',
        fontSize: 17,
        marginLeft:8,
       
    },
     contactTitleStyle:{
        color: colors.BLACK,
        fontFamily:'Roboto-Bold',
        fontSize: 17,
        marginLeft:8,
       marginTop:70
    },
    aboutcontentmainStyle:{
        marginTop:12,
        marginBottom:60,
        alignSelf:'center',
        width:width-70,
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center', 
        width: 300,
        height: 500,
       
        
  
    },
    aboutcontentStyle:{
        color: colors.GREY.secondary,
        fontFamily:'Roboto-Regular',
        fontSize: 15,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center',
        letterSpacing:1,
        marginTop:10,
    },
    contact:{
        marginTop:6,
        marginLeft:8,
        //flexDirection:'row',
        width:"100%",
        marginBottom:30,
        textAlign: 'center'
    },
    contacttype1:{
        textAlign:'center',
        color: colors.GREY.secondary,
        fontFamily:'Roboto-Bold',
        fontSize: 15,
    },
    contacttype2:{
        textAlign:'left',
        marginTop:4,
        color: colors.GREY.secondary,
        fontFamily:'Roboto-Bold',
        fontSize: 15,
    }
})