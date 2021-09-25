import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

export default class Chip extends Component {
  render() {
    const {style, chip, colors} = this.props;
    if (chip) {
      return (
        <LinearGradient
          colors={colors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[styles.chip, style]}>
          {this.props.children}
        </LinearGradient>
      );
    }
    return (
      <LinearGradient
        colors={colors}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={[styles.circle, style]}>
        {this.props.children}
      </LinearGradient>
    );
  }
}
Chip.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Chip.defaultProps = {
  style: {},
};
