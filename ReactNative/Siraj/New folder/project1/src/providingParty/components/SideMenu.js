import React from 'react';
import { Text, View, Dimensions, StyleSheet, FlatList, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import SideMenuHeader from './SideMenuHeader';

import { NavigationActions } from 'react-navigation';
import { colors } from '../common/theme';
import * as firebase from 'firebase'
import languageJSON from '../common/language';

var { height, width } = Dimensions.get('window');

export default class SideMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            heightIphoneSix: false,
            heightIphoneFive: false,
            heightIphoneX: false,
            heightIphoneXsMax: false,
            sideMenuList: [
                { key: 1, name: languageJSON.booking_request, navigationName: 'DriverTripAccept', icon: require('../../../assets/images/help.png'), type: 'font-awesome', child: 'firstChild' },
                { key: 2, name: languageJSON.profile_settings, navigationName: 'Profile', icon: require('../../../assets/images/edit.png'), type: 'ionicon', child: 'secondChild' },
                { key: 4, name: languageJSON.incomeText, navigationName: 'MyEarning', icon: require('../../../assets/images/IconCard.png'), type: 'SimpleLineIcons', child: 'ninethChild' },
                { key: 3, name: languageJSON.my_bookings, navigationName: 'SellerRideList', icon: require('../../../assets/images/terms.png'), type: 'material-community', child: 'thirdChild' },
                { key: 10, name: languageJSON.about_us, navigationName: 'About', icon: require('../../../assets/images/question.png'), type: 'entypo', child: 'ninethChild' },
                { key: 9, name: languageJSON.sign_out, icon: require('../../../assets/images/iconLogout7.png'), type: 'font-awesome', child: 'lastChild' }
            ],
            profile_image: null
        }

    }

    componentDidMount() {
        this.heightReponsive();
        var curuser = firebase.auth().currentUser.uid;
        const userData = firebase.database().ref('users/' + curuser);
        userData.on('value', currentUserData => {
            if (currentUserData.val()) {
                this.setState(currentUserData.val(), (res) => {
                    if (currentUserData.val().driverActiveStatus == undefined) {
                        userData.update({
                            driverActiveStatus: true
                        })
                    }
                });
            }
        })
    }

    //check for device height(specially iPhones)
    heightReponsive() {
        if (height == 667 && width == 375) {
            this.setState({ heightIphoneSix: true })
        }
        else if (height == 568 && width == 320) {
            this.setState({ heightIphoneFive: true })
        }
        else if (height == 375 && width == 812) {
            this.setState({ heightIphoneX: true })
        }
        else if (height == 414 && width == 896) {
            this.setState({ heightIphoneXsMax: true })
        }
    }

    //navigation to screens from side menu
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    //sign out and clear all async storage
    async signOut() {
        firebase.auth().signOut();
    }

    render() {
        return (
            <View style={styles.mainViewStyle}>
                <SideMenuHeader onPress={this.navigateToScreen("Profile")} headerStyle={styles.myHeader} userPhoto={this.state.profile_image} userEmail={this.state.email} fName={this.state.firstName} lName={this.state.lastName} userName={this.state.firstName + ' ' + this.state.lastName}></SideMenuHeader>

                <View style={styles.compViewStyle}>
                    <View style={{ margin: 10 }}>
                        <Text style={{ color: '#a3a9c1', fontSize: 14, fontFamily: 'OpenSans-Semibold' }}>Account</Text>
                    </View>
                    <FlatList
                        data={this.state.sideMenuList}
                        keyExtractor={(item, index) => index.toString()}
                        style={{}}
                        bounces={false}
                        renderItem={({ item, index }) =>
                            <View>
                                {index == this.state.sideMenuList.length - 1 && (
                                    <View style={{ margin: 10, marginTop: (index == this.state.sideMenuList.length - 1) ? 30 : 0, }}>
                                        <Text style={{ color: '#a3a9c1', fontSize: 14, fontFamily: 'OpenSans-Semibold' }}>Information</Text>
                                    </View>
                                )}
                                <TouchableOpacity
                                    onPress={
                                        (item.name == languageJSON.sign_out) ? () => this.signOut() :
                                            this.navigateToScreen(item.navigationName)
                                    }
                                    style={
                                        [styles.menuItemView,
                                        ]
                                    }>

                                    <Text style={styles.menuName}>{item.name}</Text>
                                    <View style={styles.viewIcon}>
                                        <Image
                                            style={styles.iconStyle}
                                            source={item.icon}
                                        />
                                        {/* <Icon
                                        name={item.icon}
                                        type={item.type}
                                        color='#01d298'
                                        size={20}
                                        containerStyle={styles.iconStyle}
                                    /> */}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        } />
                </View>
                {/* <View style={{ opacity: 0.6 }}>
                    <Image
                        source={require('../../assets/images/logo.png')}
                        style={{ width: '100%' }}
                    />
                </View> */}
            </View >
        )
    }
}

//style for this component
const styles = StyleSheet.create({
    myHeader: {
        marginTop: 0,
    },
    menuItemView: {
        flexDirection: 'row',
        // justifyContent: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        borderTopColor: '#e5e5e5',
        borderTopWidth: 0.5

    },
    viewIcon: {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: colors.GREY.btnPrimary,
        left: 1
    },
    menuName: {
        color: colors.BLACK,
        fontWeight: '600',
        flex: 1,
        fontFamily: 'OpenSans-Semibold',
        fontSize:20,
        color:'#333333'
    },
    mainViewStyle: {
        backgroundColor: colors.WHITE,
        height: '100%'
    },
    compViewStyle: {
        position: 'relative',
        flex: 3
    },
    iconStyle: {
        width: 20,
        height: 20
    }
})