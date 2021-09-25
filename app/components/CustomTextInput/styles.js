import React from 'react';
import {StyleSheet} from 'react-native';
import {BaseColor, Typography, FontWeight} from '../../config';

export default StyleSheet.create({
  default: {
    height: 44,
    borderRadius: 8,
    backgroundColor: BaseColor.fieldColor,
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
  shadowInput: {
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,

    // elevation: 2,
  },
});
