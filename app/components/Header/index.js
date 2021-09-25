import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  StatusBar,
  Image,
  StyleSheet,
} from "react-native";
import Text from "../Text";
import styles from "./styles";
import PropTypes from "prop-types";
import { BaseColor, PurpleColor } from "../../config";

export default class Header extends Component {
  componentDidMount() {
    StatusBar.setBarStyle(PurpleColor.primaryColor, true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle("dark-content", true);
  }

  render() {
    const {
      style,
      styleLeft,
      styleCenter,
      styleRight,
      styleRightSecond,
      title,
      subTitle,
      onPressLeft,
      onPressRight,
      onPressRightSecond,
      titleImageStyle,
      titleSource,
      whiteColor,
    } = this.props;

    return (
      <View style={[styles.contain, style]}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={[styles.contentLeft, styleLeft]}
            onPress={onPressLeft}
          >
            {this.props.renderLeft()}
          </TouchableOpacity>
        </View>
        {titleSource ? (
          <View style={[styles.contentCenter, styleCenter]}>
            <Image
              source={{ uri: titleSource }}
              style={[styles.titleImage, titleImageStyle]}
            />

            <View>
              <Text
                subhead
                style={StyleSheet.flatten([
                  whiteColor &&
                    StyleSheet.flatten({ color: BaseColor.whiteColor }),
                    grayColor &&
                    StyleSheet.flatten({ color: BaseColor.grayColor }),
                ])}
              >
                {title}
              </Text>
              {subTitle != "" && (
                <Text caption2 light>
                  {subTitle}
                </Text>
              )}
            </View>
          </View>
        ) : (
          <Text
            headline
            style={StyleSheet.flatten([
              whiteColor && StyleSheet.flatten({ color: BaseColor.whiteColor }),
            ])}
          >
            {title}
          </Text>
        )}

        <View style={styles.right}>
          <TouchableOpacity
            style={[styles.contentRightSecond, styleRightSecond]}
            onPress={onPressRightSecond}
          >
            {this.props.renderRightSecond()}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.contentRight, styleRight]}
            onPress={onPressRight}
          >
            {this.props.renderRight()}
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

Header.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleLeft: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleCenter: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  styleRight: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  whiteColor: PropTypes.bool,
  styleRightSecond: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  renderLeft: PropTypes.func,
  renderRight: PropTypes.func,
  renderRightSecond: PropTypes.func,
  onPressRightSecond: PropTypes.func,
  onPressLeft: PropTypes.func,
  onPressRight: PropTypes.func,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  barStyle: PropTypes.string,
};

Header.defaultProps = {
  style: {},
  styleLeft: {},
  styleCenter: {},
  styleRight: {},
  whiteColor: false,
  styleRightSecond: {},
  renderLeft: () => {},
  renderRight: () => {},
  renderRightSecond: () => {},
  onPressLeft: () => {},
  onPressRight: () => {},
  onPressRightSecond: () => {},
  title: "Title",
  subTitle: "",
  barStyle: PurpleColor.primaryColor,
};
