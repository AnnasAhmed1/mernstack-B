import React from "react";
import {
  View,
  Text,
  TextInput,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Icon, Button, Header, Input } from "react-native-elements";
import { colors } from "../../common/theme";
import languageJSON from "../../common/language";
import { RichEditor } from "react-native-pell-rich-editor";
import RequestHeader from "./Header";
import * as ImagePicker from "expo-image-picker";
import ActionSheet from "react-native-actionsheet";
import * as Permissions from "expo-permissions";
import { ImageBrowser } from "expo-image-picker-multiple";
import * as firebase from "firebase";

export default class Details extends React.Component {
  constructor(props) {
    super(props);

 
    this.state = {
      title: this.props.title,
      description: this.props.description,
      Modal: false,
      images: this.props.images,
      loadingModal: false,
     //detailsPH: this.props.isDating? "Describe yourself and the person you are searching for" : languageJSON.request_description
     //detailsPH: "I Am... / I'm Looking For..."
       detailsPH: "Message"
    };
    this.submit = this.submit.bind(this);
  }

 async componentDidMount() {
    var currentUser = firebase.auth().currentUser;

    this.setState({ currentUser });


    const { status } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );
  }

  submit() {
    this.props.onStepSubmit(
      this.state.title,
      this.state.description,
      this.state.images
    );
  }
  onEditorInitialized() {}

  _pickImage = async (res) => {
    if (this.state.images.length == 3) {
      alert("you are not allowed to upload more than 3 images");
      return;
    }


    this.setState({ loader: true });
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 3],
      base64: true,
      allowsMultipleSelection: true,
    });
    if (!result.cancelled) {
      console.log(result);
      let data = "data:image/jpeg;base64," + result.base64;
      this.uploadmultimedia(result.uri).then((res) => {
        this.setState(
          {
            images: [...this.state.images, res],
          },
          () => {
            this.props.setImages(res);
          }
        );
      });
      this.setState(
        { profile_image: "data:image/jpeg;base64," + result.base64 },
        () => {
          this.setState({ loader: false });
        }
      );
    } else {
      this.setState({ loader: false });
    }
  };

  async uploadmultimedia(url) {
   this.setState({ loadingModal: true });
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response); // when BlobModule finishes reading, resolve with the blob
      };
      xhr.onerror = function () {
        alert(44)
        reject(new TypeError(languageJSON.network_request_failed)); // error occurred, rejecting
      };
      xhr.responseType = "blob"; // use BlobModule's UriHandler
      xhr.open("GET", url, true); // fetch the blob from uri in async mode
      xhr.send(null); // no initial data
    });

    var imageRef = firebase
      .storage()
      .ref()
      .child(`bookings/${this.state.currentUser.uid}`);
    return imageRef.put(blob).then(() => {
      blob.close();
         this.setState({ loadingModal: false });
      return imageRef.getDownloadURL();
    });
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
                source={require("../../../assets/images/loader.gif")}
              />
              {/* <View style={{ flex: 1 }}>
                <Text style={{ color: "#000", fontSize: 16 }}>
                  {languageJSON.refferal_code_validation_modal}
                </Text>
              </View> */}
          
          </View>
        </View>
      </Modal>
    );
  }
 

  render() {
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ width: "100%", alignContent: "center" }}>
          <View style={styles.textInputContainerStyle}>
            <Input
              ref={(input) => (this.titleInput = input)}
              editable={true}
              underlineColorAndroid={colors.TRANSPARENT}
              placeholder={"Subject"}
              placeholderTextColor={colors.GREY}
              value={this.state.title}
              keyboardType={"email-address"}
              inputStyle={styles.inputTextStyle}
              onChangeText={(text) => {
                this.setState({ title: text });
              }}
              // errorMessage={this.state.titleValid ? null : languageJSON.request_title_blank_error}
              secureTextEntry={false}
              blurOnSubmit={true}
              onSubmitEditing={() => {
                this.validateFirstName();
                this.lnameInput.focus();
              }}
              errorStyle={styles.errorMessageStyle}
              inputContainerStyle={styles.inputContainerStyle}
            />
          </View>
          <View style={styles.textInputContainerStyle}>
            <TextInput
              ref={(el) => {
                this.description = el;
              }}
              onChangeText={(description) => this.setState({ description })}
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder={this.state.detailsPH}
              value={this.state.description}
              numberOfLines={10}
              multiline={true}
              // value={this.state.description}
              inputContainerStyle={styles.detailsContainer}
            />
          </View>
        </View>

        <View style={{ width: "100%", flex: 1 }}>
          <View
            style={{
              width: "100%",
              flex: 1,
              alignItems: "flex-end",
              justifyContent: "flex-end",
              marginRight: 0,
            }}
          >
            <TouchableOpacity
              style={{
                padding: 15,
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                borderRadius: 100,
                marginRight: 5,
                marginBottom: 10,
              }}
              onPress={() => this._pickImage()}
            >
              <Image
                style={{ width: 30, height: 30, zIndex: 99 }}
                source={require("../../../assets/images/camerIcon.png")}
              />
            </TouchableOpacity>
          </View>
          {this.state.images.length > 0 ? (
            <View style={{ width: "100%", marginVertical: 20 }}>
              <ScrollView
                horizontal
                style={{ width: Dimensions.get("window").width }}
              >
                {this.state.images.map((item, i) => (
                  <View>
                    <Image
                      source={{ uri: item }}
                      key={i}
                      style={{
                        width: 150,
                        height: 150,
                        marginLeft: 10,
                        marginRight: i == 2 ? 60 : 0,
                      }}
                    />
                    <View
                      style={{
                        width: "100%",
                        alignItems: "flex-end",
                        position: "absolute",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => {
                          let data = this.state.images;

                          data.splice(i, 1);

                          this.setState({
                            images: data,
                          });
                        }}
                        style={{
                          padding: 4,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: "red",
                          marginRight: i == 2 ? 60 : 0,
                        }}
                      >
                        <Icon name="trash" type="font-awesome" color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          ) : null}
        </View>
         {this.loading()}
      </View>
    );
  }
}

const styles = {
  inputTextStyle: {
    color: colors.GREY,
    fontSize: 20,
    marginTop: 0,
    fontWeight: "600",
  },
  contentStyle: {
    flex: 1,
    justifyContent: "center",
    borderBottomColor: colors.WHITE,
    borderBottomWidth: 1,
    backgroundColor: colors.WHITE,
  },
  textAreaContainer: {
    fontSize: 17,
    fontWeight:600,
    borderColor: colors.GREY,
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    color: colors.GREY,
    height: 150,
    width: "100%",
    justifyContent: "flex-start",
    fontSize: 18,
    fontWeight: "600",
    paddingLeft: 10,
    marginLeft: 7,
  },
  detailsContainer: {
    paddingLeft: 10,
  },
  textInputContainerStyle: {
    padding: 15,
  },

  image: {
    width: 20,
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },

  errorMessageStyle: {
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: 0,
  },
};