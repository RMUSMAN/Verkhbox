import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor, Typography, FontWeight} from '../../config';

const styles = StyleSheet.create({
  default: {
    height: 44,
    borderRadius: 8,
    backgroundColor: BaseColor.primaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    paddingHorizontal: '5%',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  textDefault: {
    ...Typography.headline,
    color: BaseColor.whiteColor,
    fontWeight: FontWeight.semibold,
  },
  outline: {
    backgroundColor: BaseColor.whiteColor,
    borderWidth: 1,
    borderColor: BaseColor.primaryColor,
  },
  textOutline: {
    color: BaseColor.primaryColor,
  },
  full: {
    width: '100%',
    alignSelf: 'auto',
  },
  round: {
    borderRadius: 28,
  },
  disabledText: {
    color: BaseColor.lightBlack,
  },
  blackText: {
    color: BaseColor.lightBlack,
  },
  smallText: {fontSize: 14},

  disabledContainer: {
    backgroundColor: BaseColor.fieldColor,
    
  },
});

export default styles;
