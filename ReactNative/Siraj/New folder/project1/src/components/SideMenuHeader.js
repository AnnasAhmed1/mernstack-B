import React from 'react';
import { Text, View, Image, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { Icon } from 'react-native-elements'
import { colors } from '../common/theme';
//make a compontent
const SideMenuHeader = ({ headerStyle, userPhoto, fName, lName, userName, userEmail }) => {
    return (
        <View style={[styles.viewStyle, headerStyle]}>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.userImageView}>
                    <Image
                        source={userPhoto == null ? require('../../assets/images/profilePic.png') : { uri: userPhoto }}
                        style={styles.imageStyle}
                    />
                </View>
                <View style={styles.headerTextStyle}>
                    <Text style={styles.ProfileNameStyle}>{fName ? Capitalize(fName) + ' ' + Capitalize(lName) : ""}</Text>
                </View>
            </View>
            {/* <TouchableOpacity style={styles.userImageView} >
                <Image
                    source={userPhoto == null ? require('../../assets/images/profilePic.png') : { uri: userPhoto }}
                    style={styles.imageStyle}
                />
            </TouchableOpacity>
            <View style={styles.headerTextStyle}>
                <Text style={styles.ProfileNameStyle}>{userName ? userName.toUpperCase() : ""}</Text>
            </View> */}
            {/* <View style={styles.iconViewStyle}>
                <Icon 
                    name='mail-read'
                    type='octicon'
                    color={colors.WHITE}
                    size={16}
                />
                <Text style={styles.emailStyle}>{userEmail?userEmail.toLowerCase():""}</Text>
            </View> */}
        </View>
    );

};

function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const styles = {
    viewStyle: {
        backgroundColor: colors.WHITE,
        justifyContent: 'center',
        paddingHorizontal: 15,
        // height: 150,
        paddingTop: 50,
        marginBottom: 20,
        // shadowColor: colors.BLACK,
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.2,
        // elevation: 2,
        // position: 'relative',
        // flexDirection: 'column'
    },
    textStyle: {
        fontSize: 20,
        color: colors.BLACK
    },
    headerTextStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 10
    },
    iconStyle: {

    },
    userImageView: {
        width: 60,
        height: 60,
        borderRadius: 50,
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#01d298',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    ProfileNameStyle: {
        // fontWeight: 'bold',
        color: colors.BLACK,
        fontSize: 17,
        textAlign: "center",
        marginLeft: 10,
        fontFamily: 'OpenSans-Semibold'
    },
    iconViewStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4
    },
    emailStyle: {
        color: colors.BLACK,
        fontSize: 13,
        marginLeft: 4,
        textAlign: "center"
    },
    imageStyle: {
        width: 50,
        height: 50
    }
}
//make the component available to other parts of the app
export default SideMenuHeader;