import React, { Component } from "react";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default class Icon extends Component {
  render() {
    const { style, color, iconFamily, ...rest } = this.props;
    if (iconFamily === "FontAwesome5") {
      return (
        <FontAwesome5
          color={color}
          style={StyleSheet.flatten([style && style])}
          {...rest}
        />
      );
    } else if (iconFamily === "Ionicons") {
      return (
        <Ionicons
          color={color}
          style={StyleSheet.flatten([style && style])}
          {...rest}
        />
      );
    } else if (iconFamily === "FontAwesome") {
      return (
        <FontAwesome
          color={color}
          style={StyleSheet.flatten([style && style])}
          {...rest}
        />
      );
    } else if (iconFamily === "MaterialCommunityIcons") {
      return (
        <MaterialCommunityIcons
          color={color}
          style={StyleSheet.flatten([style && style])}
          {...rest}
        />
      );
    } else if (iconFamily === "Entypo") {
      return (
        <Entypo
          color={color}
          style={StyleSheet.flatten([style && style])}
          {...rest}
        />
      );
    } else if (iconFamily === "MaterialIcons") {
      return (
        <MaterialIcons
          color={color}
          style={StyleSheet.flatten([style && style])}
          {...rest}
        />
      );
    }
  }
}

Icon.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  iconFamily: PropTypes.string,
};

Icon.defaultProps = {
  style: {},
  iconFamily: "FontAwesome5",
};
