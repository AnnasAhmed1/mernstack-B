import React from "react";
import {
  View,
  TouchableHighlight,
  Text,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  LayoutAnimation,
  Platform,
  TouchableOpacity,
  keyboardShouldPersistTaps,
} from "react-native";
import { colors } from "../../common/theme";


export default class FooterSteps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickStep = this.onClickStep.bind(this);
  }
  onClickStep(step) {
    this.setState({ currentStep: step });

    this.props.onClickStep(step);
  }

  onSubmit() {
    this.setState({ currentStep: this.state.currentStep + 1 });
    this.props.onSubmit();
  }

  render() {
    return (
      <View>
        <View style={styles.linkBottom}>
          <View style={styles.container}>
            <View
              style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}
            >
              <View style={{ flex: 1, alignSelf: "stretch" }}>
                <TouchableOpacity onPress={() => this.onClickStep(1)}>
                  {this.props.maxStep >= 1 && (
                    <Image
                      source={require("../../../assets/images/IconCategory.png")}
                    ></Image>
                  )}
                  {/* { this.state.currentStep == 1 && this.props.maxStep == 1 &&
             <Image  source={require('../../../assets/images/IconCategoryGray.png')}></Image>
            } */}
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignSelf: "stretch" }}>
                <TouchableOpacity onPress={() => this.onClickStep(2)}>
                  {/* IconPinGreen.png */}
                  {this.props.maxStep < 2 && (
                    <Image
                      style={{}}
                      source={require("../../../assets/images/pin.png")}
                    ></Image>
                  )}
                  {this.props.maxStep >= 2 && (
                    <Image
                      style={{}}
                      source={require("../../../assets/images/IconPin2.png")}
                    ></Image>
                  )}
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1, alignSelf: "stretch" }}>
                <TouchableOpacity onPress={() => this.onClickStep(3)}>
                  {/* IconDescription1.png */}
                  {this.props.maxStep < 3 && (
                    <Image
                      source={require("../../../assets/images/IconDescription1.png")}
                    ></Image>
                  )}
                  {this.props.maxStep >= 3 && (
                    <Image
                      source={require("../../../assets/images/IconDescription3x.png")}
                    ></Image>
                  )}
                </TouchableOpacity>
              </View>
                {/* {!this.props.isDating? ( */}
              {/* <View style={{ flex: 1, alignSelf: "stretch" }}>
                <TouchableOpacity onPress={() => this.onClickStep(4)}>
               
                  {this.props.maxStep < 4 && (
                    <Image
                      source={require("../../../assets/images/IconTime.png")}
                    ></Image>
                  )}
                  {this.props.maxStep >= 4 && (
                    <Image
                      source={require("../../../assets/images/IconTimeGreen.png")}
                    ></Image>
                  )}
                </TouchableOpacity>
              </View>  */}
              {/* ) : null} */}
               {/* {!this.props.isDating? ( */}
              <View style={{ flex: 1, alignSelf: "stretch" }}>
                <TouchableOpacity onPress={() => this.onClickStep(5)}>
                  <Image
                    source={require("../../../assets/images/IconPrice.png")}
                  ></Image>
                </TouchableOpacity>
              </View>
                 {/* ) : null} */}
            </View>
            {/* <TouchableHighlight   style={[styles.saveButtomWrapperBorder]}  onPress={this.onSubmit}> 
              <TouchableOpacity
                onPress={this.onSubmit}
                keyboardShouldPersistTaps="always"
                style={[styles.saveButtomWrapper, { marginRight: 10 }]}
              >
                <View style={styles.saveButton}>
                  <Image
                    style={styles.saveButtonImage}
                    source={require("../../../assets/images/IconNext.png")}
                  ></Image>
                </View>
              </TouchableOpacity>
             </TouchableHighlight>  */}
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  linkBottom: {
    // position: 'fixed',
    bottom: 0,
    left: 0,
    width: "100%",
    borderTopColor: "#f2f2f2",
    borderTopWidth: 1,
    paddingTop: 25,
    hight: 70,
  },
  container: {
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    marginBottom: 20,
    marginTop: 10,
  },
  image: {
    width: 20,
  },
  saveButton: { },
  saveButtonImage: {
    position: "relative",
    top: 5,
    left: 20,

    height: 55,
  },
  saveButtomWrapper: {
    margin:50,
      zIndex:2,
    backgroundColor: "#01d298",
    color: "white",
   // position: "absolute",
    // right: 0,
    // top: -120,
    borderRadius: 50,
    elevation: 10,
    width: 60,
    height: 60,
    shadowOpacity: 0.75,
    shadowRadius: 10,
    shadowColor: colors.GREY.Deep_Nobel,
    shadowOffset: { height: 1, width: 0 },
    
  },
    saveButtomWrapperBorder: {
      zIndex:4,
    backgroundColor: "transparent",
    borderColor:"black",
    borderWidth:1,
    flex: 1,
    color: "white",
    position: "absolute",
     right: 0,
    top: -120,
    // borderRadius: 50,
    // elevation: 10,
    width: 160,
    height: 160,
    // shadowOpacity: 0.75,
    // shadowRadius: 10,
    // shadowColor: colors.GREY.Deep_Nobel,
    // shadowOffset: { height: 1, width: 0 },
    
  },
};