import React from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { colors } from "../common/theme";
import languageJSON from "../common/language";

//make a compontent
const SideMenuHeader = ({
  headerStyle,
  userPhoto,
  fName,
  lName,
  userEmail,
  onPress,
  userName,
  item,
  ...props
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.viewStyle, headerStyle]}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={styles.userImageView}>
            <Image
              source={
                userPhoto == null
                  ? require("../../../assets/images/profilePic.png")
                  : { uri: userPhoto }
              }
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.headerTextStyle}>
            <Text style={[ props.isLink? styles.ProfileNameClick: styles.ProfileNameStyle ]} >
              {fName ? Capitalize(fName) + " " + Capitalize(lName) : ""}
            </Text>
          </View>
        </View>

        {item?.images ? (
          <TouchableOpacity
            style={[ { borderWidth: 0, borderRadius: 0 }]}
            onPress={() => props.showImagesModal()}
          >
           <Text style={styles.kmText}></Text>
            <Image
              source={require("../../../assets/images/camerIcon.png")}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        ) : null}
       
       {/* {item?.distance && props.showDistance ? (
          <TouchableOpacity
            style={[ { borderWidth: 0, borderRadius: 0 }]}
            //onPress={() => props.showImagesModal()}
          >
           <Text style={styles.kmText}>{item.distance}</Text>
           <View style={{ alignItems: "center", justifyContent: "center"}}>
            <Image
              source={require("../../../assets/images/distance.png")}
              style={{ width: 30, height: 30,   alignItems: "center", justifyContent: "center" }}
            />
           </View>
          </TouchableOpacity>
          ) : null} */}
       


      
      </View>
      {/* <View style={styles.iconViewStyle}>
                <Icon
                    name='mail-read'
                    type='octicon'
                    color={colors.WHITE}
                    size={16}
                />
                <Text style={styles.emailStyle}>{userEmail ? userEmail.toLowerCase() : ""}</Text>
            </View> */}
    </TouchableOpacity>
  );
};

function Capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//style for this component
const styles = {
  viewStyle: {
    backgroundColor: colors.WHITE,
    justifyContent: "center",
    paddingHorizontal: 15,
    // height: 150,
    //nomi fix paddingTop: 50,
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
    color: colors.BLACK,
  },
  kmText:{
    color:colors.NICERED,
    fontSize:11
  },
  headerTextStyle: {
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 10
  },
  iconStyle: {},
  userImageView: {
    width: 60,
    height: 60,
    borderRadius: 50,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#01d298",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  ProfileNameClick:{
    textDecorationLine: 'underline',
      color: colors.BLACK,
    fontSize: 20,
    textAlign: "center",
    marginLeft: 10,
    fontFamily: "OpenSans-Semibold"
  },
  ProfileNameStyle: {
    // fontWeight: 'bold',
    //textDecorationColor:colors.BLACK,
   /// textDecorationLine: 'underline',
    color: colors.BLACK,
    fontSize: 20,
    textAlign: "center",
    marginLeft: 10,
    fontFamily: "OpenSans-Semibold",
  },
  iconViewStyle: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  emailStyle: {
    color: colors.BLACK,
    fontSize: 13,
    marginLeft: 4,
    textAlign: "center",
  },
  imageStyle: {
    width: 50,
    height: 50,
  },
};
//make the component available to other parts of the app
export default SideMenuHeader;