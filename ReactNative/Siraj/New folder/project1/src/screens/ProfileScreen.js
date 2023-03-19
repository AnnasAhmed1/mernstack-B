import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Icon, Header } from "react-native-elements";
import ActionSheet from "react-native-actionsheet";
import { colors } from "../common/theme";

import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo";
import languageJSON from "../common/language";
var { width, height } = Dimensions.get("window");
import * as firebase from "firebase";
import { Currency } from "../common/CurrencySymbol";
import Background from "../components/Background";
import { appStyles } from "../common/styles";
import * as Cellular from "expo-cellular";
import countries from "../common/Countries";

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      profile_image: null,
      loader: false,
      showForgotModal: false,
      extension: {},
    };
  }

  async componentWillMount() {
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

    var curuser = firebase.auth().currentUser;
    console.log(curuser.providerData);
    this.setState({ currentUser: curuser }, () => {
      const userData = firebase
        .database()
        .ref("users/" + this.state.currentUser.uid);
      userData.on("value", (userData) => {
        if (userData.val()) {
          this.setState(userData.val(), (res) => {});
        }

        if (userData.val()?.location) {
          var str = userData.val()?.location.add;
          var tempAdd = str?.split(",")[3] + "," + str?.split(",")[4];
          this.setState({ tempAddress: tempAdd });
        }
      });
    });
  }

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  uploadImage() {
    return (
      <View>
        <ActionSheet
          ref={(o) => (this.ActionSheet = o)}
          title={languageJSON.photo_upload_action_sheet_title}
          options={[
            languageJSON.camera,
            languageJSON.galery,
            languageJSON.cancel,
          ]}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={(index) => {
            if (index == 0) {
              this._pickImage(ImagePicker.launchCameraAsync, "CAMERA");
            } else if (index == 1) {
              this._pickImage(ImagePicker.launchImageLibraryAsync, "FOLDER");
            } else {
              //console.log('actionsheet close')
            }
          }}
        />
      </View>
    );
  }

  _pickImage = async (res,permissionType) => {
    var pickFrom = res;

    let permisions;
    if(permissionType == 'CAMERA'){
        permisions = await ImagePicker.requestCameraPermissionsAsync();
    }else{
        permisions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    }
    const { status } = permisions;


    if (status == "granted") {
      this.setState({ loader: true });
      let result = await pickFrom({
        allowsEditing: true,
        aspect: [3, 3],
        base64: true,
      });
      if (!result.cancelled) {
        let data = "data:image/jpeg;base64," + result.base64;
        this.uploadmultimedia(result.uri);
        this.setState(
          { profile_image: "data:image/jpeg;base64," + result.base64 },
          () => {
            this.setState({ loader: false });
          }
        );
      } else {
        this.setState({ loader: false });
      }
    }
  };

  async uploadmultimedia(url) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
      };
      xhr.onerror = function () {
        reject(new TypeError(languageJSON.network_request_failed)); // error occurred, rejecting
      };
      xhr.responseType = "blob"; // use BlobModule's UriHandler
      xhr.open("GET", url, true); // fetch the blob from uri in async mode
      xhr.send(null); // no initial data
    });

    var imageRef = firebase
      .storage()
      .ref()
      .child(`users/${this.state.currentUser.uid}`);
    return imageRef
      .put(blob)
      .then(() => {
        blob.close();
        return imageRef.getDownloadURL();
      })
      .then((url) => {
        var d = new Date();
        firebase
          .database()
          .ref(`/users/` + this.state.currentUser.uid + "/")
          .update({
            profile_image: url,
          });
      });
  }

  editProfile = () => {
    this.props.navigation.push("editUser");
  };

  onPressChangePassword(oldPass, newPass) {
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.currentUser.email, oldPass)
      .then((res) => {
        if (res) {
          firebase
            .auth()
            .currentUser.updatePassword(newPass)
            .then((res) => {
              this.setState({ showForgotModal: false });
              alert(languageJSON.password_update_messege);
            });
        }
      })
      .catch((error) => {
        alert(languageJSON.confrim_password_not_match_err);
      });
  }

  loader() {
    return (
      <View style={[styles.loadingcontainer, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  //sign out and clear all async storage
  async signOut() {
    firebase.auth().signOut();
  }

  //Delete current user
  async deleteAccount() {
    Alert.alert(
      languageJSON.delete_account_modal_title,
      languageJSON.delete_account_modal_subtitle,
      [
        {
          text: languageJSON.cancel,
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: languageJSON.yes,
          onPress: () => {
            var ref = firebase
              .database()
              .ref("users/" + this.state.currentUser.uid + "/");
            ref.remove().then(() => {
              firebase.auth().signOut();
              firebase.auth().currentUser.delete();
            });
          },
        },
      ],
      { cancelable: false }
    );
  }

  ShowchangePasswordModal() {
    this.setState({ showForgotModal: true });
  }

  closeModal() {
    this.setState({ showForgotModal: false });
  }

  goWallet() {
    this.props.navigation.navigate("wallet");
  }

  render() {
    let { image } = this.state;

    return (
      <Background style={styles.mainView}>
        <Header
          backgroundColor={colors.TRANSPARENT}
          leftComponent={{
            icon: "md-menu",
            type: "ionicon",
            color: colors.BLACK,
            size: 35,
            component: TouchableWithoutFeedback,
            onPress: () => {
              this.props.navigation.toggleDrawer();
            },
          }}
          centerComponent={
            <Text style={styles.headerTitleStyle}>
              {languageJSON.profile_page_title}
            </Text>
          }
          containerStyle={styles.headerStyle}
          innerContainerStyles={{ marginLeft: 10, marginRight: 10 }}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrollStyle}
        >
          {this.uploadImage()}

          <View style={styles.scrollViewStyle}>
            <Text style={styles.profStyle}>
              {" "}
              {languageJSON.my_wallet_title} ( {Currency}{" "}
              {this.state.walletBalance
                ? parseFloat(this.state.walletBalance).toFixed(2)
                : 0.0}
              )
            </Text>
            <Icon
              name="keyboard-arrow-right"
              type="MaterialIcons"
              color="#000"
              size={40}
              iconStyle={{ lineHeight: 48 }}
              onPress={() => this.goWallet()}
            />
          </View>
          <View style={styles.scrollViewStyle2}>
            <Text style={styles.profStyle}>
              {languageJSON.profile_page_subtitle}
            </Text>
            <TouchableOpacity onPress={this.editProfile}>
              <Image
                style={styles.editIconContainer}
                source={require("../../assets/images/edit.png")}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.viewStyle}>
            <View style={styles.imageParentView}>
              <View style={styles.imageViewStyle}>
                {this.state.loader == true ? (
                  this.loader()
                ) : (
                  <TouchableOpacity onPress={this.showActionSheet}>
                    <Image
                      source={
                        this.state.profile_image
                          ? { uri: this.state.profile_image }
                          : require("../../assets/images/profilePic.png")
                      }
                      style={{ borderRadius: 130 / 2, width: 130, height: 130 }}
                    />
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <Text style={styles.textPropStyle}>
              {this.state.firstName + " " + this.state.lastName}
            </Text>
          </View>

          <View style={styles.newViewStyle}>
            <View style={styles.myViewStyle}>
              <View style={styles.iconViewStyle}>
                <Image
                  style={styles.iconContainer}
                  source={require("../../assets/images/mail2.png")}
                />
                <Text style={styles.emailStyle}>
                  {languageJSON.email_placeholder}
                </Text>
              </View>
              <View style={styles.flexView1}>
                <Text
                  underlineColorAndroid={colors.TRANSPARENT}
                  style={styles.emailAdressStyle}
                >
                  {this.state.email}
                </Text>
              </View>
            </View>
            <View style={styles.myViewStyle}>
              <View style={styles.iconViewStyle}>
                <Image
                  style={styles.iconContainer}
                  source={require("../../assets/images/pin.png")}
                />
                <Text style={styles.text1}>{languageJSON.location_lebel}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.text2}>{this.state.tempAddress}</Text>
              </View>
            </View>
            <View style={styles.myViewStyle}>
              <View style={styles.iconViewStyle}>
                <Image
                  style={styles.iconContainer}
                  source={require("../../assets/images/iconMobile.png")}
                />
                <Text style={styles.text1}>
                  {languageJSON.mobile_no_placeholder}
                </Text>
              </View>
              <View style={styles.flexView2}>
                <Text style={styles.text2}>
                  {" "}
                  {this.state.extension?.flag} {this.state.extension?.dial_code}{" "}
                  {this.state.mobile}
                </Text>
              </View>
            </View>
            {this.state.refferalId ? (
              <View style={styles.myViewStyle}>
                <View style={styles.iconViewStyle}>
                  <Image
                    style={styles.iconContainer}
                    source={require("../../assets/images/iconStarBig.png")}
                  />
                  <Text style={styles.emailStyle}>
                    {languageJSON.referral_id_placeholder}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.text2}>{this.state.refferalId}</Text>
                </View>
              </View>
            ) : null}
            <View style={styles.myViewStyle}>
              <View style={styles.iconViewStyle}>
                <Image
                  style={styles.iconContainer}
                  source={require("../../assets/images/globe2.png")}
                />
                <Text style={styles.emailStyle}>
                  {languageJSON.language_lebel}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.text2}>
                  {languageJSON.preffer_language}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.flexView3}>
            <TouchableOpacity
              style={styles.scrollViewStyle}
              onPress={() => {
                this.ShowchangePasswordModal();
              }}
            >
              <Text style={styles.emailStyle}>
                {languageJSON.change_password_lebel}
              </Text>
              <Icon
                name="ios-arrow-forward"
                type="ionicon"
                color={colors.GREY.iconPrimary}
                size={35}
                containerStyle={{ right: 20 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.scrollViewStyle}
              onPress={() => {
                this.deleteAccount();
              }}
            >
              <Text style={styles.emailStyle}>
                {languageJSON.delete_account_lebel}
              </Text>
              <Icon
                name="ios-arrow-forward"
                type="ionicon"
                color={colors.GREY.iconPrimary}
                size={35}
                containerStyle={{ right: 20 }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.signOut();
              }}
              style={styles.scrollViewStyle}
            >
              <Text style={styles.emailStyle}>{languageJSON.logout}</Text>
              <Icon
                name="ios-arrow-forward"
                type="ionicon"
                color={colors.GREY.iconPrimary}
                size={35}
                containerStyle={{ right: 20 }}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: colors.TRANSPARENT,
    borderBottomWidth: 0,
  },
  headerTitleStyle: {
    color: colors.BLACK,
    fontFamily: "Roboto-Bold",
    fontSize: 20,
  },
  logo: {
    flex: 1,
    position: "absolute",
    top: 110,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    height: 150,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  scrollStyle: {
    flex: 1,
    height: height,
    backgroundColor: colors.WHITE,
  },
  scrollViewStyle: {
    width: width,
    height: 50,

    backgroundColor: colors.WHITE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    marginTop: 10,

    paddingRight: 10,
    borderTopColor: "#e5e5e5",
    borderTopWidth: 0.5,
  },
  scrollViewStyle2: {
    width: width,

    height: 50,
    marginTop: 20,
    backgroundColor: colors.WHITE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderTopColor: "#e5e5e5",
    borderTopWidth: 0.5,
    borderBottomColor: "#e5e5e5",
    borderBottomWidth: 0.5,
  },
  profStyle: {
    fontSize: 18,
    left: 20,
    fontWeight: "bold",
    color: colors.GREY.btnPrimary,
    fontFamily: "Roboto-Bold",
  },
  bonusAmount: {
    right: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  viewStyle: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 13,
  },
  imageParentView: {
    borderRadius: 150 / 2,
    width: 150,
    height: 150,
    backgroundColor: "#01d298",
    borderTopWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  imageViewStyle: {
    borderRadius: 140 / 2,
    width: 140,
    height: 140,
    backgroundColor: colors.WHITE,
    justifyContent: "center",
    alignItems: "center",
  },
  textPropStyle: {
    fontSize: 21,
    fontWeight: "bold",
    color: colors.GREY.iconSecondary,
    fontFamily: "Roboto-Bold",
    top: 8,
  },
  newViewStyle: {
    flex: 1,
    height: 300,
    marginTop: 40,
  },
  myViewStyle: {
    flex: 1,
    left: 20,
    marginRight: 40,
  },
  iconViewStyle: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
  },
  emailStyle: {
    fontSize: 17,
    left: 10,
    color: colors.GREY.btnPrimary,
    fontFamily: "Roboto-Bold",
  },
  emailAdressStyle: {
    fontSize: 15,
    color: colors.GREY.secondary,
    fontFamily: "Roboto-Regular",
  },
  mainIconView: {
    flex: 1,
    left: 20,
    marginRight: 40,
    borderBottomColor: colors.GREY.iconSecondary,
    borderBottomWidth: 1,
  },
  text1: {
    fontSize: 17,
    left: 10,
    color: colors.GREY.btnPrimary,
    fontFamily: "Roboto-Bold",
  },
  text2: {
    fontSize: 15,
    left: 10,
    color: colors.GREY.secondary,
    fontFamily: "Roboto-Regular",
  },
  textIconStyle: {
    width: width,
    height: 50,
    backgroundColor: colors.GREY.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textIconStyle2: {
    width: width,
    height: 50,
    marginTop: 10,
    backgroundColor: colors.GREY.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  mainView: {
    flex: 1,
    backgroundColor: colors.WHITE,
    //marginTop: StatusBar.currentHeight
  },
  flexView1: {
    flex: 1,
  },
  flexView2: {
    flex: 1,
  },
  flexView3: {
    marginTop: 54,
  },
  loadingcontainer: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  iconContainer: {
    alignSelf: "stretch",
    marginTop: 9,
  },
  editIconContainer: {
    marginRight: 20,
  },
});