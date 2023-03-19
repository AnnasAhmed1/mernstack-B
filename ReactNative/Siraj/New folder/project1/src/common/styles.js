import { StyleSheet } from "react-native";
import { theme, colors } from "./theme";

export const appStyles = StyleSheet.create({
  buttonBlue: {
    height: 50,
    width: 160,
    backgroundColor: theme.BUTTON_BLUE,
  },
  buttonYellow: {
    height: 50,
    width: 160,
    backgroundColor: theme.BUTTON_YELLOW,
  },
  buttonPrimary: {
    height: 50,
    width: 160,
    backgroundColor: theme.BUTTON_PRIMARY,
  },
  buttonText: {
    fontFamily: theme.FONT_ONE,
    fontSize: theme.FONT_SIZE_BUTTONS,
    color: theme.BUTTON_TEXT,
  },
  InputTextStyle: {},
  buttonStyle: {
    backgroundColor: colors.GREEN2,

    borderRadius: 24,
    borderColor: "#01d298",
  },
  linkStyle: {
    backgroundColor: colors.WHITE,
  },
  linkLoginTitleStyle: {
    color: colors.BLACK,
    fontSize: 16,
   
  },
  inputContainerStyle: {
    borderBottomWidth: 0,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    width: "90%",
  },
  iconContainer: {
    marginLeft: 10,
    alignSelf: "stretch",
    marginTop: 9,
  },
  iconTitle: {
    backgroundColor: "#cccccc",
  },
  ScreenHeader: {
    color: "#333333",
    fontSize: 20,
  },
  screenContainer: {},
  InputValidHideErrorPH: {
    display: "none",
  },
});