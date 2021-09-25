import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Image, Icon, Text } from "../";
import styles from "./styles";
import PropTypes from "prop-types";
import { BaseColor } from "../../components";

export default class ProfileDetail extends Component {
  render() {
    const {
      style,
      styleLeft,
      textFirst,

      textSecond,
      avatarLetters,
    } = this.props;
    return (
      <View style={[styles.contain, style]} activeOpacity={0.9}>
        <View style={[styles.contentLeft, styleLeft]}>
          <View style={styles.thumb}>
            <Text whiteColor headline semibold numberOfLines={1}>
              {avatarLetters}
            </Text>
          </View>
          <View>
            <Text headline semibold numberOfLines={1}>
              {textFirst}
            </Text>
            <Text
              body2
              grayColor
              style={{
                marginTop: 3,
                paddingRight: 10,
              }}
              numberOfLines={1}
            >
              {textSecond}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

ProfileDetail.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  textFirst: PropTypes.string,
  textSecond: PropTypes.string,
  avatarLetters: PropTypes.string,
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

ProfileDetail.defaultProps = {
  textFirst: "",
  textSecond: "",
  avatarLetters: "MS",
  style: {},
  styleLeft: {},
};
