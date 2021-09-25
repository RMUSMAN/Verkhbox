import React, { Component } from "react";
import { Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import {
  Typography,
  FontWeight,
  BaseColor,
  PinkColor,
  YellowColor,
  FontFamily,
} from "../../config";

export default class CustomText extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      //props style
      header,
      title1,
      title2,
      title3,
      headline,
      body1,
      body2,
      callout,
      subhead,
      footnote,
      caption1,
      caption2,
      overline,
      // props font
      thin,
      ultraLight,
      light,
      regular,
      medium,
      semibold,
      bold,
      heavy,
      black,
      //custom color
      primaryColor,
      darkPrimaryColor,
      lightPrimaryColor,
      accentColor,
      textSecondaryColor,
      lightGrey,
      grayColor,
      lightBlack,
      darkBlueColor,
      dividerColor,
      whiteColor,
      fieldColor,
      //numberOfLines
      numberOfLines,
      underline,
      //custom
      style,
      alignCenter,
      pinkColor,
      yellowText,
    } = this.props;
    return (
      <Text
        style={StyleSheet.flatten([
          underline && StyleSheet.flatten({ textDecorationLine: "underline" }),
          header && Typography.header,
          title1 && Typography.title1,
          title2 && Typography.title2,
          title3 && Typography.title3,
          headline && Typography.headline,
          body1 && Typography.body1,
          body2 && Typography.body2,
          callout && Typography.callout,
          subhead && Typography.subhead,
          footnote && Typography.footnote,
          caption1 && Typography.caption1,
          caption2 && Typography.caption2,
          overline && Typography.overline,
          //custom for font
          thin &&
            StyleSheet.flatten({
              fontWeight: FontWeight.thin,
              fontFamily: FontFamily.thin,
            }),
          ultraLight &&
            StyleSheet.flatten({
              fontWeight: FontWeight.ultraLight,
              fontFamily: FontFamily.extraLight,
            }),
          light &&
            StyleSheet.flatten({
              fontWeight: FontWeight.light,
              fontFamily: FontFamily.light,
            }),
          regular &&
            StyleSheet.flatten({
              fontWeight: FontWeight.regular,
              fontFamily: FontFamily.default,
            }),
          medium &&
            StyleSheet.flatten({
              fontWeight: FontWeight.medium,
              fontFamily: FontFamily.medium,
            }),
          semibold &&
            StyleSheet.flatten({
              fontWeight: FontWeight.semibold,
              fontFamily: FontFamily.semiBold,
            }),
          bold &&
            StyleSheet.flatten({
              fontWeight: FontWeight.bold,
              fontFamily: FontFamily.bold,
            }),
          heavy &&
            StyleSheet.flatten({
              fontWeight: FontWeight.heavy,
              fontFamily: FontFamily.extraBold,
            }),
          black &&
            StyleSheet.flatten({
              fontWeight: FontWeight.black,
              fontFamily: FontFamily.black,
            }),
          // default color
          StyleSheet.flatten({
            color: BaseColor.textPrimaryColor,
          }),
          //custom for color
          primaryColor && StyleSheet.flatten({ color: BaseColor.primaryColor }),
          darkPrimaryColor &&
            StyleSheet.flatten({
              color: BaseColor.darkPrimaryColor,
            }),
          lightPrimaryColor &&
            StyleSheet.flatten({
              color: BaseColor.lightPrimaryColor,
            }),
          accentColor && StyleSheet.flatten({ color: BaseColor.accentColor }),
          textSecondaryColor &&
            StyleSheet.flatten({
              color: BaseColor.textSecondaryColor,
            }),
          lightGrey &&
            StyleSheet.flatten({
              color: BaseColor.lightGrey,
            }),
          grayColor && StyleSheet.flatten({ color: BaseColor.grayColor }),
          darkBlueColor &&
            StyleSheet.flatten({ color: BaseColor.darkBlueColor }),
          dividerColor && StyleSheet.flatten({ color: BaseColor.dividerColor }),
          whiteColor && StyleSheet.flatten({ color: BaseColor.whiteColor }),
          fieldColor && StyleSheet.flatten({ color: BaseColor.fieldColor }),
          lightBlack && StyleSheet.flatten({ color: BaseColor.lightBlack }),
          pinkColor && StyleSheet.flatten({ color: PinkColor.primaryColor }),
          yellowText && StyleSheet.flatten({ color: YellowColor.primaryColor }),

          style && style,
          alignCenter && StyleSheet.flatten({ textAlign: "center" }),
        ])}
        numberOfLines={numberOfLines}
      >
        {this.props.children}
      </Text>
    );
  }
}

// Define typechecking
CustomText.propTypes = {
  //define style
  header: PropTypes.bool,
  title1: PropTypes.bool,
  title2: PropTypes.bool,
  title3: PropTypes.bool,
  headline: PropTypes.bool,
  body1: PropTypes.bool,
  body2: PropTypes.bool,
  callout: PropTypes.bool,
  subhead: PropTypes.bool,
  footnote: PropTypes.bool,
  caption1: PropTypes.bool,
  caption2: PropTypes.bool,
  overline: PropTypes.bool,
  //define font custom
  thin: PropTypes.bool,
  ultraLight: PropTypes.bool,
  light: PropTypes.bool,
  regular: PropTypes.bool,
  medium: PropTypes.bool,
  semibold: PropTypes.bool,
  bold: PropTypes.bool,
  heavy: PropTypes.bool,
  black: PropTypes.bool,
  //custon for text color
  primaryColor: PropTypes.bool,
  darkPrimaryColor: PropTypes.bool,
  lightPrimaryColor: PropTypes.bool,
  accentColor: PropTypes.bool,
  textSecondaryColor: PropTypes.bool,
  lightGrey: PropTypes.bool,
  grayColor: PropTypes.bool,
  darkBlueColor: PropTypes.bool,
  dividerColor: PropTypes.bool,
  whiteColor: PropTypes.bool,
  fieldColor: PropTypes.bool,
  //numberOfLines
  numberOfLines: PropTypes.number,
  //custom style
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.node, // plain text
};

CustomText.defaultProps = {
  //props for style
  header: false,
  title1: false,
  title2: false,
  title3: false,
  headline: false,
  body1: false,
  body2: false,
  callout: false,
  subhead: false,
  footnote: false,
  caption1: false,
  caption2: false,
  overline: false,
  //props for font
  thin: false,
  ultraLight: false,
  light: false,
  regular: false,
  medium: false,
  semibold: false,
  bold: false,
  heavy: false,
  black: false,
  //custon for text color
  primaryColor: false,
  darkPrimaryColor: false,
  lightPrimaryColor: false,
  accentColor: false,
  textSecondaryColor: false,
  lightGrey: false,
  grayColor: false,
  darkBlueColor: false,
  dividerColor: false,
  whiteColor: false,
  fieldColor: false,
  //numberOfLines
  numberOfLines: 10,
  //custom style
  style: {},
  children: "",
};
