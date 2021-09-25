import React, { Component } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  View,
} from "react-native";
import { BaseColor } from "../../config";
import PropTypes from "prop-types";
import Text from "../Text";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";

export default class Button extends Component {
  render() {
    const {
      style,
      styleText,
      icon,
      outline,
      full,
      round,
      loading,
      gradient,
      disabled,
      black,
      smallText,
      gradientColor,
      loadingColor,
      ...rest
    } = this.props;

    if (gradient) {
      return (
        <LinearGradient
          colors={gradientColor ? gradientColor : ["#EBC27E", "#E24A9A"]}
          style={StyleSheet.flatten([
            styles.default,
            outline && styles.outline,
            full && styles.full,
            round && styles.round,
            style,
          ])}
        >
          <TouchableOpacity
            {...rest}
            style={{
              width: "100%",
              alignItems: "center",
              flexDirection: "row",
              backgroundColor: "transparent",
              justifyContent: "center",
            }}
            disabled={loading || disabled}
            // activeOpacity={0.9}
          >
            {icon ? icon : null}
            <Text
              style={[
                styles.textDefault,
                outline && styles.textOutline,
                styleText,
              ]}
              numberOfLines={1}
            >
              {this.props.children || "Button"}
            </Text>
            {loading ? (
              <ActivityIndicator
                size="small"
                color={
                  loadingColor
                    ? loadingColor
                    : outline
                    ? BaseColor.primaryColor
                    : BaseColor.whiteColor
                }
                style={{ paddingLeft: 5 }}
              />
            ) : null}
          </TouchableOpacity>
        </LinearGradient>
      );
    }
    return (
      <TouchableOpacity
        {...rest}
        style={StyleSheet.flatten([
          styles.default,
          outline && styles.outline,
          full && styles.full,
          round && styles.round,
          style,
          disabled && styles.disabledContainer,
        ])}
        activeOpacity={0.9}
        disabled={loading || disabled}
      >
        {icon ? icon : null}
        <Text
          style={StyleSheet.flatten([
            styles.textDefault,
            outline && styles.textOutline,
            disabled && styles.disabledText,
            black && { color: BaseColor.lightBlack },
            smallText && { fontSize: 14 },
            styleText,
          ])}
          numberOfLines={1}
        >
          {this.props.children || "Button"}
        </Text>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={outline ? BaseColor.primaryColor : BaseColor.whiteColor}
            style={{ paddingLeft: 5 }}
          />
        ) : null}
      </TouchableOpacity>
    );
  }
}
Button.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  icon: PropTypes.node,
  outline: PropTypes.bool,
  full: PropTypes.bool,
  round: PropTypes.bool,
  loading: PropTypes.bool,
};

Button.defaultProps = {
  style: {},
  icon: null,
  outline: false,
  full: false,
  round: false,
  loading: false,
};
